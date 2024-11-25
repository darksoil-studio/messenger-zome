use std::collections::BTreeMap;

use hdk::prelude::*;
use messenger_integrity::*;

use crate::private_messenger_entries::{
    create_private_messenger_entry, create_relaxed_private_messenger_entry,
    query_private_messanger_entry, query_private_messenger_entries,
};

#[hdk_extern]
pub fn create_group_chat(group: GroupChat) -> ExternResult<EntryHash> {
    let content = PrivateMessengerEntryContent::CreateGroupChat(group.clone());
    create_private_messenger_entry(content)
}

pub fn validate_create_group_chat(
    provenance: &AgentPubKey,
    create_group_chat: &GroupChat,
) -> ExternResult<ValidateCallbackResult> {
    let creator_admin_member = create_group_chat
        .members
        .iter()
        .find(|m| m.admin && m.agents.contains(provenance));
    if creator_admin_member.is_none() {
        return Ok(ValidateCallbackResult::Invalid(format!(
            "The creator of a group must be an admin for it as well"
        )));
    }
    return Ok(ValidateCallbackResult::Valid);
}

#[hdk_extern]
pub fn create_group_event(group_event: GroupChatEvent) -> ExternResult<EntryHash> {
    let content = PrivateMessengerEntryContent::GroupChatEvent(group_event);
    create_private_messenger_entry(content)
}

