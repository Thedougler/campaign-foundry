import { describe, expect, it } from "vitest";
import { DEFAULT_HOST_CONFIG } from "../../src/foundry-control/host/config.ts";
import { createBackup, restoreBackup } from "../../src/foundry-control/host/backup.ts";
import { putAsset } from "../../src/foundry-control/host/assets.ts";
import { installModuleArchive, updateInstall } from "../../src/foundry-control/host/install.ts";
import { logCommand, queryLogs } from "../../src/foundry-control/host/logs.ts";
import { mergeOptions, validateOption, writeOptions } from "../../src/foundry-control/host/options.ts";
import { HostCommandError, ScriptedHost, SshHost } from "../../src/foundry-control/host/remote.ts";
import { serviceOp } from "../../src/foundry-control/host/service.ts";
import { hostStatus } from "../../src/foundry-control/host/status.ts";

/** Real-shaped `docker inspect foundry --format "{{json .State}}"` output from rpi4 (2026-10-06). */
const DOCKER_STATE = JSON.stringify({
	Status: "running",
	Running: true,
	Paused: false,
	Restarting: false,
	OOMKilled: false,
	Dead: false,
	Pid: 2290276,
	ExitCode: 0,
	Error: "",
	StartedAt: "2026-10-04T22:14:33.123456789Z",
	FinishedAt: "0001-01-01T00:00:00Z",
	Health: { Status: "healthy", FailingStreak: 0, Log: [] },
});

const DOCKER_LABELS = JSON.stringify({
	"com.docker.compose.project": "foundry",
	"com.docker.compose.project.config_files": "/home/nick/compose/foundry/compose.yaml",
	"com.docker.compose.service": "foundry",
	"com.foundryvtt.version": "14.368",
});

const DOCKER_PORTS = JSON.stringify({
	"30000/tcp": [{ HostIp: "0.0.0.0", HostPort: "30000" }, { HostIp: "::", HostPort: "30000" }],
});

const OPTIONS = JSON.stringify({ port: 30000, dataPath: "/data", world: null, updateChannel: "stable", awsConfig: null });

/** A ScriptedHost preloaded with the rpi4 probes, keyed by distinctive substrings. */
function rpi4Script(): ScriptedHost {
	return new ScriptedHost([
		{ match: "{{json .State}}", reply: DOCKER_STATE },
		{ match: "{{json .Config.Labels}}", reply: DOCKER_LABELS },
		{ match: "{{.Config.Image}}", reply: "felddy/foundryvtt:release\n" },
		{ match: 'com.foundryvtt.version"', reply: "14.368\n" },
		{ match: "{{json .NetworkSettings.Ports}}", reply: DOCKER_PORTS },
		{ match: "options.json", reply: OPTIONS },
		{ match: "Data/worlds", reply: "README.txt\nmy-campaign\n" },
	]);
}

describe("SshHost", () => {
	it("runs each command through ssh with hardening flags and forwards stdin", async () => {
		const argvs: string[][] = [];
		const inputs: (string | Buffer)[] = [];
		const host = new SshHost("rpi4", async (file, args, opts) => {
			expect(file).toBe("ssh");
			argvs.push(args);
			inputs.push(opts.input ?? "");
			return { code: 0, stdout: "ok", stderr: "" };
		});
		await host.run("docker ps");
		await host.run("cat > /tmp/x", "hello");
		expect(argvs[0]).toEqual(["-o", "BatchMode=yes", "-o", "ConnectTimeout=10", "rpi4", "docker ps"]);
		expect(argvs[1]?.at(-1)).toBe("cat > /tmp/x");
		expect(inputs[1]).toBe("hello");
	});

	it("reports a nonzero exit as a result, not a throw", async () => {
		const host = new SshHost("rpi4", async () => ({ code: 1, stdout: "", stderr: "No such container" }));
		const result = await host.run("docker inspect nope");
		expect(result).toEqual({ code: 1, stdout: "", stderr: "No such container" });
	});
});

describe("ScriptedHost", () => {
	it("replies by substring match and records every command it ran, matched or not", async () => {
		const host = rpi4Script();
		const state = await host.run('docker inspect foundry --format "{{json .State}}"');
		expect(state.code).toBe(0);
		expect(JSON.parse(state.stdout)).toMatchObject({ Status: "running" });
		await expect(host.run("docker ps")).rejects.toBeInstanceOf(HostCommandError);
		expect(host.ran).toEqual(['docker inspect foundry --format "{{json .State}}"', "docker ps"]);
	});

	it("fails a command with no scripted reply", async () => {
		const host = new ScriptedHost([]);
		await expect(host.run("uname")).rejects.toBeInstanceOf(HostCommandError);
	});
});

