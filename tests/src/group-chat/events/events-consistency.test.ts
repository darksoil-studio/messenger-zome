import { encodeHashToBase64 } from '@holochain/client';
import { dhtSync, pause, runScenario } from '@holochain/tryorama';
import { toPromise } from '@tnesh-stack/signals';
import { assert, expect, test } from 'vitest';

import { linkDevices, setup, waitUntil } from '../../setup.js';

test('all events get to all the members of the group', async () => {
	await runScenario(async scenario => {
		const [alice, bob, bob2, carol] = await setup(scenario, 4);

		const info = {
			name: 'mygroup',
			avatar_hash: undefined,
			description: 'mydescription',
		};

		const groupHash = await alice.store.client.createGroupChat(
			[bob.player.agentPubKey],
			info,
			{
				only_admins_can_add_members: false,
				only_admins_can_edit_group_info: false,
				sync_message_history_with_new_members: false,
			},
		);

		await dhtSync(
			[alice.player, bob.player, bob2.player, carol.player],
			alice.player.cells[0].cell_id[0],
		);

		const eventHash1 = await bob.store.groupChats
			.get(groupHash)
			.updateGroupChatInfo(info);

		await dhtSync(
			[alice.player, bob.player, bob2.player, carol.player],
			alice.player.cells[0].cell_id[0],
		);

		let events = await toPromise(alice.store.groupChats.get(groupHash).events);
		assert.ok(events[encodeHashToBase64(eventHash1)]);
		events = await toPromise(bob.store.groupChats.get(groupHash).events);
		assert.ok(events[encodeHashToBase64(eventHash1)]);

		await alice.store.groupChats
			.get(groupHash)
			.addMember([carol.player.agentPubKey]);

		await linkDevices(bob.linkedDevicesStore, bob2.linkedDevicesStore);

		await dhtSync(
			[alice.player, bob.player, bob2.player, carol.player],
			alice.player.cells[0].cell_id[0],
		);

		events = await toPromise(carol.store.groupChats.get(groupHash).events);

		assert.equal(Object.keys(events).length, 3);
		assert.ok(events[encodeHashToBase64(eventHash1)]);

		events = await toPromise(bob2.store.groupChats.get(groupHash).events);
		assert.equal(Object.keys(events).length, 3);

		await alice.store.groupChats
			.get(groupHash)
			.removeMember([carol.player.agentPubKey]);

		await dhtSync(
			[alice.player, bob.player, bob2.player, carol.player],
			alice.player.cells[0].cell_id[0],
		);

		events = await toPromise(carol.store.groupChats.get(groupHash).events);
		assert.equal(Object.keys(events).length, 4);

		await bob.store.groupChats.get(groupHash).updateGroupChatInfo(info);

		await dhtSync(
			[alice.player, bob.player, bob2.player, carol.player],
			alice.player.cells[0].cell_id[0],
		);

		events = await toPromise(bob.store.groupChats.get(groupHash).events);
		assert.equal(Object.keys(events).length, 5);

		events = await toPromise(carol.store.groupChats.get(groupHash).events);
		assert.equal(Object.keys(events).length, 4);

		await bob.store.groupChats
			.get(groupHash)
			.addMember([carol.player.agentPubKey]);

		await dhtSync(
			[alice.player, bob.player, bob2.player, carol.player],
			alice.player.cells[0].cell_id[0],
		);

		events = await toPromise(bob.store.groupChats.get(groupHash).events);
		assert.equal(Object.keys(events).length, 6);

		events = await toPromise(carol.store.groupChats.get(groupHash).events);
		assert.equal(Object.keys(events).length, 6);

		await alice.store.groupChats.get(groupHash).updateGroupChatInfo(info);
		await bob.store.groupChats.get(groupHash).updateGroupChatInfo(info);
		await bob2.store.groupChats.get(groupHash).updateGroupChatInfo(info);
		await carol.store.groupChats.get(groupHash).updateGroupChatInfo(info);

		await dhtSync(
			[alice.player, bob.player, bob2.player, carol.player],
			alice.player.cells[0].cell_id[0],
		);

		events = await toPromise(bob.store.groupChats.get(groupHash).events);
		assert.equal(Object.keys(events).length, 10);

		events = await toPromise(bob.store.groupChats.get(groupHash).events);
		assert.equal(Object.keys(events).length, 10);

		events = await toPromise(bob2.store.groupChats.get(groupHash).events);
		assert.equal(Object.keys(events).length, 10);

		events = await toPromise(carol.store.groupChats.get(groupHash).events);
		assert.equal(Object.keys(events).length, 10);
	});
});
