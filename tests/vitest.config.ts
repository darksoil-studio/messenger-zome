import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		dangerouslyIgnoreUnhandledErrors: true,
		poolOptions: {
			forks: {
				maxForks: 4,
				// singleFork: true,
			},
			// threads: {
			// 	singleThread: true,
			// },
		},
		testTimeout: 60 * 1000 * 20, // 20  mins
	},
});
