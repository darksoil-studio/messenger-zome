use hdk::prelude::*;
use messenger_integrity::*;
use std::collections::BTreeMap;

use crate::{
    agent_encrypted_message::{create_encrypted_message, MessengerEncryptedMessage},
    group_chat::{
        query_current_group_chat, query_entries_for_group, validate_create_group_chat,
        validate_group_chat_event, validate_group_message, validate_read_group_messages,
    },
    linked_devices::query_my_linked_devices,
    peer_chat::{
        self, query_current_peer_chat, validate_create_peer_chat, validate_peer_chat_event,
        validate_peer_message, validate_read_peer_messages,
    },
    signed::{build_signed, verify_signed},
    utils::create_relaxed,
    MessengerRemoteSignal,
};

#[derive(Serialize, Deserialize, Debug)]
pub struct QueriedPrivateMessengerEntries {
    pub entry_hashes: Vec<EntryHashB64>,
    pub entries: BTreeMap<EntryHashB64, PrivateMessengerEntry>,
}

#[hdk_extern]
pub fn query_private_messenger_entries(
) -> ExternResult<BTreeMap<EntryHashB64, PrivateMessengerEntry>> {
    let filter = ChainQueryFilter::new()
        .entry_type(UnitEntryTypes::PrivateMessengerEntry.try_into()?)
        .include_entries(true)
        .action_type(ActionType::Create);
    let records = query(filter)?;

    let mut entries: BTreeMap<EntryHashB64, PrivateMessengerEntry> = BTreeMap::new();

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
        entries.insert(entry_hash.clone().into(), private_messenger_entry);
    }

    Ok(entries)
}

pub fn query_private_messanger_entry(
    entry_hash: &EntryHash,
) -> ExternResult<Option<PrivateMessengerEntry>> {
    let Some(record) = get(entry_hash.clone(), GetOptions::local())? else {
        return Ok(None);
    };
    let Ok(Some(private_messenger_entry)) = record
        .entry()
        .to_app_option::<PrivateMessengerEntry>()
        .map_err(|err| wasm_error!(err))
    else {
        return Err(wasm_error!(
            "Given entry does not correspond to a PrivateMessengerEntry"
        ));
    };

    Ok(Some(private_messenger_entry))
}

fn internal_create_private_messenger_entry(
    content: PrivateMessengerEntryContent,
    relaxed: bool,
) -> ExternResult<EntryHash> {
    let signed = build_signed(content)?;

    let private_messenger_entry = PrivateMessengerEntry(signed.clone());
    let entry = EntryTypes::PrivateMessengerEntry(private_messenger_entry.clone());

    let valid = validate_private_messenger_entry(&private_messenger_entry)?;
    let entry_hash = hash_entry(&entry)?;

    match valid {
        ValidateCallbackResult::Valid => {
            match relaxed {
                false => {
                    create_relaxed(entry)?;
                }
                true => {
                    create_entry(entry)?;
                }
            };
        }
        ValidateCallbackResult::Invalid(reason) => {
            return Err(wasm_error!("Invalid PrivateMessengerEntry: {reason}"));
        }
        ValidateCallbackResult::UnresolvedDependencies(_deps) => {
            return Err(wasm_error!(
                "Could not commit PrivateMessengerEntry: awaiting depencencies"
            ));
        }
    }
    Ok(entry_hash)
}

pub fn create_private_messenger_entry(
    content: PrivateMessengerEntryContent,
) -> ExternResult<EntryHash> {
    internal_create_private_messenger_entry(content, false)
}

pub fn create_relaxed_private_messenger_entry(
    content: PrivateMessengerEntryContent,
) -> ExternResult<EntryHash> {
    internal_create_private_messenger_entry(content, true)
}