describe("hostStatus", () => {
	it("reports version, service state, ports, compose file, worlds and options from the probes", async () => {
		const host = rpi4Script();
		const status = await hostStatus(host, DEFAULT_HOST_CONFIG);
		expect(status.state).toBe("running");
		expect(status.healthy).toBe("healthy");
		expect(status.version).toBe("14.368");
		expect(status.image).toBe("felddy/foundryvtt:release");
		expect(status.composeFile).toBe("/home/nick/compose/foundry/compose.yaml");
		expect(status.ports).toEqual([{ container: "30000/tcp", host: "30000" }]);
		expect(status.worlds).toEqual(["my-campaign"]);
		expect(status.options).toMatchObject({ port: 30000, dataPath: "/data" });
		expect(status.warnings).toEqual([]);
	});

	it("degrades a failed probe to a warning and keeps the rest of the status", async () => {
		const host = new ScriptedHost([
			{ match: "{{json .State}}", reply: { code: 1, stdout: "", stderr: "No such object: foundry" } },
			{ match: "{{json .Config.Labels}}", reply: DOCKER_LABELS },
			{ match: "{{.Config.Image}}", reply: "felddy/foundryvtt:release\n" },
			{ match: 'com.foundryvtt.version"', reply: "14.368\n" },
			{ match: "{{json .NetworkSettings.Ports}}", reply: DOCKER_PORTS },
			{ match: "options.json", reply: OPTIONS },
			{ match: "Data/worlds", reply: "README.txt\n" },
		]);
		const status = await hostStatus(host, DEFAULT_HOST_CONFIG);
		expect(status.state).toBe("missing");
		expect(status.version).toBe("14.368");
		expect(status.warnings).toHaveLength(1);
		expect(status.warnings[0]).toContain('docker inspect foundry --format "{{json .State}}"');
	});
});

/** A host that reports the container state and accepts (records) every mutating command. */
function mutableHost(state: "running" | "stopped" | "missing"): ScriptedHost {
	const stateJson =
		state === "missing"
			? { code: 1, stdout: "", stderr: "Error: No such object: foundry" }
			: {
					code: 0,
					stdout: JSON.stringify({ Status: state === "running" ? "running" : "exited", StartedAt: "2026-10-04T22:14:33Z" }),
					stderr: "",
				};
	return new ScriptedHost([
		{ match: "{{json .State}}", reply: stateJson },
		{ match: "options.json", reply: JSON.stringify({ port: 30000, world: null, updateChannel: "stable" }) },
		{ match: "compose/foundry/.env", reply: "FOUNDRY_USERNAME=dm@example.com\nFOUNDRY_VERSION=14.368\nFOUNDRY_PASSWORD=secret\n" },
		// Catch-all: mutating commands succeed unless a test scripts otherwise.
		{ match: "", reply: "" },
	]);
}

describe("serviceOp", () => {
	it.each(["start", "stop", "restart"] as const)("maps %s to its docker compose command", async (op) => {
		const host = mutableHost("running");
		await serviceOp(host, DEFAULT_HOST_CONFIG, op);
		expect(host.ran).toEqual([`docker compose -f ${DEFAULT_HOST_CONFIG.composeFile} ${op}`]);
	});
});

describe("options", () => {
	it("refuses keys outside Foundry's options.json vocabulary", () => {
		expect(() => mergeOptions({ port: 30000 }, { evilKey: 1 })).toThrow(/evilKey/);
	});

	it("rejects a port outside the valid range", () => {
		expect(() => validateOption("port", 99999)).toThrow(/port/);
		expect(() => validateOption("port", "30000")).toThrow(/port/);
		expect(validateOption("port", 30000)).toBe(30000);
	});

	it("backs the file up, then pipes the merged options to the remote file", async () => {
		const host = mutableHost("running");
		const result = await writeOptions(host, DEFAULT_HOST_CONFIG, { world: "my-campaign" });
		expect(host.ran).toHaveLength(3);
		expect(host.ran[0]).toContain("cp /home/nick/foundry-data/Config/options.json");
		expect(host.ran[1]).toBe("cat /home/nick/foundry-data/Config/options.json");
		expect(host.ran[2]).toBe("cat > /home/nick/foundry-data/Config/options.json");
		expect(result.restartRequired).toBe(true);
		expect(result.options).toMatchObject({ port: 30000, world: "my-campaign", updateChannel: "stable" });
	});
});

