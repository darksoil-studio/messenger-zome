use hdk::prelude::*;

use crate::MessengerRemoteSignal;

#[hdk_extern]
pub fn send_peer_chat_typing_indicator(their_agent_set: Vec<AgentPubKey>) -> ExternResult<()> {
    send_remote_signal(
        MessengerRemoteSignal::PeerChatTypingIndicator,
        their_agent_set,
    )?;

    Ok(())
}

#[derive(Serialize, Deserialize, Debug)]
pub struct SendGroupChatTypingIndicatorInput {
    group_hash: EntryHash,
    all_members_agents_sets: Vec<Vec<AgentPubKey>>,
}
#[hdk_extern]
pub fn send_group_chat_typing_indicator(
    input: SendGroupChatTypingIndicatorInput,
) -> ExternResult<()> {
    send_remote_signal(
        MessengerRemoteSignal::GroupChatTypingIndicator {
            group_hash: input.group_hash,
        },
        input
            .all_members_agents_sets
            .into_iter()
            .flatten()
            .collect(),
    )?;

    Ok(())
}
