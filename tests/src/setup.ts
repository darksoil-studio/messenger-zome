import {
	LinkedDevicesClient,
	LinkedDevicesStore,
} from '@darksoil-studio/linked-devices-zome';
import { HoloHashB64 } from '@holochain/client';
import { Scenario, dhtSync, pause } from '@holochain/tryorama';
import { Signal, joinAsync } from '@tnesh-stack/signals';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { GroupChatStore } from '../../ui/src/group-chat-store.js';
import { MessengerClient } from '../../ui/src/messenger-client.js';
import { MessengerStore } from '../../ui/src/messenger-store.js';

const testHappUrl =
	dirname(fileURLToPath(import.meta.url)) +
	'/../../workdir/messenger_test.happ';

async function addPlayer(scenario: Scenario) {
	const player = await scenario.addPlayerWithApp({ path: testHappUrl });
	await player.conductor
		.adminWs()
		.authorizeSigningCredentials(player.cells[0].cell_id);

	const linkedDevicesStore = new LinkedDevicesStore(
		new LinkedDevicesClient(player.appWs as any, 'messenger_test'),
	);
	const store = new MessengerStore(
		new MessengerClient(player.appWs as any, 'messenger_test'),
		linkedDevicesStore,
	);
	await store.client.queryPrivateEventEntries();

	return {
		store,
		player,
		linkedDevicesStore,
		startUp: async () => {
			await player.conductor.startUp();
			const port = await player.conductor.attachAppInterface();
			const issued = await player.conductor
				.adminWs()
				.issueAppAuthenticationToken({
					installed_app_id: player.appId,
				});
			const appWs = await player.conductor.connectAppWs(issued.token, port);
			store.client.client = appWs;
			linkedDevicesStore.client.client = appWs;
		},
	};
}

async function promiseAllSequential<T>(
	fns: Array<() => Promise<T>>,
): Promise<Array<T>> {
	const results: Array<T> = [];
	for (const fn of fns) {
		results.push(await fn());
	}
	return results;
}

export async function setup(scenario: Scenario, numPlayers = 2) {
	const players = await promiseAllSequential(
		Array.from(new Array(numPlayers)).map(() => () => addPlayer(scenario)),
	);

	// Shortcut peer discovery through gossip and register all agents in every
	// conductor of the scenario.
	await scenario.shareAllAgents();

	await dhtSync(
		players.map(p => p.player),
		players[0].player.cells[0].cell_id[0],
	);

	console.log('Setup completed!');

	return players;
}

export async function linkDevices(
	store1: LinkedDevicesStore,
	store2: LinkedDevicesStore,
) {
	const store1Passcode = [1, 3, 7, 2];
	const store2Passcode = [9, 3, 8, 4];

	await store1.client.prepareLinkDevicesRequestor(
		store2.client.client.myPubKey,
		store1Passcode,
	);
	await store2.client.prepareLinkDevicesRecipient(
		store1.client.client.myPubKey,
		store2Passcode,
	);

	await store1.client.requestLinkDevices(
		store2.client.client.myPubKey,
		store2Passcode,
	);
	await store2.client.acceptLinkDevices(
		store1.client.client.myPubKey,
		store1Passcode,
	);
}
export async function waitUntil(
	condition: () => Promise<boolean>,
	timeout: number,
) {
	const start = Date.now();
	const isDone = await condition();
	if (isDone) return;
	if (timeout <= 0) throw new Error('timeout');
	await pause(1000);
	return waitUntil(condition, timeout - (Date.now() - start));
}

export async function groupConsistency(
	groups: Array<GroupChatStore>,
	timeoutMs: number = 20_000,
): Promise<void> {
	return new Promise((resolve, reject) => {
		effect(() => {
			let currentEventsHashes = joinAsync(
				groups.map(group => group.events.get()),
			);
			if (currentEventsHashes.status !== 'completed') return;

			let eh = Object.keys(currentEventsHashes.value[0]);

			for (let i = 1; i < currentEventsHashes.value.length; i++) {
				if (
					!areArrayHashesEqual(eh, Object.keys(currentEventsHashes.value[i]))
				) {
					return;
				}
			}
			resolve();
		});

		setTimeout(() => reject('Timeout'), timeoutMs);
	});
}
function areArrayHashesEqual(
	array1: Array<HoloHashB64>,
	array2: Array<HoloHashB64>,
): boolean {
	if (array1.length !== array2.length) return false;
	let sorted1 = array1.sort();
	let sorted2 = array2.sort();

	for (let i = 0; i < sorted1.length; i += 1) {
		if (sorted1[i] !== sorted2[i]) {
			return false;
		}
	}

	return true;
}

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

export function effect(callback) {
	let cleanup;

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
