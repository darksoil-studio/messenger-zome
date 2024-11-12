use std::fmt::Debug;

use hdk::prelude::*;
use messenger_integrity::*;

pub fn build_signed<T: Serialize + Debug + Clone>(content: T) -> ExternResult<Signed<T>> {
    let my_pub_key = agent_info()?.agent_latest_pubkey;

    let timestamp = sys_time()?;

    let signed_content = SignedContent { timestamp, content };

    let signature = sign(my_pub_key.clone(), signed_content.clone())?;

    Ok(Signed {
        signed_content,
        signature,
        provenance: my_pub_key,
    })
}

pub fn verify_signed<T: Serialize + Debug + Clone>(signed: Signed<T>) -> ExternResult<bool> {
    verify_signature(signed.provenance, signed.signature, signed.signed_content)
}
