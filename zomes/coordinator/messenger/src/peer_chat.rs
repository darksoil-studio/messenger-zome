use std::collections::BTreeMap;

use hdk::prelude::*;
use messenger_integrity::*;

use crate::{
    agent_encrypted_message::{create_encrypted_message, MessengerEncryptedMessage},
    private_messenger_entries::{
        create_private_messenger_entry, create_relaxed_private_messenger_entry,
        query_private_messanger_entry,
    },
    MessengerRemoteSignal,
};

#[hdk_extern]
pub fn create_peer_chat(peer_chat: PeerChat) -> ExternResult<EntryHash> {
    create_private_messenger_entry(PrivateMessengerEntryContent::CreatePeerChat(peer_chat))
}

pub fn validate_create_peer_chat(
    provenance: &AgentPubKey,
    peer_chat: &PeerChat,
) -> ExternResult<ValidateCallbackResult> {
    if !peer_chat.peer_1.agents.contains(&provenance) {
        return Ok(ValidateCallbackResult::Invalid(format!(
            "PeerChats must contain the author's public key in the peer_1 agent list"
        )));
    }
    Ok(ValidateCallbackResult::Valid)
}

#[hdk_extern]
pub fn create_peer_chat_event(peer_chat_event: PeerChatEvent) -> ExternResult<EntryHash> {
    create_relaxed_private_messenger_entry(PrivateMessengerEntryContent::PeerChatEvent(
        peer_chat_event,
    ))
}

pub fn validate_peer_chat_event(
    provenance: &AgentPubKey,
    peer_chat_event: &PeerChatEvent,
) -> ExternResult<ValidateCallbackResult> {
    let Some(peer_chat) = query_current_peer_chat(
        &peer_chat_event.peer_chat_hash,
        &peer_chat_event.previous_peer_chat_events_hashes,
    )?
    else {
        return Ok(ValidateCallbackResult::UnresolvedDependencies(
            UnresolvedDependencies::Hashes(vec![]),
        ));
    };

    let result = peer_chat.apply(provenance, &peer_chat_event.event);

    if let Err(err) = result {
        return Ok(ValidateCallbackResult::Invalid(format!(
            "Invalid PeerChatEvent {err:?}"
        )));
    }

    Ok(ValidateCallbackResult::Valid)
}

#[hdk_extern]
pub fn send_peer_message(message_content: PeerMessage) -> ExternResult<EntryHash> {
    create_relaxed_private_messenger_entry(PrivateMessengerEntryContent::PeerMessage(
        message_content,
    ))
}
pub fn validate_peer_message(
    provenance: &AgentPubKey,
    peer_message: &PeerMessage,
) -> ExternResult<ValidateCallbackResult> {
    let Some(peer_chat) = query_current_peer_chat(
        &peer_message.peer_chat_hash,
        &peer_message.current_peer_chat_events_hashes,
    )?
    else {
        return Ok(ValidateCallbackResult::UnresolvedDependencies(
            UnresolvedDependencies::Hashes(vec![peer_message.peer_chat_hash.clone().into()]),
        ));
    };

    if peer_chat.peer_1.agents.contains(&provenance)
        || peer_chat.peer_1.agents.contains(&provenance)
    {
        return Ok(ValidateCallbackResult::Invalid(format!(
            "Author of a PeerMessage must be listed in the devices of its PeerChat"
        )));
    }

    Ok(ValidateCallbackResult::Valid)
}

pub fn query_original_peer_chat(peer_chat_hash: &EntryHash) -> ExternResult<Option<PeerChat>> {
    let Some(entry) = query_private_messanger_entry(peer_chat_hash)? else {
        return Ok(None);
    };

    let PrivateMessengerEntryContent::CreatePeerChat(peer_chat) = entry.0.signed_content.content
    else {
        return Err(wasm_error!(
            "Given peer_chat_hash is not for a CreatePeerChat entry"
        ));
    };

    Ok(Some(peer_chat))
}

pub fn query_peer_chat_event(
    peer_chat_hash: &EntryHash,
) -> ExternResult<Option<(AgentPubKey, PeerChatEvent)>> {
    let Some(entry) = query_private_messanger_entry(peer_chat_hash)? else {
        return Ok(None);
    };

    let PrivateMessengerEntryContent::PeerChatEvent(peer_chat_event) =
        entry.0.signed_content.content
    else {
        return Err(wasm_error!(
            "Given peer_chat_hash is not for a PeerChatEvent entry"
        ));
    };

    Ok(Some((entry.0.provenance, peer_chat_event)))
}

