import { encodeHashToBase64 } from '@holochain/client';
import { dhtSync, pause, runScenario } from '@holochain/tryorama';
import { toPromise } from '@tnesh-stack/signals';
import { assert, expect, test } from 'vitest';

import { setup, waitUntil } from './setup.js';

test('create a group chat, send message and read it', async () => {
	await runScenario(async scenario => {
		const [alice, bob] = await setup(scenario);

		const groupHash = await alice.store.client.createGroupChat({
			my_agents: [alice.player.agentPubKey],
			other_members: [[bob.player.agentPubKey]],
			info: {
				name: 'mygroup',
				avatar_hash: undefined,
				description: 'mydescription',
			},
			settings: {
				only_admins_can_add_members: false,
				only_admins_can_edit_group_info: false,
				sync_message_history_with_new_members: false,
			},
		});

		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

		let groupChat = await toPromise(
			bob.store.groupChats.get(groupHash).currentGroupChat,
		);
		assert.equal(groupChat.info.name, 'mygroup');

		const aliceMessageHash = await alice.store.groupChats
			.get(groupHash)
			.sendMessage({
				message: 'hey!',
				reply_to: undefined,
			});

		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

		let messages = await toPromise(
			bob.store.groupChats.get(groupHash).messages,
		);
		assert.equal(Object.keys(messages).length, 1);
		assert.equal(
			Object.values(messages)[0].signed_content.content.message.message,
			'hey!',
		);

		await bob.store.groupChats.get(groupHash).sendMessage({
			message: 'hey yourself!',
			reply_to: undefined,
		});

		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

		messages = await toPromise(alice.store.groupChats.get(groupHash).messages);
		assert.equal(Object.keys(messages).length, 2);

		await bob.store.groupChats
			.get(groupHash)
			.markMessagesAsRead([aliceMessageHash]);

		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

		let readMessages = await toPromise(
			bob.store.groupChats.get(groupHash).readMessages,
		);
		assert.equal(readMessages.myReadMessages.length, 1);

		readMessages = await toPromise(
			alice.store.groupChats.get(groupHash).readMessages,
		);
		assert.equal(readMessages.myReadMessages.length, 0);
	});
});

test('concurrent updates of groups get reconciled', async () => {
	await runScenario(async scenario => {
		const [alice, bob] = await setup(scenario);

		const info = {
			name: 'mygroup',
			avatar_hash: undefined,
			description: 'mydescription',
		};

		const groupHash = await alice.store.client.createGroupChat({
			my_agents: [alice.player.agentPubKey],
			other_members: [[bob.player.agentPubKey]],
			settings: {
				only_admins_can_add_members: false,
				only_admins_can_edit_group_info: false,
				sync_message_history_with_new_members: false,
			},
			info,
		});

		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

		await alice.store.groupChats.get(groupHash).updateGroupChatInfo({
			name: 'alicename',
			avatar_hash: undefined,
			description: 'mydescription',
		});

		await bob.store.groupChats.get(groupHash).updateGroupChatInfo({
			name: 'bobname',
			avatar_hash: undefined,
			description: 'mydescription',
		});

		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

		await waitUntil(
			async () =>
				(
					await toPromise(
						alice.store.groupChats.get(groupHash).currentGroupChat,
					)
				).info.name === 'bobname',
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
			description: 'mydescription',
		};

		const groupHash = await alice.store.client.createGroupChat({
			my_agents: [alice.player.agentPubKey],
			other_members: [[bob.player.agentPubKey]],
			settings: {
				only_admins_can_add_members: false,
				only_admins_can_edit_group_info: false,
				sync_message_history_with_new_members: false,
			},
			info,
		});

		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

		await bob.store.groupChats.get(groupHash).sendMessage({
			message: 'hey!',
			reply_to: undefined,
		});

		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

		await alice.store.groupChats
			.get(groupHash)
			.removeMember([bob.player.agentPubKey]);

		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

		await expect(async () =>
			bob.store.groupChats.get(groupHash).sendMessage({
				message: 'hey!',
				reply_to: undefined,
			}),
		).rejects.toThrow();
	});
});
