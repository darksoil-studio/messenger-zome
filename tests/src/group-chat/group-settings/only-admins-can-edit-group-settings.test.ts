import { encodeHashToBase64 } from '@holochain/client';
import { dhtSync, pause, runScenario } from '@holochain/tryorama';
import { toPromise } from '@tnesh-stack/signals';
import { assert, expect, test } from 'vitest';

import { groupConsistency, setup, waitUntil } from '../../setup.js';

test('only admins can edit group settings', async () => {
	await runScenario(async scenario => {
		const [alice, bob, carol] = await setup(scenario, 3);

		const info = {
			name: 'mygroup',
			avatar_hash: undefined,
			description: 'mydescription',
		};
		const settings = {
			only_admins_can_add_members: false,
			only_admins_can_edit_group_info: false,
			sync_message_history_with_new_members: false,
		};

		const groupHash = await alice.store.client.createGroupChat(
			[bob.player.agentPubKey],
			info,
			settings,
		);

		await groupConsistency(
			[alice, bob].map(p => p.store.groupChats.get(groupHash)),
		);

		await expect(() =>
			bob.store.groupChats.get(groupHash).updateGroupChatSettings(settings),
		).rejects.toThrow();

		await alice.store.groupChats.get(groupHash).updateGroupChatSettings({
			only_admins_can_add_members: true,
			only_admins_can_edit_group_info: true,
			sync_message_history_with_new_members: true,
		});

		await groupConsistency(
			[alice, bob].map(p => p.store.groupChats.get(groupHash)),
		);

		let groupChat = await toPromise(
			bob.store.groupChats.get(groupHash).currentGroupChat,
		);
		assert.ok(groupChat.settings.only_admins_can_add_members);
		assert.ok(groupChat.settings.only_admins_can_edit_group_info);
		assert.ok(groupChat.settings.sync_message_history_with_new_members);

		await alice.store.groupChats
			.get(groupHash)
			.addMember([carol.player.agentPubKey]);

		await groupConsistency(
			[alice, bob, carol].map(p => p.store.groupChats.get(groupHash)),
		);

		await alice.store.groupChats
			.get(groupHash)
			.promoteMemberToAdmin([carol.player.agentPubKey]);

		await expect(() =>
			carol.store.groupChats.get(groupHash).updateGroupChatSettings(settings),
		).rejects.toThrow();

		await groupConsistency(
			[alice, bob, carol].map(p => p.store.groupChats.get(groupHash)),
		);

		await carol.store.groupChats
			.get(groupHash)
			.updateGroupChatSettings(settings);
	});
});
