use std::collections::BTreeMap;

use hdk::prelude::*;
use linked_devices_types::{AgentToLinkedDevicesLinkTag, LinkedDevicesProof};
use serde::de::DeserializeOwned;

pub fn call_local_zome<P, R>(
    zome_name: ZomeName,
    fn_name: FunctionName,
    payload: P,
) -> ExternResult<R>
where
    P: serde::Serialize + std::fmt::Debug,
    R: DeserializeOwned + std::fmt::Debug,
{
    let response = call(
        CallTargetCell::Local,
        zome_name.clone(),
        fn_name.clone(),
        None,
        payload,
    )?;

    match response {
        ZomeCallResponse::Ok(result) => {
            let result: R = result.decode().map_err(|err| wasm_error!(err))?;
            Ok(result)
        }
        _ => Err(wasm_error!(WasmErrorInner::Guest(format!(
            "Failed to call {zome_name}/{fn_name}: {response:?}"
        )))),
    }
}

pub fn linked_devices_zome_name() -> Option<ZomeName> {
    match std::option_env!("LINKED_DEVICES_COORDINATOR_ZOME_NAME") {
        Some(zome_name) => Some(zome_name.into()),
        None => None,
    }
}

pub fn get_linked_devices_for(
    agent: AgentPubKey,
) -> ExternResult<BTreeMap<AgentPubKey, Vec<LinkedDevicesProof>>> {
    let Some(zome_name) = linked_devices_zome_name() else {
        return Ok(BTreeMap::new());
    };
    let links: Vec<Link> =
        call_local_zome(zome_name, "get_linked_devices_for_agent".into(), agent)?;
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

// pub fn get_all_agents_for(agent: AgentPubKey) -> ExternResult<Vec<AgentPubKey>> {
//     let mut agents = get_linked_devices(agent.clone())?;
//     agents.push(agent);
//     Ok(agents)
// }

// pub fn query_all_my_agents() -> ExternResult<Vec<AgentPubKey>> {
//     let mut agents = query_my_linked_devices()?;
//     agents.push(agent_info()?.agent_latest_pubkey);
//     Ok(agents)
// }

pub fn query_my_linked_devices() -> ExternResult<BTreeMap<AgentPubKey, Vec<LinkedDevicesProof>>> {
    let Some(zome_name) = linked_devices_zome_name() else {
        return Ok(BTreeMap::new());
    };
    let links: Vec<Link> = call_local_zome(zome_name, "query_my_linked_devices".into(), ())?;

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
