use hdi::prelude::*;
use linked_devices_types::{are_agents_linked, LinkedDevicesProof};

use crate::{merge_profiles, Message, MessengerProfile};

#[derive(Serialize, Deserialize, Debug, Clone, SerializedBytes)]
pub struct Peer {
    pub agents: BTreeSet<AgentPubKey>,
    pub profile: Option<MessengerProfile>,
}

#[derive(Serialize, Deserialize, Debug, Clone, SerializedBytes)]
pub struct PeerChat {
    pub peer_1: Peer,
    pub peer_2: Peer,
}

impl PeerChat {
    pub fn apply(mut self, provenance: &AgentPubKey, event: &PeerEvent) -> ExternResult<Self> {
        match event {
            PeerEvent::NewPeerAgent(new_peer_agent) => {
                if self.peer_1.agents.contains(&provenance) {
                    let valid = are_agents_linked(
                        &provenance,
                        &new_peer_agent.new_agent,
                        &new_peer_agent.proofs,
                    );
                    if !valid {
                        return Err(wasm_error!("Invalid proof for NewPeerAgent"));
                    }

                    self.peer_1.agents.insert(new_peer_agent.new_agent.clone());
                } else if self.peer_2.agents.contains(&provenance) {
                    self.peer_2.agents.insert(new_peer_agent.new_agent.clone());
                } else {
                    return Err(wasm_error!(
                        "Author of the PeerEvent is not a member of this PeerChat"
                    ));
                }
            }
            PeerEvent::UpdateProfile(profile) => {
                if self.peer_1.agents.contains(&provenance) {
                    self.peer_1.profile = Some(profile.clone());
                } else if self.peer_2.agents.contains(&provenance) {
                    self.peer_2.profile = Some(profile.clone());
                } else {
                    return Err(wasm_error!(
                        "Author of the PeerEvent is not a member of this PeerChat"
                    ));
                }
            }
        }

        Ok(self)
    }

    pub fn merge(peer_chat_1: PeerChat, mut peer_chat_2: PeerChat) -> PeerChat {
        let mut agents_1 = peer_chat_1.peer_1.agents.clone();
        agents_1.append(&mut peer_chat_2.peer_1.agents);

        let profile_1 = merge_profiles(peer_chat_1.peer_1.profile, peer_chat_2.peer_1.profile);

        let mut agents_2 = peer_chat_1.peer_2.agents.clone();
        agents_2.append(&mut peer_chat_2.peer_2.agents);

        let profile_2 = merge_profiles(peer_chat_1.peer_2.profile, peer_chat_2.peer_2.profile);

        PeerChat {
            peer_1: Peer {
                agents: agents_1,
                profile: profile_1,
            },
            peer_2: Peer {
                agents: agents_2,
                profile: profile_2,
            },
        }
    }
}

#[derive(Serialize, Deserialize, Debug, Clone, SerializedBytes)]
#[serde(tag = "type")]
pub enum PeerEvent {
    NewPeerAgent(NewPeerAgent),
    UpdateProfile(MessengerProfile),
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct PeerChatEvent {
    pub peer_chat_hash: EntryHash,
    pub previous_peer_chat_events_hashes: Vec<EntryHash>,

    pub event: PeerEvent,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct NewPeerAgent {
    pub new_agent: AgentPubKey,
    pub proofs: Vec<LinkedDevicesProof>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct PeerMessage {
    pub peer_chat_hash: EntryHash,
    pub current_peer_chat_events_hashes: Vec<EntryHash>,

    pub message: Message,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct ReadPeerMessages {
    pub peer_chat_hash: EntryHash,
    pub current_peer_chat_events_hashes: Vec<EntryHash>,

    pub read_messages_hashes: Vec<EntryHash>,
}
