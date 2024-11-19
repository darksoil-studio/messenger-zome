import {
	LinkedDevicesClient,
	LinkedDevicesStore,
} from '@darksoil-studio/linked-devices-zome';
import {
	ActionHash,
	AgentPubKey,
	AppBundleSource,
	AppCallZomeRequest,
	AppWebsocket,
	EntryHash,
	NewEntryAction,
	Record,
	encodeHashToBase64,
	fakeActionHash,
	fakeAgentPubKey,
	fakeDnaHash,
	fakeEntryHash,
} from '@holochain/client';
import { Player, Scenario, pause } from '@holochain/tryorama';
import { encode } from '@msgpack/msgpack';
import { EntryRecord } from '@tnesh-stack/utils';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { MessengerClient } from '../../ui/src/messenger-client.js';
import { MessengerStore } from '../../ui/src/messenger-store.js';

async function setupStore(player: Player) {
	patchCallZome(player.appWs as AppWebsocket);
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
	await store.client.queryPrivateMessengerEntries();
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
			patchCallZome(appWs);
			store.client.client = appWs;
			linkedDevicesStore.client.client = appWs;
		},
	};
}

export async function setup(scenario: Scenario, playerNum = 2) {
	const testHappUrl =
		dirname(fileURLToPath(import.meta.url)) +
		'/../../workdir/messenger_test.happ';

	// Add 2 players with the test hApp to the Scenario. The returned players
	// can be destructured.
	const players = await scenario.addPlayersWithApps(
		new Array(playerNum).fill({ appBundleSource: { path: testHappUrl } }),
	);

	const playersAndStores = await Promise.all(players.map(setupStore));

	// Shortcut peer discovery through gossip and register all agents in every
	// conductor of the scenario.
	await scenario.shareAllAgents();

	return playersAndStores;
}

function patchCallZome(appWs: AppWebsocket) {
	const callZome = appWs.callZome;
	appWs.callZome = async req => {
		try {
			const result = await callZome(req);
			return result;
		} catch (e) {
			if (
				!e.toString().includes('Socket is not open') &&
				!e.toString().includes('ClientClosedWithPendingRequests')
			) {
				throw e;
			}
		}
	};
}
export async function linkDevices(
	store1: LinkedDevicesStore,
	store2: LinkedDevicesStore,
) {
	const store1Passcode = [1, 3, 7, 2];
	const store2Passcode = [9, 3, 8, 4];

	await store1.client.prepareLinkDevices(store1Passcode);
	await store2.client.prepareLinkDevices(store2Passcode);

	await store1.client.initLinkDevices(
		store2.client.client.myPubKey,
		store2Passcode,
	);
	await store2.client.requestLinkDevices(
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