describe("logs", () => {
	it("builds a container log command from the query", () => {
		expect(logCommand(DEFAULT_HOST_CONFIG, { lines: 5 })).toBe("docker logs --tail 5 foundry 2>&1");
		expect(logCommand(DEFAULT_HOST_CONFIG, { since: "1h", grep: "error" })).toBe(
			'docker logs --since 1h foundry 2>&1 | grep -iE "error"',
		);
	});

	it("tails the error log files from the data path", async () => {
		const host = mutableHost("running");
		host.replies.push({ match: "Logs/error", reply: "some error\n" });
		const out = await queryLogs(host, DEFAULT_HOST_CONFIG, { source: "error", lines: 2 });
		expect(out).toBe("some error");
		expect(host.ran[0]).toBe("tail -n 2 /home/nick/foundry-data/Logs/error.*.log 2>/dev/null");
	});
});

describe("backup", () => {
	it("refuses to copy data under a running world without an explicit stop", async () => {
		const host = mutableHost("running");
		await expect(createBackup(host, DEFAULT_HOST_CONFIG, {}, new Date("2026-10-06T22:00:00Z"))).rejects.toThrow(
			/shutdown|shut down/i,
		);
		expect(host.ran.every((cmd) => !cmd.includes("tar"))).toBe(true);
	});

	it("stops, archives, hashes, and starts the world again when it was running", async () => {
		const host = mutableHost("running");
		host.replies.push(
			{ match: "sha256sum", reply: "abc123  /home/nick/backup-staging/foundry/foundry-data-20261006-220000.tar.gz\n" },
			{ match: "stat -c", reply: "48211\n" },
		);
		const result = await createBackup(host, DEFAULT_HOST_CONFIG, { stop: true }, new Date("2026-10-06T22:00:00Z"));
		expect(result.wasRunning).toBe(true);
		expect(result.dest).toBe("/home/nick/backup-staging/foundry/foundry-data-20261006-220000.tar.gz");
		expect(result.sha256).toBe("abc123");
		expect(result.bytes).toBe(48211);
		expect(host.ran[1]).toBe("mkdir -p /home/nick/backup-staging/foundry");
		expect(host.ran[2]).toBe(`docker compose -f ${DEFAULT_HOST_CONFIG.composeFile} stop`);
		expect(host.ran[3]).toBe(
			"tar -C /home/nick -czf /home/nick/backup-staging/foundry/foundry-data-20261006-220000.tar.gz foundry-data",
		);
		expect(host.ran.at(-1)).toBe(`docker compose -f ${DEFAULT_HOST_CONFIG.composeFile} start`);
	});

	it("restarts the world even when the archive step fails", async () => {
		const host = mutableHost("running");
		host.replies.push({ match: "tar -C", reply: { code: 2, stdout: "", stderr: "tar: disk full" } });
		const result = await createBackup(host, DEFAULT_HOST_CONFIG, { stop: true }, new Date("2026-10-06T22:00:00Z"));
		expect(result.ok).toBe(false);
		expect(host.ran.at(-1)).toBe(`docker compose -f ${DEFAULT_HOST_CONFIG.composeFile} start`);
	});

	it("restores only into a stopped world, keeping the current data directory aside", async () => {
		const running = mutableHost("running");
		const archive = "/home/nick/backup-staging/foundry/foundry-data-20261006-220000.tar.gz";
		await expect(restoreBackup(running, DEFAULT_HOST_CONFIG, { archive }, new Date("2026-10-06T22:00:00Z"))).rejects.toThrow(
			/stopped/,
		);
		expect(running.ran.every((cmd) => !cmd.includes("tar -xzf"))).toBe(true);

		const stopped = mutableHost("stopped");
		stopped.replies.push({ match: "test -f", reply: "" });
		const result = await restoreBackup(stopped, DEFAULT_HOST_CONFIG, { archive }, new Date("2026-10-06T22:00:00Z"));
		expect(result.keptAs).toBe("/home/nick/foundry-data.pre-restore-20261006-220000");
		expect(stopped.ran[1]).toBe(`test -f ${archive}`);
		expect(stopped.ran[2]).toBe("mv /home/nick/foundry-data /home/nick/foundry-data.pre-restore-20261006-220000");
		expect(stopped.ran[3]).toBe(`tar -xzf ${archive} -C /home/nick`);
	});
});

