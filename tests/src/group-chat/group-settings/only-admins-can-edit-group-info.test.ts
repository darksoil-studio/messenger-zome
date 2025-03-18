import { encodeHashToBase64 } from '@holochain/client';
import { dhtSync, pause, runScenario } from '@holochain/tryorama';
import { toPromise, watch } from '@tnesh-stack/signals';
import { assert, expect, test } from 'vitest';

import { groupConsistency, setup, waitUntil } from '../../setup.js';

test('only_admins_can_edit_group_info allows works correctly', async () => {
	await runScenario(async scenario => {
		const [alice, bob, carol] = await setup(scenario, 3);

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

		// Non-admins can update the group info here because of the only_admins_can_edit_group_info setting

		await bob.store.groupChats.get(groupHash).updateGroupChatInfo(info);
		const updateSettingsEventHash = await alice.store.groupChats
			.get(groupHash)
			.updateGroupChatSettings({
				only_admins_can_add_members: false,
				only_admins_can_edit_group_info: true,
				sync_message_history_with_new_members: false,
			});

		await groupConsistency(
			[alice, bob].map(p => p.store.groupChats.get(groupHash)),
		);

		const events = await toPromise(bob.store.groupChats.get(groupHash).events);
		assert.ok(events[encodeHashToBase64(updateSettingsEventHash)]);

		// But not anymore; they shouldn't be able to update group info

		await expect(() =>
			bob.store.groupChats.get(groupHash).updateGroupChatInfo(info),
		).rejects.toThrow();

		await groupConsistency(
			[alice, bob].map(p => p.store.groupChats.get(groupHash)),
		);

		await alice.store.groupChats
			.get(groupHash)
			.addMember([carol.player.agentPubKey]);

		await groupConsistency(
			[alice, bob, carol].map(p => p.store.groupChats.get(groupHash)),
		);

		await expect(() =>
			carol.store.groupChats.get(groupHash).updateGroupChatInfo(info),
		).rejects.toThrow();

		await alice.store.groupChats
			.get(groupHash)
			.promoteMemberToAdmin([carol.player.agentPubKey]);

		await groupConsistency(
			[alice, bob, carol].map(p => p.store.groupChats.get(groupHash)),
		);

		await Promise.all([
			carol.store.groupChats.get(groupHash).updateGroupChatInfo(info),
			carol.store.groupChats
				.get(groupHash)
				.removeMember([bob.player.agentPubKey]),
		]);

		await groupConsistency(
			[alice, bob, carol].map(p => p.store.groupChats.get(groupHash)),
		);

		await expect(async () =>
			bob.store.groupChats.get(groupHash).updateGroupChatInfo({
				...info,
				name: 'anothername',
			}),
		).rejects.toThrow();

		// Carol deletes the group at the same time as Alice updates it
		// Should result in the group being deleted
		await Promise.all([
			carol.store.groupChats.get(groupHash).deleteGroupChat(),
			alice.store.groupChats.get(groupHash).updateGroupChatInfo({
				...info,
				name: 'anothername',
			}),
		]);

		await groupConsistency(
			[alice, carol].map(p => p.store.groupChats.get(groupHash)),
		);

		const group = await toPromise(
			alice.store.groupChats.get(groupHash).currentGroupChat,
		);

		assert.ok(group.deleted);

		await expect(async () =>
			alice.store.groupChats.get(groupHash).updateGroupChatInfo({
				...info,
				name: 'anothername',
			}),
		).rejects.toThrow();
	});
});
