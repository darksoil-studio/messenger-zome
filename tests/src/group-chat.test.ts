import { dhtSync, pause, runScenario } from '@holochain/tryorama';
import { toPromise } from '@tnesh-stack/signals';
import { assert, expect, test } from 'vitest';

import { setup } from './setup.js';

test('create a group chat, send message and read it', async () => {
	await runScenario(async scenario => {
		const [alice, bob] = await setup(scenario);

		const groupHash = await alice.store.client.createGroupChat({
			admins: [alice.player.agentPubKey],
			members: [bob.player.agentPubKey],
			info: {
				name: 'mygroup',
				avatar_hash: undefined,
			},
		});

		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

		let groupChat = await toPromise(bob.store.groupChats.get(groupHash));
		assert.equal(groupChat.currentGroup.info.name, 'mygroup');
		assert.equal(
			groupChat.originalGroup.signed_content.content.info.name,
			'mygroup',
		);

		await alice.store.client.sendGroupMessage(groupHash, groupHash, {
			message: 'hey!',
			reply_to: undefined,
		});

		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

		groupChat = await toPromise(bob.store.groupChats.get(groupHash));
		assert.equal(Object.keys(groupChat.messages).length, 1);
		assert.equal(
			Object.values(groupChat.messages)[0].signed_content.content.message
				.message,
			'hey!',
		);

		await bob.store.client.sendGroupMessage(groupHash, groupHash, {
			message: 'hey yourself!',
			reply_to: undefined,
		});

		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

		groupChat = await toPromise(alice.store.groupChats.get(groupHash));
		assert.equal(Object.keys(groupChat.messages).length, 2);
	});
});
