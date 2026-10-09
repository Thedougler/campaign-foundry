#!/usr/bin/env node
import "./env.ts";
import { Command, CommanderError } from "commander";
import { Readable } from "node:stream";
import { AsyncLocalStorage } from "node:async_hooks";
import { UsageError } from "./check/run.ts";
import { commands } from "./commands/index.ts";

/** `.exitOverride()` on a command and every subcommand registered so far, so help and usage errors come back as CommanderError instead of ending the process. */
function overrideExits(command: Command): Command {
	command.exitOverride();
	for (const sub of command.commands) overrideExits(sub);
	return command;
}

function buildProgram(): Command {
	const program = new Command("cf")
		.description(
			"Campaign Foundry: tools that keep the Wiki in shape. Run it as `bun run cf -- <command>` (a bare `cf` on PATH is usually Cloudflare's, not this tool). Run a subcommand with --help for its options and examples.",
		)
		.showHelpAfterError("(run with --help for options and examples)")
		.addHelpText(
			"after",
			`
Examples:
  bun run cf -- check                       gate the whole Wiki
  bun run cf -- check --fix                 gate it, applying mechanical fixes
  bun run cf -- check --help                options, layers and more examples
  bun run cf -- index                       regenerate the index.md files
  bun run cf -- encounter-budget --levels 5,5,5,5 --creature "Orc,1/2,100,3"
                                            2024 Encounter XP budgets and Creature spend
  bun run cf -- eval extract "Ilse Corran" --callout "First look"
                                            dump a callout body for a grader to read (not a Grade)
  bun run cf -- log --campaign "Shattered Sea" --op ingest --title "Session 3 transcript" --page "Session 3 - Recap"
                                            append to a Campaign folder's log.md
  bun run cf -- push --campaign "Salt and Lantern" --session 2
                                            build a Session's Foundry Adventure module`,
		)
		.exitOverride();

	for (const make of commands) {
		const command = overrideExits(make().showHelpAfterError("(run with --help for options and examples)"));
		program.addCommand(command);
	}
	return program;
}

/** What one cf invocation prints and ends with. */
export interface CliRun {
	code: number;
	stdout: string;
	stderr: string;
}

interface Sinks {
	out: (chunk: string) => void;
	err: (chunk: string) => void;
}

/**
 * Each `captureIO` run's sinks. Output is routed by async context, so concurrent invocations keep
 * their stdout and stderr apart even though they share the process. The exit code stays the process
 * global commands write to (`process.exitCode`), so concurrent invocations must expect the same code.
 */
const runSinks = new AsyncLocalStorage<Sinks>();

/** A bound stream write: what the router falls back to when no capture is active. */
type StreamWrite = (chunk: string | Uint8Array) => boolean;

let active = 0;
let realStdio: { stdout: StreamWrite; stderr: StreamWrite } | undefined;

function routeStdio(): void {
	if (active++ > 0) return;
	const stdout = process.stdout.write.bind(process.stdout);
	const stderr = process.stderr.write.bind(process.stderr);
	const push = (sink: "out" | "err") => (chunk: string | Uint8Array) => {
		const sinks = runSinks.getStore();
		if (sinks === undefined) return (sink === "out" ? stdout : stderr)(chunk);
		sinks[sink](String(chunk));
		return true;
	};
	process.stdout.write = push("out") as typeof process.stdout.write;
	process.stderr.write = push("err") as typeof process.stderr.write;
	realStdio = { stdout, stderr };
}

function unrouteStdio(): void {
	if (--active > 0 || realStdio === undefined) return;
	process.stdout.write = realStdio.stdout as typeof process.stdout.write;
	process.stderr.write = realStdio.stderr as typeof process.stderr.write;
	realStdio = undefined;
}

/**
 * Runs one async function with process stdout/stderr captured, and returns what it printed and ended
 * with. Writes made under the call go to its capture alone; concurrent calls do not mix output.
 */
export async function captureIO(fn: () => Promise<number>): Promise<CliRun> {
	const out: string[] = [];
	const err: string[] = [];
	routeStdio();
	try {
		return await runSinks.run({ out: (chunk) => out.push(chunk), err: (chunk) => err.push(chunk) }, async () => {
			const code = await fn();
			return { code, stdout: out.join(""), stderr: err.join("") };
		});
	} finally {
		unrouteStdio();
	}
}

/** The exit code a caught commander or usage error maps to: help is 0, every other misuse is 2. */
function exitCodeOf(error: unknown): number | undefined {
	if (error instanceof CommanderError) return error.exitCode === 0 ? 0 : 2;
	if (error instanceof UsageError) {
		process.stderr.write(`Error: ${error.message}\n  ${error.hint}\n`);
		return 2;
	}
	return undefined;
}

/**
 * Runs one async function at a time: concurrent `runCli` calls queue, because they share the
 * process's cwd, argv, exit code and stdio and each needs its own view of all four.
 */
let lastRun: Promise<unknown> = Promise.resolve();

function exclusive<T>(fn: () => Promise<T>): Promise<T> {
	const run = lastRun.then(fn, fn);
	lastRun = run.catch(() => undefined);
	return run;
}

/**
 * One `cf` invocation in this process: the same commander program the spawned `node src/cli.ts`
 * runs, with output captured, and no process left behind. Tests call this instead of spawning the
 * CLI, so a suite pays the module load once rather than per invocation. `stdin` feeds the command a
 * string in place of the real stdin; left out, the command reads the process's own stdin.
 */
export function runCli(argv: string[], options: { cwd?: string; stdin?: string } = {}): Promise<CliRun> {
	return exclusive(async () => {
		const program = buildProgram();
		const savedCwd = process.cwd();
		const savedArgv = process.argv;
		const savedExit = process.exitCode;
		const savedStdin = Object.getOwnPropertyDescriptor(process, "stdin")!;
		if (savedCwd !== (options.cwd ?? savedCwd)) process.chdir(options.cwd ?? savedCwd);
		process.argv = ["cf", "cf", ...argv];
		process.exitCode = 0;
		if (options.stdin !== undefined) {
			Object.defineProperty(process, "stdin", { get: () => Readable.from([Buffer.from(options.stdin as string, "utf8")]), configurable: true });
		}
		return captureIO(async () => {
			let code = 0;
			try {
				if (argv.length === 0) program.outputHelp();
				else await program.parseAsync(process.argv);
				code = typeof process.exitCode === "number" ? process.exitCode : 0;
			} catch (error) {
				const mapped = exitCodeOf(error);
				if (mapped === undefined) throw error;
				code = mapped;
			}
			return code;
		}).finally(() => {
			if (options.stdin !== undefined) Object.defineProperty(process, "stdin", savedStdin);
			process.argv = savedArgv;
			process.exitCode = savedExit as number | undefined;
			if (process.cwd() !== savedCwd) process.chdir(savedCwd);
		});
	});
}

/** The spawned CLI: one invocation, live output, exit code on the process. */
async function main(): Promise<void> {
	if (process.argv.length <= 2) {
		buildProgram().outputHelp();
		return;
	}
	try {
		await buildProgram().parseAsync(process.argv);
	} catch (error) {
		const mapped = exitCodeOf(error);
		if (mapped === undefined) throw error;
		process.exitCode = mapped;
	}
}

if (import.meta.main) await main();
