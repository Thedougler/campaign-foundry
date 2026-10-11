import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		include: ["test/**/*.test.ts"],
		testTimeout: 20000,
		// Forks: `runCli` chdirs per invocation (unsupported in worker threads). isolate:false
		// reuses the module graph inside each worker across files (issue #61 wall-time).
		pool: "forks",
		isolate: false,
	},
});
