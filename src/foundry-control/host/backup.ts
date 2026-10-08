/** Shutdown-aware backup and restore of the Foundry data directory. Official guidance: Foundry is shut down before Data is copied. */

import type { HostConfig } from "./config.ts";
import { HostCommandError, type RemoteHost } from "./remote.ts";
import { stamp } from "./options.ts";

/** The host plane refused a mutation: carries the exact command the DM would be approving. */
export class RefusalError extends Error {
	readonly command: string;

	constructor(message: string, command = "") {
		super(message);
		this.command = command;
	}
}

export interface BackupOptions {
	/** Stop the world for the backup when it is running; without this, a running world is a refusal. */
	stop?: boolean;
	dest?: string;
}

export interface BackupResult {
	ok: boolean;
	dest: string;
	sha256: string | null;
	bytes: number | null;
	wasRunning: boolean;
	error?: string;
}

export interface RestoreOptions {
	archive: string;
}

export interface RestoreResult {
	ok: boolean;
	archive: string;
	keptAs: string | null;
	error?: string;
}

/** The Docker container state, coarse: `running`, `stopped`, or `missing`. */
export async function containerState(host: RemoteHost, config: HostConfig): Promise<"running" | "stopped" | "missing"> {
	const command = `docker inspect ${config.container} --format "{{json .State}}"`;
	const result = await host.run(command);
	if (result.code !== 0) return "missing";
	try {
		const state = JSON.parse(result.stdout) as { Status?: string };
		const status = (state.Status ?? "").toLowerCase();
		if (status === "running" || status === "paused" || status === "restarting") return "running";
		return "stopped";
	} catch {
		return "stopped";
	}
}

/** Everything above the last `/` of a remote POSIX path. */
export function remoteDirname(path: string): string {
	const cut = path.lastIndexOf("/");
	return cut <= 0 ? "/" : path.slice(0, cut);
}

export function backupDestDir(config: HostConfig): string {
	return `${remoteDirname(config.dataPath)}/backup-staging/foundry`;
}

function composeCommand(config: HostConfig, op: "start" | "stop"): string {
	return `docker compose -f ${config.composeFile} ${op}`;
}

/** Creates a compressed archive of the data directory, stopping the world first and bringing it back after. */
export async function createBackup(
	host: RemoteHost,
	config: HostConfig,
	opts: BackupOptions,
	now: Date = new Date(),
): Promise<BackupResult> {
	const state = await containerState(host, config);
	const wasRunning = state === "running";
	if (wasRunning && !opts.stop) {
		throw new RefusalError(
			`Foundry must be shut down before its Data directory is copied (official backup guidance); the world is ${state}. After DM approval, re-run with \`--stop\` so the adapter stops the world for the backup and starts it again after.`,
			"cf foundry backup create --stop --yes",
		);
	}
	const dest = opts.dest ?? `${backupDestDir(config)}/foundry-data-${stamp(now)}.tar.gz`;
	const parent = remoteDirname(config.dataPath);
	const name = config.dataPath.split("/").at(-1) ?? "foundry-data";
	const stopCommand = composeCommand(config, "stop");
	const startCommand = composeCommand(config, "start");
	const tarCommand = `tar -C ${parent} -czf ${dest} ${name}`;

	const ran: string[] = [];
	const runStep = async (command: string, input?: string | Buffer) => {
		ran.push(command);
		return host.run(command, input);
	};

	const mkdir = await runStep(`mkdir -p ${remoteDirname(dest)}`);
	if (mkdir.code !== 0) throw new HostCommandError(`Could not create the backup directory: ${mkdir.stderr.trim()}`, `mkdir -p ${remoteDirname(dest)}`, mkdir.stderr);
	if (wasRunning) {
		const stop = await runStep(stopCommand);
		if (stop.code !== 0) throw new HostCommandError(`Could not stop the world: ${stop.stderr.trim()}`, stopCommand, stop.stderr);
	}

	const tar = await runStep(tarCommand);
	if (tar.code !== 0) {
		if (wasRunning) await runStep(startCommand);
		return { ok: false, dest, sha256: null, bytes: null, wasRunning, error: tar.stderr.trim() };
	}

	const sum = await runStep(`sha256sum ${dest}`);
	const size = await runStep(`stat -c %s ${dest}`);
	if (wasRunning) await runStep(startCommand);

	return {
		ok: true,
		dest,
		sha256: sum.code === 0 ? (sum.stdout.trim().split(/\s+/)[0] ?? null) : null,
		bytes: size.code === 0 ? Number.parseInt(size.stdout.trim(), 10) : null,
		wasRunning,
	};
}

/** Restores a backup archive over the data directory. The world must be stopped; the current data directory is kept aside. */
export async function restoreBackup(
	host: RemoteHost,
	config: HostConfig,
	opts: RestoreOptions,
	now: Date = new Date(),
): Promise<RestoreResult> {
	const state = await containerState(host, config);
	if (state === "running") {
		throw new RefusalError(
			`A backup can only be restored into a stopped world; Foundry is ${state}. Stop it first (after DM approval), then restore.`,
			"cf foundry service stop --yes",
		);
	}
	const parent = remoteDirname(config.dataPath);
	const keptAs = `${config.dataPath}.pre-restore-${stamp(now)}`;
	const ran: string[] = [];
	const runStep = async (command: string) => {
		ran.push(command);
		return host.run(command);
	};

	const check = await runStep(`test -f ${opts.archive}`);
	if (check.code !== 0) throw new HostCommandError(`No archive at ${opts.archive}`, `test -f ${opts.archive}`, check.stderr);

	const move = await runStep(`mv ${config.dataPath} ${keptAs}`);
	if (move.code !== 0) throw new HostCommandError(`Could not move the current data directory aside: ${move.stderr.trim()}`, `mv ${config.dataPath} ${keptAs}`, move.stderr);

	const extract = await runStep(`tar -xzf ${opts.archive} -C ${parent}`);
	if (extract.code !== 0) {
		// The data directory is gone; put the kept one back so the host is exactly as it was.
		await runStep(`mv ${keptAs} ${config.dataPath}`);
		return { ok: false, archive: opts.archive, keptAs, error: extract.stderr.trim() };
	}
	return { ok: true, archive: opts.archive, keptAs };
}
