import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// Eval's module loader cannot resolve the project's pnpm packages. Keep package
// resolution in the same Node runtime used by preparation and the check gate.
export default {
	parse(source: string): unknown {
		const result = spawnSync("node", ["--input-type=module", "-e", 'import YAML from "yaml"; let source = ""; for await (const chunk of process.stdin) source += chunk; process.stdout.write(JSON.stringify(YAML.parse(source)));'], {
			cwd: repoRoot,
			input: source,
			encoding: "utf8",
		});
		if (result.error) throw result.error;
		if (result.status !== 0) throw new Error(`YAML parsing failed: ${result.stderr.trim()}`);
		return JSON.parse(result.stdout);
	},
};
