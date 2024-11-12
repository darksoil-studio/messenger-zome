import {
  AgentPubKeyMap,
  decodeEntry,
  fakeEntry,
  fakeCreateAction,
  fakeUpdateEntry,
  fakeDeleteEntry,
  fakeRecord,
  pickBy,
  ZomeMock,
  HoloHashMap,
  HashType,
  hash
} from "@tnesh-stack/utils";
import {
  decodeHashFromBase64,
  NewEntryAction,
  AgentPubKey,
  ActionHash,
  EntryHash,
  Delete,
  AppClient,
  fakeAgentPubKey,
  fakeDnaHash,
  Link,
  fakeActionHash,
  SignedActionHashed,
  fakeEntryHash,
  Record,
} from "@holochain/client";
import { MessengerClient } from './messenger-client.js'

export class MessengerZomeMock extends ZomeMock implements AppClient {
  constructor(
    myPubKey?: AgentPubKey
  ) {
    super("messenger_test", "messenger", myPubKey);
  }
  
}
