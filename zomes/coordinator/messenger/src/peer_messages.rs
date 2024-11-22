use hdk::prelude::*;
use messenger_integrity::*;

use crate::{
    linked_devices::query_all_my_agents,
    private_messenger_entries::create_relaxed_private_messenger_entry,
};

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
    let all_my_agents = query_all_my_agents()?;
    // Either the message is for me or by me
    if all_my_agents.contains(provenance) {
        return Ok(ValidateCallbackResult::Valid);
    }
    if all_my_agents.contains(&peer_message.recipient) {
        return Ok(ValidateCallbackResult::Valid);
    }

    // We may be missing the link device for our sender or recipient agent
    return Ok(ValidateCallbackResult::UnresolvedDependencies(
        UnresolvedDependencies::Hashes(vec![
            provenance.clone().into(),
            peer_message.recipient.clone().into(),
        ]),
    ));
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
            peer: read_peer_messages.peer.clone(),
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
    let all_my_agents = query_all_my_agents()?;
    // Either the message is for me or by me
    if all_my_agents.contains(provenance) {
        return Ok(ValidateCallbackResult::Valid);
    }
    if all_my_agents.contains(&read_peer_messages.peer) {
        return Ok(ValidateCallbackResult::Valid);
    }

    // We may be missing the link device for our sender or recipient agent
    return Ok(ValidateCallbackResult::UnresolvedDependencies(
        UnresolvedDependencies::Hashes(vec![
            provenance.clone().into(),
            read_peer_messages.peer.clone().into(),
        ]),
    ));
}
