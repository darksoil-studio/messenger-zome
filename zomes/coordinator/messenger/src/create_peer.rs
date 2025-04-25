use hdk::prelude::*;
use private_event_sourcing::{
    get_linked_devices_with_proof_for, query_my_linked_devices_with_proof,
};

use crate::peer_chat::CreatePeer;

pub fn build_my_create_peer() -> ExternResult<CreatePeer> {
    let my_linked_devices = query_my_linked_devices_with_proof()?;
    let mut agents: BTreeSet<AgentPubKey> = my_linked_devices.keys().cloned().collect();
    agents.insert(agent_info()?.agent_initial_pubkey);

    let me = CreatePeer {
        agents,
        proofs: my_linked_devices.into_values().flatten().collect(),
    };
    Ok(me)
}

pub fn build_create_peer_for_agent(agent: AgentPubKey) -> ExternResult<CreatePeer> {
    let linked_devices = get_linked_devices_with_proof_for(agent.clone())?;
    let mut agents: BTreeSet<AgentPubKey> = linked_devices.keys().cloned().collect();
    agents.insert(agent);

    let peer = CreatePeer {
        agents,
        proofs: linked_devices.into_values().flatten().collect(),
    };
    Ok(peer)
}
