use std::collections::BTreeMap;

use hdk::prelude::*;
use messenger_integrity::{EntryTypes, PrivateMessengerEntry, UnitEntryTypes};

use crate::{
    private_messenger_entries::{
        post_receive_entry, query_private_messenger_entries, validate_private_messenger_entry,
    },
    utils::{create_relaxed, delete_relaxed},
};

#[hdk_extern]
pub fn attempt_commit_awaiting_deps_entries() -> ExternResult<()> {
    let mut entries: Vec<(ActionHash, PrivateMessengerEntry)> =
        query_awaiting_deps_entries()?.into_iter().collect();

    entries.sort_by(|e1, e2| {
        e1.1 .0
            .signed_content
            .timestamp
            .cmp(&e2.1 .0.signed_content.timestamp)
    });

    let private_messenger_entries = query_private_messenger_entries(())?;
    for (action_hash, private_messenger_entry) in entries {
        let entry_hash = hash_entry(&private_messenger_entry)?;

        if !private_messenger_entries.contains_key(&entry_hash.clone().into()) {
            let valid = validate_private_messenger_entry(&private_messenger_entry)?;

            match valid {
                ValidateCallbackResult::Valid => {
                    create_relaxed(EntryTypes::PrivateMessengerEntry(
                        private_messenger_entry.clone(),
                    ))?;
                    post_receive_entry(&private_messenger_entries, private_messenger_entry)?;
                }
                ValidateCallbackResult::UnresolvedDependencies(_) => {
                    continue;
                }
                ValidateCallbackResult::Invalid(reason) => {
                    error!("Invalid awaiting dependencies entry: {reason}");
                }
            }
        }
        delete_relaxed(action_hash)?;
    }

    Ok(())
}

pub fn query_awaiting_deps_entries() -> ExternResult<BTreeMap<ActionHash, PrivateMessengerEntry>> {
    let filter = ChainQueryFilter::new()
        .entry_type(UnitEntryTypes::AwaitingDepsEntry.try_into()?)
        .include_entries(true)
        .action_type(ActionType::Create);
    let create_records = query(filter)?;
    let filter = ChainQueryFilter::new()
        .entry_type(UnitEntryTypes::AwaitingDepsEntry.try_into()?)
        .action_type(ActionType::Delete);
    let delete_records = query(filter)?;

    let all_deleted_hashes: Vec<EntryHash> = delete_records
        .into_iter()
        .filter_map(|r| match r.action() {
            Action::Delete(delete) => Some(delete.deletes_entry_address.clone()),
            _ => None,
        })
        .collect();

    let mut entries: BTreeMap<ActionHash, PrivateMessengerEntry> = BTreeMap::new();

    for record in create_records {
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
        if all_deleted_hashes.contains(&entry_hash) {
            continue;
        }
        entries.insert(record.action_address().clone(), private_messenger_entry);
    }

    Ok(entries)
}
