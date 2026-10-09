import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		include: ["test/**/*.test.ts"],
		testTimeout: 20000,
		// Forks: one real process per file, so tests may chdir and commands that spawn children behave.
		pool: "forks",
	},
});