pub fn post_receive_entry(
    existing_entries: &BTreeMap<EntryHashB64, PrivateMessengerEntry>,
    private_messenger_entry: PrivateMessengerEntry,
) -> ExternResult<()> {
    match &private_messenger_entry.0.signed_content.content {
        PrivateMessengerEntryContent::PeerMessage(peer_message) => {
            // If we have linked a device at the same time that a peer sent us a message
            // we need to re-propagate this message to our newly linked device
            let Some(current_peer_chat) = query_latest_peer_chat(&peer_message.peer_chat_hash)?
            else {
                return Err(wasm_error!("PeerChat was not found"));
            };

            let bytes =
                SerializedBytes::try_from(current_peer_chat).map_err(|err| wasm_error!(err))?;

            let current_hash = hash_blake2b(bytes.bytes().to_vec(), 32)?;

            if peer_message.current_peer_chat_hash.ne(&current_hash) {
                let my_agents = query_my_linked_devices()?;

                send_remote_signal(
                    MessengerRemoteSignal::NewPrivateMessengerEntry(
                        private_messenger_entry.clone(),
                    ),
                    my_agents.clone(),
                )?;

                for agent in &my_agents {
                    create_encrypted_message(
                        agent.clone(),
                        MessengerEncryptedMessage(private_messenger_entry.clone()),
                    )?;
                }
            }
        }
        PrivateMessengerEntryContent::ReadPeerMessages(read_peer_messages) => {
            // If we have linked a device at the same time that a peer sent us a message
            // we need to re-propagate this message to our newly linked device
            let Some(current_peer_chat) =
                query_latest_peer_chat(&read_peer_messages.peer_chat_hash)?
            else {
                return Err(wasm_error!("PeerChat was not found"));
            };

            let bytes =
                SerializedBytes::try_from(current_peer_chat).map_err(|err| wasm_error!(err))?;

            let current_hash = hash_blake2b(bytes.bytes().to_vec(), 32)?;

            if read_peer_messages.current_peer_chat_hash.ne(&current_hash) {
                let my_agents = query_my_linked_devices()?;

                send_remote_signal(
                    MessengerRemoteSignal::NewPrivateMessengerEntry(
                        private_messenger_entry.clone(),
                    ),
                    my_agents.clone(),
                )?;

                for agent in &my_agents {
                    create_encrypted_message(
                        agent.clone(),
                        MessengerEncryptedMessage(private_messenger_entry.clone()),
                    )?;
                }
            }
        }
        _ => {}
    }

    Ok(())
}

pub fn validate_private_messenger_entry(
    private_messenger_entry: &PrivateMessengerEntry,
) -> ExternResult<ValidateCallbackResult> {
    let signature_valid = verify_signed(private_messenger_entry.0.clone())?;

    if !signature_valid {
        return Err(wasm_error!("Invalid signature for PeerMessage"));
    }

    let provenance = &private_messenger_entry.0.provenance;

    match &private_messenger_entry.0.signed_content.content {
        PrivateMessengerEntryContent::CreatePeerChat(peer_chat) => {
            validate_create_peer_chat(provenance, peer_chat)
        }
        PrivateMessengerEntryContent::PeerChatEvent(peer_chat_event) => {
            validate_peer_chat_event(provenance, peer_chat_event)
        }
        PrivateMessengerEntryContent::PeerMessage(peer_message) => {
            validate_peer_message(provenance, peer_message)
        }
        PrivateMessengerEntryContent::ReadPeerMessages(read_peer_messages) => {
            validate_read_peer_messages(provenance, read_peer_messages)
        }
        PrivateMessengerEntryContent::CreateGroupChat(create_group_chat) => {
            validate_create_group_chat(provenance, create_group_chat)
        }
        PrivateMessengerEntryContent::GroupChatEvent(group_chat_event) => {
            validate_group_chat_event(provenance, group_chat_event)
        }
        PrivateMessengerEntryContent::GroupMessage(group_message) => {
            validate_group_message(provenance, group_message)
        }
        PrivateMessengerEntryContent::ReadGroupMessages(read_group_messages) => {
            validate_read_group_messages(provenance, read_group_messages)
        }
    }
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

    let valid = validate_private_messenger_entry(&private_messenger_entry)?;

    match valid {
        ValidateCallbackResult::Valid => {
            create_relaxed(EntryTypes::PrivateMessengerEntry(
                private_messenger_entry.clone(),
            ))?;
            post_receive_entry(&private_messenger_entries, private_messenger_entry)?;
        }
        ValidateCallbackResult::UnresolvedDependencies(_) => {
            create_relaxed(EntryTypes::AwaitingDepsEntry(
                private_messenger_entry.clone(),
            ))?;
        }
        _ => {}
    }

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
        let valid = validate_private_messenger_entry(&private_messenger_entry)?;

        match valid {
            ValidateCallbackResult::Valid => {
                create_relaxed(EntryTypes::PrivateMessengerEntry(
                    private_messenger_entry.clone(),
                ))?;
                post_receive_entry(&my_private_messenger_entries, private_messenger_entry)?;
            }
            ValidateCallbackResult::UnresolvedDependencies(_) => {
                create_relaxed(EntryTypes::AwaitingDepsEntry(
                    private_messenger_entry.clone(),
                ))?;
            }
            _ => {}
        }
    }

    Ok(())
}

