import { encodeHashToBase64 } from '@holochain/client';
import { dhtSync, pause, runScenario } from '@holochain/tryorama';
import { toPromise } from '@tnesh-stack/signals';
import { assert, expect, test } from 'vitest';

import { setup, waitUntil } from '../../setup.js';

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

		const groupHash = await alice.store.client.createGroupChat({
			my_agents: [alice.player.agentPubKey],
			other_members: [[bob.player.agentPubKey]],
			settings,
			info,
		});

		await dhtSync(
			[alice.player, bob.player, carol.player],
			alice.player.cells[0].cell_id[0],
		);

		await expect(() =>
			bob.store.groupChats.get(groupHash).updateGroupChatSettings(settings),
		).rejects.toThrow();

		// Non-admins can update the group info here because of the only_admins_can_edit_group_info setting

		const updateSettingsEventHash = await alice.store.groupChats
			.get(groupHash)
			.updateGroupChatSettings({
				only_admins_can_add_members: false,
				only_admins_can_edit_group_info: true,
				sync_message_history_with_new_members: false,
			});

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

		await expect(() =>
			carol.store.groupChats.get(groupHash).updateGroupChatSettings(settings),
		).rejects.toThrow();

		await alice.store.groupChats
			.get(groupHash)
			.promoteMemberToAdmin([carol.player.agentPubKey]);

		await dhtSync(
			[alice.player, bob.player, carol.player],
			alice.player.cells[0].cell_id[0],
		);

		await carol.store.groupChats
			.get(groupHash)
			.updateGroupChatSettings(settings);
	});
});
