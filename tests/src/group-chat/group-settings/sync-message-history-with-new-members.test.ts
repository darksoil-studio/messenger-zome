import { toPromise } from '@darksoil-studio/holochain-signals';
import { pause, runScenario } from '@holochain/tryorama';
import { assert, expect, test } from 'vitest';

import { eventually, groupConsistency, setup, waitUntil } from '../../setup.js';

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

		await groupConsistency(
			[alice, bob].map(p => p.store.groupChats.get(groupHash)),
		);

		await alice.store.groupChats.get(groupHash).sendMessage({
			message: 'hey',
			reply_to: undefined,
		});

		await groupConsistency(
			[alice, bob].map(p => p.store.groupChats.get(groupHash)),
		);

		await eventually(bob.store.groupChats.get(groupHash).messages, messages => {
			assert.equal(Object.keys(messages).length, 1);
		});

		await bob.store.groupChats
			.get(groupHash)
			.addMember([carol.player.agentPubKey]);

		await groupConsistency(
			[alice, bob, carol].map(p => p.store.groupChats.get(groupHash)),
		);

		await eventually(
			carol.store.groupChats.get(groupHash).messages,
			messages => {
				assert.equal(Object.keys(messages).length, 0);
			},
		);

		await alice.store.groupChats.get(groupHash).sendMessage({
			message: 'hey',
			reply_to: undefined,
		});

		await groupConsistency(
			[alice, bob, carol].map(p => p.store.groupChats.get(groupHash)),
		);

		await eventually(carol.store.groupChats.get(groupHash).messages, messages =>
			assert.equal(Object.keys(messages).length, 1),
		);

		await alice.store.groupChats.get(groupHash).updateGroupChatSettings({
			...settings,
			sync_message_history_with_new_members: true,
		});

		await groupConsistency(
			[alice, bob, carol].map(p => p.store.groupChats.get(groupHash)),
		);

		await bob.store.groupChats
			.get(groupHash)
			.addMember([dave.player.agentPubKey]);

		await groupConsistency(
			[alice, bob, carol, dave].map(p => p.store.groupChats.get(groupHash)),
		);

		await eventually(
			dave.store.groupChats.get(groupHash).messages,
			messages => {
				assert.equal(Object.keys(messages).length, 2);
			},
		);
	});
});
