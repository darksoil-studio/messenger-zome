use hdk::prelude::*;
use messenger_integrity::*;
use std::collections::BTreeMap;

use crate::{
    agent_encrypted_message::{create_encrypted_message, MessengerEncryptedMessage},
    group_chat::{get_all_agent_sets_for_agents, get_all_agent_sets_for_current_group},
    linked_devices::{get_all_agents_for, query_my_linked_devices},
    signed::verify_signed,
    utils::create_relaxed,
    MessengerRemoteSignal,
};

#[hdk_extern]
pub fn query_private_messenger_entries(
) -> ExternResult<BTreeMap<EntryHashB64, PrivateMessengerEntry>> {
    let filter = ChainQueryFilter::new()
        .entry_type(UnitEntryTypes::PrivateMessengerEntry.try_into()?)
        .include_entries(true)
        .action_type(ActionType::Create);
    let records = query(filter)?;

    let mut private_messenger_entries: BTreeMap<EntryHashB64, PrivateMessengerEntry> =
        BTreeMap::new();

    for record in records {
        let Ok(Some(private_messenger_entry)) = record
            .entry()
            .to_app_option::<PrivateMessengerEntry>()
            .map_err(|err| wasm_error!(err))
        else {
            continue;
        };
        let Some(entry_hash) = record.action().entry_hash() else {
            continue;
        };
        private_messenger_entries.insert(entry_hash.clone().into(), private_messenger_entry);
    }

    Ok(private_messenger_entries)
}

pub fn receive_private_messenger_entry(
    private_messenger_entry: PrivateMessengerEntry,
) -> ExternResult<()> {
    let private_messenger_entries = query_private_messenger_entries(())?;

    let entry_hash = hash_entry(&private_messenger_entry)?;

    if private_messenger_entries.contains_key(&entry_hash.clone().into()) {
        // We already have this message committed
        return Ok(());
    };

    let valid = verify_signed(private_messenger_entry.0.clone())?;

    if !valid {
        return Err(wasm_error!("Invalid signature for PeerMessage"));
    }

    create_relaxed(EntryTypes::PrivateMessengerEntry(private_messenger_entry))?;
    Ok(())
}

pub fn receive_private_messenger_entries(
    their_private_messenger_entries: BTreeMap<EntryHashB64, PrivateMessengerEntry>,
) -> ExternResult<()> {
    let my_private_messenger_entries = query_private_messenger_entries(())?;

    for (entry_hash, private_messenger_entry) in their_private_messenger_entries {
        if my_private_messenger_entries.contains_key(&entry_hash) {
            // We already have this message committed
            continue;
        }

        let valid = verify_signed(private_messenger_entry.0.clone())?;

        if !valid {
            return Err(wasm_error!("Invalid signature for PeerMessage"));
        }

        create_relaxed(EntryTypes::PrivateMessengerEntry(private_messenger_entry))?;
    }

    Ok(())
}

fn recipients(private_messenger_entry: &PrivateMessengerEntry) -> ExternResult<Vec<AgentPubKey>> {
    match &private_messenger_entry.0.signed_content.content {
        PrivateMessengerEntryContent::PeerMessage(peer_message) => {
            get_all_agents_for(peer_message.recipient.clone())
        }
        PrivateMessengerEntryContent::ReadPeerMessages(read_peer_messages) => {
            get_all_agents_for(read_peer_messages.peer.clone())
        }
        PrivateMessengerEntryContent::CreateGroupChat(group) => {
            let mut all_chat_members = group.members.clone();

            all_chat_members.append(&mut group.admins.clone());

            let all_chat_agents = get_all_agent_sets_for_agents(all_chat_members)?;
            Ok(all_chat_agents.into_iter().flatten().collect())
        }
        PrivateMessengerEntryContent::UpdateGroupChat(update_group) => {
            let Some(all_chat_agents) =
                get_all_agent_sets_for_current_group(&update_group.original_group_hash)?
            else {
                return Err(wasm_error!("Group not found"));
            };
            Ok(all_chat_agents.into_iter().flatten().collect())
        }
        PrivateMessengerEntryContent::DeleteGroupChat(delete_group) => {
            let Some(all_chat_agents) =
                get_all_agent_sets_for_current_group(&delete_group.original_group_hash)?
            else {
                return Err(wasm_error!("Group not found"));
            };
            Ok(all_chat_agents.into_iter().flatten().collect())
        }
        PrivateMessengerEntryContent::GroupMessage(group_message) => {
            let Some(all_chat_agents) =
                get_all_agent_sets_for_current_group(&group_message.original_group_hash)?
            else {
                return Err(wasm_error!("Group not found"));
            };
            Ok(all_chat_agents.into_iter().flatten().collect())
        }
        PrivateMessengerEntryContent::ReadGroupMessages(read_group_messages) => {
            let Some(all_chat_agents) =
                get_all_agent_sets_for_current_group(&read_group_messages.group_hash)?
            else {
                return Err(wasm_error!("Group not found"));
            };
            Ok(all_chat_agents.into_iter().flatten().collect())
        }
    }
}

#[hdk_extern]
pub fn notify_private_messenger_entry_recipients(
    private_messenger_entry: PrivateMessengerEntry,
) -> ExternResult<()> {
    let recipients = recipients(&private_messenger_entry)?;
    let my_agents = query_my_linked_devices()?;

    send_remote_signal(
        MessengerRemoteSignal::NewPrivateMessengerEntry(private_messenger_entry.clone()),
        recipients.clone(),
    )?;

    send_remote_signal(
        MessengerRemoteSignal::NewPrivateMessengerEntry(private_messenger_entry.clone()),
        my_agents.clone(),
    )?;

    for agent in recipients {
        create_encrypted_message(
            agent,
            MessengerEncryptedMessage(private_messenger_entry.clone()),
        )?;
    }

    for agent in my_agents {
        create_encrypted_message(
            agent,
            MessengerEncryptedMessage(private_messenger_entry.clone()),
        )?;
    }
    Ok(())
}
