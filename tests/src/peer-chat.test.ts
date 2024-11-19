import { dhtSync, pause, runScenario } from '@holochain/tryorama';
import { toPromise } from '@tnesh-stack/signals';
import { assert, expect, test } from 'vitest';

import { linkDevices, setup, waitUntil } from './setup.js';

test('send message and read it', async () => {
	await runScenario(async scenario => {
		const [alice, bob] = await setup(scenario);

		let messages = await toPromise(
			bob.store.peerChats.get(alice.player.agentPubKey),
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
			bob.store.peerChats.get(alice.player.agentPubKey),
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
			bob.store.peerChats.get(alice.player.agentPubKey),
		);
		assert.equal(Object.keys(messages).length, 2);
		messages = await toPromise(
			alice.store.peerChats.get(bob.player.agentPubKey),
		);
		assert.equal(Object.keys(messages).length, 2);
	});
});
