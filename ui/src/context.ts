import { createContext } from '@lit/context';

import { MessengerStore } from './messenger-store.js';

export const messengerStoreContext =
	createContext<MessengerStore>('messenger/store');
