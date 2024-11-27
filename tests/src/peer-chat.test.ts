import { dhtSync, pause, runScenario } from '@holochain/tryorama';
import { toPromise } from '@tnesh-stack/signals';
import { assert, expect, test } from 'vitest';

import { setup } from './setup.js';

test('send message and read it', async () => {
	await runScenario(async scenario => {
		const [alice, bob] = await setup(scenario);

		const peerChatHash = await alice.store.client.createPeerChat({
			peer_1: {
				agents: [alice.store.client.client.myPubKey],
				profile: undefined,
			},
			peer_2: {
				agents: [bob.store.client.client.myPubKey],
				profile: undefined,
			},
		});

		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

		let messages = await toPromise(
			bob.store.peerChats.get(peerChatHash).messages,
		);
		assert.equal(Object.keys(messages).length, 0);

		const aliceMessageHash = await alice.store.peerChats
			.get(peerChatHash)
			.sendMessage({
				message: 'hey!',
				reply_to: undefined,
			});

		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

		messages = await toPromise(bob.store.peerChats.get(peerChatHash).messages);
		assert.equal(Object.keys(messages).length, 1);
		assert.equal(
			Object.values(messages)[0].signed_content.content.message.message,
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

		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

		await bob.store.peerChats
			.get(peerChatHash)
			.markMessagesAsRead([aliceMessageHash]);

		messages = await toPromise(
			alice.store.peerChats.get(peerChatHash).messages,
		);
		assert.equal(Object.keys(messages).length, 2);

		let readMessages = await toPromise(
			alice.store.peerChats.get(peerChatHash).readMessages,
		);
		assert.equal(readMessages.myReadMessages.length, 0);
		assert.equal(readMessages.theirReadMessages.length, 1);
	});
});
