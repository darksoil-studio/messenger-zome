use hdk::prelude::*;
use messenger_integrity::CreatePeer;

use crate::linked_devices::{get_linked_devices_for, query_my_linked_devices};

pub fn build_my_create_peer() -> ExternResult<CreatePeer> {
    let my_linked_devices = query_my_linked_devices()?;
    let mut agents: Vec<AgentPubKey> = my_linked_devices.keys().cloned().collect();
    agents.push(agent_info()?.agent_latest_pubkey);

    let me = CreatePeer {
        agents,
        proofs: my_linked_devices.into_values().flatten().collect(),
        profile: None,
    };
    Ok(me)
}

pub fn build_create_peer_for_agent(agent: AgentPubKey) -> ExternResult<CreatePeer> {
    let linked_devices = get_linked_devices_for(agent.clone())?;
    let mut agents: Vec<AgentPubKey> = linked_devices.keys().cloned().collect();
    agents.push(agent);

    let peer = CreatePeer {
        agents,
        proofs: linked_devices.into_values().flatten().collect(),
        profile: None,
    };
    Ok(peer)
}
