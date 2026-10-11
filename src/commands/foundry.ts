/**
 * `cf foundry`: the agent-facing surface of the Foundry control plane (issue #46). Read-only
 * subcommands run freely against the host. Every mutating subcommand prints its plan plus the
 * exact approval command and exits 2 until `--yes` says the DM approved it. `serve` runs the
 * daemon: the bridge listener plus MCP over stdio. `tool` calls one tool through the registry.
 */

import { readFile } from "node:fs/promises";
import { Argument, Command, Option } from "commander";
import { UsageError } from "../check/run.ts";
import { ToolError } from "../foundry-control/bridge/schema.ts";
import { BridgeListener } from "../foundry-control/bridge/listener.ts";
import { IdempotencyStore } from "../foundry-control/bridge/mutations.ts";
import { ToolRegistry } from "../foundry-control/daemon/registry.ts";
import { runStdioMcp } from "../foundry-control/daemon/mcp.ts";
import { putAsset } from "../foundry-control/host/assets.ts";
import { backupDestDir, createBackup, restoreBackup, RefusalError } from "../foundry-control/host/backup.ts";
import { hostConfigFrom } from "../foundry-control/host/config.ts";
import { connectHost } from "../foundry-control/host/connect.ts";
import { installModuleArchive, updateInstall } from "../foundry-control/host/install.ts";
import { queryLogs } from "../foundry-control/host/logs.ts";
import { readOptions, stamp, writeOptions } from "../foundry-control/host/options.ts";
import { serviceOp, type ServiceOp } from "../foundry-control/host/service.ts";
import { formatStatus, hostStatus } from "../foundry-control/host/status.ts";
import type { FoundryOptions } from "../foundry-control/host/status.ts";

import { CF, gateResult, printCliResult, usageResult, type CliResult } from "./kit.ts";
import { readStdin } from "./stdin.ts";

function hostFailure(error: unknown): CliResult {
	return { exitCode: 1, out: [], err: [error instanceof Error ? error.message : String(error)] };
}

export async function runFoundryStatus(flags: { json?: boolean }): Promise<CliResult> {
	try {
		const { host, config, scripted, fixturePath } = await connectHost();
		const status = await hostStatus(host, config);
		if (flags.json) return { exitCode: 0, out: [JSON.stringify(status, null, 2)], err: [] };
		const lines = formatStatus(status).split("\n");
		if (scripted) lines.push(`fixture:   ${fixturePath} (CF_FOUNDRY_SCRIPTED)`);
		return { exitCode: 0, out: lines, err: [] };
	} catch (error) {
		return hostFailure(error);
	}
}

export async function runFoundryLogs(flags: {
	json?: boolean;
	lines?: number;
	since?: string;
	until?: string;
	grep?: string;
	source?: string;
}): Promise<CliResult> {
	try {
		const { host, config } = await connectHost();
		const logs = await queryLogs(host, config, {
			lines: flags.lines,
			since: flags.since,
			until: flags.until,
			grep: flags.grep,
			source: flags.source as "container" | "error" | "debug" | undefined,
		});
		if (flags.json)
			return { exitCode: 0, out: [JSON.stringify({ lines: logs === "" ? [] : logs.split("\n") })], err: [] };
		return { exitCode: 0, out: logs === "" ? ["(no log lines matched)"] : logs.split("\n"), err: [] };
	} catch (error) {
		return hostFailure(error);
	}
}

export async function runFoundryOptionsGet(key: string, flags: { json?: boolean } = {}): Promise<CliResult> {
	try {
		const { host, config } = await connectHost();
		const read = await readOptions(host, config);
		if (read === null) return { exitCode: 1, out: [], err: ["options.json could not be read on the host."] };
		if (!(key in read.options)) return { exitCode: 1, out: [], err: [`No option \`${key}\` in options.json.`] };
		if (flags.json) return { exitCode: 0, out: [JSON.stringify({ key, value: read.options[key] })], err: [] };
		return { exitCode: 0, out: [JSON.stringify(read.options[key], null, 2)], err: [] };
	} catch (error) {
		return hostFailure(error);
	}
}

