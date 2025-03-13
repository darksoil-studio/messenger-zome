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
    let signal = MessengerRemoteSignal::PeerChatTypingIndicator {
        peer_chat_hash: input.peer_chat_hash,
    };
    let bytes = SerializedBytes::try_from(signal).map_err(|err| wasm_error!(err))?;
    send_remote_signal(bytes, input.peer_agents)?;

    Ok(())
}

#[derive(Serialize, Deserialize, Debug)]
pub struct SendGroupChatTypingIndicatorInput {
    group_hash: EntryHash,
    all_agents: Vec<Vec<AgentPubKey>>,
}
#[hdk_extern]
pub fn send_group_chat_typing_indicator(
    input: SendGroupChatTypingIndicatorInput,
) -> ExternResult<()> {
    let signal = MessengerRemoteSignal::GroupChatTypingIndicator {
        group_chat_hash: input.group_hash,
    };
    let bytes = SerializedBytes::try_from(signal).map_err(|err| wasm_error!(err))?;
    send_remote_signal(bytes, input.all_agents.into_iter().flatten().collect())?;

    Ok(())
}
