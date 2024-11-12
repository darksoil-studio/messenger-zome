import { 
  AgentPubKey,
  EntryHash,
  NewEntryAction,
  ActionHash,
  Record,
  AppBundleSource,
  fakeActionHash,
  fakeAgentPubKey,
  fakeEntryHash,
  fakeDnaHash,
  AppCallZomeRequest,
  AppWebsocket,
  encodeHashToBase64 
} from '@holochain/client';
import { encode } from '@msgpack/msgpack';
import { Scenario } from '@holochain/tryorama';
import { EntryRecord } from '@tnesh-stack/utils';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { MessengerClient } from '../../ui/src/messenger-client.js';
import { MessengerStore } from '../../ui/src/messenger-store.js';

export async function setup(scenario: Scenario) {
  const testHappUrl =
    dirname(fileURLToPath(import.meta.url)) + '/../../workdir/messenger_test.happ';

  // Add 2 players with the test hApp to the Scenario. The returned players
  // can be destructured.
  const [alice, bob] = await scenario.addPlayersWithApps([
    { appBundleSource: { path: testHappUrl } },
    { appBundleSource: { path: testHappUrl } },
  ]);

  patchCallZome(alice.appWs as AppWebsocket);
  patchCallZome(bob.appWs as AppWebsocket);

  // Shortcut peer discovery through gossip and register all agents in every
  // conductor of the scenario.
  await scenario.shareAllAgents();

  const aliceStore = new MessengerStore(
    new MessengerClient(alice.appWs as any, 'messenger_test', 'messenger')
  );

  const bobStore = new MessengerStore(
    new MessengerClient(bob.appWs as any, 'messenger_test', 'messenger')
  );

  // Shortcut peer discovery through gossip and register all agents in every
  // conductor of the scenario.
  await scenario.shareAllAgents();

  return {
    alice: {
      player: alice,
      store: aliceStore,
    },
    bob: {
      player: bob,
      store: bobStore,
    },
  };
}

function patchCallZome(appWs: AppWebsocket) {
  const callZome = appWs.callZome;
  appWs.callZome = async req => {
    try {
      const result = await callZome(req);
      return result;
    } catch (e) {
      if (
        !e.toString().includes('Socket is not open') &&
        !e.toString().includes('ClientClosedWithPendingRequests')
      ) {
        throw e;
      }
    }
  };
}
