import { encodeHashToBase64 } from '@holochain/client';
import { dhtSync, pause, runScenario } from '@holochain/tryorama';
import { toPromise } from '@tnesh-stack/signals';
import { assert, expect, test } from 'vitest';

import { setup, waitUntil } from '../../setup.js';

test('only_admins_can_add_members works appropriately', async () => {
	await runScenario(async scenario => {
		const [alice, bob, carol, dave, eric] = await setup(scenario, 5);

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
			[alice.player, bob.player, carol.player, dave.player, eric.player],
			alice.player.cells[0].cell_id[0],
		);

		await bob.store.groupChats
			.get(groupHash)
			.addMember([carol.player.agentPubKey]);

		const updateSettingsEventHash = await alice.store.groupChats
			.get(groupHash)
			.updateGroupChatSettings({
				...settings,
				only_admins_can_add_members: true,
			});

		await dhtSync(
			[alice.player, bob.player, carol.player, dave.player, eric.player],
			alice.player.cells[0].cell_id[0],
		);

		let events = await toPromise(bob.store.groupChats.get(groupHash).events);
		assert.ok(events[encodeHashToBase64(updateSettingsEventHash)]);

		await expect(() =>
			bob.store.groupChats.get(groupHash).addMember([dave.player.agentPubKey]),
		).rejects.toThrow();

		await alice.store.groupChats
			.get(groupHash)
			.addMember([dave.player.agentPubKey]);

		await dhtSync(
			[alice.player, bob.player, carol.player, dave.player, eric.player],
			alice.player.cells[0].cell_id[0],
		);

		await expect(() =>
			dave.store.groupChats.get(groupHash).addMember([eric.player.agentPubKey]),
		).rejects.toThrow();

		await alice.store.groupChats.get(groupHash).updateGroupChatSettings({
			...settings,
			only_admins_can_add_members: false,
		});

		await dhtSync(
			[alice.player, bob.player, carol.player, dave.player, eric.player],
			alice.player.cells[0].cell_id[0],
		);

		await dave.store.groupChats
			.get(groupHash)
			.addMember([eric.player.agentPubKey]);
	});
});
