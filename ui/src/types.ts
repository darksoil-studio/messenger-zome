import {
	ActionHash,
	AgentPubKey,
	Create,
	CreateLink,
	Delete,
	DeleteLink,
	DnaHash,
	EntryHash,
	Record,
	Signature,
	SignedActionHashed,
	Timestamp,
	Update,
} from '@holochain/client';
import { ActionCommittedSignal } from '@tnesh-stack/utils';

export type MessengerSignal = ActionCommittedSignal<EntryTypes, LinkTypes>;

export type EntryTypes = { type: 'PeerMessage' } & PeerMessage;

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

export interface PeerMessageContent {
	recipient: AgentPubKey;
	message: string;
}
export type PeerMessage = Signed<PeerMessageContent>;
