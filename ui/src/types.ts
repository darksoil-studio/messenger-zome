import { LinkedDevicesProof } from '@darksoil-studio/linked-devices-zome';
import {
	AgentPubKey,
	EntryHash,
	EntryHashB64,
	Signature,
	Timestamp,
} from '@holochain/client';
import { ActionCommittedSignal } from '@tnesh-stack/utils';

export type MessengerSignal =
	| ActionCommittedSignal<EntryTypes, LinkTypes>
	| {
			type: 'PeerChatTypingIndicator';
			peer: AgentPubKey;
			peer_chat_hash: EntryHash;
	  }
	| {
			type: 'GroupChatTypingIndicator';
			peer: AgentPubKey;
			group_chat_hash: EntryHash;
	  };

export type EntryTypes =
	| ({
			type: 'PrivateMessengerEntry';
	  } & PrivateMessengerEntry)
	| ({
			type: 'MessengerHistory';
	  } & MessengerHistory);

export interface MessengerHistory {
	my_profile: MessengerProfile | undefined;
	entries: Record<EntryHashB64, PrivateMessengerEntry>;
}

export type LinkTypes = string;

export interface SignedContent<T> {
	content: T;
	timestamp: Timestamp;
}

export interface SignedEntry<T> {
	signed_content: SignedContent<T>;
	provenance: AgentPubKey;
	signature: Signature;
}

export interface Message {
	reply_to: EntryHash | undefined;
	message: string;
}

export interface CreatePeer {
	agents: AgentPubKey[];
	proofs: LinkedDevicesProof[];
	profile: MessengerProfile | undefined;
}

export interface PeerMessage {
	peer_chat_hash: EntryHash;
	current_peer_chat_events_hashes: EntryHash[];
	message: Message;
}

export interface ReadPeerMessages {
	peer_chat_hash: EntryHash;
	current_peer_chat_events_hashes: EntryHash[];
	read_messages_hashes: EntryHash[];
}

export interface Peer {
	agents: Array<AgentPubKey>;
	profile: MessengerProfile | undefined;
}

export interface NewPeerAgent {
	new_agent: AgentPubKey;
	proofs: Array<LinkedDevicesProof>;
}

export interface CreatePeerChat {
	peer_1: CreatePeer;
	peer_2: CreatePeer;
}

export interface PeerChat {
	peer_1: Peer;
	peer_2: Peer;
}

export type PeerEvent =
	| ({
			type: 'NewPeerAgent';
	  } & NewPeerAgent)
	| ({
			type: 'UpdateProfile';
	  } & MessengerProfile);

export interface PeerChatEvent {
	peer_chat_hash: EntryHash;
	previous_peer_chat_events_hashes: Array<EntryHash>;

	event: PeerEvent;
}

export interface GroupInfo {
	name: string;
	description: string;
	avatar_hash: EntryHash | undefined;
}
export interface GroupSettings {
	only_admins_can_edit_group_info: boolean;
	only_admins_can_add_members: boolean;
	sync_message_history_with_new_members: boolean;
}
export interface GroupChat {
	members: Array<GroupMember>;
	info: GroupInfo;
	settings: GroupSettings;
	deleted: boolean;
}
export interface GroupMember {
	agents: Array<AgentPubKey>;
	removed: boolean;
	admin: boolean;
	profile: MessengerProfile | undefined;
}

export type GroupEvent =
	| ({ type: 'UpdateGroupInfo' } & GroupInfo)
	| ({ type: 'UpdateGroupSettings' } & GroupSettings)
	| { type: 'AddMember'; member_agents: Array<AgentPubKey> }
	| { type: 'RemoveMember'; member_agents: Array<AgentPubKey> }
	| {
			type: 'NewAgentForMember';
			new_agent: AgentPubKey;
			linked_devices_proofs: Array<LinkedDevicesProof>;
	  }
	| { type: 'PromoteMemberToAdmin'; member_agents: Array<AgentPubKey> }
	| { type: 'DemoteMemberFromAdmin'; member_agents: Array<AgentPubKey> }
	| {
			type: 'LeaveGroup';
	  }
	| {
			type: 'DeleteGroup';
	  };

export interface GroupChatEvent {
	group_chat_hash: EntryHash;
	previous_group_chat_events_hashes: Array<EntryHash>;

	event: GroupEvent;
}

export interface MessengerProfile {
	nickname: string;
	avatar_src: string | undefined;
}

export interface GroupMessage {
	group_chat_hash: EntryHash;
	current_group_chat_events_hashes: EntryHash[];
	message: Message;
}

export interface ReadGroupMessages {
	group_chat_hash: EntryHash;
	current_group_chat_events_hashes: EntryHash[];
	read_messages_hashes: EntryHash[];
}

export interface CreateGroupChat {
	me: CreatePeer;
	others: Array<CreatePeer>;
	info: GroupInfo;
	settings: GroupSettings;
}

export type PrivateMessengerEntry = PeerChatEntry | GroupChatEntry;

export type PeerChatEntry = SignedEntry<
	| ({ type: 'CreatePeerChat' } & CreatePeerChat)
	| ({ type: 'PeerChatEvent' } & PeerChatEvent)
	| ({ type: 'PeerMessage' } & PeerMessage)
	| ({ type: 'ReadPeerMessages' } & ReadPeerMessages)
>;

export type GroupChatEntry = SignedEntry<
	| ({ type: 'CreateGroupChat' } & CreateGroupChat)
	| ({ type: 'GroupChatEvent' } & GroupChatEvent)
	| ({ type: 'GroupMessage' } & GroupMessage)
	| ({ type: 'ReadGroupMessages' } & ReadGroupMessages)
>;
