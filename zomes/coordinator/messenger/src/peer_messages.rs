use hdk::prelude::*;
use messenger_integrity::*;

use crate::{signed::build_signed, utils::create_relaxed};

#[hdk_extern]
pub fn send_peer_message(message_content: PeerMessage) -> ExternResult<()> {
    let signed = build_signed(PrivateMessengerEntryContent::PeerMessage(message_content))?;

    let private_messenger_entry = PrivateMessengerEntry(signed.clone());
    let entry = EntryTypes::PrivateMessengerEntry(private_messenger_entry.clone());

    create_relaxed(entry)?;

    Ok(())
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
        let signed = build_signed(content)?;

        create_relaxed(EntryTypes::PrivateMessengerEntry(PrivateMessengerEntry(
            signed,
        )))?;
    }

    Ok(())
}
