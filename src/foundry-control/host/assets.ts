/** Asset placement: files land inside the controlled Foundry assets folder, nothing else is writable here. */

import { readFile } from "node:fs/promises";

import type { HostConfig } from "./config.ts";
import { HostCommandError, type RemoteHost } from "./remote.ts";
import { remoteDirname } from "./backup.ts";

export interface AssetSource {
	data?: Buffer;
	/** A local file to read when `data` is not given. */
	sourcePath?: string;
	dest: string;
	/** Path relative to `Data/assets`, e.g. `tokens/hero.png`. */
}

export function assetsRoot(config: HostConfig): string {
	return `${config.dataPath}/Data/assets`;
}

function assetDestination(config: HostConfig, dest: string): string {
	if (dest.length === 0 || dest.startsWith("/") || dest.split("/").includes("..")) {
		throw new Error(`Asset destinations are relative paths inside Data/assets; got: ${dest || "(empty)"}`);
	}
	return `${assetsRoot(config)}/${dest}`;
}

/** Places one asset file under `Data/assets`, creating parent directories; returns the remote path and byte count. */
export async function putAsset(host: RemoteHost, config: HostConfig, source: AssetSource): Promise<{ dest: string; bytes: number }> {
	const dest = assetDestination(config, source.dest);
	const data = source.data ?? (source.sourcePath ? await readFile(source.sourcePath) : undefined);
	if (data === undefined) throw new Error("Give the asset bytes (`data`) or a local `sourcePath`.");

	const mkdirCommand = `mkdir -p ${remoteDirname(dest)}`;
	const mkdir = await host.run(mkdirCommand);
	if (mkdir.code !== 0) throw new HostCommandError(`Could not create the asset directory: ${mkdir.stderr.trim()}`, mkdirCommand, mkdir.stderr);

	const writeCommand = `cat > ${dest}`;
	const write = await host.run(writeCommand, data);
	if (write.code !== 0) throw new HostCommandError(`Could not write the asset: ${write.stderr.trim()}`, writeCommand, write.stderr);
	return { dest, bytes: data.length };
}
