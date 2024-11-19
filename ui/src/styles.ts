import { sharedStyles } from '@tnesh-stack/elements';
import { css } from 'lit';

export const messengerStyles = [
	...sharedStyles,
	css`
		.message {
			border-radius: 4px;
			border: 1px solid lightgrey;
			padding: 4px;
			margin: 2px;
			box-shadow: rgba(149, 157, 165, 0.2) 2px 2px 4px;
			background-color: var(--sl-color-neutral-100, white);
		}
		.from-me {
			background-color: var(--sl-color-primary-600, blue);
			align-self: end;
			color: var(--sl-color-neutral-0, white);
		}
		.from-me sl-relative-time {
			color: var(--sl-color-neutral-100, white);
		}
		.from-me sl-format-date {
			color: var(--sl-color-neutral-100, white);
		}
		.from-me span {
			color: var(--sl-color-neutral-100, white);
		}
	`,
];
