use hdi::prelude::*;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct SignedContent<T> {
    pub content: T,
    pub timestamp: Timestamp,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct SignedEntry<T> {
    pub signed_content: SignedContent<T>,
    pub signature: Signature,
    pub provenance: AgentPubKey,
}
