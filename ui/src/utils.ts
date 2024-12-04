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

export const TYPING_INDICATOR_TTL_MS = 1 * 1000; // 1 second

export function mergeStrings(s1: string, s2: string): string {
	if (s1! < s2!) return s2;
	return s1;
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

export function mergeProfiles(
	profile1: MessengerProfile | undefined,
	profile2: MessengerProfile | undefined,
): MessengerProfile | undefined {
	if (!profile1 && !profile2) return undefined;
	if (profile1 && !profile2) return profile2;
	if (!profile1 && profile2) return profile2;
	const nickname =
		profile1!.nickname < profile2!.nickname
			? profile2!.nickname
			: profile1!.nickname;
	return {
		nickname,
		avatar_src: mergeMaybeStrings(profile1!.avatar_src, profile2!.avatar_src),
	};
}
