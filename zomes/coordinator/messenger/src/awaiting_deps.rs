use std::collections::BTreeMap;

use hdk::prelude::*;
use messenger_integrity::{EntryTypes, PrivateMessengerEntry, UnitEntryTypes};

use crate::{
    private_messenger_entries::{
        post_receive_entry, query_private_messenger_entries, validate_private_messenger_entry,
    },
    utils::create_relaxed,
};

#[hdk_extern]
pub fn attempt_commit_awaiting_deps_entries() -> ExternResult<()> {
    let mut entries: Vec<(EntryHash, PrivateMessengerEntry)> =
        query_awaiting_deps_entries()?.into_iter().collect();

    entries.sort_by(|e1, e2| {
        e1.1 .0
            .signed_content
            .timestamp
            .cmp(&e2.1 .0.signed_content.timestamp)
    });

    let private_messenger_entries = query_private_messenger_entries(())?;
    for (_action_hash, private_messenger_entry) in entries {
        let entry_hash = hash_entry(&private_messenger_entry)?;

        if !private_messenger_entries.contains_key(&entry_hash.clone().into()) {
            let valid = validate_private_messenger_entry(&private_messenger_entry)?;

            match valid {
                ValidateCallbackResult::Valid => {
                    create_relaxed(EntryTypes::PrivateMessengerEntry(
                        private_messenger_entry.clone(),
                    ))?;
                    post_receive_entry(private_messenger_entry)?;
                }
                ValidateCallbackResult::Invalid(reason) => {
                    error!("Invalid awaiting dependencies entry: {reason}");
                    // delete_relaxed(action_hash)?;
                }
                ValidateCallbackResult::UnresolvedDependencies(_) => {}
            }
        }
    }

    Ok(())
}

pub fn query_awaiting_deps_entries() -> ExternResult<BTreeMap<EntryHash, PrivateMessengerEntry>> {
    let existing_private_messenger_entries = query_private_messenger_entries(())?;

    let filter = ChainQueryFilter::new()
        .entry_type(UnitEntryTypes::AwaitingDepsEntry.try_into()?)
        .include_entries(true)
        .action_type(ActionType::Create);
    let create_records = query(filter)?;

    let mut entries: BTreeMap<EntryHash, PrivateMessengerEntry> = BTreeMap::new();

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
        if existing_private_messenger_entries.contains_key(&EntryHashB64::from(entry_hash.clone()))
        {
            continue;
        }
        entries.insert(entry_hash.clone(), private_messenger_entry);
    }

    Ok(entries)
}