/** Parses one `key=value` pair; the value goes through JSON first, so `port=30000` is a number. */
function parseOptionPair(pair: string): { key: string; value: unknown } {
	const equals = pair.indexOf("=");
	if (equals <= 0) {
		throw new UsageError(`\`${pair}\` is not key=value.`, `${CF} foundry options set port=30000 --yes`);
	}
	const key = pair.slice(0, equals);
	const raw = pair.slice(equals + 1);
	let value: unknown = raw;
	if (raw !== "") {
		try {
			value = JSON.parse(raw);
		} catch {
			// Not JSON: keep the raw string.
		}
	}
	return { key, value };
}

export async function runFoundryOptionsSet(pairs: string[], yes: boolean): Promise<CliResult> {
	const patch: FoundryOptions = {};
	try {
		for (const pair of pairs) {
			const { key, value } = parseOptionPair(pair);
			patch[key] = value;
		}
	} catch (error) {
		if (error instanceof UsageError) return usageResult(error);
		throw error;
	}
	const approval = `${CF} foundry options set ${pairs.join(" ")} --yes`;
	if (!yes) {
		return gateResult(
			[
				`options set would write to options.json (a restart applies it):`,
				...Object.entries(patch).map(([key, value]) => `  ${key} = ${JSON.stringify(value)}`),
			],
			approval,
		);
	}
	try {
		const { host, config } = await connectHost();
		const result = await writeOptions(host, config, patch);
		return { exitCode: 0, out: [JSON.stringify(result.options, null, 2), ...result.warnings], err: [] };
	} catch (error) {
		return hostFailure(error);
	}
}

export async function runFoundryService(op: ServiceOp, yes: boolean): Promise<CliResult> {
	const approval = `${CF} foundry service ${op} --yes`;
	if (!yes) {
		return gateResult(
			[`service ${op} would ${op === "stop" ? "stop every connected session" : `run ${op}`} through Docker Compose.`],
			approval,
		);
	}
	try {
		const { host, config } = await connectHost();
		const result = await serviceOp(host, config, op);
		return { exitCode: 0, out: [...result.ran.map((command) => `ran: ${command}`)], err: [] };
	} catch (error) {
		return hostFailure(error);
	}
}

export async function runFoundryBackupCreate(flags: {
	stop?: boolean;
	dest?: string;
	yes?: boolean;
}): Promise<CliResult> {
	const approval = `${CF} foundry backup create${flags.stop ? " --stop" : ""}${flags.dest ? ` --dest ${flags.dest}` : ""} --yes`;
	const defaultDest = flags.dest ?? `${backupDestDirFromEnv()}/foundry-data-${stamp(new Date())}.tar.gz`;
	if (!flags.yes) {
		const plan = [
			`backup create would archive the Foundry data directory to:`,
			`  ${defaultDest}`,
			flags.stop
				? "  A running world is stopped first and started again after (the only allowed way to back one up)."
				: "  A running world refuses the backup: add --stop to stop it for the backup and start it again after.",
		];
		return gateResult(plan, approval);
	}
	try {
		const { host, config } = await connectHost();
		const result = await createBackup(host, config, { stop: flags.stop, dest: flags.dest });
		return {
			exitCode: result.ok ? 0 : 1,
			out: [
				result.ok ? `backed up: ${result.dest}` : `backup failed: ${result.error ?? "unknown error"}`,
				...(result.sha256 ? [`sha256:    ${result.sha256}`] : []),
				...(result.bytes !== null ? [`bytes:     ${result.bytes}`] : []),
			],
			err: [],
		};
	} catch (error) {
		if (error instanceof RefusalError) {
			return gateResult([error.message], error.command);
		}
		return hostFailure(error);
	}
}

export async function runFoundryBackupRestore(archive: string, yes: boolean): Promise<CliResult> {
	const approval = `${CF} foundry backup restore ${archive} --yes`;
	if (!yes) {
		return gateResult(
			[
				"backup restore would (destructive):",
				`  move the current data directory aside, then extract ${archive} over it.`,
				"  The world must be stopped; a running world refuses.",
			],
			approval,
		);
	}
	try {
		const { host, config } = await connectHost();
		const result = await restoreBackup(host, config, { archive });
		return {
			exitCode: result.ok ? 0 : 1,
			out: [
				result.ok ? `restored: ${result.archive}` : `restore failed: ${result.error ?? "unknown error"}`,
				...(result.keptAs ? [`kept as:   ${result.keptAs}`] : []),
			],
			err: [],
		};
	} catch (error) {
		if (error instanceof RefusalError) {
			return gateResult([error.message], error.command);
		}
		return hostFailure(error);
	}
}

