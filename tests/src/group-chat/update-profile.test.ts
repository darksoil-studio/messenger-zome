import { Profile, ProfilesProvider } from '@darksoil-studio/profiles-zome';
import { AgentPubKey, encodeHashToBase64 } from '@holochain/client';
import { dhtSync, pause, runScenario } from '@holochain/tryorama';
import { Signal, toPromise } from '@darksoil-studio/holochain-signals';
import { MemoHoloHashMap } from '@darksoil-studio/holochain-utils';
import { assert, expect, test } from 'vitest';

import { MessengerStore } from '../../../ui/src/messenger-store.js';
import { groupConsistency, linkDevices, setup, waitUntil } from '../setup.js';

const profiles = new MemoHoloHashMap(
	agent => new Signal.State<Profile | undefined>(undefined),
);

function mockProfilesProvider(myPubKey: AgentPubKey) {
	const profilesProvider: ProfilesProvider = {
		config: {
			additionalFields: [],
			avatarMode: 'avatar-required',
			minNicknameLength: 3,
		},
		currentProfileForAgent: new MemoHoloHashMap(
			agent =>
				new Signal.Computed(() => ({
					status: 'completed',
					value: profiles.get(agent).get(),
				})),
		),
		myPubKey,
		profilesArePublic: false,
		async search(nameFilter) {
			return [];
		},
	};
	return {
		profilesProvider,
		updateProfile: (profile: Profile) => {
			profiles.get(myPubKey).set(profile);
		},
	};
}

test('updating the profile updates the profiles of all groups', async () => {
	await runScenario(async scenario => {
		const [alice, bob] = await setup(scenario);

		const aliceProfiles = mockProfilesProvider(alice.player.agentPubKey);

		alice.store = new MessengerStore(
			alice.store.client,
			alice.store.linkedDevicesStore,
			aliceProfiles.profilesProvider,
		);

		const bobProfiles = mockProfilesProvider(bob.player.agentPubKey);

		bob.store = new MessengerStore(
			bob.store.client,
			bob.store.linkedDevicesStore,
			bobProfiles.profilesProvider,
		);

		const info = {
			name: 'mygroup',
			avatar: undefined,
			description: 'mydescription',
		};

		let aliceProfile = {
			name: 'alice',
			avatar: undefined,
			fields: {},
		};
		aliceProfiles.updateProfile(aliceProfile);

		let bobProfile = {
			name: 'bob',
			avatar: undefined,
			fields: {},
		};
		bobProfiles.updateProfile(bobProfile);

		const groupHash = await alice.store.client.createGroupChat(
			aliceProfile,
			[
				{
					agent: bob.player.agentPubKey,
					profile: bobProfile,
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

		let groupChat = await toPromise(
			bob.store.groupChats.get(groupHash).currentGroupChat,
		);

		assert.equal(
			groupChat.members.find(member =>
				member.agents.find(
					agent =>
						encodeHashToBase64(agent) ===
						encodeHashToBase64(alice.player.agentPubKey),
				),
			).profile.name,
			'alice',
		);

		aliceProfile = {
			name: 'alice2',
			avatar: undefined,
			fields: {},
		};
		aliceProfiles.updateProfile(aliceProfile);
		await pause(100);

		await groupConsistency(
			[alice, bob].map(p => p.store.groupChats.get(groupHash)),
			80_000,
		);

		groupChat = await toPromise(
			bob.store.groupChats.get(groupHash).currentGroupChat,
		);

		assert.equal(
			groupChat.members.find(member =>
				member.agents.find(
					agent =>
						encodeHashToBase64(agent) ===
						encodeHashToBase64(alice.player.agentPubKey),
				),
			).profile.name,
			'alice2',
		);
	});
});
