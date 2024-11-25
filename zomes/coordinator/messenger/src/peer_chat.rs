use hdk::prelude::*;
use linked_devices_types::are_agents_linked;
use messenger_integrity::*;

use crate::private_messenger_entries::{
    create_private_messenger_entry, create_relaxed_private_messenger_entry,
    query_private_messanger_entry, query_private_messenger_entries,
};

#[hdk_extern]
pub fn create_peer_chat(peer_chat: PeerChat) -> ExternResult<EntryHash> {
    create_private_messenger_entry(PrivateMessengerEntryContent::CreatePeerChat(peer_chat))
}

pub fn validate_create_peer_chat(
    provenance: &AgentPubKey,
    peer_chat: &PeerChat,
) -> ExternResult<ValidateCallbackResult> {
    if !peer_chat.my_agents.contains(&provenance) {
        return Ok(ValidateCallbackResult::Invalid(format!(
            "PeerChats must contain the author's public key in the my_devices list"
        )));
    }
    Ok(ValidateCallbackResult::Valid)
}

#[hdk_extern]
pub fn add_new_peer_agent(new_peer_agent: NewPeerAgent) -> ExternResult<EntryHash> {
    create_private_messenger_entry(PrivateMessengerEntryContent::NewPeerAgent(new_peer_agent))
}

pub fn validate_new_peer_agent(
    provenance: &AgentPubKey,
    new_peer_agent: &NewPeerAgent,
) -> ExternResult<ValidateCallbackResult> {
    let Some(peer_chat) = query_current_peer_chat(&new_peer_agent.peer_chat_hash)? else {
        return Ok(ValidateCallbackResult::UnresolvedDependencies(
            UnresolvedDependencies::Hashes(vec![new_peer_agent.peer_chat_hash.clone().into()]),
        ));
    };

    if peer_chat.my_agents.contains(&provenance) || peer_chat.peer_agents.contains(&provenance) {
        return Ok(ValidateCallbackResult::Invalid(format!(
            "Author of a PeerMessage must be listed in the devices of its PeerChat"
        )));
    }

    let valid = are_agents_linked(
        provenance,
        &new_peer_agent.new_agent,
        &new_peer_agent.proofs,
    );

    if !valid {
        return Ok(ValidateCallbackResult::Invalid(format!(
            "Invalid proof for NewPeerAgent"
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

pub fn query_peer_chat(peer_chat_hash: &EntryHash) -> ExternResult<Option<PeerChat>> {
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

pub fn query_current_peer_chat(peer_chat_hash: &EntryHash) -> ExternResult<Option<PeerChat>> {
    let entries = query_private_messenger_entries(())?;

    let Some(mut peer_chat) = query_peer_chat(peer_chat_hash)? else {
        return Ok(None);
    };

    for entry_hash in entries.entry_hashes {
        let Some(entry) = entries.entries.get(&entry_hash) else {
            return Err(wasm_error!("Unreachable: QueriedPrivateMessengerEntries entries did not contain one of its entry hashes."));
        };

        let PrivateMessengerEntryContent::NewPeerAgent(new_peer_device) =
            &entry.0.signed_content.content
        else {
            continue;
        };

        if new_peer_device.peer_chat_hash.ne(peer_chat_hash) {
            continue;
        }

        if peer_chat.my_agents.contains(&entry.0.provenance) {
            peer_chat.my_agents.push(new_peer_device.new_agent.clone());
        } else if peer_chat.peer_agents.contains(&entry.0.provenance) {
            peer_chat
                .peer_agents
                .push(new_peer_device.new_agent.clone());
        }
    }

    Ok(Some(peer_chat))
}

pub fn validate_peer_message(
    provenance: &AgentPubKey,
    peer_message: &PeerMessage,
) -> ExternResult<ValidateCallbackResult> {
    let Some(peer_chat) = query_current_peer_chat(&peer_message.peer_chat_hash)? else {
        return Ok(ValidateCallbackResult::UnresolvedDependencies(
            UnresolvedDependencies::Hashes(vec![peer_message.peer_chat_hash.clone().into()]),
        ));
    };

    if peer_chat.my_agents.contains(&provenance) || peer_chat.peer_agents.contains(&provenance) {
        return Ok(ValidateCallbackResult::Invalid(format!(
            "Author of a PeerMessage must be listed in the devices of its PeerChat"
        )));
    }

    Ok(ValidateCallbackResult::Valid)
}

#[hdk_extern]
pub fn mark_peer_messages_as_read(read_peer_messages: ReadPeerMessages) -> ExternResult<()> {
    let read_messages_hashes_chunks: Vec<Vec<EntryHash>> = read_peer_messages
        .read_messages_hashes
        .chunks(16)
        .into_iter()
        .map(|chunk| chunk.iter().cloned().collect())
        .collect();

    for chunk in read_messages_hashes_chunks {
        let content = PrivateMessengerEntryContent::ReadPeerMessages(ReadPeerMessages {
            peer_chat_hash: read_peer_messages.peer_chat_hash.clone(),
            read_messages_hashes: chunk,
        });
        create_relaxed_private_messenger_entry(content)?;
    }

    Ok(())
}

pub fn validate_read_peer_messages(
    provenance: &AgentPubKey,
    read_peer_messages: &ReadPeerMessages,
) -> ExternResult<ValidateCallbackResult> {
    let Some(peer_chat) = query_current_peer_chat(&read_peer_messages.peer_chat_hash)? else {
        return Ok(ValidateCallbackResult::UnresolvedDependencies(
            UnresolvedDependencies::Hashes(vec![read_peer_messages.peer_chat_hash.clone().into()]),
        ));
    };

    if peer_chat.my_agents.contains(&provenance) || peer_chat.peer_agents.contains(&provenance) {
        return Ok(ValidateCallbackResult::Invalid(format!(
            "Author of a PeerMessage must be listed in the devices of its PeerChat"
        )));
    }

    Ok(ValidateCallbackResult::Valid)
}
