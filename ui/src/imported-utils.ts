import {
	AppCallZomeRequest,
	AppClient,
	HoloHash,
	Record,
	SignalType,
	Timestamp,
	decodeHashFromBase64,
	encodeHashToBase64,
} from '@holochain/client';
import {
	AppInfo,
	AppSignal,
	AppWebsocket,
	CellId,
	CellType,
	RoleName,
} from '@holochain/client';
import {
	Create,
	CreateLink,
	Delete,
	DeleteLink,
	SignedActionHashed,
	Update,
} from '@holochain/client';
import { decode } from '@msgpack/msgpack';
// @ts-ignore
import { UnsubscribeFunction } from 'emittery';
import { Base64 } from 'js-base64';

export function roleNameForCellId(
	appInfo: AppInfo,
	cellId: CellId,
): RoleName | undefined {
	for (const [role, cells] of Object.entries(appInfo.cell_info)) {
		for (const c of cells) {
			if (CellType.Provisioned in c) {
				if (c[CellType.Provisioned].cell_id.toString() === cellId.toString()) {
					return role;
				}
			} else if (CellType.Cloned in c) {
				if (c[CellType.Cloned].cell_id.toString() === cellId.toString()) {
					return c[CellType.Cloned].clone_id;
				}
			}
		}
	}
	return undefined;
}

export async function isSignalFromCellWithRole(
	client: AppClient,
	roleName: RoleName,
	signal: AppSignal,
): Promise<boolean> {
	if ((client as AppWebsocket).cachedAppInfo) {
		const role = roleNameForCellId(
			(client as AppWebsocket).cachedAppInfo!,
			signal.cell_id,
		);
		if (role) {
			return roleName === role;
		}
	}

	// Cache miss: most likely due to a new clone having been created,
	// So in this case we _should_ trigger a new fetch of the app info

	const appInfo = await client.appInfo();
	const role = roleNameForCellId(appInfo!, signal.cell_id);

	return roleName === role;
}
export class ZomeClient<SIGNAL_PAYLOAD> {
	constructor(
		public client: AppClient,
		public roleName: string,
		public zomeName: string,
	) {}

	onSignal(
		listener: (eventData: SIGNAL_PAYLOAD) => void | Promise<void>,
	): UnsubscribeFunction {
		return this.client.on('signal', async signal => {
			if (!(SignalType.App in signal)) return;
			const appSignal = signal[SignalType.App];
			if (
				(await isSignalFromCellWithRole(
					this.client,
					this.roleName,
					appSignal,
				)) &&
				this.zomeName === appSignal.zome_name
			) {
				listener(appSignal.payload as SIGNAL_PAYLOAD);
			}
		});
	}

	protected callZome(fn_name: string, payload: any) {
		const req: AppCallZomeRequest = {
			role_name: this.roleName,
			zome_name: this.zomeName,
			fn_name,
			payload,
		};
		return this.client.callZome(req);
	}
}

/**
 * The type for the signal that the scaffolding tool produces in the post_commit of the coordinator zomes
 */
export type ActionCommittedSignal<
	ET extends { type: string },
	LT extends string,
> =
	| {
			type: 'EntryCreated';
			action: SignedActionHashed<Create>;
			app_entry: ET;
	  }
	| {
			type: 'EntryUpdated';
			action: SignedActionHashed<Update>;
			app_entry: ET;
			original_app_entry: ET;
	  }
	| {
			type: 'EntryDeleted';
			action: SignedActionHashed<Delete>;
			original_app_entry: ET;
	  }
	| {
			type: 'LinkCreated';
			action: SignedActionHashed<CreateLink>;
			link_type: LT;
	  }
	| {
			type: 'LinkDeleted';
			action: SignedActionHashed<DeleteLink>;
			create_link_action: SignedActionHashed<CreateLink>;
			link_type: LT;
	  };

export type LinkTypeForSignal<S> =
	S extends ActionCommittedSignal<any, infer LT> ? LT : string;

export enum HashType {
	AGENT,
	ENTRY,
	DHTOP,
	ACTION,
	DNA,
}

export const AGENT_PREFIX = 'hCAk';
export const ENTRY_PREFIX = 'hCEk';
export const DHTOP_PREFIX = 'hCQk';
export const DNA_PREFIX = 'hC0k';
export const ACTION_PREFIX = 'hCkk';

function getPrefix(type: HashType) {
	switch (type) {
		case HashType.AGENT:
			return AGENT_PREFIX;
		case HashType.ENTRY:
			return ENTRY_PREFIX;
		case HashType.DHTOP:
			return DHTOP_PREFIX;
		case HashType.ACTION:
			return ACTION_PREFIX;
		case HashType.DNA:
			return DNA_PREFIX;
		default:
			return '';
	}
}

