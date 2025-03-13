import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		dangerouslyIgnoreUnhandledErrors: true,
		poolOptions: {
			threads: {
				singleThread: true,
			},
		},
		testTimeout: 60 * 1000 * 30, // 30  mins
	},
});
