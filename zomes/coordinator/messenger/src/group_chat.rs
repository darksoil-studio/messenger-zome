use hdk::prelude::*;
use messenger_integrity::*;

use crate::{
    linked_devices::get_all_agents_for,
    private_messenger_entries::{create_private_messenger_entry, query_private_messenger_entries},
};

#[hdk_extern]
pub fn create_group_chat(group: Group) -> ExternResult<EntryHash> {
    let content = PrivateMessengerEntryContent::CreateGroupChat(group.clone());

    let mut all_chat_members = group.members;

    all_chat_members.append(&mut group.admins.clone());

    let all_chat_agents: Vec<AgentPubKey> = get_all_agents_for_members(all_chat_members)?;
    create_private_messenger_entry(content, all_chat_agents)
}

#[hdk_extern]
pub fn send_group_message(group_message: GroupMessage) -> ExternResult<()> {
    let private_messenger_entries = query_private_messenger_entries(())?;

    let Some(group) = private_messenger_entries.get(&EntryHashB64::from(
        group_message.current_group_hash.clone(),
    )) else {
        return Err(wasm_error!("Group not found"));
    };

    let group = match group.0.signed_content.content.clone() {
        PrivateMessengerEntryContent::CreateGroupChat(group) => group,
        PrivateMessengerEntryContent::UpdateGroupChat(update_group) => update_group.group,
        _ => Err(wasm_error!(
            "Given current_group_hash does not correspond to a CreateGroupChat or UpdateGroupChat"
        ))?,
    };

    let mut recipients = group.members;
    recipients.append(&mut group.admins.clone());

    let all_recipients_agents = get_all_agents_for_members(recipients)?;

    let content = PrivateMessengerEntryContent::GroupMessage(group_message);

    create_private_messenger_entry(content, all_recipients_agents)?;

    Ok(())
}

pub fn get_all_agents_for_members(agents: Vec<AgentPubKey>) -> ExternResult<Vec<AgentPubKey>> {
    let all_agents = agents
        .into_iter()
        .map(|agent| get_all_agents_for(agent))
        .collect::<ExternResult<Vec<Vec<AgentPubKey>>>>()?
        .into_iter()
        .flatten()
        .collect();
    Ok(all_agents)
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