fn peer_chat_recipients(
    provenance: &AgentPubKey,
    peer_chat: &PeerChat,
) -> ExternResult<Vec<AgentPubKey>> {
    if peer_chat.peer_1.agents.contains(&provenance) {
        Ok(peer_chat.peer_2.agents.clone().into_iter().collect())
    } else {
        Ok(peer_chat.peer_1.agents.clone().into_iter().collect())
    }
}

fn peer_chat_recipients_for_hash(
    provenance: &AgentPubKey,
    peer_chat_hash: &EntryHash,
    current_peer_chat_events_hashes: &Vec<EntryHash>,
) -> ExternResult<Vec<AgentPubKey>> {
    let Some(peer_chat) = query_current_peer_chat(peer_chat_hash, current_peer_chat_events_hashes)?
    else {
        return Err(wasm_error!("PeerChat not found"));
    };

    peer_chat_recipients(provenance, &peer_chat)
}

fn group_chat_recipients(provenance: &AgentPubKey, group_chat: &GroupChat) -> Vec<AgentPubKey> {
    let members: Vec<AgentPubKey> = group_chat
        .members
        .iter()
        .map(|m| m.agents.clone())
        .filter(|agents| !agents.contains(provenance))
        .flatten()
        .collect();
    members
}

fn group_chat_recipients_for_hash(
    provenance: &AgentPubKey,
    group_chat_hash: &EntryHash,
    current_group_events_hashes: &Vec<EntryHash>,
) -> ExternResult<Vec<AgentPubKey>> {
    let Some(group_chat) = query_current_group_chat(&group_chat_hash, current_group_events_hashes)?
    else {
        return Err(wasm_error!("GroupChat not found"));
    };

    Ok(group_chat_recipients(provenance, &group_chat))
}

fn recipients(private_messenger_entry: &PrivateMessengerEntry) -> ExternResult<Vec<AgentPubKey>> {
    let provenance = private_messenger_entry.0.provenance.clone();
    match &private_messenger_entry.0.signed_content.content {
        PrivateMessengerEntryContent::CreatePeerChat(peer_chat) => {
            peer_chat_recipients(&provenance, &peer_chat)
        }
        PrivateMessengerEntryContent::PeerMessage(peer_message) => peer_chat_recipients_for_hash(
            &provenance,
            &peer_message.peer_chat_hash,
            &peer_message.current_peer_chat_events,
        ),
        PrivateMessengerEntryContent::PeerChatEvent(peer_chat_events) => {
            peer_chat_recipients_for_hash(
                &provenance,
                &peer_chat_events.peer_chat_hash,
                &peer_chat_events.previous_peer_chat_events,
            )
        }
        PrivateMessengerEntryContent::ReadPeerMessages(read_peer_messages) => {
            peer_chat_recipients_for_hash(
                &provenance,
                &read_peer_messages.peer_chat_hash,
                &read_peer_messages.current_peer_chat_events,
            )
        }
        PrivateMessengerEntryContent::CreateGroupChat(group) => Ok(group_chat_recipients(
            &provenance,
            &GroupChat::new(group.clone()),
        )),
        PrivateMessengerEntryContent::GroupChatEvent(group_chat_event) => {
            let entry_hash = hash_entry(private_messenger_entry)?;
            group_chat_recipients_for_hash(
                &provenance,
                &group_chat_event.group_chat_hash,
                &vec![entry_hash],
            )
        }
        PrivateMessengerEntryContent::GroupMessage(group_message) => {
            group_chat_recipients_for_hash(
                &provenance,
                &group_message.group_chat_hash,
                &group_message.current_group_chat_events_hashes,
            )
        }
        PrivateMessengerEntryContent::ReadGroupMessages(read_group_messages) => {
            group_chat_recipients_for_hash(
                &provenance,
                &read_group_messages.group_chat_hash,
                &read_group_messages.current_group_chat_events_hashes,
            )
        }
    }
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
    if let PrivateMessengerEntryContent::GroupChatEvent(group_chat_event) =
        &private_messenger_entry.0.signed_content.content
    {
        if let GroupEvent::AddMember { member_agents } = &group_chat_event.event {
            send_group_entries_to_new_member(
                &group_chat_event.group_chat_hash,
                &group_chat_event.previous_group_chat_event_hashes,
                member_agents,
            )?;
        }
    }

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
