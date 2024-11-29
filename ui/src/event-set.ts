import {
	AgentPubKey,
	EntryHashB64,
	encodeHashToBase64,
} from '@holochain/client';

import { Signed } from './types';

export const MESSAGE_SET_TIMEFRAME_INTERVAL = 60 * 1000 * 1000; // 1 minute

export interface EventSetsInDay<T> {
	day: Date;
	eventsSets: Array<EventSet<T>>;
}

export type EventSet<T> = Array<[EntryHashB64, Signed<T>]>;

export function orderInEventSets<T>(
	events: Record<EntryHashB64, Signed<T>>,
	agentSets: Array<Array<AgentPubKey>>,
): Array<EventSetsInDay<T>> {
	const eventsSetsInDay: EventSetsInDay<T>[] = [];
	const orderedDescendingEvents = Object.entries(events).sort(
		(m1, m2) => m2[1].signed_content.timestamp - m1[1].signed_content.timestamp,
	);
	for (const [eventHash, event] of orderedDescendingEvents) {
		if (eventsSetsInDay.length === 0) {
			const date = new Date(event.signed_content.timestamp / 1000);
			date.setHours(0);
			date.setMinutes(0);
			date.setSeconds(0);
			date.setMilliseconds(0);
			eventsSetsInDay.push({
				eventsSets: [[[eventHash, event]]],
				day: date,
			});
		} else {
			const lastEventSetsInDay = eventsSetsInDay[eventsSetsInDay.length - 1];
			const lastEventSet =
				lastEventSetsInDay.eventsSets[lastEventSetsInDay.eventsSets.length - 1];

			const lastEvent = lastEventSet[lastEventSet.length - 1][1];

			const lastMessageAgentSet = agentSets.find(agents =>
				agents.find(
					agent =>
						encodeHashToBase64(agent) ===
						encodeHashToBase64(lastEvent.provenance),
				),
			);

			const currentMessageAgentSet = agentSets.find(agents =>
				agents.find(
					agent =>
						encodeHashToBase64(agent) === encodeHashToBase64(event.provenance),
				),
			);

			const sameProvenance = lastMessageAgentSet === currentMessageAgentSet;
			const sameTimeframe =
				lastEvent.signed_content.timestamp - event.signed_content.timestamp <
				MESSAGE_SET_TIMEFRAME_INTERVAL;
			const sameType =
				(event.signed_content.content as any).type &&
				(lastEvent.signed_content.content as any).type;

			const date = new Date(event.signed_content.timestamp / 1000);
			date.setHours(0);
			date.setMinutes(0);
			date.setSeconds(0);
			date.setMilliseconds(0);

			if (date.valueOf() === lastEventSetsInDay.day.valueOf()) {
				if (sameProvenance && sameTimeframe && sameType) {
					lastEventSet.push([eventHash, event]);
				} else {
					lastEventSetsInDay.eventsSets.push([[eventHash, event]]);
				}
			} else {
				eventsSetsInDay.push({
					eventsSets: [[[eventHash, event]]],
					day: date,
				});
			}
		}
	}

	return eventsSetsInDay;
}