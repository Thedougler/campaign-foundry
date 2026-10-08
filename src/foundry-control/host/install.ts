/** Installs and updates on the host: Foundry version pins through the compose env, module archives into `Data/modules`. */

import type { HostConfig } from "./config.ts";
import { HostCommandError, type RemoteHost } from "./remote.ts";
import { remoteDirname } from "./backup.ts";

export interface UpdateOptions {
	/** Pin a Foundry version (e.g. `14.369`) by rewriting `FOUNDRY_VERSION` in the compose `.env`; omit to float on the image tag. */
	version?: string;
}

export interface UpdateResult {
	steps: string[];
	/** The rewritten `.env` content, when a version pin was applied. */
	envWritten?: string;
}

/** Updates Foundry: optionally pin the version in the compose `.env`, then pull and recreate through compose. */
export async function updateInstall(host: RemoteHost, config: HostConfig, opts: UpdateOptions): Promise<UpdateResult> {
	const steps: string[] = [];
	const result: UpdateResult = { steps };
	const composeDir = remoteDirname(config.composeFile);

	if (opts.version !== undefined) {
		const envPath = `${composeDir}/.env`;
		const readCommand = `cat ${envPath}`;
		const read = await host.run(readCommand);
		if (read.code !== 0) throw new HostCommandError(`Could not read ${envPath}: ${read.stderr.trim()}`, readCommand, read.stderr);
		const lines = read.stdout.replace(/\n$/, "").split("\n");
		let replaced = false;
		const rewritten = lines.map((line) => {
			if (!/^FOUNDRY_VERSION=/.test(line)) return line;
			replaced = true;
			return `FOUNDRY_VERSION=${opts.version}`;
		});
		if (!replaced) rewritten.push(`FOUNDRY_VERSION=${opts.version}`);
		const content = `${rewritten.join("\n")}\n`;
		const writeCommand = `cat > ${envPath}`;
		const write = await host.run(writeCommand, content);
		if (write.code !== 0) throw new HostCommandError(`Could not write ${envPath}: ${write.stderr.trim()}`, writeCommand, write.stderr);
		steps.push(writeCommand);
		result.envWritten = content;
	}

	const pull = `docker compose -f ${config.composeFile} pull`;
	const up = `docker compose -f ${config.composeFile} up -d`;
	for (const command of [pull, up]) {
		const step = await host.run(command);
		steps.push(command);
		if (step.code !== 0) throw new HostCommandError(`Compose step failed: ${step.stderr.trim()}`, command, step.stderr);
	}
	return result;
}

export interface ModuleInstallOptions {
	zip: string;
	/** Plain directory name for `Data/modules/<name>`; no slashes or `..`. */
	name: string;
}

export async function installModuleArchive(host: RemoteHost, config: HostConfig, opts: ModuleInstallOptions): Promise<{ dir: string }> {
	if (opts.name.length === 0 || opts.name.includes("/") || opts.name.split("/").includes("..") || opts.name === "..") {
		throw new Error(`A module name is a plain directory name inside Data/modules (no slashes, no ..); got: ${opts.name || "(empty)"}`);
	}
	const dir = `${config.dataPath}/Data/modules/${opts.name}`;
	const steps = [`test -f ${opts.zip}`, `mkdir -p ${dir}`, `unzip -o ${opts.zip} -d ${dir}`];
	for (const command of steps) {
		const step = await host.run(command);
		if (step.code !== 0) throw new HostCommandError(`Module install step failed: ${step.stderr.trim()}`, command, step.stderr);
	}
	return { dir };
}
