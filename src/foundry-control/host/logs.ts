/** Log queries against the Foundry container and its on-disk log files. Read-only. */

import type { HostConfig } from "./config.ts";
import type { RemoteHost } from "./remote.ts";

export interface LogQuery {
	lines?: number;
	since?: string;
	until?: string;
	/** A `grep -E` pattern, matched case-insensitively. */
	grep?: string;
	source?: "container" | "error" | "debug";
}

export function logCommand(config: HostConfig, q: LogQuery): string {
	const source = q.source ?? "container";
	const tail = q.lines === undefined ? "" : ` --tail ${q.lines}`;
	if (source === "container") {
		let command = `docker logs${tail}`;
		if (q.since) command += ` --since ${q.since}`;
		if (q.until) command += ` --until ${q.until}`;
		command += ` ${config.container} 2>&1`;
		if (q.grep) command += ` | grep -iE "${q.grep}"`;
		return command;
	}
	let command = `tail -n ${q.lines ?? 50} ${config.dataPath}/Logs/${source}.*.log 2>/dev/null`;
	if (q.grep) command += ` | grep -iE "${q.grep}"`;
	return command;
}

export async function queryLogs(host: RemoteHost, config: HostConfig, q: LogQuery): Promise<string> {
	const command = logCommand(config, q);
	const result = await host.run(command);
	if (result.code > 1) throw new Error(`Log query failed: ${result.stderr.trim()}`);
	// grep exits 1 on no matches and tail exits 1 when no log files exist yet; both are empty answers, not errors.
	return result.stdout.trim();
}
