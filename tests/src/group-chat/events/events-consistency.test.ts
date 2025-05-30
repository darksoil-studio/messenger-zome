import { toPromise } from '@darksoil-studio/holochain-signals';
import { encodeHashToBase64 } from '@holochain/client';
import { pause, runScenario } from '@holochain/tryorama';
import { assert, expect, test } from 'vitest';

import {
	groupConsistency,
	linkDevices,
	setup,
	waitUntil,
} from '../../setup.js';

test('all events get to all the members of the group', async () => {
	await runScenario(async scenario => {
		const [alice, bob, bob2, carol] = await setup(scenario, 4);

		const info = {
			name: 'mygroup',
			avatar: undefined,
			description: 'mydescription',
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
			{
				only_admins_can_add_members: false,
				only_admins_can_edit_group_info: false,
				sync_message_history_with_new_members: false,
			},
		);

		await groupConsistency(
			[alice, bob].map(p => p.store.groupChats.get(groupHash)),
			80_000,
		);

		const eventHash1 = await bob.store.groupChats
			.get(groupHash)
			.updateGroupChatInfo(info);

		await groupConsistency(
			[alice, bob].map(p => p.store.groupChats.get(groupHash)),
		);

		let events = await toPromise(alice.store.groupChats.get(groupHash).events);
		assert.ok(events[encodeHashToBase64(eventHash1)]);
		events = await toPromise(bob.store.groupChats.get(groupHash).events);
		assert.ok(events[encodeHashToBase64(eventHash1)]);

		await alice.store.groupChats
			.get(groupHash)
			.addMember([carol.player.agentPubKey]);

		await linkDevices(
			bob.store.linkedDevicesStore,
			bob2.store.linkedDevicesStore,
		);

		await groupConsistency(
			[alice, bob, bob2, carol].map(p => p.store.groupChats.get(groupHash)),
			80_000,
		);

		events = await toPromise(carol.store.groupChats.get(groupHash).events);

		assert.equal(Object.keys(events).length, 3);
		assert.ok(events[encodeHashToBase64(eventHash1)]);

		await waitUntil(
			async () =>
				Object.keys(
					await toPromise(bob2.store.groupChats.get(groupHash).events),
				).length === 3,
			60_000,
		);

		await alice.store.groupChats
			.get(groupHash)
			.removeMember([carol.player.agentPubKey]);

		await groupConsistency(
			[alice, bob, bob2, carol].map(p => p.store.groupChats.get(groupHash)),
		);

		events = await toPromise(carol.store.groupChats.get(groupHash).events);
		assert.equal(Object.keys(events).length, 4);

		await bob.store.groupChats.get(groupHash).updateGroupChatInfo(info);

		await groupConsistency(
			[alice, bob, bob2].map(p => p.store.groupChats.get(groupHash)),
		);

		events = await toPromise(bob.store.groupChats.get(groupHash).events);
		assert.equal(Object.keys(events).length, 5);

		events = await toPromise(carol.store.groupChats.get(groupHash).events);
		assert.equal(Object.keys(events).length, 4);

		await bob.store.groupChats
			.get(groupHash)
			.addMember([carol.player.agentPubKey]);

		await groupConsistency(
			[alice, bob, bob2, carol].map(p => p.store.groupChats.get(groupHash)),
		);

		events = await toPromise(bob.store.groupChats.get(groupHash).events);
		assert.equal(Object.keys(events).length, 6);

		events = await toPromise(carol.store.groupChats.get(groupHash).events);
		assert.equal(Object.keys(events).length, 6);
		await pause(100);

		await alice.store.groupChats.get(groupHash).updateGroupChatInfo(info);
		await bob.store.groupChats.get(groupHash).updateGroupChatInfo(info);
		await bob2.store.groupChats.get(groupHash).updateGroupChatInfo(info);
		await carol.store.groupChats.get(groupHash).updateGroupChatInfo(info);

		await groupConsistency(
			[alice, bob, bob2, carol].map(p => p.store.groupChats.get(groupHash)),
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
