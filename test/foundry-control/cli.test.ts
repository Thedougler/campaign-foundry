import { spawnSync } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, describe, expect, it } from "vitest";
import { cf, repoRoot } from "../check/helpers.ts";

/**
 * One `cf foundry` invocation in this process, with a scripted host fixture (CF_FOUNDRY_SCRIPTED)
 * pointed at `fixture`, or the flag cleared when none is given, the way an agent drives the command:
 * the fixture answers the host's SSH commands without reaching rpi4.
 */
async function run(args: string[], fixture?: string, stdin = "") {
	const saved = process.env.CF_FOUNDRY_SCRIPTED;
	try {
		if (fixture === undefined) delete process.env.CF_FOUNDRY_SCRIPTED;
		else process.env.CF_FOUNDRY_SCRIPTED = fixture;
		return await cf(["foundry", ...args], repoRoot, stdin);
	} finally {
		if (saved === undefined) delete process.env.CF_FOUNDRY_SCRIPTED;
		else process.env.CF_FOUNDRY_SCRIPTED = saved;
	}
}

const DOCKER_STATE = JSON.stringify({ Status: "running", StartedAt: "2026-10-05T17:05:32.615Z", Health: { Status: "healthy" } });
const DOCKER_LABELS = JSON.stringify({
	"com.docker.compose.project": "foundry",
	"com.docker.compose.project.config_files": "/home/nick/compose/foundry/compose.yaml",
	"com.docker.compose.service": "foundry",
	"com.foundryvtt.version": "14.368",
});
const OPTIONS = JSON.stringify({ port: 30000, dataPath: "/data", world: null, updateChannel: "stable" });

/** A full scripted host: the status probes, plus replies for the mutation paths tests use. */
function statusReplies(extra: { match: string; stdout?: string; code?: number }[] = []) {
	return {
		replies: [
			{ match: "{{json .State}}", stdout: DOCKER_STATE },
			{ match: "{{json .Config.Labels}}", stdout: DOCKER_LABELS },
			{ match: "{{.Config.Image}}", stdout: "felddy/foundryvtt:release\n" },
			{ match: "com.foundryvtt.version\"", stdout: "14.368\n" },
			{ match: "{{json .NetworkSettings.Ports}}", stdout: JSON.stringify({ "30000/tcp": [{ HostPort: "30000" }] }) },
			{ match: "options.json", stdout: OPTIONS },
			{ match: "Data/worlds", stdout: "\n" },
			...extra,
		],
	};
}

let fixtureDir: string;
async function fixture(replies: unknown): Promise<string> {
	if (fixtureDir === undefined) fixtureDir = await mkdtemp(join(tmpdir(), "cf-foundry-cli-"));
	const path = join(fixtureDir, `fixture-${Math.random().toString(36).slice(2)}.json`);
	await writeFile(path, JSON.stringify(replies));
	return path;
}

afterAll(async () => {
	if (fixtureDir !== undefined) await rm(fixtureDir, { recursive: true, force: true });
});

describe("cf foundry --help", () => {
	it("lists every subcommand with examples, and never crashes at import", async () => {
		const result = await run(["--help"]);
		expect(result.code).toBe(0);
		for (const name of ["status", "logs", "options", "service", "backup", "assets", "install", "serve", "tool"]) {
			expect(result.stdout, `subcommand ${name}`).toContain(name);
		}
		expect(result.stdout).toContain("Examples:");
		expect(result.stdout).toContain("cf foundry serve --token <secret>");
	});

	it("parses service --help and assets put --help (import crash or mis-parenting fails here)", async () => {
		const service = await run(["service", "--help"]);
		expect(service.code).toBe(0);
		expect(service.stdout).toContain("<op>");
		expect(service.stdout).toContain("start, stop or restart");
		const put = await run(["assets", "put", "--help"]);
		expect(put.code).toBe(0);
		expect(put.stdout).toContain("<src> <dest>");
	});
});

describe("cf foundry status", () => {
	it("prints the one-screen snapshot against a scripted host", async () => {
		const result = await run(["status"], await fixture(statusReplies()));
		expect(result.code).toBe(0);
		expect(result.stdout).toContain("container: foundry (running, healthy)");
		expect(result.stdout).toContain("version:   14.368");
		expect(result.stdout).toContain("(none installed)");
	});

	it("prints HostStatus JSON with --json", async () => {
		const result = await run(["status", "--json"], await fixture(statusReplies()));
		expect(result.code).toBe(0);
		const status = JSON.parse(result.stdout) as { container: string; version: string | null; state: string };
		expect(status).toMatchObject({ container: "foundry", version: "14.368", state: "running" });
	});
});

