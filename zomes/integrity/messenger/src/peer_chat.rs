use hdi::prelude::*;
use linked_devices_types::LinkedDevicesProof;

use crate::Message;

#[derive(Serialize, Deserialize, Debug, Clone, SerializedBytes)]
pub struct PeerChat {
    pub my_agents: Vec<AgentPubKey>,
    pub peer_agents: Vec<AgentPubKey>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct PeerMessage {
    pub peer_chat_hash: EntryHash,
    pub current_peer_chat_hash: Vec<u8>,

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
    pub current_peer_chat_hash: Vec<u8>,

    pub read_messages_hashes: Vec<EntryHash>,
}
