import { toPromise } from '@darksoil-studio/holochain-signals';
import { runScenario } from '@holochain/tryorama';
import { assert, expect, test } from 'vitest';

import { eventually, groupConsistency, setup, waitUntil } from './setup.js';

test('create a group chat, send message and read it', async () => {
	await runScenario(async scenario => {
		const [alice, bob] = await setup(scenario);

		const groupHash = await alice.store.client.createGroupChat(
			undefined,
			[
				{
					agent: bob.player.agentPubKey,
					profile: undefined,
				},
			],
			{
				name: 'mygroup',
				avatar: undefined,
				description: 'mydescription',
			},
			{
				only_admins_can_add_members: false,
				only_admins_can_edit_group_info: false,
				sync_message_history_with_new_members: false,
			},
		);

		await eventually(
			bob.store.groupChats.get(groupHash).currentGroupChat,
			groupChat => assert.equal(groupChat.info.name, 'mygroup'),
		);

		const aliceMessageHash = await alice.store.groupChats
			.get(groupHash)
			.sendMessage({
				message: 'hey!',
				reply_to: undefined,
			});

		await eventually(bob.store.groupChats.get(groupHash).messages, messages => {
			assert.equal(Object.keys(messages).length, 1);
			assert.equal(
				Object.values(messages)[0].event.content.message.message,
				'hey!',
			);
		});

		await bob.store.groupChats.get(groupHash).sendMessage({
			message: 'hey yourself!',
			reply_to: undefined,
		});

		await eventually(alice.store.groupChats.get(groupHash).messages, messages =>
			assert.equal(Object.keys(messages).length, 2),
		);

		await bob.store.groupChats
			.get(groupHash)
			.markMessagesAsRead([aliceMessageHash]);

		let readMessages = await toPromise(
			bob.store.groupChats.get(groupHash).readMessages,
		);
		assert.equal(readMessages.myReadMessages.length, 1);

		await eventually(
			alice.store.groupChats.get(groupHash).readMessages,
			readMessages => assert.equal(readMessages.myReadMessages.length, 0),
		);
	});
});

test('concurrent updates of groups get reconciled', async () => {
	await runScenario(async scenario => {
		const [alice, bob] = await setup(scenario);

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

		await groupConsistency([
			alice.store.groupChats.get(groupHash),
			bob.store.groupChats.get(groupHash),
		]);

		await alice.store.groupChats.get(groupHash).updateGroupChatInfo({
			name: 'alicename',
			avatar: undefined,
			description: 'mydescription',
		});

		await bob.store.groupChats.get(groupHash).updateGroupChatInfo({
			name: 'bobname',
			avatar: undefined,
			description: 'mydescription',
		});

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

		await groupConsistency([
			alice.store.groupChats.get(groupHash),
			bob.store.groupChats.get(groupHash),
		]);

		await bob.store.groupChats.get(groupHash).sendMessage({
			message: 'hey!',
			reply_to: undefined,
		});

		await alice.store.groupChats
			.get(groupHash)
			.removeMember([bob.player.agentPubKey]);

		await groupConsistency([
			alice.store.groupChats.get(groupHash),
			bob.store.groupChats.get(groupHash),
		]);

		await expect(async () =>
			bob.store.groupChats.get(groupHash).sendMessage({
				message: 'hey!',
				reply_to: undefined,
			}),
		).rejects.toThrow();
	});
});
