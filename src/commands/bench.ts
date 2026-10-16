import { existsSync, mkdirSync, readFileSync, readdirSync, renameSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, join, relative, resolve } from "node:path";
import { Command, Option } from "commander";
import { drawAliases, renderBrief, renderSample, shuffled } from "../bench/alias.ts";
import { councilOf, readGrades, renderReport, rubricNames, validateGrades, type GradesFile } from "../bench/council.ts";
import { findPromptVersion, listPromptVersions, sha256File } from "../bench/prompts.ts";
import { quotaOf, readOmpUsage, type OmpUsage } from "../bench/quota.ts";
import { renderLeaderboard } from "../bench/render.ts";
import { loadSeats, seatFor, type FamilySeats, type Seat } from "../bench/seats.ts";
import {
	latestEntries,
	listRunEntries,
	loadRun,
	runDirName,
	type Mapping,
	type PendingRecord,
	type RunEntry,
	type RunLog,
	type SeatRecord,
} from "../bench/runs.ts";
import { UsageError } from "../check/errors.ts";
import { CF, resolveRoot, rootOption } from "./kit.ts";

interface RootFlag {
	root?: string;
}

interface BenchPaths {
	root: string;
	agents: string;
	prompts: string;
	promptsRel: string;
	rubric: string;
	runs: string;
	runsRel: string;
	leaderboard: string;
}

function paths(rootFlag: string | undefined): BenchPaths {
	const root = resolveRoot(rootFlag);
	return {
		root,
		agents: join(root, ".omp", "agents"),
		prompts: join(root, "evals", "bench", "prompts"),
		promptsRel: "evals/bench/prompts",
		rubric: join(root, "evals", "bench", "rubric.md"),
		runs: join(root, "evals", "bench", "runs"),
		runsRel: "evals/bench/runs",
		leaderboard: join(root, "evals", "bench", "leaderboard.md"),
	};
}

function toPosix(path: string): string {
	return path.split(/[\\/]/).join("/");
}

function rel(root: string, path: string): string {
	return toPosix(relative(root, path));
}

/** One `--pending`/`--dropped` flag value: `<family>="<reason>"` or `<family>=<reason>`. */
function parseReasonSpec(value: string, flag: string): { family: string; reason: string } {
	const eq = value.indexOf("=");
	if (eq < 1)
		throw new UsageError(
			`--${flag} takes <family>="<reason>", got \`${value}\`.`,
			`Example: --${flag} xai="quota exhausted · resets Friday".`,
		);
	return {
		family: value.slice(0, eq).trim(),
		reason: value
			.slice(eq + 1)
			.trim()
			.replace(/^"([\s\S]*)"$/, "$1"),
	};
}

/** One `<family>=<result.json>` argument: a Runner's yield, still unchecked. */
function parseResultSpec(value: string): { family: string; path: string } {
	const eq = value.indexOf("=");
	if (eq < 1)
		throw new UsageError(
			`Each sample argument takes <family>=<result.json>, got \`${value}\`.`,
			`Example: ${CF} bench alias --prompt <id>/v<N> zai=$results/zai.json xai=$results/xai.json`,
		);
	return { family: value.slice(0, eq).trim(), path: value.slice(eq + 1) };
}

/** One Runner result: a page holding a `> [!narration]` callout, and its Sources array. */
function readResult(spec: { family: string; path: string }): { page: string; sources: string[] } {
	let parsed: Record<string, unknown>;
	try {
		parsed = JSON.parse(readFileSync(spec.path, "utf8")) as Record<string, unknown>;
	} catch (error) {
		throw new UsageError(
			`Cannot read the ${spec.family} result at \`${spec.path}\`: ${(error as Error).message}`,
			"Copy the Runner's yield to the file first: cp agent://<id> $results/<family>.json",
		);
	}
	if (typeof parsed.page !== "string" || !parsed.page.includes("> [!narration]"))
		throw new UsageError(
			`\`${spec.path}\` (family ${spec.family}) has no \`page\` holding a \`> [!narration]\` callout.`,
			'Re-run the Runner once; a second failure drops the family with --dropped <family>="<error>".',
		);
	if (!Array.isArray(parsed.sources) || parsed.sources.some((source) => typeof source !== "string"))
		throw new UsageError(
			`\`${spec.path}\` (family ${spec.family}) has no \`sources\` array of Backup page paths.`,
			"Re-run the Runner; its yield carries the page and the sources together.",
		);
	return { page: parsed.page, sources: parsed.sources as string[] };
}

