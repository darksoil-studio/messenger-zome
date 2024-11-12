use hdi::prelude::*;

use crate::Signed;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct PeerMessageContent {
    pub recipient: AgentPubKey,
    pub message: String,
}

#[derive(Clone)]
#[hdk_entry_helper]
pub struct PeerMessage(pub Signed<PeerMessageContent>);

pub fn validate_create_peer_message(
    _action: EntryCreationAction,
    _peer_message: PeerMessage,
) -> ExternResult<ValidateCallbackResult> {
    Ok(ValidateCallbackResult::Valid)
}
pub fn validate_update_peer_message(
    _action: Update,
    _peer_message: PeerMessage,
) -> ExternResult<ValidateCallbackResult> {
    Ok(ValidateCallbackResult::Valid)
}
pub fn validate_delete_peer_message(_action: Delete) -> ExternResult<ValidateCallbackResult> {
    Ok(ValidateCallbackResult::Valid)
}
