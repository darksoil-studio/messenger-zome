use std::collections::BTreeMap;

use hdk::prelude::*;
use linked_devices_types::{are_agents_linked, LinkedDevicesProof};
use messenger_integrity::*;

use crate::{
    agent_encrypted_message::{create_encrypted_message, MessengerEncryptedMessage},
    create_peer::{build_create_peer_for_agent, build_my_create_peer},
    private_messenger_entries::{
        create_private_messenger_entry, create_relaxed_private_messenger_entry,
        query_private_messenger_entries, query_private_messenger_entry,
    },
    MessengerRemoteSignal,
};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct CreateGroupChatInput {
    pub others: Vec<AgentPubKey>,
    pub info: GroupInfo,
    pub settings: GroupSettings,
}

#[hdk_extern]
pub fn create_group_chat(input: CreateGroupChatInput) -> ExternResult<EntryHash> {
    let me = build_my_create_peer()?;
    let others = input
        .others
        .into_iter()
        .map(|other| build_create_peer_for_agent(other))
        .collect::<ExternResult<Vec<CreatePeer>>>()?;

    let group = CreateGroupChat {
        me,
        others,
        info: input.info,
        settings: input.settings,
    };

    let content = PrivateMessengerEntryContent::CreateGroupChat(group.clone());
    create_private_messenger_entry(content)
}

