/** Read-only status of the DM's Foundry host: service state, version, data layout. No mutation ever runs here. */

import type { HostConfig } from "./config.ts";
import type { RemoteHost } from "./remote.ts";

/** Foundry's `Config/options.json` — the settings the server reads at startup. */
export type FoundryOptions = Record<string, unknown>;

export interface HostStatus {
	container: string;
	/** Docker container state: `running`, `exited`, `paused`, or `missing` when the container does not exist. */
	state: string;
	/** Docker healthcheck verdict, when the container defines one. */
	healthy: string | null;
	/** Foundry VTT version, from the container image's label. */
	version: string | null;
	image: string | null;
	/** ISO timestamp of the last container start. */
	startedAt: string | null;
	/** Published ports, `container -> host`. */
	ports: { container: string; host: string }[];
	composeFile: string | null;
	dataPath: string;
	worlds: string[];
	options: FoundryOptions | null;
	warnings: string[];
}

/** One probe: a command plus how to fold its output into the status. Failures become warnings, never fatal. */
interface Probe<T> {
	command: string;
	read: (result: { code: number; stdout: string; stderr: string }) => T;
}

function jsonProbe<T>(command: string): Probe<T | null> {
	return {
		command,
		read: (r) => (r.code === 0 ? (JSON.parse(r.stdout) as T) : null),
	};
}

export async function hostStatus(host: RemoteHost, config: HostConfig): Promise<HostStatus> {
	const container = config.container;
	const stateProbe = jsonProbe<{ Status: string; StartedAt: string; Health?: { Status: string } }>(
		`docker inspect ${container} --format "{{json .State}}"`,
	);
	const labelsProbe = jsonProbe<Record<string, string>>(`docker inspect ${container} --format "{{json .Config.Labels}}"`);
	const portsProbe = jsonProbe<Record<string, { HostPort: string }[]>>(
		`docker inspect ${container} --format "{{json .NetworkSettings.Ports}}"`,
	);
	const probes: Probe<unknown>[] = [
		stateProbe,
		labelsProbe,
		portsProbe,
		{
			command: `docker inspect ${container} --format "{{.Config.Image}}"`,
			read: (r) => (r.code === 0 ? r.stdout.trim() : null),
		},
		{
			command: `docker inspect ${container} --format '{{index .Config.Labels "com.foundryvtt.version"}}'`,
			read: (r) => (r.code === 0 && r.stdout.trim() !== "" && r.stdout.trim() !== "<no value>" ? r.stdout.trim() : null),
		},
		{
			command: `cat ${config.dataPath}/Config/options.json`,
			read: (r) => (r.code === 0 ? (JSON.parse(r.stdout) as FoundryOptions) : null),
		},
		{
			command: `ls -1 ${config.dataPath}/Data/worlds`,
			read: (r) =>
				r.code === 0
					? r.stdout
							.split("\n")
							.map((line) => line.trim())
							.filter((line) => line !== "" && line !== "README.txt")
					: [],
		},
	];

	const warnings: string[] = [];
	const values: unknown[] = [];
	for (const probe of probes) {
		const result = await host.run(probe.command).catch((error: unknown) => ({
			code: 1,
			stdout: "",
			stderr: error instanceof Error ? error.message : String(error),
		}));
		try {
			values.push(probe.read(result));
		} catch (error) {
			warnings.push(`${probe.command}: unparseable output (${error instanceof Error ? error.message : String(error)})`);
			values.push(null);
		}
		if (result.code !== 0) {
			// A failed probe is a gap in the status, not a fatal error; the container-missing case fails all docker probes.
			warnings.push(`${probe.command}: ${result.stderr.trim() || `exit ${result.code}`}`);
		}
	}
	// Deduplicate probe failures: a missing container fails every docker inspect.
	const deduped = warnings.filter((warning, index) => warnings.indexOf(warning) === index);

	const [state, labels, ports, image, version, options, worlds] = values as [
		{ Status: string; StartedAt: string; Health?: { Status: string } } | null,
		Record<string, string> | null,
		Record<string, { HostPort: string }[]> | null,
		string | null,
		string | null,
		FoundryOptions | null,
		string[],
	];

	return {
		container,
		state: state ? state.Status.toLowerCase() : "missing",
		healthy: state?.Health?.Status ?? null,
		version,
		image,
		startedAt: state && !state.StartedAt.startsWith("0001-") ? state.StartedAt : null,
		ports: ports
			? Object.entries(ports).flatMap(([containerPort, mappings]) =>
					(mappings ?? []).slice(0, 1).map((m) => ({ container: containerPort, host: m.HostPort })),
				)
			: [],
		composeFile: labels?.["com.docker.compose.project.config_files"] ?? null,
		dataPath: config.dataPath,
		worlds: worlds ?? [],
		options,
		warnings: deduped,
	};
}

/** Human-readable one-screen status, as `cf foundry status` prints it. */
export function formatStatus(status: HostStatus): string {
	const lines = [
		`container: ${status.container} (${status.state}${status.healthy ? `, ${status.healthy}` : ""})`,
		`version:   ${status.version ?? "unknown"}`,
		`image:     ${status.image ?? "unknown"}`,
		`started:   ${status.startedAt ?? "not running"}`,
		`ports:     ${status.ports.map((p) => `${p.container}->${p.host}`).join(", ") || "none"}`,
		`compose:   ${status.composeFile ?? "unknown"}`,
		`data:      ${status.dataPath}`,
		`worlds:    ${status.worlds.length > 0 ? status.worlds.join(", ") : "(none installed)"}`,
	];
	if (status.warnings.length > 0) lines.push(`warnings:  ${status.warnings.join("; ")}`);
	return lines.join("\n");
}
