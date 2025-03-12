use hdk::prelude::*;
use messenger_integrity::*;
use std::collections::BTreeMap;

use crate::{
    agent_encrypted_message::{create_encrypted_message, MessengerEncryptedMessage},
    group_chat::{
        post_receive_group_chat_entry, query_current_group_chat, query_entries_for_group,
        validate_create_group_chat, validate_group_chat_event, validate_group_message,
        validate_read_group_messages,
    },
    linked_devices::query_my_linked_devices,
    peer_chat::{
        post_receive_create_peer_chat, post_receive_peer_chat_entry, query_current_peer_chat,
        validate_create_peer_chat, validate_peer_chat_event, validate_peer_message,
        validate_read_peer_messages,
    },
    signed::{build_signed, verify_signed},
    utils::create_relaxed,
    MessengerRemoteSignal, PeerChat,
};

pub fn post_receive_entry(private_messenger_entry: PrivateMessengerEntry) -> ExternResult<()> {
    match &private_messenger_entry.0.signed_content.content {
        PrivateMessengerEntryContent::CreatePeerChat(create_peer_chat) => {
            let entry_hash = hash_entry(&private_messenger_entry)?;
            post_receive_create_peer_chat(&entry_hash, create_peer_chat)?
        }
        PrivateMessengerEntryContent::PeerMessage(peer_message) => post_receive_peer_chat_entry(
            private_messenger_entry.clone(),
            &peer_message.peer_chat_hash,
            &peer_message.current_peer_chat_events_hashes,
        )?,
        PrivateMessengerEntryContent::ReadPeerMessages(read_peer_messages) => {
            post_receive_peer_chat_entry(
                private_messenger_entry.clone(),
                &read_peer_messages.peer_chat_hash,
                &read_peer_messages.current_peer_chat_events_hashes,
            )?
        }
        PrivateMessengerEntryContent::PeerChatEvent(peer_chat_event) => {
            let event_hash = hash_entry(&private_messenger_entry)?;
            post_receive_peer_chat_entry(
                private_messenger_entry.clone(),
                &peer_chat_event.peer_chat_hash,
                &vec![event_hash],
            )?
        }
        PrivateMessengerEntryContent::GroupMessage(group_message) => post_receive_group_chat_entry(
            private_messenger_entry.clone(),
            &group_message.group_chat_hash,
            &group_message.current_group_chat_events_hashes,
        )?,
        PrivateMessengerEntryContent::ReadGroupMessages(read_group_messages) => {
            post_receive_group_chat_entry(
                private_messenger_entry.clone(),
                &read_group_messages.group_chat_hash,
                &read_group_messages.current_group_chat_events_hashes,
            )?
        }
        PrivateMessengerEntryContent::GroupChatEvent(group_chat_event) => {
            let event_hash = hash_entry(&private_messenger_entry)?;
            post_receive_group_chat_entry(
                private_messenger_entry.clone(),
                &group_chat_event.group_chat_hash,
                &vec![event_hash],
            )?
        }
        _ => {}
    }

    Ok(())
}

pub fn send_group_entries_to_new_member(
    group_chat_hash: &EntryHash,
    current_group_events_hashes: &Vec<EntryHash>,
    member_agents: &Vec<AgentPubKey>,
) -> ExternResult<()> {
    let Some(group) = query_current_group_chat(group_chat_hash, current_group_events_hashes)?
    else {
        return Err(wasm_error!(
            "Error sending group entries to new member: group not found"
        ));
    };

    let Some(group_entries) = query_entries_for_group(
        &group_chat_hash,
        group.settings.sync_message_history_with_new_members,
    )?
    else {
        return Err(wasm_error!(
            "Error sending the group entries to new member: group not found"
        ));
    };

    send_remote_signal(
        MessengerRemoteSignal::SynchronizeGroupEntriesWithNewGroupMember(group_entries.clone()),
        member_agents.clone(),
    )?;

    for (_, private_messenger_entry) in group_entries {
        for agent in member_agents {
            create_encrypted_message(
                agent.clone(),
                MessengerEncryptedMessage(private_messenger_entry.clone()),
            )?;
        }
    }

    Ok(())
}

#[hdk_extern]
pub fn notify_private_messenger_entry_recipients(
    private_messenger_entry: PrivateMessengerEntry,
) -> ExternResult<()> {
    let agents_to_exclude = if let PrivateMessengerEntryContent::GroupChatEvent(group_chat_event) =
        &private_messenger_entry.0.signed_content.content
    {
        if let GroupEvent::AddMember { member_agents } = &group_chat_event.event {
            let entry_hash = hash_entry(&private_messenger_entry)?;
            send_group_entries_to_new_member(
                &group_chat_event.group_chat_hash,
                &vec![entry_hash],
                member_agents,
            )?;
            member_agents.clone()
        } else {
            vec![]
        }
    } else {
        vec![]
    };

    let recipients: Vec<AgentPubKey> = recipients(&private_messenger_entry)?
        .into_iter()
        .filter(|a| !agents_to_exclude.contains(a))
        .collect();

    let my_agents: Vec<AgentPubKey> = query_my_linked_devices()?.into_keys().collect();

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
