use hdk::prelude::*;
use messenger_integrity::*;
use std::collections::BTreeMap;

use crate::{signed::verify_signed, utils::create_relaxed};

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