pub fn query_current_peer_chat(
    peer_chat_hash: &EntryHash,
    current_peer_chat_events: &Vec<EntryHash>,
) -> ExternResult<Option<PeerChat>> {
    if current_peer_chat_events.is_empty() {
        let Some(peer_chat) = query_original_peer_chat(peer_chat_hash)? else {
            return Ok(None);
        };
        return Ok(Some(peer_chat));
    }

    let mut peer_chats_at_events: BTreeMap<EntryHash, PeerChat> = BTreeMap::new();

    fn peer_chat_at_event(
        event_hash: &EntryHash,
        peer_chats_at_events: &mut BTreeMap<HoloHash<hash_type::Entry>, PeerChat>,
    ) -> ExternResult<PeerChat> {
        if let Some(peer_chat) = peer_chats_at_events.get(&event_hash) {
            return Ok(peer_chat.clone());
        }

        let Some((provenance, peer_chat_event)) = query_peer_chat_event(&event_hash)? else {
            return Err(wasm_error!(
                "Failed to find PeerChatEvent {peer_chat_event:?}"
            ));
        };

        let previous_chat = if peer_chat_event.previous_peer_chat_events_hashes.is_empty() {
            let Some(peer_chat) = query_original_peer_chat(&peer_chat_event.peer_chat_hash)? else {
                return Err(wasm_error!("Could not find PeerChat for PeerChatEvent"));
            };
            peer_chat
        } else {
            let previous_chats = peer_chat_event
                .previous_peer_chat_events_hashes
                .into_iter()
                .map(|event_hash| peer_chat_at_event(&event_hash, peer_chats_at_events))
                .collect::<ExternResult<Vec<PeerChat>>>()?;

            let mut chat = previous_chats[0].clone();
            for previous_chat in &previous_chats[1..] {
                chat = PeerChat::merge(chat, previous_chat.clone());
            }
            chat
        };

        let current_chat = previous_chat.apply(&provenance, &peer_chat_event.event)?;

        peer_chats_at_events.insert(event_hash.clone(), current_chat.clone());

        Ok(current_chat)
    }

    let previous_chats = current_peer_chat_events
        .into_iter()
        .map(|event_hash| peer_chat_at_event(event_hash, &mut peer_chats_at_events))
        .collect::<ExternResult<Vec<PeerChat>>>()?;

    let mut peer_chat = previous_chats[0].clone();
    for previous_chat in &previous_chats[1..] {
        peer_chat = PeerChat::merge(peer_chat, previous_chat.clone());
    }

    Ok(Some(peer_chat))
}

// pub fn query_latest_peer_chat(peer_chat_hash: &EntryHash) -> ExternResult<Option<PeerChat>> {
//     let entries = query_private_messenger_entries(())?;

//     let Some(mut peer_chat) = query_original_peer_chat(peer_chat_hash)? else {
//         return Ok(None);
//     };

//     for entry_hash in entries.entry_hashes {
//         let Some(entry) = entries.entries.get(&entry_hash) else {
//             return Err(wasm_error!("Unreachable: QueriedPrivateMessengerEntries entries did not contain one of its entry hashes."));
//         };

//         let PrivateMessengerEntryContent::NewPeerAgent(new_peer_device) =
//             &entry.0.signed_content.content
//         else {
//             continue;
//         };

//         if new_peer_device.peer_chat_hash.ne(peer_chat_hash) {
//             continue;
//         }

//         if peer_chat.my_agents.contains(&entry.0.provenance) {
//             peer_chat.my_agents.push(new_peer_device.new_agent.clone());
//         } else if peer_chat.peer_agents.contains(&entry.0.provenance) {
//             peer_chat
//                 .peer_agents
//                 .push(new_peer_device.new_agent.clone());
//         }
//     }

//     Ok(Some(peer_chat))
// }

