/** Foundry's `Config/options.json`: read it, and edit it with a validated merge (a restart picks it up). */

import type { HostConfig } from "./config.ts";
import { HostCommandError, type RemoteHost } from "./remote.ts";
import type { FoundryOptions } from "./status.ts";

/** The keys Foundry's Setup writes into options.json (as read from the live rpi4 file). */
export const OPTION_KEYS: readonly string[] = [
	"awsConfig",
	"compressSocket",
	"compressStatic",
	"cssTheme",
	"dataPath",
	"deleteNEDB",
	"fullscreen",
	"hostname",
	"hotReload",
	"language",
	"localHostname",
	"passwordSalt",
	"port",
	"protocol",
	"proxyPort",
	"proxySSL",
	"routePrefix",
	"serviceConfig",
	"sslCert",
	"sslKey",
	"telemetry",
	"tempDir",
	"unixSocket",
	"updateChannel",
	"upnp",
	"upnpLeaseDuration",
	"world",
];

/** Checks one option value against its key's constraints; returns the normalized value or throws. */
export function validateOption(key: string, value: unknown): unknown {
	if (key === "port") {
		if (typeof value !== "number" || !Number.isInteger(value) || value < 1 || value > 65535) {
			throw new Error(`Option \`port\` must be an integer between 1 and 65535, got: ${JSON.stringify(value)}`);
		}
	}
	return value;
}

export function mergeOptions(current: FoundryOptions, patch: FoundryOptions): FoundryOptions {
	const merged: FoundryOptions = { ...current };
	for (const [key, value] of Object.entries(patch)) {
		if (!OPTION_KEYS.includes(key)) {
			throw new Error(
				`Unknown option key \`${key}\`. Foundry's options.json accepts: ${OPTION_KEYS.join(", ")}`,
			);
		}
		merged[key] = validateOption(key, value);
	}
	return merged;
}

export interface OptionsWriteResult {
	options: FoundryOptions;
	restartRequired: boolean;
	warnings: string[];
}

/** Timestamp folder/file suffix, UTC: `20261006-220000`. */
export function stamp(now: Date): string {
	const pad = (n: number) => String(n).padStart(2, "0");
	return `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}-${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}`;
}

export interface OptionsReadResult {
	options: FoundryOptions;
}

/** Reads options.json from the host; null when it is absent or not valid JSON. */
export async function readOptions(host: RemoteHost, config: HostConfig): Promise<OptionsReadResult | null> {
	const command = `cat ${config.dataPath}/Config/options.json`;
	const read = await host.run(command);
	if (read.code !== 0) return null;
	try {
		return { options: JSON.parse(read.stdout) as FoundryOptions };
	} catch {
		return null;
	}
}
/** Applies a patch to options.json on the host: back the file up, read it, merge, pipe the result back. */
export async function writeOptions(
	host: RemoteHost,
	config: HostConfig,
	patch: FoundryOptions,
	now: Date = new Date(),
): Promise<OptionsWriteResult> {
	const path = `${config.dataPath}/Config/options.json`;
	const backupCommand = `cp ${path} ${path}.bak-${stamp(now)}`;
	const backup = await host.run(backupCommand);
	if (backup.code !== 0) throw new HostCommandError(`Could not back options.json up: ${backup.stderr.trim()}`, backupCommand, backup.stderr);

	const readCommand = `cat ${path}`;
	const read = await host.run(readCommand);
	if (read.code !== 0) throw new HostCommandError(`Could not read options.json: ${read.stderr.trim()}`, readCommand, read.stderr);
	let current: FoundryOptions;
	try {
		current = JSON.parse(read.stdout) as FoundryOptions;
	} catch (error) {
		throw new HostCommandError(`options.json is not valid JSON: ${error instanceof Error ? error.message : String(error)}`, readCommand, read.stderr);
	}

	const merged = mergeOptions(current, patch);
	const writeCommand = `cat > ${path}`;
	const write = await host.run(writeCommand, `${JSON.stringify(merged, null, 2)}\n`);
	if (write.code !== 0) throw new HostCommandError(`Could not write options.json: ${write.stderr.trim()}`, writeCommand, write.stderr);
	return {
		options: merged,
		restartRequired: true,
		warnings: [
			"Foundry reads options.json at startup; the change takes effect on the next restart of the world.",
			`The previous file is kept at ${path}.bak-${stamp(now)}.`,
		],
	};
}
