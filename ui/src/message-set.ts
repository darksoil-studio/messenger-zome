import {
	AgentPubKey,
	EntryHashB64,
	encodeHashToBase64,
} from '@holochain/client';

import { Signed } from './types';

export const MESSAGE_SET_TIMEFRAME_INTERVAL = 60 * 1000 * 1000; // 1 minute

export interface MessageSet<T> {
	messages: Array<[EntryHashB64, Signed<T>]>;
}

export function orderInMessageSets<T>(
	messages: Record<EntryHashB64, Signed<T>>,
	agentSets: Array<Array<AgentPubKey>>,
): Array<MessageSet<T>> {
	const messageSets: MessageSet<T>[] = [];
	const orderedDescendingMessages = Object.entries(messages).sort(
		(m1, m2) => m2[1].signed_content.timestamp - m1[1].signed_content.timestamp,
	);
	for (const [messageHash, message] of orderedDescendingMessages) {
		if (messageSets.length === 0) {
			messageSets.push({
				messages: [[messageHash, message]],
			});
		} else {
			const lastMessageSet = messageSets[messageSets.length - 1];
			const lastMessage =
				lastMessageSet.messages[lastMessageSet.messages.length - 1][1];

			const lastMessageAgentSet = agentSets.find(agents =>
				agents.find(
					agent =>
						encodeHashToBase64(agent) ===
						encodeHashToBase64(lastMessage.provenance),
				),
			);

			const currentMessageAgentSet = agentSets.find(agents =>
				agents.find(
					agent =>
						encodeHashToBase64(agent) ===
						encodeHashToBase64(message.provenance),
				),
			);

			const sameProvenance = lastMessageAgentSet === currentMessageAgentSet;
			const sameTimeframe =
				lastMessage.signed_content.timestamp -
					message.signed_content.timestamp <
				MESSAGE_SET_TIMEFRAME_INTERVAL;

			if (sameProvenance && sameTimeframe) {
				lastMessageSet.messages.push([messageHash, message]);
			} else {
				messageSets.push({
					messages: [[messageHash, message]],
				});
			}
		}
	}

	return messageSets;
}
