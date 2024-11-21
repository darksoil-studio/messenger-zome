import { Profile, ProfilesStore } from '@darksoil-studio/profiles-zome';
import { AgentPubKey } from '@holochain/client';
import {
	AsyncComputed,
	AsyncResult,
	AsyncSignal,
	AsyncState,
	Signal,
	pipe,
} from '@tnesh-stack/signals';
import { EntryRecord } from '@tnesh-stack/utils';

export function asyncReadable<T>(
	initFn: (set: (value: T) => void) => Promise<(() => void) | void>,
) {
	let cleanup: (() => void) | void;
	const signal = new AsyncState<T>(
		{ status: 'pending' },
		{
			[Signal.subtle.watched]: async () => {
				try {
					cleanup = await initFn(value =>
						signal.set({
							status: 'completed',
							value,
						}),
					);
				} catch (error) {
					signal.set({
						status: 'error',
						error,
					});
				}
			},
			[Signal.subtle.unwatched]: () => {
				if (cleanup) cleanup();
				signal.set({
					status: 'pending',
				});
			},
		},
	);
	return signal;
}

export const TYPING_INDICATOR_TTL_MS = 1 * 1000; // 1 second
