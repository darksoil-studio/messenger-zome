import { toPromise } from '@darksoil-studio/holochain-signals';
import { dhtSync, pause, runScenario } from '@holochain/tryorama';
import { assert, expect, test } from 'vitest';

import { eventually, setup } from './setup.js';

test('send message and read it', async () => {
	await runScenario(async scenario => {
		const [alice, bob] = await setup(scenario);

		const peerChatHash = await alice.store.client.createPeerChat(
			bob.store.client.client.myPubKey,
		);

		await eventually(bob.store.peerChats.get(peerChatHash).messages, messages =>
			assert.equal(Object.keys(messages).length, 0),
		);

		const aliceMessageHash = await alice.store.peerChats
			.get(peerChatHash)
			.sendMessage({
				message: 'hey!',
				reply_to: undefined,
			});

		await eventually(
			bob.store.peerChats.get(peerChatHash).messages,
			messages => {
				assert.equal(Object.keys(messages).length, 1);
				assert.equal(
					Object.values(messages)[0].event.content.message.message,
					'hey!',
				);
			},
		);

		await bob.store.peerChats.get(peerChatHash).sendMessage({
			message: 'hey yourself!',
			reply_to: undefined,
		});

		await eventually(bob.store.peerChats.get(peerChatHash).messages, messages =>
			assert.equal(Object.keys(messages).length, 2),
		);
		await eventually(
			alice.store.peerChats.get(peerChatHash).messages,
			messages => assert.equal(Object.keys(messages).length, 2),
		);

		await bob.store.peerChats
			.get(peerChatHash)
			.markMessagesAsRead([aliceMessageHash]);

		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

		await eventually(
			alice.store.peerChats.get(peerChatHash).messages,
			messages => assert.equal(Object.keys(messages).length, 2),
		);

		await eventually(
			alice.store.peerChats.get(peerChatHash).readMessages,
			readMessages => {
				assert.equal(readMessages.myReadMessages.length, 0);
				assert.equal(readMessages.theirReadMessages.length, 1);
			},
		);
	});
});