async function readAssetSource(source: string): Promise<Buffer> {
	if (source === "-") return readStdin();
	return readFile(source);
}

export async function runFoundryAssetsPut(source: string, dest: string, yes: boolean): Promise<CliResult> {
	const approval = `${CF} foundry assets put ${source} ${dest} --yes`;
	try {
		const data = await readAssetSource(source);
		if (!yes) {
			return gateResult([`assets put would write ${data.length} bytes to Data/assets/${dest}.`], approval);
		}
		const { host, config } = await connectHost();
		const result = await putAsset(host, config, { data, dest });
		return { exitCode: 0, out: [`placed:    ${result.dest} (${result.bytes} bytes)`], err: [] };
	} catch (error) {
		return hostFailure(error);
	}
}

export async function runFoundryInstallUpdate(flags: { version?: string; yes?: boolean }): Promise<CliResult> {
	const approval = `${CF} foundry install update${flags.version ? ` --version ${flags.version}` : ""} --yes`;
	if (!flags.yes) {
		return gateResult(
			[
				"install update would (through Docker Compose):",
				flags.version
					? `  pin FOUNDRY_VERSION=${flags.version} in the compose .env,`
					: "  keep the image tag floating,",
				"  then pull and recreate the container (the world restarts).",
			],
			approval,
		);
	}
	try {
		const { host, config } = await connectHost();
		const result = await updateInstall(host, config, { version: flags.version });
		return { exitCode: 0, out: result.steps.map((command) => `ran: ${command}`), err: [] };
	} catch (error) {
		return hostFailure(error);
	}
}

export async function runFoundryInstallModule(zip: string, name: string, yes: boolean): Promise<CliResult> {
	const approval = `${CF} foundry install module --zip ${zip} --name ${name} --yes`;
	if (!yes) {
		return gateResult([`install module would unzip ${zip} into Data/modules/${name}.`], approval);
	}
	try {
		const { host, config } = await connectHost();
		const result = await installModuleArchive(host, config, { zip, name });
		return {
			exitCode: 0,
			out: [
				`installed: ${result.dir}`,
				"next:      enable the module in a world (Module Management), which needs a world to exist.",
			],
			err: [],
		};
	} catch (error) {
		return hostFailure(error);
	}
}

export interface ServeFlags {
	host?: string;
	port?: number;
	token?: string;
	idempotency?: string;
}

export async function runFoundryServe(flags: ServeFlags): Promise<CliResult> {
	const token = flags.token ?? process.env.CF_FOUNDRY_TOKEN;
	if (token === undefined || token === "") {
		return {
			exitCode: 2,
			out: [],
			err: [
				"No bridge token: pass --token <secret> (or set CF_FOUNDRY_TOKEN).",
				`  ${CF} foundry serve --token <secret>`,
			],
		};
	}
	let listener: BridgeListener;
	try {
		const connection = await connectHost();
		listener = new BridgeListener({ token, host: flags.host ?? "127.0.0.1", port: flags.port ?? 30426 });
		const address = await listener.start();
		const registry = new ToolRegistry({
			host: connection.host,
			config: connection.config,
			client: () => listener.client(),
			idempotency: flags.idempotency === undefined ? undefined : new IdempotencyStore(flags.idempotency),
		});
		process.stderr.write(
			`${[
				`bridge:    listening on ${address.host}:${address.port} (waiting for the cf-bridge module)`,
				connection.scripted
					? `host:      scripted fixture ${connection.fixturePath}`
					: `host:      ${connection.config.ssh} over SSH`,
				"MCP:       serving tools on stdio (stdin closed stops the daemon)",
			].join("\n")}\n`,
		);
		await runStdioMcp(registry, process.stdin, process.stdout);
		await listener.close();
		return { exitCode: 0, out: [], err: [] };
	} catch (error) {
		return hostFailure(error);
	}
}

