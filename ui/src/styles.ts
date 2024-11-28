import { sharedStyles } from '@tnesh-stack/elements';
import { css } from 'lit';

export const messengerStyles = [
	...sharedStyles,
	css`
		.message {
			border-radius: 4px;
			border: 1px solid var(--sl-color-gray-300, lightgrey);
			padding: 4px;
			box-shadow: rgba(149, 157, 165, 0.2) 2px 2px 4px;
			background-color: var(--sl-color-neutral-100, white);
		}
		.from-me {
			right: 0;
		}
		.from-me .message {
			background-color: var(--sl-color-primary-500, blue);
			align-self: end;
			color: white;
		}
		.from-me .message sl-relative-time {
			color: white;
		}
		.from-me .message sl-format-date {
			color: white;
		}
		.from-me .message span {
			color: white;
		}

		.typing-indicator {
			display: flex;
			flex-direction: row;
			align-items: end;
			border-radius: 4px;
			height: 16px;
			padding: 0 4px;
			background: var(--sl-color-neutral-300);
			color: var(--sl-color-neutral-500);
			font-size: 24px;
		}
	`,
];
