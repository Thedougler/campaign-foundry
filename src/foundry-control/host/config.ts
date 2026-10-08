/** Where the DM's Foundry lives. Defaults are the discovered rpi4 facts (issue #46); env overrides them. */

export interface HostConfig {
	/** The SSH target in `~/.ssh/config` / `~/.omp/agent/ssh.json` that reaches the host. */
	ssh: string;
	/** The compose file that defines the Foundry service, on the remote host. */
	composeFile: string;
	/** The Docker container running Foundry VTT. */
	container: string;
	/** The Foundry data directory on the remote host (mounted into the container as /data). */
	dataPath: string;
}

function fromEnv(env: NodeJS.ProcessEnv, name: string, fallback: string): string {
	const value = env[name];
	return value === undefined || value === "" ? fallback : value;
}

/** The host config from an environment (injectable); every field has a `CF_FOUNDRY_*` override. */
export function hostConfigFrom(env: NodeJS.ProcessEnv): HostConfig {
	return {
		ssh: fromEnv(env, "CF_FOUNDRY_SSH", "rpi4"),
		composeFile: fromEnv(env, "CF_FOUNDRY_COMPOSE", "/home/nick/compose/foundry/compose.yaml"),
		container: fromEnv(env, "CF_FOUNDRY_CONTAINER", "foundry"),
		dataPath: fromEnv(env, "CF_FOUNDRY_DATA", "/home/nick/foundry-data"),
	};
}

export function defaultHostConfig(): HostConfig {
	return hostConfigFrom(process.env);
}

export const DEFAULT_HOST_CONFIG: HostConfig = defaultHostConfig();
