use std::collections::BTreeMap;

use hdk::prelude::*;
use linked_devices_types::{are_agents_linked, LinkedDevicesProof};
use private_event_sourcing::{
    create_private_event, send_private_events_to_new_recipients, SignedEvent,
};

use crate::{
    create_peer::{build_create_peer_for_agent, build_my_create_peer},
    profile::{merge_profiles, MessengerProfile},
    query_messenger_event, query_messenger_events, Message, MessengerEvent,
};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct CreateGroupPeer {
    pub agents: BTreeSet<AgentPubKey>,
    pub proofs: Vec<LinkedDevicesProof>,
    pub profile: Option<MessengerProfile>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct CreateGroupChat {
    pub me: CreateGroupPeer,
    pub others: Vec<CreateGroupPeer>,
    pub info: GroupInfo,
    pub settings: GroupSettings,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct GroupChat {
    pub members: Vec<GroupMember>,
    pub info: GroupInfo,
    pub settings: GroupSettings,
    pub deleted: bool,
}

impl GroupChat {
    pub fn new(create_group_chat: CreateGroupChat) -> Self {
        let mut members: Vec<GroupMember> = create_group_chat
            .others
            .into_iter()
            .map(|peer| GroupMember {
                agents: peer.agents.into_iter().collect(),
                admin: false,
                removed: false,
                profile: peer.profile,
            })
            .collect();
        members.push(GroupMember {
            agents: create_group_chat.me.agents.into_iter().collect(),
            admin: true,
            removed: false,
            profile: create_group_chat.me.profile,
        });
        Self {
            settings: create_group_chat.settings,
            info: create_group_chat.info,
            members,
            deleted: false,
        }
    }

    pub fn apply(mut self, author: &AgentPubKey, event: &GroupEvent) -> ExternResult<Self> {
        let author_member = self.members.iter().find(|m| m.agents.contains(&author));
        let Some(author_member) = author_member else {
            return Err(wasm_error!(
                "Author of the GroupEvent is not a member of the group"
            ));
        };
        let author_is_admin = author_member.admin;

        if self.deleted {
            return Err(wasm_error!("Group is deleted."));
        }
        match event {
            GroupEvent::UpdateGroupInfo(info) => {
                if self.settings.only_admins_can_edit_group_info && !author_is_admin {
                    return Err(wasm_error!("Only admins can update the group's info"));
                }
                self.info = info.clone();
            }
            GroupEvent::UpdateGroupSettings(settings) => {
                if !author_is_admin {
                    return Err(wasm_error!("Only admins can update the group's settings"));
                }
                self.settings = settings.clone();
            }
            GroupEvent::AddMember {
                member_agents,
                profile,
            } => {
                if self.settings.only_admins_can_add_members && !author_is_admin {
                    return Err(wasm_error!("Only admins can add members"));
                }
                if author_member.removed {
                    return Err(wasm_error!("Author is no longer part of the group"));
                }

                let existing_member_index = self.members.iter().position(|m| {
                    member_agents
                        .iter()
                        .find(|m2| m.agents.contains(&m2))
                        .is_some()
                });

                if let Some(existing_member_index) = existing_member_index {
                    for agent in member_agents {
                        self.members[existing_member_index]
                            .agents
                            .insert(agent.clone());
                    }
                    self.members[existing_member_index].removed = false;
                } else {
                    self.members.push(GroupMember {
                        agents: member_agents.clone().into_iter().collect(),
                        removed: false,
                        admin: false,
                        profile: profile.clone(),
                    });
                }
            }
            GroupEvent::UpdateProfile { profile } => {
                let pos = self.members.iter().position(|m| m.agents.contains(author));
                let Some(p) = pos else {
                    return Err(wasm_error!("Member not found"));
                };

                self.members[p].profile = Some(profile.clone());
            }
            GroupEvent::RemoveMember { member_agents } => {
                if !author_is_admin {
                    return Err(wasm_error!("Only admins can remove members"));
                }

                let pos = self.members.iter().position(|m| {
                    m.agents
                        .iter()
                        .find(|d| member_agents.contains(d))
                        .is_some()
                });
                let Some(p) = pos else {
                    return Err(wasm_error!("Member not found"));
                };
                if self.members[p].removed {
                    return Err(wasm_error!("Member was already removed"));
                }
                self.members[p].removed = true;
                self.members[p].admin = false;
            }
            GroupEvent::NewAgentForMember {
                new_agent,
                linked_devices_proofs,
            } => {
                if author_member.removed {
                    return Err(wasm_error!("Author is no longer part of the group"));
                }
                let pos = self.members.iter().position(|m| m.agents.contains(&author));
                let Some(p) = pos else {
                    return Err(wasm_error!("Member for the given provenance not found"));
                };
                let linked = are_agents_linked(&author, &new_agent, &linked_devices_proofs);
                if !linked {
                    return Err(wasm_error!("Invalid proof"));
                }
                self.members[p].agents.insert(new_agent.clone());
            }
            GroupEvent::PromoteMemberToAdmin { member_agents } => {
                if !author_is_admin {
                    return Err(wasm_error!("Only admins can promote members to admins"));
                }
                let pos = self.members.iter().position(|m| {
                    m.agents
                        .iter()
                        .find(|d| member_agents.contains(d))
                        .is_some()
                });
                let Some(p) = pos else {
                    return Err(wasm_error!("Member not found"));
                };
                self.members[p].admin = true;
            }
            GroupEvent::DemoteMemberFromAdmin { member_agents } => {
                if !author_is_admin {
                    return Err(wasm_error!("Only admins can promote members to admins"));
                }
                let pos = self.members.iter().position(|m| {
                    m.agents
                        .iter()
                        .find(|d| member_agents.contains(d))
                        .is_some()
                });
                let Some(p) = pos else {
                    return Err(wasm_error!("Member not found"));
                };
                self.members[p].admin = false;
            }
            GroupEvent::DeleteGroup => {
                if !author_is_admin {
                    return Err(wasm_error!("Only admins can delete groups"));
                }
                self.deleted = true;
            }
            GroupEvent::LeaveGroup => {
                if author_member.removed {
                    return Err(wasm_error!("Author is no longer part of the group"));
                }
                let author_member_index =
                    self.members.iter().position(|m| m.agents.contains(&author));
                let Some(i) = author_member_index else {
                    return Err(wasm_error!("Unreachable: member position not found?"));
                };
                self.members[i].removed = true;
                self.members[i].admin = false;
            }
        };

        Ok(self)
    }

    pub fn merge(group_1: GroupChat, group_2: GroupChat) -> GroupChat {
        let settings = GroupSettings {
            only_admins_can_edit_group_info: group_1.settings.only_admins_can_edit_group_info
                || group_2.settings.only_admins_can_edit_group_info,
            only_admins_can_add_members: group_1.settings.only_admins_can_add_members
                || group_2.settings.only_admins_can_add_members,
            sync_message_history_with_new_members: group_1
                .settings
                .sync_message_history_with_new_members
                && group_2.settings.sync_message_history_with_new_members,
        };
        let name = if group_1.info.name < group_2.info.name {
            group_2.info.name
        } else {
            group_1.info.name
        };
        let description = if group_1.info.description < group_2.info.description {
            group_2.info.description
        } else {
            group_1.info.description
        };
        let avatar = match (group_1.info.avatar, group_2.info.avatar) {
            (Some(avatar_1), Some(avatar_2)) => Some(if avatar_1 < avatar_2 {
                avatar_2
            } else {
                avatar_1
            }),
            (Some(avatar_1), None) => Some(avatar_1),
            (None, Some(avatar_2)) => Some(avatar_2),
            (None, None) => None,
        };
        let info = GroupInfo {
            name,
            description,
            avatar,
        };

        let mut group_1_members = group_1.members.clone();

        for group_2_member in group_2.members {
            let existing_in_group_1 = group_1_members.iter().position(|m1| {
                group_2_member
                    .agents
                    .iter()
                    .find(|a2| m1.agents.contains(&a2))
                    .is_some()
            });
            if let Some(group_1_member_index) = existing_in_group_1 {
                let group_1_member = group_1_members[group_1_member_index].clone();
                for agent in group_2_member.agents {
                    group_1_members[group_1_member_index]
                        .agents
                        .insert(agent.clone());
                }
                group_1_members[group_1_member_index].removed =
                    group_1_member.removed || group_2_member.removed;
                group_1_members[group_1_member_index].admin =
                    group_1_member.admin && group_2_member.admin;

                let profile = merge_profiles(group_1_member.profile, group_2_member.profile);
                group_1_members[group_1_member_index].profile = profile;
            } else {
                group_1_members.push(group_2_member);
            }
        }

        let deleted = group_1.deleted || group_2.deleted;

        GroupChat {
            members: group_1_members,
            info,
            settings,
            deleted,
        }
    }
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct GroupInfo {
    pub name: String,
    pub description: String,
    pub avatar: Option<String>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct GroupSettings {
    pub only_admins_can_edit_group_info: bool,
    pub only_admins_can_add_members: bool,
    pub sync_message_history_with_new_members: bool,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq, Eq)]
pub struct GroupMember {
    pub agents: BTreeSet<AgentPubKey>,
    pub admin: bool,
    pub removed: bool,
    pub profile: Option<MessengerProfile>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(tag = "type")]
pub enum GroupEvent {
    UpdateGroupInfo(GroupInfo),
    UpdateGroupSettings(GroupSettings),
    AddMember {
        member_agents: BTreeSet<AgentPubKey>,
        profile: Option<MessengerProfile>,
    },
    UpdateProfile {
        profile: MessengerProfile,
    },
    RemoveMember {
        member_agents: BTreeSet<AgentPubKey>,
    },
    NewAgentForMember {
        new_agent: AgentPubKey,
        linked_devices_proofs: Vec<LinkedDevicesProof>,
    },
    PromoteMemberToAdmin {
        member_agents: BTreeSet<AgentPubKey>,
    },
    DemoteMemberFromAdmin {
        member_agents: BTreeSet<AgentPubKey>,
    },
    LeaveGroup,
    DeleteGroup,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct GroupChatEvent {
    pub group_chat_hash: EntryHash,
    pub previous_group_chat_events_hashes: BTreeSet<EntryHash>,

    pub event: GroupEvent,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct GroupMessage {
    pub group_chat_hash: EntryHash,
    pub current_group_chat_events_hashes: BTreeSet<EntryHash>,

    pub message: Message,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct ReadGroupMessages {
    pub group_chat_hash: EntryHash,
    pub current_group_chat_events_hashes: BTreeSet<EntryHash>,
    pub read_messages_hashes: BTreeSet<EntryHash>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct AgentWithProfile {
    pub profile: Option<MessengerProfile>,
    pub agent: AgentPubKey,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct CreateGroupChatInput {
    pub my_profile: Option<MessengerProfile>,
    pub others: Vec<AgentWithProfile>,
    pub info: GroupInfo,
    pub settings: GroupSettings,
}

#[hdk_extern]
pub fn create_group_chat(input: CreateGroupChatInput) -> ExternResult<EntryHash> {
    let me = build_my_create_peer()?;
    let others = input
        .others
        .into_iter()
        .map(|other| {
            let create_peer = build_create_peer_for_agent(other.agent)?;
            Ok(CreateGroupPeer {
                agents: create_peer.agents,
                proofs: create_peer.proofs,
                profile: other.profile,
            })
        })
        .collect::<ExternResult<Vec<CreateGroupPeer>>>()?;

    let group = CreateGroupChat {
        me: CreateGroupPeer {
            agents: me.agents,
            proofs: me.proofs,
            profile: input.my_profile,
        },
        others,
        info: input.info,
        settings: input.settings,
    };

    let content = MessengerEvent::CreateGroupChat(group.clone());
    create_private_event(content)
}

pub fn are_all_agents_linked(
    agents: &BTreeSet<AgentPubKey>,
    proofs: &Vec<LinkedDevicesProof>,
) -> bool {
    for agent_1 in agents {
        for agent_2 in agents {
            if agent_1.eq(&agent_2) {
                continue;
            }
            let valid = are_agents_linked(agent_1, agent_2, &proofs);
            if !valid {
                return false;
            }
        }
    }

    return true;
}

pub fn validate_create_group_chat(
    author: &AgentPubKey,
    create_group_chat: &CreateGroupChat,
) -> ExternResult<ValidateCallbackResult> {
    if !create_group_chat.me.agents.contains(&author) {
        return Ok(ValidateCallbackResult::Invalid(format!(
            "CreateGroupChat must contain the author's public key in the me agent list"
        )));
    }

    let me_valid =
        are_all_agents_linked(&create_group_chat.me.agents, &create_group_chat.me.proofs);
    if !me_valid {
        return Ok(ValidateCallbackResult::Invalid(format!(
            "Agents are not proven to be linked together"
        )));
    }

    for peer in &create_group_chat.others {
        let peer_valid = are_all_agents_linked(&peer.agents, &peer.proofs);
        if !peer_valid {
            return Ok(ValidateCallbackResult::Invalid(format!(
                "Agents are not proven to be linked together"
            )));
        }
    }

    return Ok(ValidateCallbackResult::Valid);
}

#[hdk_extern]
pub fn create_group_chat_event(group_chat_event: GroupChatEvent) -> ExternResult<EntryHash> {
    let content = MessengerEvent::GroupChatEvent(group_chat_event.clone());
    let entry_hash = create_private_event(content)?;

    if let GroupEvent::AddMember { .. } | GroupEvent::NewAgentForMember { .. } =
        group_chat_event.event
    {
        let Some(group_chat) = query_current_group_chat(&group_chat_event.group_chat_hash)? else {
            return Err(wasm_error!("GroupChat not found."));
        };
        let include_messages = group_chat.settings.sync_message_history_with_new_members;
        let Some(events) =
            query_entries_for_group(&group_chat_event.group_chat_hash, include_messages)?
        else {
            return Err(wasm_error!("GroupChat not found."));
        };
        let mut events_hashes: BTreeSet<EntryHash> = events
            .into_keys()
            .map(|entry_hash| EntryHash::from(entry_hash))
            .collect();
        events_hashes.insert(group_chat_event.group_chat_hash);

        send_private_events_to_new_recipients::<MessengerEvent>(events_hashes)?;
    }

    Ok(entry_hash)
}

pub fn query_create_group_chat(
    group_chat_hash: &EntryHash,
) -> ExternResult<Option<CreateGroupChat>> {
    let Some(entry) = query_messenger_event(group_chat_hash.clone())? else {
        return Ok(None);
    };

    let MessengerEvent::CreateGroupChat(group_chat) = entry.event.content else {
        return Err(wasm_error!(
            "Given group_hash is not for a CreateGroupChat entry"
        ));
    };
    Ok(Some(group_chat))
}

pub fn query_original_group_chat(group_chat_hash: &EntryHash) -> ExternResult<Option<GroupChat>> {
    let Some(create_group_chat) = query_create_group_chat(group_chat_hash)? else {
        return Ok(None);
    };
    Ok(Some(GroupChat::new(create_group_chat)))
}

pub fn query_group_chat_event(
    group_chat_hash: &EntryHash,
) -> ExternResult<Option<(AgentPubKey, GroupChatEvent)>> {
    let Some(entry) = query_messenger_event(group_chat_hash.clone())? else {
        return Ok(None);
    };

    let MessengerEvent::GroupChatEvent(group_chat_event) = entry.event.content else {
        return Err(wasm_error!(
            "Given group_hash is not for a GroupChatEvent entry"
        ));
    };
    Ok(Some((entry.author, group_chat_event)))
}

pub fn query_group_chat_at_events(
    group_chat_hash: &EntryHash,
    at_group_chat_events: &BTreeSet<EntryHash>,
) -> ExternResult<Option<GroupChat>> {
    if at_group_chat_events.is_empty() {
        let Some(group_chat) = query_original_group_chat(group_chat_hash)? else {
            return Ok(None);
        };
        return Ok(Some(group_chat));
    }

    let mut group_chats_at_events: BTreeMap<EntryHash, GroupChat> = BTreeMap::new();

    fn group_chat_at_event(
        event_hash: &EntryHash,
        group_chats_at_events: &mut BTreeMap<HoloHash<hash_type::Entry>, GroupChat>,
    ) -> ExternResult<GroupChat> {
        if let Some(group_chat) = group_chats_at_events.get(&event_hash) {
            return Ok(group_chat.clone());
        }

        let Some((author, group_chat_event)) = query_group_chat_event(&event_hash)? else {
            return Err(wasm_error!("Failed to find GroupChatEvent {}", event_hash));
        };

        let previous_chat = if group_chat_event
            .previous_group_chat_events_hashes
            .is_empty()
        {
            let Some(group_chat) = query_original_group_chat(&group_chat_event.group_chat_hash)?
            else {
                return Err(wasm_error!("Could not find GroupChat for GroupChatEvent"));
            };
            group_chat
        } else {
            let previous_chats = group_chat_event
                .previous_group_chat_events_hashes
                .into_iter()
                .map(|event_hash| group_chat_at_event(&event_hash, group_chats_at_events))
                .collect::<ExternResult<Vec<GroupChat>>>()?;

            let mut chat = previous_chats[0].clone();
            for previous_chat in &previous_chats[1..] {
                chat = GroupChat::merge(chat, previous_chat.clone());
            }
            chat
        };

        let current_chat = previous_chat.apply(&author, &group_chat_event.event)?;

        group_chats_at_events.insert(event_hash.clone(), current_chat.clone());

        Ok(current_chat)
    }

    let previous_chats = at_group_chat_events
        .into_iter()
        .map(|event_hash| group_chat_at_event(event_hash, &mut group_chats_at_events))
        .collect::<ExternResult<Vec<GroupChat>>>()?;

    let mut group_chat = previous_chats[0].clone();
    for previous_chat in &previous_chats[1..] {
        group_chat = GroupChat::merge(group_chat, previous_chat.clone());
    }

    Ok(Some(group_chat))
}

pub fn validate_group_chat_event(
    author: &AgentPubKey,
    group_chat_event: &GroupChatEvent,
) -> ExternResult<ValidateCallbackResult> {
    let Some(current_group) = query_group_chat_at_events(
        &group_chat_event.group_chat_hash,
        &group_chat_event.previous_group_chat_events_hashes,
    )?
    else {
        return Ok(ValidateCallbackResult::UnresolvedDependencies(
            UnresolvedDependencies::Hashes(vec![group_chat_event.group_chat_hash.clone().into()]),
        ));
    };

    match current_group.apply(author, &group_chat_event.event) {
        Ok(_) => Ok(ValidateCallbackResult::Valid),
        Err(err) => Ok(ValidateCallbackResult::Invalid(format!(
            "Invalid GroupEvent: {err:?}"
        ))),
    }
}

#[hdk_extern]
pub fn send_group_message(group_message: GroupMessage) -> ExternResult<EntryHash> {
    let content = MessengerEvent::GroupMessage(group_message.clone());
    create_private_event(content)
}

pub fn validate_group_message(
    author: &AgentPubKey,
    group_message: &GroupMessage,
) -> ExternResult<ValidateCallbackResult> {
    let Some(current_group) = query_group_chat_at_events(
        &group_message.group_chat_hash,
        &group_message.current_group_chat_events_hashes,
    )?
    else {
        return Ok(ValidateCallbackResult::UnresolvedDependencies(
            UnresolvedDependencies::Hashes(vec![group_message.group_chat_hash.clone().into()]),
        ));
    };
    if current_group
        .members
        .iter()
        .find(|m| m.agents.contains(author) && !m.removed)
        .is_none()
    {
        return Ok(ValidateCallbackResult::Invalid(format!(
            "Only members or admins for a group can send messages"
        )));
    }
    return Ok(ValidateCallbackResult::Valid);
}

#[hdk_extern]
pub fn mark_group_messages_as_read(read_group_messages: ReadGroupMessages) -> ExternResult<()> {
    let content = MessengerEvent::ReadGroupMessages(read_group_messages);
    create_private_event(content)?;

    Ok(())
}

pub fn validate_read_group_messages(
    author: &AgentPubKey,
    read_group_messages: &ReadGroupMessages,
) -> ExternResult<ValidateCallbackResult> {
    let Some(current_group) = query_group_chat_at_events(
        &read_group_messages.group_chat_hash,
        &read_group_messages.current_group_chat_events_hashes,
    )?
    else {
        return Ok(ValidateCallbackResult::UnresolvedDependencies(
            UnresolvedDependencies::Hashes(vec![read_group_messages
                .group_chat_hash
                .clone()
                .into()]),
        ));
    };
    if current_group
        .members
        .iter()
        .find(|m| m.agents.contains(author) && !m.removed)
        .is_none()
    {
        return Ok(ValidateCallbackResult::Invalid(format!(
            "Only members or admins for a group can mark messages as read"
        )));
    }
    return Ok(ValidateCallbackResult::Valid);
}

pub fn query_entries_for_group(
    group_hash: &EntryHash,
    include_messages: bool,
) -> ExternResult<Option<BTreeMap<EntryHashB64, SignedEvent<MessengerEvent>>>> {
    let private_messenger_entries = query_messenger_events()?;

    let Some(group_entry) = private_messenger_entries.get(&EntryHashB64::from(group_hash.clone()))
    else {
        return Ok(None);
    };
    let MessengerEvent::CreateGroupChat(_) = group_entry.event.content else {
        return Err(wasm_error!(
            "Given hash does not correspond to a CreateGroupChat entry"
        ));
    };

    let mut entries_for_group: BTreeMap<EntryHashB64, SignedEvent<MessengerEvent>> =
        BTreeMap::new();

    entries_for_group.insert(group_hash.clone().into(), group_entry.clone());

    for (entry_hash, entry) in private_messenger_entries {
        match &entry.event.content {
            MessengerEvent::GroupChatEvent(group_chat_event) => {
                if group_chat_event.group_chat_hash.eq(group_hash) {
                    entries_for_group.insert(entry_hash, entry);
                }
            }
            MessengerEvent::GroupMessage(group_message) => {
                if include_messages && group_message.group_chat_hash.eq(group_hash) {
                    entries_for_group.insert(entry_hash, entry);
                }
            }
            MessengerEvent::ReadGroupMessages(read_group_messages) => {
                if include_messages && read_group_messages.group_chat_hash.eq(group_hash) {
                    entries_for_group.insert(entry_hash, entry);
                }
            }
            _ => {}
        }
    }

    Ok(Some(entries_for_group))
}

// pub fn post_receive_group_chat_entry(
//     private_event_entry: PrivateEventEntry,
//     group_chat_hash: &EntryHash,
//     current_group_chat_events_hashes: &Vec<EntryHash>,
// ) -> ExternResult<()> {
//     // If we have linked a device at the same time that a peer sent us a message
//     // we need to re-propagate this message to our newly linked device
//     let missed_events =
//         query_missed_group_chat_events(&group_chat_hash, &current_group_chat_events_hashes)?;

//     for (event_hash, group_chat_event) in missed_events {
//         let new_agents = match group_chat_event.event {
//             GroupEvent::AddMember { member_agents, .. } => member_agents,
//             GroupEvent::NewAgentForMember { new_agent, .. } => {
//                 vec![new_agent].into_iter().collect()
//             }
//             _ => {
//                 continue;
//             }
//         };

//         send_remote_signal(
//             PrivateEventSourcingRemoteSignal::NewPrivateEvent(private_event_entry.clone()),
//             new_agents.clone().into_iter().collect(),
//         )?;

//         for agent in new_agents {
//             create_encrypted_message(
//                 agent.clone(),
//                 event_hash.clone(),
//                 private_event_entry.clone(),
//             )?;
//         }
//     }
//     Ok(())
// }

// pub fn query_missed_group_chat_events(
//     group_chat_hash: &EntryHash,
//     current_group_chat_events_hashes: &Vec<EntryHash>,
// ) -> ExternResult<BTreeMap<EntryHash, GroupChatEvent>> {
//     let group_chat_events = query_group_chat_events(group_chat_hash)?;

//     // Get all ascendents for current events hashes
//     let mut all_ascendents: BTreeSet<EntryHash> = current_group_chat_events_hashes
//         .clone()
//         .into_iter()
//         .collect();
//     let mut current_event_hashes: Vec<EntryHash> = current_group_chat_events_hashes.clone();

//     while let Some(current_event_hash) = current_event_hashes.pop() {
//         let Some(current_event) = group_chat_events.get(&current_event_hash) else {
//             return Err(wasm_error!(
//                 "Previous group event was not found: {:?}",
//                 current_event_hash
//             ));
//         };

//         for previous_event_hash in &current_event.previous_group_chat_events_hashes {
//             if !all_ascendents.contains(previous_event_hash) {
//                 all_ascendents.insert(previous_event_hash.clone());
//                 current_event_hashes.push(previous_event_hash.clone());
//             }
//         }
//     }

//     // Filter all existing with ascendents
//     let missing_group_events: BTreeMap<EntryHash, GroupChatEvent> = group_chat_events
//         .into_iter()
//         .filter(|(hash, _event)| !all_ascendents.contains(hash))
//         .collect();
//     Ok(missing_group_events)
// }

pub fn group_chat_recipients(group_chat: &GroupChat) -> ExternResult<BTreeSet<AgentPubKey>> {
    let my_pub_key = agent_info()?.agent_latest_pubkey;
    let members: BTreeSet<AgentPubKey> = group_chat
        .members
        .iter()
        .filter(|m| !m.removed && !m.agents.contains(&my_pub_key))
        .map(|m| m.agents.clone())
        .flatten()
        .collect();
    Ok(members)
}

pub fn group_chat_recipients_at_events(
    group_chat_hash: &EntryHash,
    at_group_events_hashes: &BTreeSet<EntryHash>,
) -> ExternResult<BTreeSet<AgentPubKey>> {
    let Some(group_chat) = query_group_chat_at_events(&group_chat_hash, at_group_events_hashes)?
    else {
        return Err(wasm_error!("GroupChat not found"));
    };

    group_chat_recipients(&group_chat)
}

pub fn query_group_chat_events(
    group_chat_hash: &EntryHash,
) -> ExternResult<BTreeMap<EntryHash, GroupChatEvent>> {
    let existing_entries = query_messenger_events()?;
    // Filter events for this group_chat_hash
    let mut group_chat_events: BTreeMap<EntryHash, GroupChatEvent> = BTreeMap::new();

    for (entry_hash, entry) in existing_entries {
        let MessengerEvent::GroupChatEvent(event) = &entry.event.content else {
            continue;
        };

        if event.group_chat_hash.ne(&group_chat_hash) {
            continue;
        }
        group_chat_events.insert(entry_hash.clone().into(), event.clone());
    }
    Ok(group_chat_events)
}

pub fn query_current_group_chat(group_chat_hash: &EntryHash) -> ExternResult<Option<GroupChat>> {
    let group_chat_events = query_group_chat_events(group_chat_hash)?;

    let mut events_without_descendants: BTreeSet<EntryHash> =
        group_chat_events.keys().cloned().collect();

    for group_chat_event in group_chat_events.into_values() {
        for previous_chat_event in group_chat_event.previous_group_chat_events_hashes {
            events_without_descendants.remove(&previous_chat_event);
        }
    }

    query_group_chat_at_events(
        group_chat_hash,
        &events_without_descendants.into_iter().collect(),
    )
}

pub fn group_chat_current_recipients(
    group_chat_hash: &EntryHash,
) -> ExternResult<BTreeSet<AgentPubKey>> {
    let Some(group_chat) = query_current_group_chat(&group_chat_hash)? else {
        return Err(wasm_error!("GroupChat not found"));
    };

    group_chat_recipients(&group_chat)
}
