use hdi::prelude::*;
use linked_devices_types::LinkedDevicesProof;

use crate::*;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Message {
    pub reply_to: Option<EntryHash>,
    pub message: String,
}

/** Peer Chat */

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct PeerChat {
    pub my_agents: Vec<AgentPubKey>,
    pub peer_agents: Vec<AgentPubKey>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct PeerMessage {
    pub peer_chat_hash: EntryHash,
    pub message: Message,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct NewPeerAgent {
    pub peer_chat_hash: EntryHash,
    pub new_agent: AgentPubKey,
    pub proofs: Vec<LinkedDevicesProof>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct ReadPeerMessages {
    pub peer_chat_hash: EntryHash,
    pub read_messages_hashes: Vec<EntryHash>,
}

/** Group Chat */

#[derive(Clone, Serialize, Deserialize, Debug)]
#[serde(tag = "type")]
pub enum PrivateMessengerEntryContent {
    CreatePeerChat(PeerChat),
    PeerMessage(PeerMessage),
    NewPeerAgent(NewPeerAgent),
    ReadPeerMessages(ReadPeerMessages),
    CreateGroupChat(GroupChat),
    GroupChatEvent(GroupChatEvent),
    GroupMessage(GroupMessage),
    ReadGroupMessages(ReadGroupMessages),
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