export async function runFoundryTool(name: string, paramsJson: string): Promise<CliResult> {
	let params: Record<string, unknown>;
	try {
		const parsed: unknown = JSON.parse(paramsJson);
		if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
			return {
				exitCode: 2,
				out: [],
				err: ["--params must be a JSON object.", `  ${CF} foundry tool document.get --params '{"uuid":"actors.1"}'`],
			};
		}
		params = parsed as Record<string, unknown>;
	} catch {
		return {
			exitCode: 2,
			out: [],
			err: ["--params is not valid JSON.", `  ${CF} foundry tool document.get --params '{"uuid":"actors.1"}'`],
		};
	}
	try {
		const connection = await connectHost();
		const registry = new ToolRegistry({ host: connection.host, config: connection.config, client: () => null });
		const result = await registry.callTool(name, params);
		return { exitCode: 0, out: [JSON.stringify(result, null, 2)], err: [] };
	} catch (error) {
		if (error instanceof ToolError) {
			return {
				exitCode: error.approvalCommand !== null ? 2 : 1,
				out: [],
				err: [
					`[${error.code}] ${error.message}`,
					...(error.approvalCommand !== null ? [`  Approve with: ${error.approvalCommand}`] : []),
				],
			};
		}
		return hostFailure(error);
	}
}

/** The default backup destination preview without connecting: reads env through the config module. */
function backupDestDirFromEnv(): string {
	return backupDestDir(hostConfigFrom(process.env));
}

