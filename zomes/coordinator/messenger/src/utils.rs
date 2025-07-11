use hdk::prelude::*;

pub fn find_zomes_with_zome_trait(zome_trait_hash: [u8; 32]) -> ExternResult<Vec<ZomeName>> {
    let coordinators = local_cell_coordinator_zomes()?;

    let zomes: Vec<ZomeName> = coordinators
        .into_iter()
        .filter(|zome| {
            let Ok(traits) = implemented_traits(CallTargetCell::Local, zome.clone()) else {
                return false;
            };

            traits.iter().any(|t| t.eq(&zome_trait_hash))
        })
        .collect();

    Ok(zomes)
}

fn implemented_traits(cell: CallTargetCell, zome_name: ZomeName) -> ExternResult<Vec<[u8; 32]>> {
    let Ok(response) = call(
        cell,
        zome_name,
        "__implemented_zome_traits".into(),
        None,
        (),
    ) else {
        return Ok(vec![]);
    };
    let ZomeCallResponse::Ok(r) = response else {
        return Err(wasm_error!(
            "Failed to call __implemented_zome_traits: {:?}.",
            response
        ));
    };
    let decode_result = r.decode::<Vec<[u8; 32]>>();
    let Ok(zome_traits) = decode_result else {
        return Err(wasm_error!(
            "Invalid __implemented_zome_traits result type: {:?}.",
            decode_result
        ));
    };

    Ok(zome_traits)
}

fn local_cell_coordinator_zomes() -> ExternResult<Vec<ZomeName>> {
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
