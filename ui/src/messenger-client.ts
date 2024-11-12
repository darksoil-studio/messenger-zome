import { 
  SignedActionHashed,
  CreateLink,
  Link,
  DeleteLink,
  Delete,
  AppClient, 
  Record, 
  ActionHash, 
  EntryHash, 
  AgentPubKey,
} from '@holochain/client';
import { EntryRecord, ZomeClient } from '@tnesh-stack/utils';

import { MessengerSignal } from './types.js';

export class MessengerClient extends ZomeClient<MessengerSignal> {

  constructor(public client: AppClient, public roleName: string, public zomeName = 'messenger') {
    super(client, roleName, zomeName);
  }
}