pub fn query_group_chat(group_chat_hash: &EntryHash) -> ExternResult<Option<GroupChat>> {
    let Some(entry) = query_private_messanger_entry(group_chat_hash)? else {
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

pub fn query_group_chat_event(group_chat_hash: &EntryHash) -> ExternResult<Option<GroupChatEvent>> {
    let Some(entry) = query_private_messanger_entry(group_chat_hash)? else {
        return Ok(None);
    };

    let PrivateMessengerEntryContent::GroupChatEvent(group_chat_event) =
        entry.0.signed_content.content
    else {
        return Err(wasm_error!(
            "Given group_hash is not for a GroupChatEvent entry"
        ));
    };
    Ok(Some(group_chat_event))
}

pub fn query_all_valid_group_events(
    group_chat_hash: &EntryHash,
    current_event_hash: &EntryHash,
) -> ExternResult<BTreeMap<EntryHash, (Timestamp, AgentPubKey, GroupEvent)>> {
    let mut event_hash = current_event_hash.clone();
    let mut group_events: BTreeMap<EntryHash, (Timestamp, AgentPubKey, GroupEvent)> =
        BTreeMap::new();

    while event_hash.ne(group_chat_hash) && !group_events.contains_key(&event_hash) {
        let Some(entry) = query_private_messanger_entry(&event_hash)? else {
            return Err(wasm_error!("GroupEvent not found"));
        };

        let PrivateMessengerEntryContent::GroupChatEvent(group_chat_event) =
            entry.0.signed_content.content
        else {
            return Err(wasm_error!(
                "Given group_hash is not for a GroupChatEvent entry"
            ));
        };

        group_events.insert(
            event_hash.clone(),
            (
                entry.0.signed_content.timestamp,
                entry.0.provenance,
                group_chat_event.event.clone(),
            ),
        );
        event_hash = group_chat_event.previous_event_hash;

        if let GroupEvent::ReconcileHistories {
            accepted_previous_event,
        } = group_chat_event.event
        {
            if !group_events.contains_key(&accepted_previous_event) {
                let history_events =
                    query_all_valid_group_events(group_chat_hash, &accepted_previous_event)?;

                for (entry_hash, event) in history_events {
                    group_events.insert(entry_hash, event);
                }
            }
        }
    }

    Ok(group_events)
}

pub fn query_current_group_chat(
    group_chat_hash: &EntryHash,
    current_event_hash: &EntryHash,
) -> ExternResult<Option<GroupChat>> {
    let Some(mut group_chat) = query_group_chat(group_chat_hash)? else {
        return Ok(None);
    };

    let mut events: Vec<(Timestamp, AgentPubKey, GroupEvent)> =
        query_all_valid_group_events(group_chat_hash, current_event_hash)?
            .into_values()
            .collect();

    events.sort_by(|e1, e2| e1.0.cmp(&e2.0));

    for (_, provenance, event) in events {
        if let Ok(next_group_chat) = group_chat.clone().apply(&provenance, &event) {
            group_chat = next_group_chat;
        } // TODO: What to do here if there is an error?
    }

    Ok(Some(group_chat))
}

pub fn validate_group_chat_event(
    provenance: &AgentPubKey,
    group_event: &GroupChatEvent,
) -> ExternResult<ValidateCallbackResult> {
    let Some(current_group) =
        query_current_group_chat(&group_event.group_hash, &group_event.previous_event_hash)?
    else {
        return Ok(ValidateCallbackResult::UnresolvedDependencies(
            UnresolvedDependencies::Hashes(vec![group_event.group_hash.clone().into()]),
        ));
    };

    match current_group.apply(provenance, &group_event.event) {
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
    let Some(current_group) =
        query_current_group_chat(&group_message.group_hash, &group_message.current_event_hash)?
    else {
        return Ok(ValidateCallbackResult::UnresolvedDependencies(
            UnresolvedDependencies::Hashes(vec![group_message.group_hash.clone().into()]),
        ));
    };
    if !current_group
        .members
        .iter()
        .find(|m| m.agents.contains(provenance))
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
    let read_messages_hashes_chunks: Vec<Vec<EntryHash>> = read_group_messages
        .read_messages_hashes
        .chunks(16)
        .into_iter()
        .map(|chunk| chunk.iter().cloned().collect())
        .collect();

    for chunk in read_messages_hashes_chunks {
        let content = PrivateMessengerEntryContent::ReadGroupMessages(ReadGroupMessages {
            group_hash: read_group_messages.group_hash.clone(),
            current_event_hash: read_group_messages.current_event_hash.clone(),
            read_messages_hashes: chunk,
        });
        create_relaxed_private_messenger_entry(content)?;
    }

    Ok(())
}

pub fn validate_read_group_messages(
    provenance: &AgentPubKey,
    read_group_messages: &ReadGroupMessages,
) -> ExternResult<ValidateCallbackResult> {
    let Some(current_group) = query_current_group_chat(
        &read_group_messages.group_hash,
        &read_group_messages.current_event_hash,
    )?
    else {
        return Ok(ValidateCallbackResult::UnresolvedDependencies(
            UnresolvedDependencies::Hashes(vec![read_group_messages.group_hash.clone().into()]),
        ));
    };
    if !current_group
        .members
        .iter()
        .find(|m| m.agents.contains(provenance))
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
) -> ExternResult<Option<Vec<(EntryHashB64, PrivateMessengerEntry)>>> {
    let private_messenger_entries = query_private_messenger_entries(())?;

    let Some(group_entry) = private_messenger_entries
        .entries
        .get(&EntryHashB64::from(group_hash.clone()))
    else {
        return Ok(None);
    };
    let PrivateMessengerEntryContent::CreateGroupChat(_) = group_entry.0.signed_content.content
    else {
        return Err(wasm_error!(
            "Given hash does not correspond to a CreateGroupChat entry"
        ));
    };

    let mut entries_for_group: Vec<(EntryHashB64, PrivateMessengerEntry)> = Vec::new();

    entries_for_group.push((group_hash.clone().into(), group_entry.clone()));

    for entry_hash in private_messenger_entries.entry_hashes {
        let Some(entry) = private_messenger_entries.entries.get(&entry_hash).cloned() else {
            return Err(wasm_error!("Unreachable: QueriedPrivateMessengerEntries entries did not contain one of its entry hashes."));
        };
        match &entry.0.signed_content.content {
            PrivateMessengerEntryContent::GroupChatEvent(group_chat_event) => {
                if group_chat_event.group_hash.eq(group_hash) {
                    entries_for_group.push((entry_hash, entry));
                }
            }
            PrivateMessengerEntryContent::GroupMessage(group_message) => {
                if include_messages && group_message.group_hash.eq(group_hash) {
                    entries_for_group.push((entry_hash, entry));
                }
            }
            PrivateMessengerEntryContent::ReadGroupMessages(read_group_messages) => {
                if include_messages && read_group_messages.group_hash.eq(group_hash) {
                    entries_for_group.push((entry_hash, entry));
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
