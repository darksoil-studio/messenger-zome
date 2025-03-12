use std::collections::BTreeMap;

use hdk::prelude::*;

mod private_messenger_entries;

mod create_peer;
mod group_chat;
use group_chat::*;
mod peer_chat;
use peer_chat::*;
mod profile;
mod typing_indicator;

use private_event_sourcing::*;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Message {
    pub reply_to: Option<EntryHash>,
    pub message: String,
}

#[private_event]
#[serde(tag = "type")]
pub enum MessengerEvent {
    CreatePeerChat(CreatePeerChat),
    PeerMessage(PeerMessage),
    PeerChatEvent(PeerChatEvent),
    ReadPeerMessages(ReadPeerMessages),
    CreateGroupChat(CreateGroupChat),
    GroupChatEvent(GroupChatEvent),
    GroupMessage(GroupMessage),
    ReadGroupMessages(ReadGroupMessages),
}

impl PrivateEvent for MessengerEvent {
    fn validate(
        &self,
        _event_hash: EntryHash,
        author: AgentPubKey,
        _timestamp: Timestamp,
    ) -> ExternResult<ValidateCallbackResult> {
        match &self {
            MessengerEvent::CreatePeerChat(peer_chat) => {
                validate_create_peer_chat(&author, peer_chat)
            }
            MessengerEvent::PeerChatEvent(peer_chat_event) => {
                validate_peer_chat_event(&author, peer_chat_event)
            }
            MessengerEvent::PeerMessage(peer_message) => {
                validate_peer_message(&author, peer_message)
            }
            MessengerEvent::ReadPeerMessages(read_peer_messages) => {
                validate_read_peer_messages(&author, read_peer_messages)
            }
            MessengerEvent::CreateGroupChat(create_group_chat) => {
                validate_create_group_chat(&author, create_group_chat)
            }
            MessengerEvent::GroupChatEvent(group_chat_event) => {
                validate_group_chat_event(&author, group_chat_event)
            }
            MessengerEvent::GroupMessage(group_message) => {
                validate_group_message(&author, group_message)
            }
            MessengerEvent::ReadGroupMessages(read_group_messages) => {
                validate_read_group_messages(&author, read_group_messages)
            }
        }
    }

    fn recipients(
        &self,
        event_hash: EntryHash,
        author: AgentPubKey,
        _timestamp: Timestamp,
    ) -> ExternResult<Vec<AgentPubKey>> {
        match self {
            MessengerEvent::CreatePeerChat(create_peer_chat) => {
                peer_chat_recipients(&author, &PeerChat::new(create_peer_chat.clone()))
            }
            MessengerEvent::PeerMessage(peer_message) => peer_chat_recipients_for_hash(
                &author,
                &peer_message.peer_chat_hash,
                &peer_message.current_peer_chat_events_hashes,
            ),
            MessengerEvent::PeerChatEvent(peer_chat_events) => peer_chat_recipients_for_hash(
                &author,
                &peer_chat_events.peer_chat_hash,
                &peer_chat_events.previous_peer_chat_events_hashes,
            ),
            MessengerEvent::ReadPeerMessages(read_peer_messages) => peer_chat_recipients_for_hash(
                &author,
                &read_peer_messages.peer_chat_hash,
                &read_peer_messages.current_peer_chat_events_hashes,
            ),
            MessengerEvent::CreateGroupChat(group) => Ok(group_chat_recipients(
                &author,
                &GroupChat::new(group.clone()),
            )),
            MessengerEvent::GroupChatEvent(group_chat_event) => {
                let mut recipients = group_chat_recipients_for_hash(
                    &author,
                    &group_chat_event.group_chat_hash,
                    &vec![event_hash],
                )?;

                if let GroupEvent::RemoveMember { mut member_agents } =
                    group_chat_event.event.clone()
                {
                    recipients.append(&mut member_agents);
                }

                Ok(recipients)
            }
            MessengerEvent::GroupMessage(group_message) => group_chat_recipients_for_hash(
                &author,
                &group_message.group_chat_hash,
                &group_message.current_group_chat_events_hashes,
            ),
            MessengerEvent::ReadGroupMessages(read_group_messages) => {
                group_chat_recipients_for_hash(
                    &author,
                    &read_group_messages.group_chat_hash,
                    &read_group_messages.current_group_chat_events_hashes,
                )
            }
        }
    }
}

pub fn query_messenger_events() -> ExternResult<BTreeMap<EntryHashB64, SignedEvent<MessengerEvent>>>
{
    query_private_events()
}

pub fn query_messenger_event(
    event_hash: EntryHash,
) -> ExternResult<Option<SignedEvent<MessengerEvent>>> {
    query_private_event::<MessengerEvent>(event_hash)
}

#[derive(Serialize, Deserialize, Debug, SerializedBytes)]
pub enum MessengerRemoteSignal {
    PeerChatTypingIndicator { peer_chat_hash: EntryHash },
    GroupChatTypingIndicator { group_chat_hash: EntryHash },
    // SynchronizeEntriesWithLinkedDevice(BTreeMap<EntryHashB64, PrivateMessengerEntry>),
    // SynchronizeGroupEntriesWithNewGroupMember(BTreeMap<EntryHashB64, PrivateMessengerEntry>),
}

#[derive(Serialize, Deserialize, Debug)]
#[serde(tag = "type")]
pub enum Signal {
    PeerChatTypingIndicator {
        peer_chat_hash: EntryHash,
        peer: AgentPubKey,
    },
    GroupChatTypingIndicator {
        peer: AgentPubKey,
        group_chat_hash: EntryHash,
    },
}
#[hdk_extern]
pub fn recv_remote_signal(signal_bytes: SerializedBytes) -> ExternResult<()> {
    if let Ok(messenger_remote_signal) = MessengerRemoteSignal::try_from(signal_bytes.clone()) {
        match messenger_remote_signal {
            MessengerRemoteSignal::PeerChatTypingIndicator { peer_chat_hash } => {
                let call_info = call_info()?;

                let peer = call_info.provenance;

                emit_signal(Signal::PeerChatTypingIndicator {
                    peer_chat_hash,
                    peer,
                })?;
            }
            MessengerRemoteSignal::GroupChatTypingIndicator { group_chat_hash } => {
                let call_info = call_info()?;

                let peer = call_info.provenance;

                emit_signal(Signal::GroupChatTypingIndicator {
                    peer,
                    group_chat_hash,
                })?;
            }
        }
    }
    if let Ok(private_event_sourcing_remote_signal) =
        PrivateEventSourcingRemoteSignal::try_from(signal_bytes)
    {
        recv_private_events_remote_signal::<MessengerEvent>(private_event_sourcing_remote_signal)
    } else {
        Ok(())
    }
}

#[hdk_extern]
pub fn attempt_commit_awaiting_deps_entries() -> ExternResult<()> {
    private_event_sourcing::attempt_commit_awaiting_deps_entries::<MessengerEvent>()?;

    Ok(())
}

#[hdk_extern(infallible)]
fn scheduled_tasks(_: Option<Schedule>) -> Option<Schedule> {
    if let Err(err) = private_event_sourcing::scheduled_tasks::<MessengerEvent>() {
        error!("Failed to perform scheduled tasks: {err:?}");
    }

    Some(Schedule::Persisted("*/30 * * * * * *".into())) // Every 30 seconds
}
