use hdk::prelude::*;

use crate::MessengerRemoteSignal;

#[derive(Serialize, Deserialize, Debug)]
pub struct SendPeerChatTypingIndicatorInput {
    peer_chat_hash: EntryHash,
    peer_agents: Vec<AgentPubKey>,
}

#[hdk_extern]
pub fn send_peer_chat_typing_indicator(
    input: SendPeerChatTypingIndicatorInput,
) -> ExternResult<()> {
    send_remote_signal(
        MessengerRemoteSignal::PeerChatTypingIndicator {
            peer_chat_hash: input.peer_chat_hash,
        },
        input.peer_agents,
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
            group_chat_hash: input.group_hash,
        },
        input
            .all_members_agents_sets
            .into_iter()
            .flatten()
            .collect(),
    )?;

    Ok(())
}
