import {
	ActionHash,
	AgentPubKey,
	Create,
	CreateLink,
	Delete,
	DeleteLink,
	DnaHash,
	EntryHash,
	EntryHashB64,
	Record,
	Signature,
	SignedActionHashed,
	Timestamp,
	Update,
} from '@holochain/client';
import { ActionCommittedSignal } from '@tnesh-stack/utils';

export type MessengerSignal =
	| ActionCommittedSignal<EntryTypes, LinkTypes>
	| {
			type: 'PeerChatTypingIndicator';
			peer: AgentPubKey;
	  }
	| {
			type: 'GroupChatTypingIndicator';
			peer: AgentPubKey;
			group_hash: EntryHash;
	  };

export type EntryTypes = {
	type: 'PrivateMessengerEntry';
} & PrivateMessengerEntry;

export type LinkTypes = string;

export interface SignedContent<T> {
	content: T;
	timestamp: Timestamp;
}

export interface Signed<T> {
	signed_content: SignedContent<T>;
	provenance: AgentPubKey;
	signature: Signature;
}

export interface Message {
	reply_to: EntryHash | undefined;
	message: string;
}

export interface PeerMessage {
	recipient: AgentPubKey;
	message: Message;
}

export interface GroupInfo {
	name: string;
	avatar_hash: EntryHash | undefined;
}
export interface Group {
	admins: Array<AgentPubKey>;
	members: Array<AgentPubKey>;
	info: GroupInfo;
}
export interface UpdateGroupChat {
	original_group_hash: EntryHash;
	previous_group_hashes: Array<EntryHash>;
	group: Group;
}
export interface DeleteGroupChat {
	original_group_hash: EntryHash;
	previous_group_hash: EntryHash;
}

export interface GroupMessage {
	original_group_hash: EntryHash;
	current_group_hash: EntryHash;
	message: Message;
}

export interface ReadPeerMessages {
	read_messages_hashes: EntryHash[];
	peer: AgentPubKey;
}

export interface ReadGroupMessages {
	read_messages_hashes: EntryHash[];
	group_hash: EntryHash;
}

export type PrivateMessengerEntry = PeerMessengerEntry | GroupMessengerEntry;

export type PeerMessengerEntry =
	| Signed<{ type: 'PeerMessage' } & PeerMessage>
	| Signed<{ type: 'ReadPeerMessages' } & ReadPeerMessages>;

export type GroupMessengerEntry = Signed<
	| ({ type: 'GroupMessage' } & GroupMessage)
	| ({ type: 'ReadGroupMessages' } & ReadGroupMessages)
	| ({ type: 'CreateGroupChat' } & Group)
	| ({ type: 'UpdateGroupChat' } & UpdateGroupChat)
	| ({ type: 'DeleteGroupChat' } & DeleteGroupChat)
>;
