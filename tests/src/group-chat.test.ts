import { dhtSync, pause, runScenario } from '@holochain/tryorama';
import { toPromise } from '@tnesh-stack/signals';
import { assert, expect, test } from 'vitest';

import { setup, waitUntil } from './setup.js';

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
test('only admins can update and delete groups', async () => {
	await runScenario(async scenario => {
		const [alice, bob, carol] = await setup(scenario, 3);

		const info = {
			name: 'mygroup',
			avatar_hash: undefined,
		};

		const groupHash = await alice.store.client.createGroupChat({
			admins: [alice.player.agentPubKey],
			members: [bob.player.agentPubKey],
			info,
		});

		await dhtSync(
			[alice.player, bob.player, carol.player],
			alice.player.cells[0].cell_id[0],
		);

		await expect(() =>
			bob.store.client.updateGroupChat(groupHash, [groupHash], {
				admins: [bob.player.agentPubKey],
				members: [],
				info,
			}),
		).rejects.toThrow();

		expect(() =>
			bob.store.client.deleteGroupChat(groupHash, groupHash),
		).toThrow();

		await dhtSync(
			[alice.player, bob.player, carol.player],
			alice.player.cells[0].cell_id[0],
		);

		let currentGroupHash = await alice.store.client.updateGroupChat(
			groupHash,
			[groupHash],
			{
				admins: [alice.player.agentPubKey, carol.player.agentPubKey],
				members: [bob.player.agentPubKey],
				info,
			},
		);

		await dhtSync(
			[alice.player, bob.player, carol.player],
			alice.player.cells[0].cell_id[0],
		);
		currentGroupHash = await carol.store.client.updateGroupChat(
			groupHash,
			[currentGroupHash],
			{
				admins: [alice.player.agentPubKey, carol.player.agentPubKey],
				members: [],
				info,
			},
		);

		await dhtSync(
			[alice.player, bob.player, carol.player],
			alice.player.cells[0].cell_id[0],
		);

		// Carol deletes the group at the same time as Alice updates it
		// Should result in the group being deleted

		await carol.store.client.deleteGroupChat(groupHash, currentGroupHash);

		await alice.store.client.updateGroupChat(groupHash, [currentGroupHash], {
			admins: [alice.player.agentPubKey, carol.player.agentPubKey],
			members: [],
			info,
		});

		await dhtSync(
			[alice.player, bob.player, carol.player],
			alice.player.cells[0].cell_id[0],
		);

		const group = await toPromise(alice.store.groupChats.get(groupHash));

		assert.equal(Object.keys(group.deletes).length, 1);

		await expect(async () =>
			alice.store.client.updateGroupChat(groupHash, [currentGroupHash], {
				admins: [alice.player.agentPubKey, carol.player.agentPubKey],
				members: [],
				info,
			}),
		).rejects.toThrow();
	});
});

test('concurrent updates of groups get reconciled', async () => {
	await runScenario(async scenario => {
		const [alice, bob] = await setup(scenario);

		const info = {
			name: 'mygroup',
			avatar_hash: undefined,
		};

		const groupHash = await alice.store.client.createGroupChat({
			admins: [alice.player.agentPubKey, bob.player.agentPubKey],
			members: [],
			info,
		});

		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

		let currentGroupHash = await alice.store.client.updateGroupChat(
			groupHash,
			[groupHash],
			{
				admins: [alice.player.agentPubKey, bob.player.agentPubKey],
				members: [],
				info: {
					name: 'alicename',
					avatar_hash: undefined,
				},
			},
		);

		await pause(1);

		let currentGroupHash2 = await bob.store.client.updateGroupChat(
			groupHash,
			[groupHash],
			{
				admins: [alice.player.agentPubKey, bob.player.agentPubKey],
				members: [],
				info: {
					name: 'bobname',
					avatar_hash: undefined,
				},
			},
		);

		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

		await waitUntil(
			async () =>
				(await toPromise(alice.store.groupChats.get(groupHash))).currentGroup
					.info.name === 'bobname',
			20_000,
		);
	});
});

test('members removed from the group cannot send messages anymore', async () => {
	await runScenario(async scenario => {
		const [alice, bob] = await setup(scenario);

		const info = {
			name: 'mygroup',
			avatar_hash: undefined,
		};

		const groupHash = await alice.store.client.createGroupChat({
			admins: [alice.player.agentPubKey],
			members: [bob.player.agentPubKey],
			info,
		});

		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

		await bob.store.client.sendGroupMessage(groupHash, groupHash, {
			message: 'hey!',
			reply_to: undefined,
		});

		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

		await alice.store.client.updateGroupChat(groupHash, [groupHash], {
			admins: [alice.player.agentPubKey],
			members: [],
			info,
		});

		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

		await expect(async () =>
			bob.store.client.sendGroupMessage(groupHash, groupHash, {
				message: 'hey!',
				reply_to: undefined,
			}),
		).rejects.toThrow();
	});
});
