use hdi::prelude::*;
use linked_devices_types::{are_agents_linked, LinkedDevicesProof};

use crate::{merge_profiles, CreatePeer, Message, MessengerProfile};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct CreateGroupChat {
    pub me: CreatePeer,
    pub others: Vec<CreatePeer>,
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

    pub fn apply(mut self, provenance: &AgentPubKey, event: &GroupEvent) -> ExternResult<Self> {
        let author_member = self.members.iter().find(|m| m.agents.contains(&provenance));
        let Some(author_member) = author_member else {
            return Err(wasm_error!(
                "Author of the GroupEvent is not a member of the group"
            ));
        };
        let author_is_admin = author_member.admin;
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
            GroupEvent::AddMember { member_agents } => {
                if self.settings.only_admins_can_add_members && !author_is_admin {
                    return Err(wasm_error!("Only admins can add members"));
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
                        profile: None,
                    });
                }
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
                self.members[p].removed = true;
                self.members[p].admin = false;
            }
            GroupEvent::NewAgentForMember {
                new_agent,
                linked_devices_proofs,
            } => {
                let pos = self
                    .members
                    .iter()
                    .position(|m| m.agents.contains(&provenance));
                let Some(p) = pos else {
                    return Err(wasm_error!("Member for the given provenance not found"));
                };
                let linked = are_agents_linked(&provenance, &new_agent, &linked_devices_proofs);
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
                let author_member_index = self
                    .members
                    .iter()
                    .position(|m| m.agents.contains(&provenance));
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
        let avatar_hash = match (group_1.info.avatar_hash, group_2.info.avatar_hash) {
            (Some(hash_1), Some(hash_2)) => Some(if hash_1 < hash_2 { hash_2 } else { hash_1 }),
            (Some(hash_1), None) => Some(hash_1),
            (None, Some(hash_2)) => Some(hash_2),
            (None, None) => None,
        };
        let info = GroupInfo {
            name,
            description,
            avatar_hash,
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
    pub avatar_hash: Option<EntryHash>,
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
        member_agents: Vec<AgentPubKey>,
    },
    RemoveMember {
        member_agents: Vec<AgentPubKey>,
    },
    NewAgentForMember {
        new_agent: AgentPubKey,
        linked_devices_proofs: Vec<LinkedDevicesProof>,
    },
    PromoteMemberToAdmin {
        member_agents: Vec<AgentPubKey>,
    },
    DemoteMemberFromAdmin {
        member_agents: Vec<AgentPubKey>,
    },
    LeaveGroup,
    DeleteGroup,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct GroupChatEvent {
    pub group_chat_hash: EntryHash,
    pub previous_group_chat_events_hashes: Vec<EntryHash>,

    pub event: GroupEvent,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct GroupMessage {
    pub group_chat_hash: EntryHash,
    pub current_group_chat_events_hashes: Vec<EntryHash>,

    pub message: Message,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct ReadGroupMessages {
    pub group_chat_hash: EntryHash,
    pub current_group_chat_events_hashes: Vec<EntryHash>,
    pub read_messages_hashes: Vec<EntryHash>,
}
