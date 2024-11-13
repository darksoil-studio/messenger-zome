use hdi::prelude::*;

use crate::Signed;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Message {
    pub reply_to: Option<EntryHash>,
    pub message: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct PeerMessage {
    pub recipient: AgentPubKey,
    pub message: Message,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct GroupMessage {
    pub original_group_hash: EntryHash,
    pub current_group_hash: EntryHash,

    pub message: Message,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct GroupInfo {
    pub name: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct CreateGroupChat {
    pub admins: Vec<AgentPubKey>,
    pub members: Vec<AgentPubKey>,
    pub info: GroupInfo,
}
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct UpdateGroupChat {
    pub original_group_hash: EntryHash,
    pub previous_group_hash: EntryHash,

    pub admins: Vec<AgentPubKey>,
    pub members: Vec<AgentPubKey>,
    pub info: GroupInfo,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct DeleteGroupChat {
    pub original_group_hash: EntryHash,
    pub previous_group_hash: EntryHash,
}

#[derive(Clone, Serialize, Deserialize, Debug)]
#[serde(tag = "type")]
pub enum PrivateMessengerEntryContent {
    PeerMessage(PeerMessage),
    CreateGroupChat(CreateGroupChat),
    UpdateGroupChat(UpdateGroupChat),
    DeleteGroupChat(DeleteGroupChat),
    GroupMessage(GroupMessage),
}

#[hdk_entry_helper]
#[derive(Clone)]
pub struct PrivateMessengerEntry(pub Signed<PrivateMessengerEntryContent>);

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