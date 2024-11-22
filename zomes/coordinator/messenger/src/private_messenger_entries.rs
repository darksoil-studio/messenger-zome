use hdk::prelude::*;
use messenger_integrity::*;
use std::collections::BTreeMap;

use crate::{
    agent_encrypted_message::{create_encrypted_message, MessengerEncryptedMessage},
    group_chat::{
        get_all_agent_sets_for_agents, get_all_agent_sets_for_current_group, query_current_group,
        query_entries_for_group, validate_create_group_chat, validate_delete_group_chat,
        validate_group_message, validate_read_group_messages, validate_update_group_chat,
    },
    linked_devices::{get_all_agents_for, query_my_linked_devices},
    peer_messages::{validate_peer_message, validate_read_peer_messages},
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
pub fn query_private_messenger_entries() -> ExternResult<QueriedPrivateMessengerEntries> {
    let filter = ChainQueryFilter::new()
        .entry_type(UnitEntryTypes::PrivateMessengerEntry.try_into()?)
        .include_entries(true)
        .action_type(ActionType::Create);
    let records = query(filter)?;

    let mut entries: BTreeMap<EntryHashB64, PrivateMessengerEntry> = BTreeMap::new();
    let mut entry_hashes: Vec<EntryHashB64> = Vec::new();

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
        entry_hashes.push(entry_hash.clone().into());
    }

    Ok(QueriedPrivateMessengerEntries {
        entry_hashes,
        entries,
    })
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

pub fn receive_private_messenger_entry(
    private_messenger_entry: PrivateMessengerEntry,
) -> ExternResult<()> {
    let private_messenger_entries = query_private_messenger_entries(())?;

    let entry_hash = hash_entry(&private_messenger_entry)?;

    if private_messenger_entries
        .entries
        .contains_key(&entry_hash.clone().into())
    {
        // We already have this message committed
        return Ok(());
    };

    let valid = validate_private_messenger_entry(&private_messenger_entry)?;

    if let ValidateCallbackResult::Valid = valid {
        create_relaxed(EntryTypes::PrivateMessengerEntry(private_messenger_entry))?;
    }

    Ok(())
}

pub fn validate_private_messenger_entry(
    private_messenger_entry: &PrivateMessengerEntry,
) -> ExternResult<ValidateCallbackResult> {
    let valid = verify_signed(private_messenger_entry.0.clone())?;

    if !valid {
        return Err(wasm_error!("Invalid signature for PeerMessage"));
    }

    let provenance = &private_messenger_entry.0.provenance;

    match &private_messenger_entry.0.signed_content.content {
        PrivateMessengerEntryContent::PeerMessage(peer_message) => {
            validate_peer_message(provenance, peer_message)
        }
        PrivateMessengerEntryContent::ReadPeerMessages(read_peer_messages) => {
            validate_read_peer_messages(provenance, read_peer_messages)
        }
        PrivateMessengerEntryContent::CreateGroupChat(create_group_chat) => {
            validate_create_group_chat(provenance, create_group_chat)
        }
        PrivateMessengerEntryContent::UpdateGroupChat(update_group_chat) => {
            validate_update_group_chat(provenance, update_group_chat)
        }
        PrivateMessengerEntryContent::DeleteGroupChat(delete_group_chat) => {
            validate_delete_group_chat(provenance, delete_group_chat)
        }
        PrivateMessengerEntryContent::GroupMessage(group_message) => {
            validate_group_message(provenance, group_message)
        }
        PrivateMessengerEntryContent::ReadGroupMessages(read_group_messages) => {
            validate_read_group_messages(provenance, read_group_messages)
        }
    }
}

pub fn receive_private_messenger_entries(
    their_private_messenger_entries: Vec<(EntryHashB64, PrivateMessengerEntry)>,
) -> ExternResult<()> {
    let my_private_messenger_entries = query_private_messenger_entries(())?;

    for (entry_hash, private_messenger_entry) in their_private_messenger_entries {
        if my_private_messenger_entries
            .entries
            .contains_key(&entry_hash)
        {
            // We already have this message committed
            continue;
        }
        let valid = validate_private_messenger_entry(&private_messenger_entry)?;

        if let ValidateCallbackResult::Valid = valid {
            create_relaxed(EntryTypes::PrivateMessengerEntry(private_messenger_entry))?;
        }
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
            // Need to notify all members of previous groups, plus all members of the new group

            let entry_hash = hash_entry(private_messenger_entry)?;
            let Some(all_chat_agents) = get_all_agent_sets_for_current_group(
                &update_group.original_group_hash,
                &entry_hash,
            )?
            else {
                return Err(wasm_error!("Group not found"));
            };
            let mut all_agents: HashSet<AgentPubKey> =
                all_chat_agents.into_iter().flatten().collect();

            for previous_group_hash in &update_group.previous_group_hashes {
                let Some(all_chat_agents) = get_all_agent_sets_for_current_group(
                    &update_group.original_group_hash,
                    previous_group_hash,
                )?
                else {
                    return Err(wasm_error!("Group not found"));
                };

                for agent_set in all_chat_agents {
                    for agent in agent_set {
                        all_agents.insert(agent);
                    }
                }
            }

            Ok(all_agents.into_iter().collect())
        }
        PrivateMessengerEntryContent::DeleteGroupChat(delete_group) => {
            let Some(all_chat_agents) = get_all_agent_sets_for_current_group(
                &delete_group.original_group_hash,
                &delete_group.previous_group_hash,
            )?
            else {
                return Err(wasm_error!("Group not found"));
            };
            Ok(all_chat_agents.into_iter().flatten().collect())
        }
        PrivateMessengerEntryContent::GroupMessage(group_message) => {
            let Some(all_chat_agents) = get_all_agent_sets_for_current_group(
                &group_message.original_group_hash,
                &group_message.current_group_hash,
            )?
            else {
                return Err(wasm_error!("Group not found"));
            };
            Ok(all_chat_agents.into_iter().flatten().collect())
        }
        PrivateMessengerEntryContent::ReadGroupMessages(read_group_messages) => {
            let Some(all_chat_agents) = get_all_agent_sets_for_current_group(
                &read_group_messages.original_group_hash,
                &read_group_messages.current_group_hash,
            )?
            else {
                return Err(wasm_error!("Group not found"));
            };
            Ok(all_chat_agents.into_iter().flatten().collect())
        }
    }
}