export function retype(hash: HoloHash, type: HashType): HoloHash {
	return new Uint8Array([
		...Base64.toUint8Array(getPrefix(type)),
		...hash.slice(3),
	]);
}

export class HoloHashMap<K extends HoloHash, V> implements Map<K, V> {
	_map: Map<string, V>;

	constructor(initialEntries?: Array<[K, V]>) {
		this._map = new Map();
		if (initialEntries) {
			for (const [key, value] of initialEntries) {
				this.set(key, value);
			}
		}
	}

	has(key: K) {
		return this._map.has(encodeHashToBase64(key));
	}

	get(key: K): V {
		return this._map.get(encodeHashToBase64(key))!;
	}

	set(key: K, value: V) {
		this._map.set(encodeHashToBase64(key), value);
		return this;
	}

	delete(key: K) {
		return this._map.delete(encodeHashToBase64(key));
	}

	keys() {
		return Array.from(this._map.keys())
			.map(h => decodeHashFromBase64(h) as K)
			[Symbol.iterator]();
	}

	values() {
		return this._map.values();
	}

	entries() {
		return Array.from(this._map.entries())
			.map(([h, v]) => [decodeHashFromBase64(h), v] as [K, V])
			[Symbol.iterator]();
	}

	clear() {
		return this._map.clear();
	}

	forEach(
		callbackfn: (value: V, key: K, map: Map<K, V>) => void,
		thisArg?: any,
	): void {
		return this._map.forEach((value, key) => {
			callbackfn(value, decodeHashFromBase64(key) as K, this);
		}, thisArg);
	}

	get size() {
		return this._map.size;
	}

	[Symbol.iterator](): IterableIterator<[K, V]> {
		return this.entries();
	}

	get [Symbol.toStringTag](): string {
		return this._map[Symbol.toStringTag];
	}
}

// Subset of ReadonlyMap, with only the get function
export interface GetonlyMap<K, V> {
	get(key: K): V;
}

export class MemoMap<K, V> implements GetonlyMap<K, V> {
	map = new Map<K, V>();

	constructor(protected newValue: (hash: K) => V) {}

	get(hash: K): V {
		if (!this.map.has(hash)) {
			this.map.set(hash, this.newValue(hash));
		}
		return this.map.get(hash)!;
	}
}

export class MemoHoloHashMap<K extends HoloHash, V>
	implements GetonlyMap<K, V>
{
	map = new HoloHashMap<K, V>();

	constructor(protected newValue: (hash: K) => V) {}

	get(hash: K): V {
		if (!this.map.has(hash)) {
			this.map.set(hash, this.newValue(hash));
		}
		return this.map.get(hash);
	}
}

export function timestampToMillis(timestamp: Timestamp): number {
	return Math.floor(timestamp / 1000);
}

export function decodeEntry<T>(record: Record): T | undefined {
	const entry = (record.entry as any)?.Present?.entry;
	return decode(entry) as T;
}

export class EntryRecord<T> {
	constructor(public record: Record) {}

	get actionHash() {
		return this.record.signed_action.hashed.hash;
	}

	get action() {
		const action = this.record.signed_action.hashed.content;
		return {
			...action,
			timestamp: timestampToMillis(action.timestamp),
		};
	}

	get entry() {
		return decodeEntry<T>(this.record);
	}

	get entryHash() {
		return (this.record.signed_action.hashed.content as Create).entry_hash;
	}
}

export function decodeCountersignedEntry<T>(record: Record): T | undefined {
	const entry = (record.entry as any)?.Present?.entry[1];
	return decode(entry) as T;
}

export class CountersignedEntryRecord<T> extends EntryRecord<T> {
	get entry(): T {
		return decodeCountersignedEntry(this.record) as T;
	}
}
export function mapValues<K extends HoloHash, V, U>(
	map: ReadonlyMap<K, V>,
	mappingFn: (value: V, key: K) => U,
): HoloHashMap<K, U> {
	const mappedMap = new HoloHashMap<K, U>();

	for (const [key, value] of map.entries()) {
		mappedMap.set(key, mappingFn(value, key));
	}
	return mappedMap;
}
export function slice<K extends HoloHash, V>(
	map: GetonlyMap<K, V>,
	keys: K[],
): ReadonlyMap<K, V> {
	const newMap = new HoloHashMap<K, V>();

	for (const key of keys) {
		newMap.set(key, map.get(key));
	}
	return newMap;
}
