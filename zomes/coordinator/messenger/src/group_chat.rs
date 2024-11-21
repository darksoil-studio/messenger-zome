use hdk::prelude::*;
use messenger_integrity::*;

use crate::{
    linked_devices::get_all_agents_for, private_messenger_entries::query_private_messenger_entries,
    signed::build_signed,
};

#[hdk_extern]
pub fn create_group_chat(group: Group) -> ExternResult<EntryHash> {
    let content = PrivateMessengerEntryContent::CreateGroupChat(group.clone());
    let signed = build_signed(content)?;
    let private_messenger_entry = PrivateMessengerEntry(signed.clone());
    let entry = EntryTypes::PrivateMessengerEntry(private_messenger_entry.clone());
    let entry_hash = hash_entry(&entry)?;

    create_entry(entry)?;

    Ok(entry_hash)
}

#[hdk_extern]
pub fn send_group_message(group_message: GroupMessage) -> ExternResult<()> {
    let content = PrivateMessengerEntryContent::GroupMessage(group_message.clone());
    let signed = build_signed(content)?;
    let private_messenger_entry = PrivateMessengerEntry(signed.clone());
    let entry = EntryTypes::PrivateMessengerEntry(private_messenger_entry.clone());

    create_entry(entry)?;

    Ok(())
}

pub fn get_all_agent_sets_for_agents(
    agents: Vec<AgentPubKey>,
) -> ExternResult<Vec<Vec<AgentPubKey>>> {
    let all_agents = agents
        .into_iter()
        .map(|agent| get_all_agents_for(agent))
        .collect::<ExternResult<Vec<Vec<AgentPubKey>>>>()?;
    Ok(all_agents)
}

pub fn get_all_agent_sets_for_current_group(
    group_hash: &EntryHash,
) -> ExternResult<Option<Vec<Vec<AgentPubKey>>>> {
    let Some(group) = get_latest_version_for_group(&group_hash)? else {
        return Ok(None);
    };
    let mut recipients = group.members;
    recipients.append(&mut group.admins.clone());

    let all_recipients_agents = get_all_agent_sets_for_agents(recipients)?;

    Ok(Some(all_recipients_agents))
}

pub fn get_latest_version_for_group(group_hash: &EntryHash) -> ExternResult<Option<Group>> {
    let private_messenger_entries = query_private_messenger_entries(())?;

    let mut latest_version_of_group: Option<(Timestamp, Group)> = None;

    for (entry_hash, entry) in private_messenger_entries {
        match entry.0.signed_content.content {
            PrivateMessengerEntryContent::CreateGroupChat(group) => {
                if entry_hash.eq(&EntryHashB64::from(group_hash.clone()))
                    && latest_version_of_group.is_none()
                {
                    latest_version_of_group = Some((entry.0.signed_content.timestamp, group));
                }
            }
            PrivateMessengerEntryContent::UpdateGroupChat(update) => {
                if update.original_group_hash.eq(&group_hash) {
                    if let Some((latest_timestamp, _)) = latest_version_of_group {
                        if entry.0.signed_content.timestamp.gt(&latest_timestamp) {
                            latest_version_of_group =
                                Some((entry.0.signed_content.timestamp, update.group));
                        }
                    } else {
                        latest_version_of_group =
                            Some((entry.0.signed_content.timestamp, update.group));
                    }
                }
            }
            _ => {}
        }
    }

    Ok(latest_version_of_group.map(|(_, group)| group))
}
