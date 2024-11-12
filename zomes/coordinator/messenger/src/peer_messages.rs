use hdk::prelude::*;
use messenger_integrity::*;
use std::collections::BTreeMap;

use crate::{
    agent_encrypted_message::{create_encrypted_message, MessengerEncryptedMessage},
    linked_devices::get_all_agents_for,
    signed::build_signed,
    utils::create_relaxed,
    MessengerRemoteSignal,
};

#[hdk_extern]
pub fn send_peer_message(message_content: PeerMessageContent) -> ExternResult<()> {
    let agents = get_all_agents_for(message_content.recipient.clone())?;

    let peer_message = PeerMessage(build_signed(message_content)?);

    create_entry(EntryTypes::PeerMessage(peer_message.clone()));

    send_remote_signal(
        MessengerRemoteSignal::NewPeerMessage(peer_message.clone()),
        agents.clone(),
    )?;

    for agent in agents {
        create_encrypted_message(
            agent,
            MessengerEncryptedMessage::PeerMessage(peer_message.clone()),
        )?;
    }

    Ok(())
}

pub fn receive_peer_message(peer_message: PeerMessage) -> ExternResult<()> {
    let peer_messages = query_peer_messages(())?;

    let entry_hash = hash_entry(&peer_message)?;

    if peer_messages.contains_key(&entry_hash.clone().into()) {
        // We already have this message committed
        return Ok(());
    };

    create_relaxed(EntryTypes::PeerMessage(peer_message))?;
    Ok(())
}

#[hdk_extern]
pub fn query_peer_messages() -> ExternResult<BTreeMap<EntryHashB64, PeerMessage>> {
    let filter = ChainQueryFilter::new()
        .entry_type(UnitEntryTypes::PeerMessage.try_into()?)
        .include_entries(true)
        .action_type(ActionType::Create);
    let records = query(filter)?;

    let mut peer_messages: BTreeMap<EntryHashB64, PeerMessage> = BTreeMap::new();

    for record in records {
        let Ok(Some(peer_message)) = record
            .entry()
            .to_app_option::<PeerMessage>()
            .map_err(|err| wasm_error!(err))
        else {
            continue;
        };
        let Some(entry_hash) = record.action().entry_hash() else {
            continue;
        };
        peer_messages.insert(entry_hash.clone().into(), peer_message);
    }

    Ok(peer_messages)
}
