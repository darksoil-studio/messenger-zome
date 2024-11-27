use std::collections::BTreeMap;

use hdi::prelude::*;

use crate::{MessengerProfile, PrivateMessengerEntry};

#[hdk_entry_helper]
#[derive(Clone)]
pub struct MessengerHistory {
    pub my_profile: Option<MessengerProfile>,
    pub entries: BTreeMap<EntryHashB64, PrivateMessengerEntry>,
}

pub fn validate_create_messenger_history(
    _action: EntryCreationAction,
    _messenger_history: MessengerHistory,
) -> ExternResult<ValidateCallbackResult> {
    Ok(ValidateCallbackResult::Valid)
}
pub fn validate_update_messenger_history(
    _action: Update,
    _messenger_history: MessengerHistory,
) -> ExternResult<ValidateCallbackResult> {
    Ok(ValidateCallbackResult::Invalid(format!(
        "MessengerHistory cannot be updated"
    )))
}
pub fn validate_delete_messenger_history(_action: Delete) -> ExternResult<ValidateCallbackResult> {
    Ok(ValidateCallbackResult::Invalid(format!(
        "MessengerHistory cannot be deleted"
    )))
}
