import { dhtSync, pause, runScenario } from '@holochain/tryorama';
import { toPromise } from '@tnesh-stack/signals';
import { assert, expect, test } from 'vitest';

import { linkDevices, setup, waitUntil } from './setup.js';

test('send message and read it', async () => {
	await runScenario(async scenario => {
		const [alice, bob] = await setup(scenario);

		let messages = await toPromise(
			bob.store.peerChat.get(alice.player.agentPubKey),
		);
		assert.equal(Object.keys(messages).length, 0);

		await alice.store.client.sendPeerMessage(
			bob.player.agentPubKey,

			{
				message: 'hey!',
				reply_to: undefined,
			},
		);

		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

		messages = await toPromise(
			bob.store.peerChat.get(alice.player.agentPubKey),
		);
		assert.equal(Object.keys(messages).length, 1);
		assert.equal(
			Object.values(messages)[0].signed_content.content.message.message,
			'hey!',
		);

		await bob.store.client.sendPeerMessage(alice.player.agentPubKey, {
			message: 'hey yourself!',
			reply_to: undefined,
		});

		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

		messages = await toPromise(
			bob.store.peerChat.get(alice.player.agentPubKey),
		);
		assert.equal(Object.keys(messages).length, 2);
		messages = await toPromise(
			alice.store.peerChat.get(bob.player.agentPubKey),
		);
		assert.equal(Object.keys(messages).length, 2);
	});
});

test('messages get to all devices', async () => {
	await runScenario(async scenario => {
		const [alice, bob, bob2] = await setup(scenario, 3);

		await linkDevices(bob.linkedDevicesStore, bob2.linkedDevicesStore);

		await dhtSync(
			[alice.player, bob.player, bob2.player],
			alice.player.cells[0].cell_id[0],
		);

		let messages = await toPromise(
			bob.store.peerChat.get(alice.player.agentPubKey),
		);
		assert.equal(Object.keys(messages).length, 0);

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

		messages = await toPromise(
			bob.store.peerChat.get(alice.player.agentPubKey),
		);
		assert.equal(Object.keys(messages).length, 1);
		assert.equal(
			Object.values(messages)[0].signed_content.content.message.message,
			'hey!',
		);

		messages = await toPromise(
			bob2.store.peerChat.get(alice.player.agentPubKey),
		);
		assert.equal(Object.keys(messages).length, 1);
		assert.equal(
			Object.values(messages)[0].signed_content.content.message.message,
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

		messages = await toPromise(
			bob.store.peerChat.get(alice.player.agentPubKey),
		);
		assert.equal(Object.keys(messages).length, 2);
		messages = await toPromise(
			alice.store.peerChat.get(bob.player.agentPubKey),
		);
		assert.equal(Object.keys(messages).length, 2);

		messages = await toPromise(
			bob2.store.peerChat.get(alice.player.agentPubKey),
		);
		assert.equal(Object.keys(messages).length, 2);
		messages = await toPromise(
			alice.store.peerChat.get(bob2.player.agentPubKey),
		);
		assert.equal(Object.keys(messages).length, 2);
	});
});

test('messages get synchronized even when offline', async () => {
	await runScenario(async scenario => {
		const [alice, bob, bob2] = await setup(scenario, 3);

		await bob2.player.conductor.shutDown();

		let messages = await toPromise(
			bob.store.peerChat.get(alice.player.agentPubKey),
		);
		assert.equal(Object.keys(messages).length, 0);

		await alice.store.client.sendPeerMessage(
			bob.player.agentPubKey,

			{
				message: 'hey!',
				reply_to: undefined,
			},
		);

		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

		messages = await toPromise(
			bob.store.peerChat.get(alice.player.agentPubKey),
		);
		assert.equal(Object.keys(messages).length, 1);
		assert.equal(
			Object.values(messages)[0].signed_content.content.message.message,
			'hey!',
		);

		await bob.store.client.sendPeerMessage(alice.player.agentPubKey, {
			message: 'hey yourself!',
			reply_to: undefined,
		});

		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

		messages = await toPromise(
			bob.store.peerChat.get(alice.player.agentPubKey),
		);
		assert.equal(Object.keys(messages).length, 2);
		messages = await toPromise(
			alice.store.peerChat.get(bob.player.agentPubKey),
		);
		assert.equal(Object.keys(messages).length, 2);

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
			const messages = await toPromise(
				bob.store.peerChat.get(alice.player.agentPubKey),
			);
			return Object.keys(messages).length === 2;
		}, 20_000);
	});
});
