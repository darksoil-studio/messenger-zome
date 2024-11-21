use hdk::prelude::*;
use messenger_integrity::*;

use crate::{
    linked_devices::get_all_agents_for, private_messenger_entries::create_private_messenger_entry,
};

#[hdk_extern]
pub fn send_peer_message(message_content: PeerMessage) -> ExternResult<()> {
    let recipients = get_all_agents_for(message_content.recipient.clone())?;

    let content = PrivateMessengerEntryContent::PeerMessage(message_content);

    create_private_messenger_entry(content, recipients)?;

    Ok(())
}

#[hdk_extern]
pub fn mark_peer_messages_as_read(read_peer_messages: ReadPeerMessages) -> ExternResult<()> {
    let recipients = get_all_agents_for(read_peer_messages.peer.clone())?;

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

        create_private_messenger_entry(content, recipients.clone())?;
    }

    Ok(())
}