describe("cf foundry tool", () => {
	it("answers host.status through the registry, read-only, no module needed", async () => {
		const result = await run(["tool", "host.status"], await fixture(statusReplies()));
		expect(result.code).toBe(0);
		const status = JSON.parse(result.stdout) as { version: string | null };
		expect(status.version).toBe("14.368");
	});

	it("refuses a host mutation with the DM approval command and exit 2", async () => {
		const result = await run(["tool", "host.restart"], await fixture(statusReplies()));
		expect(result.code).toBe(2);
		expect(result.stderr).toContain("dm_gate");
		expect(result.stderr).toContain("cf foundry service restart --yes");
	});

	it("refuses a module tool with the no-module remedy and exit 1", async () => {
		const result = await run(["tool", "world.inspect"], await fixture(statusReplies()));
		expect(result.code).toBe(1);
		expect(result.stderr).toContain("no_module");
		expect(result.stderr).toContain("cf foundry serve");
	});
});

describe("cf foundry mutating commands gate on --yes", () => {
	it("service stop prints the plan and the approval command, exit 2, and runs nothing", async () => {
		const result = await run(["service", "stop"], await fixture(statusReplies()));
		expect(result.code).toBe(2);
		expect(result.stderr).toContain("Approve with: cf foundry service stop --yes");
	});

	it("service restart --yes runs the compose command against the scripted host", async () => {
		const result = await run(
			["service", "restart", "--yes"],
			await fixture(statusReplies([{ match: "docker compose", stdout: "" }])),
		);
		expect(result.code).toBe(0);
		expect(result.stdout).toContain("ran: docker compose -f /home/nick/compose/foundry/compose.yaml restart");
	});

	it("options set shows the plan until --yes, then writes through the scripted host", async () => {
		const plan = await run(["options", "set", "port=30001"], await fixture(statusReplies()));
		expect(plan.code).toBe(2);
		expect(plan.stderr).toContain("port = 30001");
		expect(plan.stderr).toContain("Approve with: cf foundry options set port=30001 --yes");
		const written = await run(
			["options", "set", "port=30001", "--yes"],
			await fixture(statusReplies([{ match: "cat >", stdout: "" }])),
		);
		expect(written.code).toBe(0);
		expect(written.stdout).toContain("restart");
	});

	it("backup create reports the host's refusal to copy a running world, with the stop command", async () => {
		const result = await run(
			["backup", "create", "--yes"],
			await fixture(statusReplies([{ match: "mkdir -p", stdout: "" }])),
		);
		expect(result.code).toBe(2);
		expect(result.stderr).toContain("shut down");
		expect(result.stderr).toContain("cf foundry backup create --stop --yes");
	});
});

describe("cf foundry serve", () => {
	it("answers MCP initialize and tools/list on stdio, then exits when stdin closes", async () => {
		const script = statusReplies();
		const path = await fixture(script);
		const env = { ...process.env, CF_FOUNDRY_SCRIPTED: path };
		const lines = [
			JSON.stringify({ jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2025-06-18" } }),
			JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" }),
			JSON.stringify({ jsonrpc: "2.0", id: 2, method: "tools/list" }),
			JSON.stringify({ jsonrpc: "2.0", id: 3, method: "tools/call", params: { name: "host.status", arguments: {} } }),
		].join("\n");
		const child = spawnSync("bun", ["run", "cf", "--", "foundry", "serve", "--port", "0", "--token", "test-token"], {
			cwd: repoRoot,
			env,
			encoding: "utf8",
			input: `${lines}\n`,
			timeout: 30_000,
		});
		expect(child.status).toBe(0);
		const stdout = child.stdout ?? "";
		const replies = stdout
			.trim()
			.split("\n")
			.filter((line) => line.startsWith("{"))
			.map((line) => JSON.parse(line) as { id?: number; result?: { protocolVersion?: string; tools?: { name: string }[]; content?: { text: string }[] } });
		expect(replies).toHaveLength(3);
		expect(replies[0]?.result?.protocolVersion).toBe("2025-06-18");
		expect(replies[1]?.result?.tools?.length).toBe(23);
		const status = JSON.parse(replies[2]?.result?.content?.[0]?.text ?? "{}") as { version: string | null };
		expect(status.version).toBe("14.368");
		expect(child.stderr).toContain("listening");
	});
});
