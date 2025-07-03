use std::collections::BTreeMap;

use hdk::prelude::*;

pub fn find_zomes_with_zome_trait(zome_trait_hash: [u8; 32]) -> ExternResult<Vec<ZomeName>> {
    let all_traits = all_implemented_traits()?;

    let zomes: Vec<ZomeName> = all_traits
        .into_iter()
        .filter(|(_, traits)| traits.iter().any(|t| t.eq(&zome_trait_hash)))
        .map(|(z, _)| z)
        .collect();

    Ok(zomes)
}

fn all_implemented_traits() -> ExternResult<BTreeMap<ZomeName, Vec<[u8; 32]>>> {
    let coordinator_zomes = coordinator_zomes()?;

    let call_input = coordinator_zomes
        .clone()
        .into_iter()
        .map(|z| {
            Call::new(
                CallTarget::ConductorCell(CallTargetCell::Local),
                z,
                "__implemented_zome_traits".into(),
                None,
                ExternIO::encode(()).unwrap(),
            )
        })
        .collect();

    let call_results = HDK.with(|hdk| hdk.borrow().call(call_input))?;

    let implemented_traits: BTreeMap<ZomeName, Vec<[u8; 32]>> = call_results
        .into_iter()
        .zip(coordinator_zomes)
        .filter_map(|(r, zome_name)| {
            let ZomeCallResponse::Ok(r) = r else {
                return None;
            };
            let Ok(zome_traits) = r.decode::<Vec<[u8; 32]>>() else {
                return None;
            };

            Some((zome_name, zome_traits))
        })
        .collect();

    Ok(implemented_traits)
}

fn coordinator_zomes() -> ExternResult<Vec<ZomeName>> {
    let zome_names = dna_info()?.zome_names;

    Ok(zome_names
        .into_iter()
        .filter_map(|z| {
            z.to_string()
                .strip_suffix("_integrity")
                .map(|s| ZomeName::from(s))
        })
        .collect())
}
