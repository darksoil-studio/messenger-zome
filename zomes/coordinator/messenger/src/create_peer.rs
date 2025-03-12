use std::collections::BTreeMap;

use hdk::prelude::*;
use linked_devices_types::{AgentToLinkedDevicesLinkTag, LinkedDevicesProof};
use private_event_sourcing::{call_local_zome, linked_devices_zome_name};

use crate::peer_chat::CreatePeer;

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

fn query_my_linked_devices() -> ExternResult<BTreeMap<AgentPubKey, Vec<LinkedDevicesProof>>> {
    let Some(zome_name) = linked_devices_zome_name() else {
        return Ok(BTreeMap::new());
    };
    let Some(links): Option<Vec<Link>> =
        call_local_zome(zome_name, "query_my_linked_devices".into(), ())?
    else {
        return Ok(BTreeMap::new());
    };

    let mut linked_devices: BTreeMap<AgentPubKey, Vec<LinkedDevicesProof>> = BTreeMap::new();

    for link in links {
        let Some(agent) = link.target.into_agent_pub_key() else {
            continue;
        };

        let tag_bytes = SerializedBytes::from(UnsafeBytes::from(link.tag.into_inner()));

        let Ok(tag) = AgentToLinkedDevicesLinkTag::try_from(tag_bytes) else {
            continue;
        };

        linked_devices.insert(agent, tag.0);
    }

    Ok(linked_devices)
}

fn get_linked_devices_for(
    agent: AgentPubKey,
) -> ExternResult<BTreeMap<AgentPubKey, Vec<LinkedDevicesProof>>> {
    let Some(zome_name) = linked_devices_zome_name() else {
        return Ok(BTreeMap::new());
    };
    let Some(links): Option<Vec<Link>> =
        call_local_zome(zome_name, "get_linked_devices_for_agent".into(), agent)?
    else {
        return Ok(BTreeMap::new());
    };

    let mut linked_devices: BTreeMap<AgentPubKey, Vec<LinkedDevicesProof>> = BTreeMap::new();

    for link in links {
        let Some(agent) = link.target.into_agent_pub_key() else {
            continue;
        };

        let tag_bytes = SerializedBytes::from(UnsafeBytes::from(link.tag.into_inner()));

        let Ok(tag) = AgentToLinkedDevicesLinkTag::try_from(tag_bytes) else {
            continue;
        };

        linked_devices.insert(agent, tag.0);
    }

    Ok(linked_devices)
}
