import { dhtSync, pause, runScenario } from '@holochain/tryorama';
import { toPromise } from '@tnesh-stack/signals';
import { assert, expect, test } from 'vitest';

import { linkDevices, setup, waitUntil } from './setup.js';

test('messages get to all devices', async () => {
	await runScenario(async scenario => {
		const [alice, bob, bob2] = await setup(scenario, 3);

		await linkDevices(
			bob.store.linkedDevicesStore,
			bob2.store.linkedDevicesStore,
		);

		await dhtSync(
			[alice.player, bob.player, bob2.player],
			alice.player.cells[0].cell_id[0],
		);

		const peerChatHash = await alice.store.client.createPeerChat(
			bob.player.agentPubKey,
		);

		await dhtSync(
			[alice.player, bob.player, bob2.player],
			alice.player.cells[0].cell_id[0],
		);

		let messages = await toPromise(
			bob.store.peerChats.get(peerChatHash).messages,
		);
		assert.equal(Object.keys(messages).length, 0);

		await alice.store.peerChats.get(peerChatHash).sendMessage({
			message: 'hey!',
			reply_to: undefined,
		});

		await dhtSync(
			[alice.player, bob.player, bob2.player],
			alice.player.cells[0].cell_id[0],
		);

		messages = await toPromise(bob.store.peerChats.get(peerChatHash).messages);
		assert.equal(Object.keys(messages).length, 1);
		assert.equal(
			Object.values(messages)[0].event.content.message.message,
			'hey!',
		);

		messages = await toPromise(bob2.store.peerChats.get(peerChatHash).messages);
		assert.equal(Object.keys(messages).length, 1);
		assert.equal(
			Object.values(messages)[0].event.content.message.message,
			'hey!',
		);

		await bob.store.peerChats.get(peerChatHash).sendMessage({
			message: 'hey yourself!',
			reply_to: undefined,
		});

		await dhtSync(
			[alice.player, bob.player, bob2.player],
			alice.player.cells[0].cell_id[0],
		);

		messages = await toPromise(bob.store.peerChats.get(peerChatHash).messages);
		assert.equal(Object.keys(messages).length, 2);
		messages = await toPromise(
			alice.store.peerChats.get(peerChatHash).messages,
		);
		assert.equal(Object.keys(messages).length, 2);

		messages = await toPromise(bob2.store.peerChats.get(peerChatHash).messages);
		assert.equal(Object.keys(messages).length, 2);
		messages = await toPromise(
			alice.store.peerChats.get(peerChatHash).messages,
		);
		assert.equal(Object.keys(messages).length, 2);
	});
});

test('add new device while receiving message is reconciled', async () => {
	await runScenario(async scenario => {
		const [alice, bob, bob2] = await setup(scenario, 3);

		await dhtSync(
			[alice.player, bob.player, bob2.player],
			alice.player.cells[0].cell_id[0],
		);

		const peerChatHash = await alice.store.client.createPeerChat(
			bob.player.agentPubKey,
		);

		await dhtSync(
			[alice.player, bob.player, bob2.player],
			alice.player.cells[0].cell_id[0],
		);

		await alice.store.peerChats.get(peerChatHash).sendMessage({
			message: 'hey!',
			reply_to: undefined,
		});

		await dhtSync(
			[alice.player, bob.player, bob2.player],
			alice.player.cells[0].cell_id[0],
		);

		let messages = await toPromise(
			bob.store.peerChats.get(peerChatHash).messages,
		);
		assert.equal(Object.keys(messages).length, 1);

		await alice.store.peerChats.get(peerChatHash).sendMessage({
			message: 'hey!',
			reply_to: undefined,
		});
		await linkDevices(
			bob.store.linkedDevicesStore,
			bob2.store.linkedDevicesStore,
		);

		await dhtSync(
			[alice.player, bob.player, bob2.player],
			alice.player.cells[0].cell_id[0],
		);

		await waitUntil(
			async () =>
				Object.keys(
					await toPromise(bob2.store.peerChats.get(peerChatHash).messages),
				).length === 2,
			60_000,
		);
		messages = await toPromise(bob.store.peerChats.get(peerChatHash).messages);
		assert.equal(Object.keys(messages).length, 2);
	});
});

test('messages get synchronized even when offline', async () => {
	await runScenario(async scenario => {
		const [alice, bob, bob2] = await setup(scenario, 3);

		await bob2.player.conductor.shutDown();

		const peerChatHash = await alice.store.client.createPeerChat(
			bob.player.agentPubKey,
		);

		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

		let messages = await toPromise(
			bob.store.peerChats.get(peerChatHash).messages,
		);
		assert.equal(Object.keys(messages).length, 0);

		await alice.store.peerChats.get(peerChatHash).sendMessage({
			message: 'hey!',
			reply_to: undefined,
		});

		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

		messages = await toPromise(bob.store.peerChats.get(peerChatHash).messages);
		assert.equal(Object.keys(messages).length, 1);
		assert.equal(
			Object.values(messages)[0].event.content.message.message,
			'hey!',
		);

		await bob.store.peerChats.get(peerChatHash).sendMessage({
			message: 'hey yourself!',
			reply_to: undefined,
		});

		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

		messages = await toPromise(bob.store.peerChats.get(peerChatHash).messages);
		assert.equal(Object.keys(messages).length, 2);
		messages = await toPromise(
			alice.store.peerChats.get(peerChatHash).messages,
		);
		assert.equal(Object.keys(messages).length, 2);

		await bob2.startUp();

		await dhtSync(
			[alice.player, bob.player, bob2.player],
			alice.player.cells[0].cell_id[0],
		);
		await linkDevices(
			bob.store.linkedDevicesStore,
			bob2.store.linkedDevicesStore,
		);
		await dhtSync(
			[alice.player, bob.player, bob2.player],
			alice.player.cells[0].cell_id[0],
		);

		await waitUntil(async () => {
			const messages = await toPromise(
				bob.store.peerChats.get(peerChatHash).messages,
			);
			return Object.keys(messages).length === 2;
		}, 20_000);
	});
});