#[hdk_extern]
pub fn mark_peer_messages_as_read(read_peer_messages: ReadPeerMessages) -> ExternResult<()> {
    let content = PrivateMessengerEntryContent::ReadPeerMessages(read_peer_messages);
    create_relaxed_private_messenger_entry(content)?;
    Ok(())
}

pub fn validate_read_peer_messages(
    provenance: &AgentPubKey,
    read_peer_messages: &ReadPeerMessages,
) -> ExternResult<ValidateCallbackResult> {
    let Some(peer_chat) = query_current_peer_chat(
        &read_peer_messages.peer_chat_hash,
        &read_peer_messages.current_peer_chat_events_hashes,
    )?
    else {
        return Ok(ValidateCallbackResult::UnresolvedDependencies(
            UnresolvedDependencies::Hashes(vec![read_peer_messages.peer_chat_hash.clone().into()]),
        ));
    };

    if peer_chat.peer_1.agents.contains(&provenance)
        || peer_chat.peer_1.agents.contains(&provenance)
    {
        return Ok(ValidateCallbackResult::Invalid(format!(
            "Author of a ReadPeerMessages must be listed in the devices of its PeerChat"
        )));
    }

    Ok(ValidateCallbackResult::Valid)
}

pub fn post_receive_peer_chat_entry(
    existing_entries: &BTreeMap<EntryHashB64, PrivateMessengerEntry>,
    private_messenger_entry: PrivateMessengerEntry,
    peer_chat_hash: &EntryHash,
    current_peer_chat_events_hashes: &Vec<EntryHash>,
) -> ExternResult<()> {
    // If we have linked a device at the same time that a peer sent us a message
    // we need to re-propagate this message to our newly linked device
    let missed_events = query_missed_peer_chat_events(
        &existing_entries,
        &peer_chat_hash,
        &current_peer_chat_events_hashes,
    )?;

    for (_event_hash, peer_chat_event) in missed_events {
        let PeerEvent::NewPeerAgent(new_peer_agent) = peer_chat_event.event else {
            continue;
        };

        send_remote_signal(
            MessengerRemoteSignal::NewPrivateMessengerEntry(private_messenger_entry.clone()),
            vec![new_peer_agent.new_agent.clone()],
        )?;

        create_encrypted_message(
            new_peer_agent.new_agent.clone(),
            MessengerEncryptedMessage(private_messenger_entry.clone()),
        )?;
    }
    Ok(())
}

pub fn query_missed_peer_chat_events(
    existing_entries: &BTreeMap<EntryHashB64, PrivateMessengerEntry>,
    peer_chat_hash: &EntryHash,
    current_peer_chat_events_hashes: &Vec<EntryHash>,
) -> ExternResult<BTreeMap<EntryHash, PeerChatEvent>> {
    // Filter events for this peer_chat_hash
    let mut peer_chat_events: BTreeMap<EntryHash, PeerChatEvent> = BTreeMap::new();

    for (entry_hash, entry) in existing_entries {
        let PrivateMessengerEntryContent::PeerChatEvent(event) = &entry.0.signed_content.content
        else {
            continue;
        };

        if event.peer_chat_hash.ne(&peer_chat_hash) {
            continue;
        }
        peer_chat_events.insert(entry_hash.clone().into(), event.clone());
    }

    // Get all ascendents for current events hashes
    let mut all_ascendents: BTreeSet<EntryHash> = current_peer_chat_events_hashes
        .clone()
        .into_iter()
        .collect();
    let mut current_event_hashes: Vec<EntryHash> = current_peer_chat_events_hashes.clone();

    while let Some(current_event_hash) = current_event_hashes.pop() {
        let Some(current_event) = peer_chat_events.get(&current_event_hash) else {
            return Err(wasm_error!(
                "Previous event was not found: {current_event_hash:?}"
            ));
        };

        for previous_event_hash in &current_event.previous_peer_chat_events_hashes {
            if !all_ascendents.contains(previous_event_hash) {
                all_ascendents.insert(previous_event_hash.clone());
                current_event_hashes.push(previous_event_hash.clone());
            }
        }
    }

    // Filter all existing with ascendents
    let missing_peer_events: BTreeMap<EntryHash, PeerChatEvent> = peer_chat_events
        .into_iter()
        .filter(|(hash, _event)| !all_ascendents.contains(hash))
        .collect();
    Ok(missing_peer_events)
}