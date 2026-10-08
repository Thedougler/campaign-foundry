/**
 * The one place a host connection is chosen: real SSH by default, or the scripted host when
 * `CF_FOUNDRY_SCRIPTED` points at a fixture. The CLI, `cf foundry serve` and the tests all build
 * their host through this, so the fixture path is exactly the real path.
 */

import { readFile } from "node:fs/promises";
import { hostConfigFrom, type HostConfig } from "./config.ts";
import { realExec } from "./exec.ts";
import { ScriptedHost, SshHost, type RemoteHost } from "./remote.ts";

/** One scripted reply in a `CF_FOUNDRY_SCRIPTED` fixture: commands containing `match` get the reply. */
export interface ScriptedFixtureReply {
	match: string;
	stdout?: string;
	code?: number;
	stderr?: string;
}

export interface ScriptedFixture {
	replies: ScriptedFixtureReply[];
}

export interface HostConnection {
	host: RemoteHost;
	config: HostConfig;
	/** True when the host answers from a fixture instead of SSH. */
	scripted: boolean;
	/** Where the fixture came from, when scripted. */
	fixturePath?: string;
}

export async function connectHost(env: NodeJS.ProcessEnv = process.env): Promise<HostConnection> {
	const config = hostConfigFrom(env);
	const fixturePath = env.CF_FOUNDRY_SCRIPTED;
	if (fixturePath === undefined || fixturePath === "") {
		return { host: new SshHost(config.ssh, realExec), config, scripted: false };
	}
	const text = await readFile(fixturePath, "utf8");
	const fixture = JSON.parse(text) as ScriptedFixture;
	if (!Array.isArray(fixture.replies)) {
		throw new Error(`Scripted host fixture ${fixturePath} needs a replies array.`);
	}
	const replies = fixture.replies.map((reply) => ({
		match: reply.match,
		reply: { code: reply.code ?? 0, stdout: reply.stdout ?? "", stderr: reply.stderr ?? "" },
	}));
	return { host: new ScriptedHost(replies), config, scripted: true, fixturePath };
}