pub fn send_group_entries_to_new_member(
    new_member: &AgentPubKey,
    all_entries_for_group: &Vec<(EntryHashB64, PrivateMessengerEntry)>,
) -> ExternResult<()> {
    let private_messenger_entries_unit_entry_types: EntryType =
        UnitEntryTypes::PrivateMessengerEntry.try_into()?;
    let private_messenger_entries_agent_activity = get_agent_activity(
        new_member.clone(),
        ChainQueryFilter::new()
            .entry_type(private_messenger_entries_unit_entry_types.clone())
            .clone(),
        ActivityRequest::Full,
    )?;

    let actions_get_inputs = private_messenger_entries_agent_activity
        .valid_activity
        .into_iter()
        .map(|(_, action_hash)| GetInput::new(action_hash.into(), GetOptions::network()))
        .collect();

    let records = HDK.with(|hdk| hdk.borrow().get(actions_get_inputs))?;
    let existing_private_messenger_entries_hashes: HashSet<EntryHash> = records
        .into_iter()
        .filter_map(|r| r)
        .filter_map(|r| r.action().entry_hash().cloned())
        .collect();

    let missing_private_messenger_entries: Vec<(EntryHashB64, PrivateMessengerEntry)> =
        all_entries_for_group
            .clone()
            .into_iter()
            .filter(|(entry_hash, _)| {
                !existing_private_messenger_entries_hashes.contains(&entry_hash.clone().into())
            })
            .collect();

    send_remote_signal(
        MessengerRemoteSignal::SynchronizeGroupEntriesWithNewGroupMember(
            missing_private_messenger_entries.clone(),
        ),
        vec![new_member.clone()],
    )?;

    for (_, private_messenger_entry) in missing_private_messenger_entries {
        create_encrypted_message(
            new_member.clone(),
            MessengerEncryptedMessage(private_messenger_entry.clone()),
        )?;
    }

    Ok(())
}

pub fn send_group_entries_to_new_members(
    update_group_chat: &UpdateGroupChat,
    send_previous_messages: bool,
) -> ExternResult<()> {
    if update_group_chat.previous_group_hashes.len() > 1 {
        return Ok(()); // No new members allowed in a merge
    }

    let Some(previous_group) = query_current_group(
        &update_group_chat.original_group_hash,
        &update_group_chat.previous_group_hashes[0],
    )?
    else {
        return Err(wasm_error!(
            "Error sending group entries to new member: group not found"
        ));
    };

    let mut previous_members = previous_group.admins.clone();
    previous_members.append(&mut previous_group.members.clone());

    let mut current_members = update_group_chat.group.admins.clone();
    current_members.append(&mut update_group_chat.group.members.clone());

    let new_members: Vec<AgentPubKey> = current_members
        .into_iter()
        .filter(|current_member| !previous_members.contains(current_member))
        .collect();

    if new_members.len() == 0 {
        return Ok(());
    }

    let Some(group_entries) = query_entries_for_group(
        &update_group_chat.original_group_hash,
        send_previous_messages,
    )?
    else {
        return Err(wasm_error!(
            "Error sending the group entries to new member: group not found"
        ));
    };

    for new_member in new_members {
        send_group_entries_to_new_member(&new_member, &group_entries)?;
    }

    Ok(())
}

#[hdk_extern]
pub fn notify_private_messenger_entry_recipients(
    private_messenger_entry: PrivateMessengerEntry,
) -> ExternResult<()> {
    if let PrivateMessengerEntryContent::UpdateGroupChat(update_group_chat) =
        &private_messenger_entry.0.signed_content.content
    {
        send_group_entries_to_new_members(update_group_chat, false)?;
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