describe("assets", () => {
	it("places bytes under Data/assets, creating parent directories", async () => {
		const host = mutableHost("running");
		const result = await putAsset(host, DEFAULT_HOST_CONFIG, { data: Buffer.from("abc"), dest: "tokens/hero.png" });
		expect(result.dest).toBe("/home/nick/foundry-data/Data/assets/tokens/hero.png");
		expect(host.ran[0]).toBe("mkdir -p /home/nick/foundry-data/Data/assets/tokens");
		expect(host.ran[1]).toBe("cat > /home/nick/foundry-data/Data/assets/tokens/hero.png");
	});

	it("rejects destinations that escape the assets root", async () => {
		const host = mutableHost("running");
		await expect(putAsset(host, DEFAULT_HOST_CONFIG, { data: Buffer.from("x"), dest: "../Config/options.json" })).rejects.toThrow(
			/assets/,
		);
		await expect(putAsset(host, DEFAULT_HOST_CONFIG, { data: Buffer.from("x"), dest: "/etc/evil" })).rejects.toThrow(/assets/);
		expect(host.ran).toEqual([]);
	});
});

describe("install", () => {
	it("pulls and recreates the container through compose", async () => {
		const host = mutableHost("running");
		const result = await updateInstall(host, DEFAULT_HOST_CONFIG, {});
		expect(result.steps).toEqual([
			`docker compose -f ${DEFAULT_HOST_CONFIG.composeFile} pull`,
			`docker compose -f ${DEFAULT_HOST_CONFIG.composeFile} up -d`,
		]);
		expect(host.ran).toEqual(result.steps);
	});

	it("pins a version by rewriting FOUNDRY_VERSION in the compose .env, keeping the other lines", async () => {
		const host = mutableHost("running");
		host.replies.push({ match: "docker compose -f", reply: "" });
		await updateInstall(host, DEFAULT_HOST_CONFIG, { version: "14.369" });
		expect(host.ran[0]).toBe("cat /home/nick/compose/foundry/.env");
		expect(host.ran[1]).toContain("cat > /home/nick/compose/foundry/.env");
		const written = host.inputs[1];
		expect(written).toBe("FOUNDRY_USERNAME=dm@example.com\nFOUNDRY_VERSION=14.369\nFOUNDRY_PASSWORD=secret\n");
	});

	it("unzips a module archive into Data/modules/<name>", async () => {
		const host = mutableHost("running");
		const result = await installModuleArchive(host, DEFAULT_HOST_CONFIG, { zip: "/tmp/cf-bridge.zip", name: "cf-bridge" });
		expect(result.dir).toBe("/home/nick/foundry-data/Data/modules/cf-bridge");
		expect(host.ran).toEqual([
			"test -f /tmp/cf-bridge.zip",
			"mkdir -p /home/nick/foundry-data/Data/modules/cf-bridge",
			"unzip -o /tmp/cf-bridge.zip -d /home/nick/foundry-data/Data/modules/cf-bridge",
		]);
	});

	it("rejects module names that escape the modules directory", async () => {
		const host = mutableHost("running");
		await expect(installModuleArchive(host, DEFAULT_HOST_CONFIG, { zip: "/tmp/x.zip", name: "../evil" })).rejects.toThrow(
			/modules/,
		);
		expect(host.ran).toEqual([]);
	});
});

describe("backup restore rollback", () => {
	it("moves the kept directory back when the archive is unusable", async () => {
		const stopped = mutableHost("stopped");
		stopped.replies.push({ match: "test -f", reply: "" }, { match: "tar -xzf", reply: { code: 2, stdout: "", stderr: "not a gzip archive" } });
		const result = await restoreBackup(stopped, DEFAULT_HOST_CONFIG, { archive: "/tmp/b.tar.gz" }, new Date("2026-10-06T22:00:00Z"));
		expect(result.ok).toBe(false);
		expect(stopped.ran.at(-1)).toBe(`mv /home/nick/foundry-data.pre-restore-20261006-220000 /home/nick/foundry-data`);
	});
});
