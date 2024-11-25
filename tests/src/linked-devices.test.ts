import { dhtSync, pause, runScenario } from '@holochain/tryorama';
import { toPromise } from '@tnesh-stack/signals';
import { assert, expect, test } from 'vitest';

import { linkDevices, setup, waitUntil } from './setup.js';

test('messages get to all devices', async () => {
	await runScenario(async scenario => {
		const [alice, bob, bob2] = await setup(scenario, 3);

		await linkDevices(bob.linkedDevicesStore, bob2.linkedDevicesStore);

		await dhtSync(
			[alice.player, bob.player, bob2.player],
			alice.player.cells[0].cell_id[0],
		);

		let peerChat = await toPromise(
			bob.store.peerChats.get(alice.player.agentPubKey),
		);
		assert.equal(Object.keys(peerChat.messages).length, 0);

		await alice.store.client.sendPeerMessage(
			bob.player.agentPubKey,

			{
				message: 'hey!',
				reply_to: undefined,
			},
		);

		await dhtSync(
			[alice.player, bob.player, bob2.player],
			alice.player.cells[0].cell_id[0],
		);

		peerChat = await toPromise(
			bob.store.peerChats.get(alice.player.agentPubKey),
		);
		assert.equal(Object.keys(peerChat.messages).length, 1);
		assert.equal(
			Object.values(peerChat.messages)[0].signed_content.content.message
				.message,
			'hey!',
		);

		peerChat = await toPromise(
			bob2.store.peerChats.get(alice.player.agentPubKey),
		);
		assert.equal(Object.keys(peerChat.messages).length, 1);
		assert.equal(
			Object.values(peerChat.messages)[0].signed_content.content.message
				.message,
			'hey!',
		);

		await bob.store.client.sendPeerMessage(alice.player.agentPubKey, {
			message: 'hey yourself!',
			reply_to: undefined,
		});

		await dhtSync(
			[alice.player, bob.player, bob2.player],
			alice.player.cells[0].cell_id[0],
		);

		peerChat = await toPromise(
			bob.store.peerChats.get(alice.player.agentPubKey),
		);
		assert.equal(Object.keys(peerChat.messages).length, 2);
		peerChat = await toPromise(
			alice.store.peerChats.get(bob.player.agentPubKey),
		);
		assert.equal(Object.keys(peerChat.messages).length, 2);

		peerChat = await toPromise(
			bob2.store.peerChats.get(alice.player.agentPubKey),
		);
		assert.equal(Object.keys(peerChat.messages).length, 2);
		peerChat = await toPromise(
			alice.store.peerChats.get(bob2.player.agentPubKey),
		);
		assert.equal(Object.keys(peerChat.messages).length, 2);
	});
});

test('add new device while receiving message is reconciled', async () => {
	await runScenario(async scenario => {
		const [alice, bob, bob2] = await setup(scenario, 3);

		await dhtSync(
			[alice.player, bob.player, bob2.player],
			alice.player.cells[0].cell_id[0],
		);

		await alice.store.client.sendPeerMessage(bob2.player.agentPubKey, {
			message: 'hey!',
			reply_to: undefined,
		});

		let peerChat = await toPromise(
			bob.store.peerChats.get(alice.player.agentPubKey),
		);
		assert.equal(Object.keys(peerChat.messages).length, 0);

		await alice.store.client.sendPeerMessage(bob.player.agentPubKey, {
			message: 'hey!',
			reply_to: undefined,
		});
		await linkDevices(bob.linkedDevicesStore, bob2.linkedDevicesStore);

		await dhtSync(
			[alice.player, bob.player, bob2.player],
			alice.player.cells[0].cell_id[0],
		);

		await waitUntil(
			async () =>
				Object.keys(
					(await toPromise(bob2.store.peerChats.get(alice.player.agentPubKey)))
						.messages,
				).length === 2,
			3_000,
		);
		peerChat = await toPromise(
			bob.store.peerChats.get(alice.player.agentPubKey),
		);
		assert.equal(Object.keys(peerChat.messages).length, 2);
	});
});

test('messages get synchronized even when offline', async () => {
	await runScenario(async scenario => {
		const [alice, bob, bob2] = await setup(scenario, 3);

		await bob2.player.conductor.shutDown();

		let peerChat = await toPromise(
			bob.store.peerChats.get(alice.player.agentPubKey),
		);
		assert.equal(Object.keys(peerChat.messages).length, 0);

		await alice.store.client.sendPeerMessage(
			bob.player.agentPubKey,

			{
				message: 'hey!',
				reply_to: undefined,
			},
		);

		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

		peerChat = await toPromise(
			bob.store.peerChats.get(alice.player.agentPubKey),
		);
		assert.equal(Object.keys(peerChat.messages).length, 1);
		assert.equal(
			Object.values(peerChat.messages)[0].signed_content.content.message
				.message,
			'hey!',
		);

		await bob.store.client.sendPeerMessage(alice.player.agentPubKey, {
			message: 'hey yourself!',
			reply_to: undefined,
		});

		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

		peerChat = await toPromise(
			bob.store.peerChats.get(alice.player.agentPubKey),
		);
		assert.equal(Object.keys(peerChat.messages).length, 2);
		peerChat = await toPromise(
			alice.store.peerChats.get(bob.player.agentPubKey),
		);
		assert.equal(Object.keys(peerChat.messages).length, 2);

		await bob2.startUp();

		await dhtSync(
			[alice.player, bob.player, bob2.player],
			alice.player.cells[0].cell_id[0],
		);
		await linkDevices(bob.linkedDevicesStore, bob2.linkedDevicesStore);
		await dhtSync(
			[alice.player, bob.player, bob2.player],
			alice.player.cells[0].cell_id[0],
		);

		await waitUntil(async () => {
			const peerChat = await toPromise(
				bob.store.peerChats.get(alice.player.agentPubKey),
			);
			return Object.keys(peerChat.messages).length === 2;
		}, 20_000);
	});
});