export function foundryCommand(): Command {
	const foundry = new Command("foundry")
		.description(
			"The Foundry VTT control plane (issue #46): read the DM's host, gate every mutation behind --yes, run the bridge daemon with serve, or call one tool directly. Read-only subcommands run freely; mutating ones print the plan and the approval command.",
		)
		.addHelpText(
			"after",
			`
Host configuration (env): CF_FOUNDRY_SSH (default rpi4), CF_FOUNDRY_COMPOSE, CF_FOUNDRY_CONTAINER,
CF_FOUNDRY_DATA, and CF_FOUNDRY_SCRIPTED (a JSON fixture answering host commands without SSH).
Docs: docs/foundry-control.md.

Examples:
  ${CF} foundry status                                   one-screen host snapshot (read-only)
  ${CF} foundry status --json                            the same as HostStatus JSON
  ${CF} foundry logs --lines 50 --grep error             tail container logs, errors only
  ${CF} foundry options get port                         read one options.json key
  ${CF} foundry options set port=30000 --yes             write options.json (DM approved)
  ${CF} foundry service restart                          shows the plan; --yes runs it
  ${CF} foundry backup create --stop                     shows the plan; --yes runs it
  ${CF} foundry backup restore /host/archive.tar.gz      shows the plan; --yes runs it
  ${CF} foundry assets put token.png tokens/t.png        shows the plan; --yes writes it
  ${CF} foundry install update --version 14.369          shows the plan; --yes runs it
  ${CF} foundry install module --zip cf-bridge.zip --name cf-bridge
  ${CF} foundry serve --token <secret>                   the daemon: bridge listener + MCP on stdio
  ${CF} foundry tool host.status                         call one tool through the registry`,
		);

	foundry
		.command("status")
		.description(
			"One-screen snapshot of the Foundry host: container state, version, ports, data path, worlds. Read-only.",
		)
		.option("--json", "print the HostStatus object as JSON")
		.addHelpText("after", `\nExamples:\n  ${CF} foundry status\n  ${CF} foundry status --json`)
		.action(async (flags: { json?: boolean }) => printCliResult(await runFoundryStatus(flags)));

	foundry
		.command("logs")
		.description("Query container or on-disk Foundry logs. Read-only.")
		.option("--json", "print {lines} JSON instead of text")
		.option("--lines <n>", "tail this many lines (container source)")
		.option("--since <when>", "docker --since value, e.g. 10m or an ISO timestamp")
		.option("--until <when>", "docker --until value")
		.option("--grep <pattern>", "case-insensitive grep -E pattern over the output")
		.addOption(
			new Option("--source <source>", "where to read").choices(["container", "error", "debug"]).default("container"),
		)
		.addHelpText(
			"after",
			`\nExamples:\n  ${CF} foundry logs --lines 100\n  ${CF} foundry logs --since 30m --grep 'error|warn'\n  ${CF} foundry logs --source error --lines 20`,
		)
		.action(
			async (flags: {
				json?: boolean;
				lines?: string;
				since?: string;
				until?: string;
				grep?: string;
				source?: string;
			}) =>
				printCliResult(
					await runFoundryLogs({
						json: flags.json,
						lines: flags.lines === undefined ? undefined : Number.parseInt(flags.lines, 10),
						since: flags.since,
						until: flags.until,
						grep: flags.grep,
						source: flags.source,
					}),
				),
		);

	const options = foundry
		.command("options")
		.description("Read and write Foundry's Config/options.json (writes apply on restart).")
		.addHelpText(
			"after",
			`\nExamples:\n  ${CF} foundry options get port --json\n  ${CF} foundry options set port=30000 --yes`,
		);
	options
		.command("get <key>")
		.description("Print one options.json value. Read-only.")
		.option("--json", "print {key,value} JSON instead of the value")
		.addHelpText("after", `\nExamples:\n  ${CF} foundry options get port\n  ${CF} foundry options get world`)
		.action(async (key: string, flags: { json?: boolean }) => printCliResult(await runFoundryOptionsGet(key, flags)));
	options
		.command("set <key=value...>")
		.description(
			"Merge keys into options.json: values go through JSON first (port=30000 is a number, world=null). Prints the plan and the approval command until --yes.",
		)
		.option("--yes", "the DM approved it: run the write")
		.addHelpText(
			"after",
			`\nExamples:\n  ${CF} foundry options set port=30000\n  ${CF} foundry options set port=30000 --yes\n  ${CF} foundry options set world=null hostname=my-table --yes`,
		)
		.action(async (pairs: string[], flags: { yes?: boolean }) =>
			printCliResult(await runFoundryOptionsSet(pairs, flags.yes ?? false)),
		);

	foundry
		.command("service")
		.description(
			"Start, stop or restart the Foundry container through Docker Compose. Prints the plan and the approval command until --yes.",
		)
		.addArgument(new Argument("<op>", "the operation: start, stop or restart").choices(["start", "stop", "restart"]))
		.option("--yes", "the DM approved it: run it")
		.addHelpText("after", `\nExamples:\n  ${CF} foundry service restart\n  ${CF} foundry service stop --yes`)
		.action(async (op: ServiceOp, flags: { yes?: boolean }) =>
			printCliResult(await runFoundryService(op, flags.yes ?? false)),
		);

	const backup = foundry
		.command("backup")
		.description(
			"Shutdown-aware backup and restore of the Foundry data directory. Both print the plan and the approval command until --yes.",
		)
		.addHelpText(
			"after",
			`\nExamples:\n  ${CF} foundry backup create --stop\n  ${CF} foundry backup restore /host/archive.tar.gz --yes`,
		);
	backup
		.command("create")
		.description(
			"Archive the data directory. A running world refuses without --stop (official guidance: Foundry is shut down before Data is copied).",
		)
		.option("--stop", "stop the world for the backup and start it again after")
		.option("--dest <path>", "archive path on the host (default: the backup-staging directory with a UTC stamp)")
		.option("--yes", "the DM approved it: run it")
		.addHelpText(
			"after",
			`\nExamples:\n  ${CF} foundry backup create --stop\n  ${CF} foundry backup create --stop --yes\n  ${CF} foundry backup create --dest /home/nick/backup-staging/foundry/pre-session.tar.gz --yes`,
		)
		.action(async (flags: { stop?: boolean; dest?: string; yes?: boolean }) =>
			printCliResult(await runFoundryBackupCreate(flags)),
		);
	backup
		.command("restore <archive>")
		.description(
			"Restore an archive over the data directory (the current one is kept aside). The world must be stopped.",
		)
		.option("--yes", "the DM approved it: run it")
		.addHelpText(
			"after",
			`\nExamples:\n  ${CF} foundry backup restore /home/nick/backup-staging/foundry/foundry-data-20261006-220000.tar.gz\n  ${CF} foundry backup restore /home/nick/backup-staging/foundry/foundry-data-20261006-220000.tar.gz --yes`,
		)
		.action(async (archive: string, flags: { yes?: boolean }) =>
			printCliResult(await runFoundryBackupRestore(archive, flags.yes ?? false)),
		);

	const assets = foundry
		.command("assets")
		.description("Place files under the host's Data/assets (tokens, art). Nothing outside it is writable.")
		.addHelpText("after", `\nExamples:\n  ${CF} foundry assets put token.png tokens/token.png --yes`);
	assets
		.command("put <src> <dest>")
		.description(
			"Write one local file (or stdin with -) to Data/assets/<dest>. Prints the plan and the approval command until --yes.",
		)
		.option("--yes", "the DM approved it: run it")
		.addHelpText(
			"after",
			`\nExamples:\n  ${CF} foundry assets put tokens/hero.png tokens/hero.png\n  ${CF} foundry assets put tokens/hero.png tokens/hero.png --yes\n  cat art/map.png | ${CF} foundry assets put - maps/tiled.png --yes`,
		)
		.action(async (src: string, dest: string, flags: { yes?: boolean }) =>
			printCliResult(await runFoundryAssetsPut(src, dest, flags.yes ?? false)),
		);

	const install = foundry
		.command("install")
		.description(
			"Foundry updates and module installs on the host. Both print the plan and the approval command until --yes.",
		)
		.addHelpText(
			"after",
			`\nExamples:\n  ${CF} foundry install update --version 14.369\n  ${CF} foundry install module --zip cf-bridge.zip --name cf-bridge`,
		);
	install
		.command("update")
		.description("Update Foundry: optionally pin a version in the compose .env, then pull and recreate.")
		.option("--version <v>", "pin this Foundry version, e.g. 14.369; omit to float on the image tag")
		.option("--yes", "the DM approved it: run it")
		.addHelpText(
			"after",
			`\nExamples:\n  ${CF} foundry install update\n  ${CF} foundry install update --version 14.369 --yes`,
		)
		.action(async (flags: { version?: string; yes?: boolean }) => printCliResult(await runFoundryInstallUpdate(flags)));
	install
		.command("module")
		.description("Install a module zip into Data/modules (how cf-bridge itself is installed).")
		.requiredOption("--zip <path>", "host-local path to the module zip")
		.requiredOption("--name <name>", "plain directory name inside Data/modules")
		.option("--yes", "the DM approved it: run it")
		.addHelpText(
			"after",
			`\nExamples:\n  ${CF} foundry install module --zip /home/nick/cf-bridge.zip --name cf-bridge\n  ${CF} foundry install module --zip /home/nick/cf-bridge.zip --name cf-bridge --yes`,
		)
		.action(async (flags: { zip: string; name: string; yes?: boolean }) =>
			printCliResult(await runFoundryInstallModule(flags.zip, flags.name, flags.yes ?? false)),
		);

	foundry
		.command("serve")
		.description(
			"Run the control daemon: the bridge listener for the in-world module, plus MCP tools over newline-delimited stdio. Closing stdin stops it.",
		)
		.option("--host <iface>", "interface to bind (default 127.0.0.1)")
		.option("--port <n>", "port to bind (default 30426; the module's default URL matches)", (value) =>
			Number.parseInt(value, 10),
		)
		.option("--token <secret>", "the shared bridge secret (or set CF_FOUNDRY_TOKEN)")
		.option("--idempotency <path>", "jsonl file remembering idempotent writes across restarts (default: memory)")
		.addHelpText(
			"after",
			`
Examples:
  ${CF} foundry serve --token hush                           daemon on 127.0.0.1:30426
  ${CF} foundry serve --token hush --idempotency ~/.campaign-foundry/foundry-idempotency.jsonl
  MCP clients speak JSON-RPC on stdio: initialize, tools/list, tools/call.

The module side (in the world): enable the cf-bridge module, set the token in its settings.`,
		)
		.action(async (flags: ServeFlags) => printCliResult(await runFoundryServe(flags)));

	foundry
		.command("tool <name>")
		.description(
			"Call one daemon tool directly through the registry (host read-only tools work without a module; module tools need the daemon running).",
		)
		.option("--params <json>", "the tool's params as a JSON object (default {})")
		.addHelpText(
			"after",
			`\nExamples:\n  ${CF} foundry tool host.status\n  ${CF} foundry tool logs.query --params '{"lines":20,"grep":"error"}'\n  ${CF} foundry tool document.patch --params '{"uuid":"actors.1","changes":{"name":"Renamed"},"dry_run":false}'`,
		)
		.action(async (name: string, flags: { params?: string }) =>
			printCliResult(await runFoundryTool(name, flags.params ?? "{}")),
		);

	return foundry;
}