/** A run dir the user names: a path with a run.json, or a name under evals/bench/runs/. */
function resolveRunDir(p: BenchPaths, arg: string): { dir: string; name: string } {
	for (const dir of [resolve(process.cwd(), arg), join(p.runs, arg)])
		if (existsSync(join(dir, "run.json"))) return { dir, name: basename(dir) };
	throw new UsageError(
		`No run log at \`${arg}\`.`,
		`Pass a run dir under ${p.runsRel}/, e.g. ${CF} bench reveal --run 2026-10-11-playful-cloud-v1`,
	);
}

/** The sample aliases of one entry: the file names under its samples/ dir. */
function aliasesOf(dir: string): string[] {
	let files: string[];
	try {
		files = readdirSync(join(dir, "samples"));
	} catch {
		return [];
	}
	return files
		.filter((file) => file.endsWith(".md"))
		.map((file) => file.replace(/\.md$/, ""))
		.sort();
}

/** Where `bench alias` keeps a run's mapping until `bench reveal` moves it into the log. */
function mappingPath(name: string): string {
	return join(tmpdir(), "cf-bench", name, "mapping.json");
}

export function benchCommand(): Command {
	const bench = new Command("bench")
		.description(
			"Run the blind council benchmark (ADR 0038): seat and quota status, anonymise Runner samples, reveal the council's grades.",
		)
		.addHelpText(
			"after",
			`
One run at a time, per .omp/skills/dnd-benchmark: status → dispatch the Runners → alias → dispatch the
council → reveal. Prompts are the DM's committed files under evals/bench/prompts/; the log lands in
evals/bench/runs/ and the leaderboard is evals/bench/leaderboard.md.

Examples:
  ${CF} bench status                     per-family seat and quota, each prompt version's latest entry
  ${CF} bench status --json
  ${CF} bench alias --prompt playful-cloud/v1 zai=$results/zai.json xai=$results/xai.json \\
      --pending anthropic="quota exhausted" --amend 2026-10-11-playful-cloud-v1
  ${CF} bench reveal --run 2026-10-11-playful-cloud-v1
  ${CF} bench render                     rebuild evals/bench/leaderboard.md from the committed runs`,
		);

	const status = bench
		.command("status")
		.description(
			"Per family: its seat (model, thinking) and quota with remaining fraction and reset. Per prompt version: its latest log entry and pending families.",
		)
		.option("--json", "print machine-readable JSON instead of text");
	status.addHelpText(
		"after",
		`\nExits 1 when a family's runner and grader definitions seat different models or thinking levels.\n\nExamples:\n  ${CF} bench status\n  ${CF} bench status --json`,
	);
	rootOption(status);
	status.action((flags: RootFlag & { json?: boolean }) => {
		const p = paths(flags.root);
		const seatList = loadSeats(p.root);
		const quotaSource = readOmpUsage();
		const families = seatList.map((entry: FamilySeats) =>
			entry.seat === null
				? { family: entry.family, error: entry.error }
				: {
						family: entry.family,
						model: entry.seat.model,
						thinking: entry.seat.thinking,
						quota: quotaOf(entry.seat.model, quotaSource.usage),
					},
		);
		const entries = listRunEntries(p.runs);
		const latest = latestEntries(entries);
		const prompts = listPromptVersions(p.prompts, p.promptsRel).map((version) => {
			const entry = latest.get(version.name);
			return {
				prompt: version.name,
				path: version.path,
				latest:
					entry === undefined
						? null
						: {
								run: entry.name,
								date: entry.run.date,
								amends: entry.run.amends ?? null,
								revealed: entry.revealed,
								pending: entry.run.pending,
							},
			};
		});
		if (flags.json) {
			process.stdout.write(
				`${JSON.stringify(
					{
						families,
						...(quotaSource.error === null ? {} : { quota_error: quotaSource.error }),
						prompts,
					},
					null,
					2,
				)}\n`,
			);
		} else {
			process.stdout.write("Seats and quota:\n");
			for (const family of families) {
				if ("error" in family) {
					process.stdout.write(`  ${family.family.padEnd(10)} seat mismatch: ${family.error}\n`);
					continue;
				}
				const quota = family.quota;
				const parts = [`quota ${quota.status}`, quota.meter];
				parts.push(`remaining ${quota.remaining === null ? "?" : quota.remaining.toFixed(2)}`);
				if (quota.resetsAt !== null) parts.push(`resets ${quota.resetsAt}`);
				process.stdout.write(
					`  ${family.family.padEnd(10)} ${family.model}  thinking ${family.thinking}  ${parts.join(" · ")}\n`,
				);
			}
			if (quotaSource.error !== null) process.stdout.write(`quota: unknown for every family — ${quotaSource.error}\n`);
			process.stdout.write("Prompt versions:\n");
			if (prompts.length === 0) process.stdout.write("  (none — the prompt slots are empty; the DM writes prompts)\n");
			for (const prompt of prompts) {
				process.stdout.write(`  ${prompt.prompt}  (${prompt.path})\n`);
				if (prompt.latest === null) {
					process.stdout.write("    no runs yet\n");
					continue;
				}
				process.stdout.write(
					`    latest ${prompt.latest.run}${prompt.latest.amends === null ? "" : ` (amends ${prompt.latest.amends})`}${prompt.latest.revealed ? "" : ", awaiting reveal"}\n`,
				);
				for (const pending of prompt.latest.pending)
					process.stdout.write(
						`    pending ${pending.family} — ${pending.reason}${pending.resetsAt === null ? "" : ` (resets ${pending.resetsAt})`}\n`,
					);
			}
		}
		const broken = families.filter((family) => "error" in family);
		if (broken.length > 0) {
			for (const family of broken)
				process.stderr.write(
					`Error: family ${family.family} has no one seat: ${"error" in family ? family.error : ""}\n`,
				);
			process.exitCode = 1;
		}
	});

	const alias = bench
		.command("alias")
		.description(
			"Anonymise a run's samples: fresh animal aliases, the private mapping and one council brief per grader, written beside a new run.json.",
		)
		.requiredOption("--prompt <id/vN>", "the prompt version the run answers")
		.argument("<family=result.json...>", "each Runner's yield: a page with its Sources array")
		.addOption(
			new Option('--pending <family="reason">', "a family skipped for usage, with its reason")
				.argParser(collect)
				.default([] as string[], "none"),
		)
		.addOption(
			new Option('--dropped <family="reason">', "a family whose Runner failed, with the error")
				.argParser(collect)
				.default([] as string[], "none"),
		)
		.option("--amend <run dir>", "the earlier entry this run amends: its samples carry over byte for byte");
	alias.addHelpText(
		"after",
		`
Examples:
  ${CF} bench alias --prompt playful-cloud/v1 zai=$results/zai.json xai=$results/xai.json
  ${CF} bench alias --prompt playful-cloud/v1 anthropic=$results/anthropic.json \\
      --pending xai="quota exhausted · resets 2026-10-17" --amend 2026-10-11-playful-cloud-v1`,
	);
	rootOption(alias);
	alias.action(
		(
			args: string[],
			flags: {
				prompt: string;
				pending: string[];
				dropped: string[];
				amend?: string;
				root?: string;
			},
		) => {
			const p = paths(flags.root);
			const version = findPromptVersion(listPromptVersions(p.prompts, p.promptsRel), flags.prompt);
			if (!existsSync(p.rubric))
				throw new UsageError(
					`No rubric at \`${rel(p.root, p.rubric)}\`.`,
					"The committed rubric evals/bench/rubric.md grades every council brief; restore it from git history.",
				);
			const results = args.map(parseResultSpec);
			const pendings = flags.pending.map((value) => parseReasonSpec(value, "pending"));
			const droppeds = flags.dropped.map((value) => parseReasonSpec(value, "dropped"));

			for (const [label, specs] of [
				["sample", results.map((spec) => spec.family)],
				["--pending", pendings.map((spec) => spec.family)],
				["--dropped", droppeds.map((spec) => spec.family)],
			] as const)
				if (new Set(specs).size !== specs.length)
					throw new UsageError(
						`One family per ${label} argument, twice given.`,
						"Each family appears once among the samples, --pending and --dropped.",
					);
			const seatList = loadSeats(p.root);
			const seatByFamily: Record<string, Seat> = {};
			for (const spec of results) seatByFamily[spec.family] = seatFor(seatList, spec.family);
			let amend: { name: string; dir: string; run: RunLog; mapping: Mapping } | undefined;
			if (flags.amend !== undefined) {
				const found = resolveRunDir(p, flags.amend);
				const mappingFile = join(found.dir, "mapping.json");
				if (!existsSync(mappingFile))
					throw new UsageError(
						`The entry to amend (\`${found.name}\`) has no revealed mapping.`,
						`Reveal it first: ${CF} bench reveal --run ${found.name}`,
					);
				amend = {
					name: found.name,
					dir: found.dir,
					run: loadRun(found.dir, found.name),
					mapping: JSON.parse(readFileSync(mappingFile, "utf8")) as Mapping,
				};
			}
			const freshFamilies = results.map((spec) => spec.family);
			const droppedFamilies = new Set(droppeds.map((spec) => spec.family));
			interface Sample {
				family: string;
				content: string;
				seat: SeatRecord;
				sourceRun?: string;
			}
			const samples: Sample[] = results.map((spec) => {
				const result = readResult(spec);
				const seat = seatByFamily[spec.family]!;
				return {
					family: spec.family,
					content: renderSample(result.page, result.sources),
					seat: { model: seat.model, thinking: seat.thinking },
				};
			});
			const carried: Record<string, string> = {};
			if (amend !== undefined) {
				const amendFamilies = [...new Set(Object.values(amend.mapping).map((entry) => entry.family))].sort();
				for (const family of amendFamilies) {
					if (freshFamilies.includes(family) || droppedFamilies.has(family)) continue;
					const sourceAlias = Object.keys(amend.mapping)
						.sort()
						.find((candidate) => amend!.mapping[candidate]!.family === family);
					const samplePath = sourceAlias === undefined ? undefined : join(amend.dir, "samples", `${sourceAlias}.md`);
					if (samplePath === undefined || !existsSync(samplePath))
						throw new UsageError(
							`The entry to amend (\`${amend.name}\`) maps family ${family} to no sample file.`,
							"Restore the entry's samples from git history, or amend a complete entry.",
						);
					const amendSeat = amend.run.seats[family];
					if (amendSeat === undefined)
						throw new UsageError(
							`The entry to amend (\`${amend.name}\`) seats no ${family} for its carried sample.`,
							"Restore the entry's run.json from git history, or amend a complete entry.",
						);
					samples.push({
						family,
						content: readFileSync(samplePath, "utf8"),
						seat: amendSeat,
						sourceRun: amend.name,
					});
					carried[family] = amend.name;
				}
			}
			if (samples.length === 0)
				throw new UsageError(
					"No samples: pass at least one <family>=<result.json>, or --amend an entry that holds them.",
					`Example: ${CF} bench alias --prompt ${version.name} zai=$results/zai.json xai=$results/xai.json`,
				);
			const usage = pendings.length === 0 ? null : readOmpUsage().usage;
			const pending: PendingRecord[] = pendings.map((spec) => ({
				family: spec.family,
				reason: spec.reason,
				resetsAt: quotaResetsAt(seatList, spec.family, usage),
			}));
			if (amend !== undefined)
				for (const old of amend.run.pending)
					if (
						!pending.some((entry) => entry.family === old.family) &&
						!samples.some((sample) => sample.family === old.family) &&
						!droppedFamilies.has(old.family)
					)
						pending.push(old);
			const date = new Date().toISOString().slice(0, 10);
			const name = runDirName(
				date,
				version.id,
				version.version,
				listRunEntries(p.runs).map((entry) => entry.name),
			);
			const runDir = join(p.runs, name);
			const aliases = drawAliases(samples.length, amend === undefined ? undefined : Object.keys(amend.mapping));
			const seats: Record<string, SeatRecord> = {};
			const mapping: Mapping = {};
			samples.forEach((sample, index) => {
				seats[sample.family] = sample.seat;
				mapping[aliases[index]!] = {
					family: sample.family,
					model: sample.seat.model,
					thinking: sample.seat.thinking,
					...(sample.sourceRun === undefined ? {} : { source_run: sample.sourceRun }),
				};
			});
			const promptBytes = readFileSync(join(p.root, version.path), "utf8");
			const rubricBytes = readFileSync(p.rubric, "utf8");
			const briefs = Object.keys(seats)
				.sort()
				.map((family) => ({
					family,
					path: join(tmpdir(), "cf-bench", name, `brief-${family}.md`),
					text: renderBrief(
						promptBytes,
						rubricBytes,
						shuffled(aliases).map((alias) => ({
							alias,
							content: samples[aliases.indexOf(alias)]!.content,
						})),
					),
				}));
			mkdirSync(join(runDir, "samples"), { recursive: true });
			mkdirSync(join(tmpdir(), "cf-bench", name), { recursive: true });
			writeFileSync(
				join(runDir, "run.json"),
				`${JSON.stringify(
					{
						prompt: version.name,
						prompt_sha256: sha256File(join(p.root, version.path)),
						rubric_sha256: sha256File(p.rubric),
						date,
						seats,
						pending,
						dropped: droppeds.map((spec) => ({ family: spec.family, reason: spec.reason })),
						...(amend === undefined ? {} : { amends: amend.name, carried }),
					},
					null,
					2,
				)}\n`,
			);
			samples.forEach((sample, index) => {
				writeFileSync(join(runDir, "samples", `${aliases[index]}.md`), sample.content);
			});
			writeFileSync(mappingPath(name), `${JSON.stringify(mapping, null, 2)}\n`);
			for (const brief of briefs) writeFileSync(brief.path, brief.text);
			process.stdout.write(`run     ${rel(p.root, runDir)}\n`);
			process.stdout.write(`mapping ${mappingPath(name)}  (private until bench reveal)\n`);
			process.stdout.write(`samples ${aliases.slice().sort().join(" ")}\n`);
			for (const brief of briefs) process.stdout.write(`brief   ${brief.family.padEnd(10)} ${brief.path}\n`);
			for (const entry of pending)
				process.stdout.write(
					`pending ${entry.family.padEnd(10)} ${entry.reason}${entry.resetsAt === null ? "" : ` (resets ${entry.resetsAt})`}\n`,
				);
			for (const spec of droppeds) process.stdout.write(`dropped ${spec.family.padEnd(10)} ${spec.reason}\n`);
			for (const family of Object.keys(carried))
				process.stdout.write(`carried ${family.padEnd(10)} from ${carried[family]}\n`);
		},
	);

	const reveal = bench
		.command("reveal")
		.description(
			"Check each grades file, average the council's scores and ranks, move the mapping into the log, and write council.json, report.md and the leaderboard.",
		)
		.requiredOption("--run <dir>", "the run dir bench alias printed");
	reveal.addHelpText(
		"after",
		`
Exits 1 naming an invalid grades file: re-dispatch that grader, then reveal again. A seat with no
grades file stays an empty seat.

Examples:
  ${CF} bench reveal --run 2026-10-11-playful-cloud-v1`,
	);
	rootOption(reveal);
	reveal.action((flags: { run: string; root?: string }) => {
		const p = paths(flags.root);
		const found = resolveRunDir(p, flags.run);
		const entry: RunEntry = {
			name: found.name,
			dir: found.dir,
			run: loadRun(found.dir, found.name),
			revealed: existsSync(join(found.dir, "council.json")),
		};
		const aliases = aliasesOf(found.dir);
		if (aliases.length === 0) {
			process.stderr.write(`Error: no samples under ${rel(p.root, join(found.dir, "samples"))}.\n`);
			process.exitCode = 1;
			return;
		}
		const families = Object.keys(entry.run.seats).sort();
		const grades: Record<string, GradesFile> = {};
		for (const family of families) {
			const gradesPath = join(found.dir, "grades", `${family}.json`);
			if (!existsSync(gradesPath)) continue;
			try {
				const file = readGrades(gradesPath);
				validateGrades(file, aliases, gradesPath);
				grades[family] = file;
			} catch (error) {
				process.stderr.write(`Error: ${error instanceof Error ? error.message : String(error)}\n`);
				process.stderr.write(`  Re-dispatch that grader with its brief, then reveal again.\n`);
				process.exitCode = 1;
				return;
			}
		}
		if (Object.keys(grades).length === 0) {
			process.stderr.write(
				`Error: no grades files under ${rel(p.root, join(found.dir, "grades"))}. Dispatch the council (skill://dnd-benchmark step 4), then reveal again.\n`,
			);
			process.exitCode = 1;
			return;
		}
		const inLog = join(found.dir, "mapping.json");
		if (!existsSync(inLog)) {
			if (!existsSync(mappingPath(found.name))) {
				process.stderr.write(
					`Error: no mapping for ${found.name} — bench alias keeps it at ${mappingPath(found.name)} until reveal moves it into the log.\n`,
				);
				process.exitCode = 1;
				return;
			}
			renameSync(mappingPath(found.name), inLog);
		}
		const mapping = JSON.parse(readFileSync(inLog, "utf8")) as Mapping;
		const missing = aliases.filter((alias) => mapping[alias]?.family === undefined);
		if (missing.length > 0) {
			process.stderr.write(`Error: mapping.json in ${found.name} maps no family for [${missing.join(", ")}].\n`);
			process.exitCode = 1;
			return;
		}
		const council = councilOf(families, grades, aliases, mapping);
		writeFileSync(
			join(found.dir, "council.json"),
			`${JSON.stringify(
				{
					run: found.name,
					prompt: entry.run.prompt,
					date: entry.run.date,
					...(entry.run.amends === undefined ? {} : { amends: entry.run.amends }),
					council: council.council,
					empty_seats: council.empty_seats,
					order: council.order,
					samples: council.samples,
				},
				null,
				2,
			)}\n`,
		);
		writeFileSync(
			join(found.dir, "report.md"),
			renderReport(entry, council, mapping, rubricNames(readFileSync(p.rubric, "utf8"))),
		);
		mkdirSync(p.runs, { recursive: true });
		writeFileSync(p.leaderboard, renderLeaderboard(p.runs, p.prompts, p.promptsRel, p.rubric));
		council.order.forEach((alias, index) => {
			const sample = council.samples[alias]!;
			process.stdout.write(
				`${index + 1}. ${alias} (${sample.family ?? "?"}) mean ${sample.overall.toFixed(2)} · mean rank ${sample.mean_rank.toFixed(2)}\n`,
			);
		});
		process.stdout.write(
			`council ${council.council.join(", ")}${council.empty_seats.length === 0 ? "" : ` · empty seats ${council.empty_seats.join(", ")}`}\n`,
		);
		for (const pending of entry.run.pending)
			process.stdout.write(
				`pending ${pending.family} — ${pending.reason}${pending.resetsAt === null ? "" : ` (resets ${pending.resetsAt})`}\n`,
			);
		process.stdout.write(
			`wrote ${rel(p.root, join(found.dir, "council.json"))}, report.md, ${rel(p.root, p.leaderboard)}\n`,
		);
	});

	const render = bench
		.command("render")
		.description(
			"Rebuild evals/bench/leaderboard.md from the committed runs: each prompt version's latest entry, older entries as history.",
		);
	render.addHelpText("after", `\nExamples:\n  ${CF} bench render`);
	rootOption(render);
	render.action((flags: RootFlag) => {
		const p = paths(flags.root);
		mkdirSync(p.runs, { recursive: true });
		const markdown = renderLeaderboard(p.runs, p.prompts, p.promptsRel, p.rubric);
		writeFileSync(p.leaderboard, markdown);
		const entries = listRunEntries(p.runs);
		process.stdout.write(`wrote ${rel(p.root, p.leaderboard)} (${entries.length} entries)\n`);
	});

	return bench;
}

/** A pending family's reset time: its seat's provider quota, read from the usage report the run already pulled. */
function quotaResetsAt(seatList: FamilySeats[], family: string, usage: OmpUsage | null): string | null {
	const entry = seatList.find((candidate) => candidate.family === family);
	if (entry?.seat === null || entry?.seat === undefined) return null;
	return quotaOf(entry.seat.model, usage).resetsAt;
}

const collect = (value: string, previous: string[]): string[] => [...previous, value];
