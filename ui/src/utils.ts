import { Profile } from '@darksoil-studio/profiles-provider';
import { HoloHash, encodeHashToBase64 } from '@holochain/client';
import { AsyncState, Signal } from '@tnesh-stack/signals';

import { MessengerProfile } from './types';

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

export const TYPING_INDICATOR_TTL_MS = 3 * 1000; // 1 second

export function mergeStrings(s1: string, s2: string): string {
	if (s1! < s2!) return s2;
	return s1;
}

export function areEqual(profile1: Profile, profile2: Profile) {
	if (profile1.name != profile2.name) return false;
	if (profile1.avatar != profile2.avatar) return false;

	if (
		Object.keys(profile1.fields).length !== Object.keys(profile1.fields).length
	)
		return false;

	for (const key of Object.keys(profile1.fields)) {
		if (!(key in profile2)) return false;
		if (profile1.fields[key] != profile2.fields[key]) return false;
	}

	return true;
}

export function mergeMaybeStrings(
	s1: string | undefined,
	s2: string | undefined,
): string | undefined {
	if (!s1 && !s2) return undefined;
	if (s1 && !s2) return s1;
	if (!s1 && s2) return s2;
	return mergeStrings(s1!, s2!);
}

export function mergeMaybeHashes(
	h1: HoloHash | undefined,
	h2: HoloHash | undefined,
): HoloHash | undefined {
	if (!h1 && !h2) return undefined;
	if (h1 && !h2) return h1;
	if (!h1 && h2) return h2;
	if (encodeHashToBase64(h1!) < encodeHashToBase64(h2!)) return h2;
	return h1;
}

export function mergeMaybeFields(
	fields1: Record<string, string> | undefined,
	fields2: Record<string, string> | undefined,
): Record<string, string> {
	if (!fields1 && !fields2) return {};
	if (fields1 && !fields2) return fields1;
	if (!fields1 && fields2) return fields2;
	const result = { ...fields1 };

	for (const [key, value] of Object.entries(fields2!)) {
		if (key in result) {
			result[key] = mergeStrings(result[key], value);
		} else {
			result[key] = value;
		}
	}
	return result;
}

export function mergeProfiles(
	profile1: MessengerProfile | undefined,
	profile2: MessengerProfile | undefined,
): MessengerProfile | undefined {
	if (!profile1 && !profile2) return undefined;
	if (profile1 && !profile2) return profile1;
	if (!profile1 && profile2) return profile2;
	const name =
		profile1!.name < profile2!.name ? profile2!.name : profile1!.name;
	return {
		name,
		avatar: mergeMaybeStrings(profile1!.avatar, profile2!.avatar),
		fields: mergeMaybeFields(profile1?.fields, profile2?.fields),
	};
}

/** Effect */

let needsEnqueue = true;

const w = new Signal.subtle.Watcher(() => {
	if (needsEnqueue) {
		needsEnqueue = false;
		queueMicrotask(processPending);
	}
});

function processPending() {
	needsEnqueue = true;

	for (const s of w.getPending()) {
		s.get();
	}

	w.watch();
}

export function effect(callback: () => (() => void) | void) {
	let cleanup: (() => void) | void;

	const computed = new Signal.Computed(() => {
		typeof cleanup === 'function' && cleanup();
		cleanup = callback();
	});

	w.watch(computed);
	computed.get();

	return () => {
		w.unwatch(computed);
		typeof cleanup === 'function' && cleanup();
		cleanup = undefined;
	};
}
