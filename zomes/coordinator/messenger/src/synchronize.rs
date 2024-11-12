use hdk::prelude::*;
use messenger_integrity::*;

use crate::{
    agent_encrypted_message::{
        commit_my_pending_encrypted_messages, create_encrypted_message, MessengerEncryptedMessage,
    },
    linked_devices::query_my_linked_devices,
    peer_messages::query_peer_messages,
};

#[hdk_extern(infallible)]
fn scheduled_synchronize_with_linked_devices(_: Option<Schedule>) -> Option<Schedule> {
    if let Err(err) = commit_my_pending_encrypted_messages() {
        error!("Failed to commit my encrypted messages: {err:?}");
    }
    if let Err(err) = synchronize_with_linked_devices() {
        error!("Failed to synchronize with other agents: {err:?}");
    }

    Some(Schedule::Persisted("*/30 * * * * * *".into())) // Every 30 seconds
}

pub fn synchronize_with_linked_devices() -> ExternResult<()> {
    let my_pub_key = agent_info()?.agent_latest_pubkey;

    let agents = query_my_linked_devices()?;
    let other_agents = agents.into_iter().filter(|a| a.ne(&my_pub_key));

    let peer_messages = query_peer_messages(())?;

    let peer_messages_unit_entry_types: EntryType = UnitEntryTypes::PeerMessage.try_into()?;

    for agent in other_agents {
        let peer_messages_agent_activity = get_agent_activity(
            agent.clone(),
            ChainQueryFilter::new()
                .entry_type(peer_messages_unit_entry_types.clone())
                .clone(),
            ActivityRequest::Full,
        )?;

        let actions_get_inputs = peer_messages_agent_activity
            .valid_activity
            .into_iter()
            .map(|(_, action_hash)| GetInput::new(action_hash.into(), GetOptions::network()))
            .collect();

        let records = HDK.with(|hdk| hdk.borrow().get(actions_get_inputs))?;
        let existing_peer_messages_hashes: HashSet<EntryHash> = records
            .into_iter()
            .filter_map(|r| r)
            .filter_map(|r| r.action().entry_hash().cloned())
            .collect();

        let missing_peer_messages: Vec<(EntryHashB64, PeerMessage)> = peer_messages
            .clone()
            .into_iter()
            .filter(|(entry_hash, _)| {
                !existing_peer_messages_hashes.contains(&entry_hash.clone().into())
            })
            .collect();

        let mut offline = false;

        for (_, peer_message) in missing_peer_messages {
            if !offline {
                let response = call_remote(
                    agent.clone(),
                    zome_info()?.name,
                    "receive_peer_message".into(),
                    None,
                    peer_message.clone(),
                )?;

                match response {
                    ZomeCallResponse::Ok(_) => continue,
                    _ => offline = true,
                }
            }
            create_encrypted_message(
                agent.clone(),
                MessengerEncryptedMessage::PeerMessage(peer_message.clone()),
            )?;
        }
    }

    Ok(())
}
