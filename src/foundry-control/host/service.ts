/** Service lifecycle for the Foundry container: start/stop/restart through Docker Compose. */

import type { HostConfig } from "./config.ts";
import { HostCommandError, type RemoteHost } from "./remote.ts";

export type ServiceOp = "start" | "stop" | "restart";

export function serviceCommand(config: HostConfig, op: ServiceOp): string {
	return `docker compose -f ${config.composeFile} ${op}`;
}

export async function serviceOp(host: RemoteHost, config: HostConfig, op: ServiceOp): Promise<{ ran: string[] }> {
	const command = serviceCommand(config, op);
	const result = await host.run(command);
	if (result.code !== 0) {
		throw new HostCommandError(`docker compose ${op} failed: ${result.stderr.trim()}`, command, result.stderr);
	}
	return { ran: [command] };
}
