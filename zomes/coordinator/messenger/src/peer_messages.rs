use hdk::prelude::*;
use messenger_integrity::*;

use crate::{
    agent_encrypted_message::{create_encrypted_message, MessengerEncryptedMessage},
    linked_devices::get_all_agents_for,
    signed::build_signed,
    MessengerRemoteSignal,
};

#[hdk_extern]
pub fn send_peer_message(message_content: PeerMessage) -> ExternResult<()> {
    let agents = get_all_agents_for(message_content.recipient.clone())?;

    let content = PrivateMessengerEntryContent::PeerMessage(message_content);

    let signed = build_signed(content)?;

    let private_messenger_entry = PrivateMessengerEntry(signed.clone());

    create_entry(EntryTypes::PrivateMessengerEntry(
        private_messenger_entry.clone(),
    ))?;

    send_remote_signal(
        MessengerRemoteSignal::NewPrivateMessengerEntry(private_messenger_entry.clone()),
        agents.clone(),
    )?;

    for agent in agents {
        create_encrypted_message(
            agent,
            MessengerEncryptedMessage(private_messenger_entry.clone()),
        )?;
    }

    Ok(())
}
