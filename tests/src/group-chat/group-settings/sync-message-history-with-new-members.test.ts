import { encodeHashToBase64 } from '@holochain/client';
import { dhtSync, pause, runScenario } from '@holochain/tryorama';
import { toPromise } from '@tnesh-stack/signals';
import { assert, expect, test } from 'vitest';

import { setup, waitUntil } from '../../setup.js';

test('sync_message_history_with_new_members works appropriately', async () => {
	await runScenario(async scenario => {
		const [alice, bob, carol, dave] = await setup(scenario, 4);

		const info = {
			name: 'mygroup',
			avatar: undefined,
			description: 'mydescription',
		};
		const settings = {
			only_admins_can_add_members: false,
			only_admins_can_edit_group_info: false,
			sync_message_history_with_new_members: false,
		};

		const groupHash = await alice.store.client.createGroupChat(
			undefined,
			[
				{
					agent: bob.player.agentPubKey,
					profile: undefined,
				},
			],
			info,
			settings,
		);

		await dhtSync(
			[alice.player, bob.player, carol.player],
			alice.player.cells[0].cell_id[0],
		);

		await alice.store.groupChats.get(groupHash).sendMessage({
			message: 'hey',
			reply_to: undefined,
		});

		await dhtSync(
			[alice.player, bob.player, carol.player],
			alice.player.cells[0].cell_id[0],
		);

		let messages = await toPromise(
			bob.store.groupChats.get(groupHash).messages,
		);
		assert.equal(Object.keys(messages).length, 1);

		await dhtSync(
			[alice.player, bob.player, carol.player],
			alice.player.cells[0].cell_id[0],
		);

		await bob.store.groupChats
			.get(groupHash)
			.addMember([carol.player.agentPubKey]);

		await dhtSync(
			[alice.player, bob.player, carol.player],
			alice.player.cells[0].cell_id[0],
		);

		messages = await toPromise(carol.store.groupChats.get(groupHash).messages);
		assert.equal(Object.keys(messages).length, 0);

		await alice.store.groupChats.get(groupHash).sendMessage({
			message: 'hey',
			reply_to: undefined,
		});

		await dhtSync(
			[alice.player, bob.player, carol.player, dave.player],
			alice.player.cells[0].cell_id[0],
		);

		messages = await toPromise(carol.store.groupChats.get(groupHash).messages);
		assert.equal(Object.keys(messages).length, 1);

		await alice.store.groupChats.get(groupHash).updateGroupChatSettings({
			...settings,
			sync_message_history_with_new_members: true,
		});

		await dhtSync(
			[alice.player, bob.player, carol.player, dave.player],
			alice.player.cells[0].cell_id[0],
		);

		await bob.store.groupChats
			.get(groupHash)
			.addMember([dave.player.agentPubKey]);

		await dhtSync(
			[alice.player, bob.player, carol.player, dave.player],
			alice.player.cells[0].cell_id[0],
		);

		messages = await toPromise(dave.store.groupChats.get(groupHash).messages);
		assert.equal(Object.keys(messages).length, 2);
	});
});
