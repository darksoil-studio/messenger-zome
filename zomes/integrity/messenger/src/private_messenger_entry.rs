use hdi::prelude::*;

use crate::*;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Message {
    pub reply_to: Option<EntryHash>,
    pub message: String,
}

#[derive(Clone, Serialize, Deserialize, Debug)]
#[serde(tag = "type")]
pub enum PrivateMessengerEntryContent {
    CreatePeerChat(CreatePeerChat),
    PeerMessage(PeerMessage),
    PeerChatEvent(PeerChatEvent),
    ReadPeerMessages(ReadPeerMessages),
    CreateGroupChat(CreateGroupChat),
    GroupChatEvent(GroupChatEvent),
    GroupMessage(GroupMessage),
    ReadGroupMessages(ReadGroupMessages),
}

#[hdk_entry_helper]
#[derive(Clone)]
pub struct PrivateMessengerEntry(pub SignedEntry<PrivateMessengerEntryContent>);

pub fn validate_create_private_messenger_entry(
    _action: EntryCreationAction,
    _private_messenger_entry: PrivateMessengerEntry,
) -> ExternResult<ValidateCallbackResult> {
    Ok(ValidateCallbackResult::Valid)
}
pub fn validate_update_private_messenger_entry(
    _action: Update,
    _private_messenger_entry: PrivateMessengerEntry,
) -> ExternResult<ValidateCallbackResult> {
    Ok(ValidateCallbackResult::Invalid(format!(
        "PrivateMessengerEntries cannot be updated"
    )))
}
pub fn validate_delete_private_messenger_entry(
    _action: Delete,
) -> ExternResult<ValidateCallbackResult> {
    Ok(ValidateCallbackResult::Invalid(format!(
        "PrivateMessengerEntries cannot be deleted"
    )))
}

pub fn validate_create_awaiting_deps_entry(
    _action: EntryCreationAction,
    _private_messenger_entry: PrivateMessengerEntry,
) -> ExternResult<ValidateCallbackResult> {
    Ok(ValidateCallbackResult::Valid)
}
pub fn validate_update_awaiting_deps_entry(
    _action: Update,
    _private_messenger_entry: PrivateMessengerEntry,
) -> ExternResult<ValidateCallbackResult> {
    Ok(ValidateCallbackResult::Invalid(format!(
        "PrivateMessengerEntries cannot be updated"
    )))
}
pub fn validate_delete_awaiting_deps_entry(
    _action: Delete,
) -> ExternResult<ValidateCallbackResult> {
    Ok(ValidateCallbackResult::Valid)
}
