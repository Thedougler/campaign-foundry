import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { UsageError } from "./errors.ts";
import { toolRoot } from "./prose.ts";

/** One Vale alert, exactly as `--output=JSON` reports it. */
export interface ValeAlert {
	Check: string;
	Message: string;
	Line: number;
	Match: string;
	Severity: string;
}

/** Which rules read a pass: the gate's own `.vale.ini`, or the craft checks' `.vale-narration.ini`. */
export type ValeConfig = "gate" | "narration";

/** One prepared reading of pages under one Vale config. */
export interface ValePass {
	config: ValeConfig;
	/** Vault-relative path -> the view text. Every line break keeps the page's line numbers. */
	files: Record<string, string>;
}

/**
 * How the style layer talks to Vale (issue #62): the real binary in production, canned output in tests.
 * The adapter owns the subprocess, the scratch folder and the setup errors, so the layer has one call
 * site and no process plumbing.
 */
export interface ValeAdapter {
	/** Alerts for each file, keyed by the same vault-relative paths. Throws UsageError on bad setup. */
	check(pass: ValePass, root: string): Promise<Map<string, ValeAlert[]>>;
	/** Adapter-specific version/config fingerprint. Canned adapters may omit it. */
	fingerprint?(): Promise<string>;
}

const CONFIG_FILE: Record<ValeConfig, string> = { gate: ".vale.ini", narration: ".vale-narration.ini" };

/** The synced packages are the gate's vocabulary; without them nothing can be judged. */
function requireStyles(): void {
	for (const style of ["ai-tells", "proselint", "write-good"]) {
		if (!existsSync(join(toolRoot, `.vale/styles/${style}`))) {
			throw new UsageError(
				`The Vale ${style} package is not installed.`,
				"Run `bun run setup` (it runs `vale sync`), then `cf check` again.",
			);
		}
	}
}

/** Vale itself is missing; the run cannot start. */
function valeMissing(): never {
	throw new UsageError(
		"Vale is not installed.",
		"Install Vale 3.23 or newer (https://vale.sh/docs/install; on macOS `brew install vale`), then run `bun run setup` and `cf check` again.",
	);
}

function runVale(bin: string, args: string[]): Promise<{ stdout: string; missing: boolean }> {
	const { promise, resolve, reject } = Promise.withResolvers<{ stdout: string; missing: boolean }>();
	execFile(bin, args, { maxBuffer: 256 * 1024 * 1024 }, (error, stdout, stderr) => {
		if (error && (error as NodeJS.ErrnoException).code === "ENOENT") return resolve({ stdout: "", missing: true });
		// `--no-exit` keeps a normal run at exit 0; anything else is Vale failing, not findings.
		if (error) return reject(new Error(`vale failed: ${stderr.trim() || error.message}`));
		resolve({ stdout, missing: false });
	});
	return promise;
}

/** The real Vale: one subprocess per pass, reading a scratch folder under `<root>/.cache/check`. */
export function valeSubprocess(bin = "vale"): ValeAdapter {
	let version: Promise<string> | undefined;
	return {
		fingerprint() {
			version ??= (async () => {
				requireStyles();
				const result = await runVale(bin, ["--version"]);
				if (result.missing) valeMissing();
				return `${result.stdout.trim()}|${await valeFingerprint()}`;
			})();
			return version;
		},
		async check(pass, root) {
			const paths = Object.keys(pass.files);
			if (paths.length === 0) return new Map();
			requireStyles();
			const cacheDir = join(root, ".cache", "check");
			await mkdir(cacheDir, { recursive: true });
			const scratch = await mkdtemp(join(cacheDir, "vale-"));
			try {
				await Promise.all(
					paths.map(async (path) => {
						const file = join(scratch, path);
						await mkdir(dirname(file), { recursive: true });
						await writeFile(file, pass.files[path]!);
					}),
				);
				const { stdout, missing } = await runVale(bin, [
					"--config",
					join(toolRoot, CONFIG_FILE[pass.config]),
					"--output=JSON",
					"--no-exit",
					scratch,
				]);
				if (missing) valeMissing();
				const results = (stdout.trim() === "" ? {} : JSON.parse(stdout)) as Record<string, ValeAlert[]>;
				return new Map(
					Object.entries(results).map(([file, alerts]) => [
						file.startsWith(scratch) ? file.slice(scratch.length + 1) : file,
						alerts,
					]),
				);
			} finally {
				await rm(scratch, { recursive: true, force: true });
			}
		},
	};
}

let fingerprint: Promise<string> | undefined;

/**
 * A hash of the committed Vale configs and every synced style file: anything but the page's own text
 * that can change an alert, for the style layer's cache salt.
 */
export function valeFingerprint(): Promise<string> {
	fingerprint ??= (async () => {
		const hash = createHash("sha256");
		const add = async (file: string): Promise<void> => {
			hash.update(file);
			hash.update("\0");
			hash.update(await readFile(file, "utf8").catch(() => ""));
			hash.update("\0");
		};
		await add(join(toolRoot, ".vale.ini"));
		await add(join(toolRoot, ".vale-narration.ini"));
		const walk = async (dir: string): Promise<void> => {
			const entries = await readdir(dir, { withFileTypes: true }).catch(() => []);
			for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
				if (entry.isDirectory()) await walk(join(dir, entry.name));
				else if (entry.isFile()) await add(join(dir, entry.name));
			}
		};
		await walk(join(toolRoot, ".vale", "styles"));
		return hash.digest("hex");
	})();
	return fingerprint;
}
