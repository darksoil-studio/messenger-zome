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

export type MessengerSignal = ActionCommittedSignal<EntryTypes, LinkTypes>;

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
	previous_group_hash: EntryHash;
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

export type PrivateMessengerEntry =
	| Signed<{ type: 'PeerMessage' } & PeerMessage>
	| GroupMessengerEntry;

export type GroupMessengerEntry = Signed<
	| ({ type: 'GroupMessage' } & GroupMessage)
	| ({ type: 'CreateGroupChat' } & Group)
	| ({ type: 'UpdateGroupChat' } & UpdateGroupChat)
	| ({ type: 'DeleteGroupChat' } & DeleteGroupChat)
>;