pub fn are_all_agents_linked(agents: &Vec<AgentPubKey>, proofs: &Vec<LinkedDevicesProof>) -> bool {
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
    provenance: &AgentPubKey,
    create_group_chat: &CreateGroupChat,
) -> ExternResult<ValidateCallbackResult> {
    if !create_group_chat.me.agents.contains(&provenance) {
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
    let content = PrivateMessengerEntryContent::GroupChatEvent(group_chat_event);
    create_private_messenger_entry(content)
}

pub fn query_create_group_chat(
    group_chat_hash: &EntryHash,
) -> ExternResult<Option<CreateGroupChat>> {
    let Some(entry) = query_private_messenger_entry(group_chat_hash)? else {
        return Ok(None);
    };

    let PrivateMessengerEntryContent::CreateGroupChat(group_chat) = entry.0.signed_content.content
    else {
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
    let Some(entry) = query_private_messenger_entry(group_chat_hash)? else {
        return Ok(None);
    };

    let PrivateMessengerEntryContent::GroupChatEvent(group_chat_event) =
        entry.0.signed_content.content
    else {
        return Err(wasm_error!(
            "Given group_hash is not for a GroupChatEvent entry"
        ));
    };
    Ok(Some((entry.0.provenance, group_chat_event)))
}

pub fn query_current_group_chat(
    group_chat_hash: &EntryHash,
    current_group_chat_events: &Vec<EntryHash>,
) -> ExternResult<Option<GroupChat>> {
    if current_group_chat_events.is_empty() {
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

        let Some((provenance, group_chat_event)) = query_group_chat_event(&event_hash)? else {
            return Err(wasm_error!("Failed to find GroupChatEvent {}", event_hash,));
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

        let current_chat = previous_chat.apply(&provenance, &group_chat_event.event)?;

        group_chats_at_events.insert(event_hash.clone(), current_chat.clone());

        Ok(current_chat)
    }

    let previous_chats = current_group_chat_events
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
    provenance: &AgentPubKey,
    group_chat_event: &GroupChatEvent,
) -> ExternResult<ValidateCallbackResult> {
    let Some(current_group) = query_current_group_chat(
        &group_chat_event.group_chat_hash,
        &group_chat_event.previous_group_chat_events_hashes,
    )?
    else {
        return Ok(ValidateCallbackResult::UnresolvedDependencies(
            UnresolvedDependencies::Hashes(vec![group_chat_event.group_chat_hash.clone().into()]),
        ));
    };

    match current_group.apply(provenance, &group_chat_event.event) {
        Ok(_) => Ok(ValidateCallbackResult::Valid),
        Err(err) => Ok(ValidateCallbackResult::Invalid(format!(
            "Invalid GroupEvent: {err:?}"
        ))),
    }
}

#[hdk_extern]
pub fn send_group_message(group_message: GroupMessage) -> ExternResult<EntryHash> {
    let content = PrivateMessengerEntryContent::GroupMessage(group_message.clone());
    create_relaxed_private_messenger_entry(content)
}

pub fn validate_group_message(
    provenance: &AgentPubKey,
    group_message: &GroupMessage,
) -> ExternResult<ValidateCallbackResult> {
    let Some(current_group) = query_current_group_chat(
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
        .find(|m| m.agents.contains(provenance) && !m.removed)
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
    let content = PrivateMessengerEntryContent::ReadGroupMessages(read_group_messages);
    create_relaxed_private_messenger_entry(content)?;

    Ok(())
}

pub fn validate_read_group_messages(
    provenance: &AgentPubKey,
    read_group_messages: &ReadGroupMessages,
) -> ExternResult<ValidateCallbackResult> {
    let Some(current_group) = query_current_group_chat(
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
        .find(|m| m.agents.contains(provenance) && !m.removed)
        .is_none()
    {
        return Ok(ValidateCallbackResult::Invalid(format!(
            "Only members or admins for a group can send messages"
        )));
    }
    return Ok(ValidateCallbackResult::Valid);
}

// pub fn query_current_group(
//     original_group_hash: &EntryHash,
//     current_group_hash: &EntryHash,
// ) -> ExternResult<Option<Group>> {
//     let Some(group_crud) = query_crud_entries_for_group(&original_group_hash)? else {
//         return Ok(None);
//     };

//     let original_and_current_hashes_are_for_the_same_group =
//         if original_group_hash.eq(&current_group_hash) {
//             true
//         } else {
//             group_crud.updates.contains_key(&current_group_hash.clone())
//         };

//     if !original_and_current_hashes_are_for_the_same_group {
//         return Err(wasm_error!(
//             "Original and current group hash are not for the same group"
//         ));
//     }

//     let current_group = if original_group_hash.eq(&current_group_hash) {
//         group_crud.create_group
//     } else {
//         let Some(update) = group_crud.updates.get(&current_group_hash.clone()) else {
//             return Err(wasm_error!(
//                 "current_group_hash does not correspond to an update or create for this group"
//             ));
//         };
//         update.group.clone()
//     };
//     Ok(Some(current_group))
// }

// pub struct CrudEntriesForGroup {
//     pub group_hash: EntryHash,
//     pub create_group: Group,
//     pub updates: BTreeMap<EntryHash, UpdateGroupChat>,
//     pub update_chain: Vec<Vec<EntryHash>>,
//     pub deletes: BTreeMap<EntryHash, DeleteGroupChat>,
// }

// pub fn query_crud_entries_for_group(
//     group_hash: &EntryHash,
// ) -> ExternResult<Option<CrudEntriesForGroup>> {
//     let private_messenger_entries = query_private_messenger_entries(())?.entries;

//     let Some(group_entry) = private_messenger_entries.get(&EntryHashB64::from(group_hash.clone()))
//     else {
//         return Ok(None);
//     };
//     let PrivateMessengerEntryContent::CreateGroupChat(group) =
//         &group_entry.0.signed_content.content
//     else {
//         return Err(wasm_error!(
//             "Given group_hash does not correspond to a group"
//         ));
//     };

//     let mut crud = CrudEntriesForGroup {
//         group_hash: group_hash.clone(),
//         create_group: group.clone(),
//         update_chain: vec![vec![group_hash.clone()]],
//         updates: BTreeMap::new(),
//         deletes: BTreeMap::new(),
//     };

//     for (entry_hash, entry) in private_messenger_entries {
//         match entry.0.signed_content.content {
//             PrivateMessengerEntryContent::UpdateGroupChat(update_group_chat) => {
//                 if update_group_chat.original_group_hash.eq(group_hash) {
//                     crud.updates
//                         .insert(entry_hash.into(), update_group_chat.clone());
//                 }
//             }
//             PrivateMessengerEntryContent::DeleteGroupChat(delete_group_chat) => {
//                 if delete_group_chat.original_group_hash.eq(group_hash) {
//                     crud.deletes
//                         .insert(entry_hash.into(), delete_group_chat.clone());
//                 }
//             }
//             _ => {}
//         }
//     }

//     Ok(Some(crud))
// }

pub fn query_entries_for_group(
    group_hash: &EntryHash,
    include_messages: bool,
) -> ExternResult<Option<BTreeMap<EntryHashB64, PrivateMessengerEntry>>> {
    let private_messenger_entries = query_private_messenger_entries(())?;

    let Some(group_entry) = private_messenger_entries.get(&EntryHashB64::from(group_hash.clone()))
    else {
        return Ok(None);
    };
    let PrivateMessengerEntryContent::CreateGroupChat(_) = group_entry.0.signed_content.content
    else {
        return Err(wasm_error!(
            "Given hash does not correspond to a CreateGroupChat entry"
        ));
    };

    let mut entries_for_group: BTreeMap<EntryHashB64, PrivateMessengerEntry> = BTreeMap::new();

    entries_for_group.insert(group_hash.clone().into(), group_entry.clone());

    for (entry_hash, entry) in private_messenger_entries {
        match &entry.0.signed_content.content {
            PrivateMessengerEntryContent::GroupChatEvent(group_chat_event) => {
                if group_chat_event.group_chat_hash.eq(group_hash) {
                    entries_for_group.insert(entry_hash, entry);
                }
            }
            PrivateMessengerEntryContent::GroupMessage(group_message) => {
                if include_messages && group_message.group_chat_hash.eq(group_hash) {
                    entries_for_group.insert(entry_hash, entry);
                }
            }
            PrivateMessengerEntryContent::ReadGroupMessages(read_group_messages) => {
                if include_messages && read_group_messages.group_chat_hash.eq(group_hash) {
                    entries_for_group.insert(entry_hash, entry);
                }
            }
            _ => {}
        }
    }

    Ok(Some(entries_for_group))
}

// pub fn query_latest_version_for_group(group_hash: &EntryHash) -> ExternResult<Option<Group>> {
//     let private_messenger_entries = query_private_messenger_entries(())?;

//     let mut latest_version_of_group: Option<(Timestamp, Group)> = None;

//     for (entry_hash, entry) in private_messenger_entries {
//         match entry.0.signed_content.content {
//             PrivateMessengerEntryContent::CreateGroupChat(group) => {
//                 if entry_hash.eq(&EntryHashB64::from(group_hash.clone()))
//                     && latest_version_of_group.is_none()
//                 {
//                     latest_version_of_group = Some((entry.0.signed_content.timestamp, group));
//                 }
//             }
//             PrivateMessengerEntryContent::UpdateGroupChat(update) => {
//                 if update.original_group_hash.eq(&group_hash) {
//                     if let Some((latest_timestamp, _)) = latest_version_of_group {
//                         if entry.0.signed_content.timestamp.gt(&latest_timestamp) {
//                             latest_version_of_group =
//                                 Some((entry.0.signed_content.timestamp, update.group));
//                         }
//                     } else {
//                         latest_version_of_group =
//                             Some((entry.0.signed_content.timestamp, update.group));
//                     }
//                 }
//             }
//             _ => {}
//         }
//     }

//     Ok(latest_version_of_group.map(|(_, group)| group))
// }

pub fn post_receive_group_chat_entry(
    private_messenger_entry: PrivateMessengerEntry,
    group_chat_hash: &EntryHash,
    current_group_chat_events_hashes: &Vec<EntryHash>,
) -> ExternResult<()> {
    // If we have linked a device at the same time that a peer sent us a message
    // we need to re-propagate this message to our newly linked device
    let missed_events =
        query_missed_group_chat_events(&group_chat_hash, &current_group_chat_events_hashes)?;

    for (_event_hash, group_chat_event) in missed_events {
        let new_agents = match group_chat_event.event {
            GroupEvent::AddMember { member_agents } => member_agents,
            GroupEvent::NewAgentForMember { new_agent, .. } => vec![new_agent],
            _ => {
                continue;
            }
        };

        send_remote_signal(
            MessengerRemoteSignal::NewPrivateMessengerEntry(private_messenger_entry.clone()),
            new_agents.clone(),
        )?;

        for agent in new_agents {
            create_encrypted_message(
                agent.clone(),
                MessengerEncryptedMessage(private_messenger_entry.clone()),
            )?;
        }
    }
    Ok(())
}

pub fn query_missed_group_chat_events(
    group_chat_hash: &EntryHash,
    current_group_chat_events_hashes: &Vec<EntryHash>,
) -> ExternResult<BTreeMap<EntryHash, GroupChatEvent>> {
    let existing_entries = query_private_messenger_entries(())?;
    // Filter events for this group_chat_hash
    let mut group_chat_events: BTreeMap<EntryHash, GroupChatEvent> = BTreeMap::new();

    for (entry_hash, entry) in existing_entries {
        let PrivateMessengerEntryContent::GroupChatEvent(event) = &entry.0.signed_content.content
        else {
            continue;
        };

        if event.group_chat_hash.ne(&group_chat_hash) {
            continue;
        }
        group_chat_events.insert(entry_hash.clone().into(), event.clone());
    }

    // Get all ascendents for current events hashes
    let mut all_ascendents: BTreeSet<EntryHash> = current_group_chat_events_hashes
        .clone()
        .into_iter()
        .collect();
    let mut current_event_hashes: Vec<EntryHash> = current_group_chat_events_hashes.clone();

    while let Some(current_event_hash) = current_event_hashes.pop() {
        let Some(current_event) = group_chat_events.get(&current_event_hash) else {
            return Err(wasm_error!(
                "Previous group event was not found: {:?}",
                current_event_hash
            ));
        };

        for previous_event_hash in &current_event.previous_group_chat_events_hashes {
            if !all_ascendents.contains(previous_event_hash) {
                all_ascendents.insert(previous_event_hash.clone());
                current_event_hashes.push(previous_event_hash.clone());
            }
        }
    }

    // Filter all existing with ascendents
    let missing_group_events: BTreeMap<EntryHash, GroupChatEvent> = group_chat_events
        .into_iter()
        .filter(|(hash, _event)| !all_ascendents.contains(hash))
        .collect();
    Ok(missing_group_events)
}
