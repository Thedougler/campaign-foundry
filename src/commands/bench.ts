import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { Command, Option } from "commander";
import { UsageError } from "../check/errors.ts";
import { loadCache, findHit, saveCache, upsertRow, type BenchRow, type Timing } from "../bench/cache.ts";
import { parseEvents, modelTagOf } from "../bench/events.ts";
import { renderJudgeBrief, anonId } from "../bench/judge.ts";
import { findFamily, loadMatrix, modelTag } from "../bench/matrix.ts";
import { loadPromptSet, findEntry, promptSha, renderBrief, benchDir } from "../bench/prompts.ts";
import { loadGrades, proseScore } from "../bench/record.ts";
import { renderLeaderboard } from "../bench/render.ts";
import { findRepoRoot } from "./check.ts";

interface RootFlag {
	root?: string;
}

interface BenchPaths {
	root: string;
	promptSet: string;
	matrix: string;
	cache: string;
	leaderboard: string;
	judgeTemplate: string;
	samples: string;
}

function paths(rootFlag: string | undefined): BenchPaths {
	const root = resolve(rootFlag ?? findRepoRoot(process.cwd()));
	const evals = join(root, "evals");
	return {
		root,
		promptSet: join(evals, "prose-bench.yaml"),
		matrix: join(evals, "models.yaml"),
		cache: join(evals, "benchmark.json"),
		leaderboard: join(evals, "benchmark.md"),
		judgeTemplate: join(evals, "bench", "judge-brief.md"),
		samples: join(evals, "benchmark-samples"),
	};
}

/** The exact omp invocation a MISS runs, from the repository root. */
function runCommand(briefRel: string, pin: string, eventsRel: string): string {
	const errorRel = eventsRel.replace(/\.events\.jsonl$/, ".error.log");
	return `omp -p --no-tools --no-skills --no-extensions --config evals/subject.config.yml --no-session --max-time 600 --mode json --thinking high \\\n  --model ${pin} "$(cat ${briefRel})" \\\n  > ${eventsRel} 2> ${errorRel}`;
}

function nowIso(): string {
	return new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
}

function timingOf(run: { totalTokens: number; durationMs: number }): Timing {
	return { total_tokens: run.totalTokens, duration_ms: Math.round(run.durationMs) };
}

function toPosix(path: string): string {
	return path.split(/[\\/]/).join("/");
}

function readFileOrUsage(path: string, what: string, hint: string): string {
	try {
		return readFileSync(path, "utf8");
	} catch {
		throw new UsageError(`No ${what} at \`${path}\`.`, hint);
	}
}

export function benchCommand(): Command {
	const bench = new Command("bench")
		.description("Run the Prose Benchmark deterministically: plan cache hits, render committed briefs, extract samples, brief the Judge, record results.")
		.addHelpText(
			"after",
			`
One Round at a time, per .agents/skills/run-evals: status → briefs → run the MISS commands →
extract → judge-brief → dispatch the Judge → record. Prompts are committed: briefs render from
evals/prose-bench.yaml, the Judge's from evals/bench/judge-brief.md.

Examples:
  cf bench status                     bench_version, per-family HIT/MISS, ready-to-run omp commands
  cf bench status --round npc-first-look --json
  cf bench briefs                     (re)render every runner brief for the current bench_version
  cf bench briefs --check             verify committed briefs match the yaml; exits 1 on drift
  cf bench extract evals/benchmark-samples/<v>/<id>/<id>.<tag>.events.jsonl
  cf bench judge-brief --id npc-first-look --sample <...>/<tag>.md
  cf bench record --id npc-first-look --family glm --grades <...>/sample-<h8>.grades.json \\
      --judge claude-opus-5.5 --events <...>/<id>.<tag>.events.jsonl
  cf bench record --id scene-opening --family grok --status dark --reason "quota exhausted on both pins"
  cf bench render                     rebuild evals/benchmark.md from evals/benchmark.json`,
		);

	bench
		.command("status")
		.description("Preflight and cache plan: bench_version, per Round and family HIT/MISS, and the omp command each MISS runs.")
		.option("--root <dir>", "repository root (default: nearest git root)")
		.option("--round <id>", "plan only this entry's Round")
		.option("--json", "print machine-readable JSON instead of text")
		.action((flags: RootFlag & { round?: string; json?: boolean }) => {
			const p = paths(flags.root);
			const set = loadPromptSet(p.promptSet);
			const matrix = loadMatrix(p.matrix);
			const cache = loadCache(p.cache);
			if (flags.round) findEntry(set, flags.round);
			const omp = spawnSync("which", ["omp"], { encoding: "utf8" });
			const entries = flags.round ? set.entries.filter((entry) => entry.id === flags.round) : set.entries;
			const rounds = entries.map((entry) => {
				const briefRel = toPosix(join(benchDir(set.version), entry.id, `${entry.id}.brief.md`));
				const runs = matrix.families.map((family) => {
					const pin = family.top.model;
					const tag = modelTag(pin);
					const hit = findHit(cache, { version: set.version, id: entry.id, family: family.name, model: pin, promptSha: promptSha(entry) });
					const eventsRel = toPosix(join(benchDir(set.version), entry.id, `${entry.id}.${tag}.events.jsonl`));
					return { family: family.name, model: pin, tag, hit: Boolean(hit), sample_path: hit?.sample_path ?? null, command: hit ? null : runCommand(briefRel, pin, eventsRel) };
				});
				return { id: entry.id, brief_path: briefRel, prompt_sha: promptSha(entry), runs };
			});
			if (flags.json) {
				console.log(JSON.stringify({ bench_version: set.version, omp: omp.status === 0, judge_fallback_pool: matrix.judgeFallbackPool, rounds }, null, 2));
				return;
			}
			console.log(`bench_version ${set.version}  (${set.entries.length} entries, evals/prose-bench.yaml)`);
			console.log(`judge fallback pool: ${matrix.judgeFallbackPool.join(", ") || "(none pinned)"}`);
			console.log(omp.status === 0 ? "omp: found" : "omp: NOT FOUND — the benchmark is SKIPPED until omp is on PATH");
			for (const round of rounds) {
				console.log(`\nRound ${round.id}  (brief ${round.brief_path}, sha ${round.prompt_sha})`);
				for (const run of round.runs) {
					if (run.hit) console.log(`  HIT  ${run.family.padEnd(6)} ${run.model}  (${run.sample_path})`);
					else {
						console.log(`  MISS ${run.family.padEnd(6)} ${run.model}`);
						console.log(`       ${run.command?.split("\n").join("\n       ")}`);
					}
				}
			}
		});

	bench
		.command("briefs")
		.description("Render every runner brief for the current bench_version into evals/benchmark-samples/, byte-exact from the yaml. Older bench_version dirs are history and never touched.")
		.option("--root <dir>", "repository root (default: nearest git root)")
		.option("--id <id>", "render only this entry's brief")
		.option("--check", "verify committed briefs match the yaml without writing; exits 1 on drift")
		.action((flags: RootFlag & { id?: string; check?: boolean }) => {
			const p = paths(flags.root);
			const set = loadPromptSet(p.promptSet);
			const entries = flags.id ? [findEntry(set, flags.id)] : set.entries;
			let drifted = 0;
			for (const entry of entries) {
				const brief = renderBrief(entry);
				const target = join(p.samples, set.version, entry.id, `${entry.id}.brief.md`);
				const rel = toPosix(relative(p.root, target));
				const existing = existsSync(target) ? readFileSync(target, "utf8") : undefined;
				if (existing === brief) {
					console.log(`${promptSha(entry)}  ${rel}`);
					continue;
				}
				if (flags.check) {
					console.log(`DRIFT  ${rel}${existing === undefined ? " (missing)" : ""}`);
					drifted++;
					continue;
				}
				mkdirSync(dirname(target), { recursive: true });
				writeFileSync(target, brief);
				console.log(`${existing === undefined ? "wrote" : "rewrote"} ${promptSha(entry)}  ${rel}`);
			}
			if (flags.check && drifted > 0) {
				console.error(`Error: ${drifted} brief(s) drifted from evals/prose-bench.yaml.`);
				console.error("  cf bench briefs            rewrite them");
				process.exitCode = 1;
			}
		});

	bench
		.command("extract")
		.description("Extract a run's sample and timing from its omp events file: writes <tag>.md beside it, prints JSON.")
		.argument("<events-file>", "path to <id>.<tag>.events.jsonl")
		.option("--root <dir>", "repository root (default: nearest git root)")
		.option("--tag <tag>", "override the sample filename tag (default: derived from the events filename)")
		.action((eventsFile: string, flags: RootFlag & { tag?: string }) => {
			const run = parseEvents(readFileOrUsage(eventsFile, "events file", "Pass the path `cf bench status` printed for the run."), eventsFile);
			const tag = flags.tag ?? modelTagOf(eventsFile);
			const samplePath = join(dirname(resolve(eventsFile)), `${tag}.md`);
			writeFileSync(samplePath, run.sample);
			console.log(JSON.stringify({ sample_path: samplePath, tag, total_tokens: run.totalTokens, duration_ms: run.durationMs, model: run.model, fenced: run.fenced, narrated: run.narrated }));
			if (!run.narrated) {
				console.error(`Warning: the sample is not a bare > [!narration] block — the model broke the brief's form.`);
				console.error(`  inspect ${samplePath} before judging; record it only if the Judge should score the breach.`);
				process.exitCode = 1;
			}
		});

	bench
		.command("judge-brief")
		.description("Fill the committed judge template for one anonymized sample: writes <out-dir>/sample-<hash>.brief.md.")
		.requiredOption("--id <id>", "entry id of the sample's Round")
		.requiredOption("--sample <file>", "path to the extracted <tag>.md sample")
		.option("--root <dir>", "repository root (default: nearest git root)")
		.option("--out-dir <dir>", "where to write the brief (default: a judge/ folder beside the sample)")
		.action((flags: { id: string; sample: string; root?: string; outDir?: string }) => {
			const p = paths(flags.root);
			const set = loadPromptSet(p.promptSet);
			const entry = findEntry(set, flags.id);
			const sample = readFileOrUsage(flags.sample, "sample", "Extract it first: cf bench extract <events-file>.");
			const outDir = flags.outDir ?? join(dirname(resolve(flags.sample)), "judge");
			const gradesPath = join(outDir, `${anonId(sample)}.grades.json`);
			const brief = renderJudgeBrief(p.judgeTemplate, { entry, brief: renderBrief(entry), sample, gradesPath });
			mkdirSync(outDir, { recursive: true });
			const briefPath = join(outDir, `${anonId(sample)}.brief.md`);
			writeFileSync(briefPath, brief);
			console.log(`judge brief: ${briefPath}`);
			console.log(`grades →    ${gradesPath}`);
		});

	bench
		.command("record")
		.description("Record one judged sample (or a dark/skipped family) in evals/benchmark.json and rebuild benchmark.md. Idempotent: re-recording replaces the row.")
		.requiredOption("--id <id>", "entry id of the Round")
		.requiredOption("--family <name>", "Matrix family that ran it")
		.option("--grades <file>", "the Judge's JSON grades file (scored rows)")
		.option("--judge <name>", "who judged, e.g. claude-opus-5.5 or the fallback pin (scored rows)")
		.option("--events <file>", "the run's events file: source of timing and the sample path")
		.addOption(new Option("--status <state>", "record the entry without scores").choices(["dark", "skipped"]))
		.option("--reason <text>", "why a dark/skipped row happened (required with --status)")
		.option("--root <dir>", "repository root (default: nearest git root)")
		.action((flags: { id: string; family: string; grades?: string; judge?: string; events?: string; status?: "dark" | "skipped"; reason?: string; root?: string }) => {
			const p = paths(flags.root);
			const set = loadPromptSet(p.promptSet);
			const matrix = loadMatrix(p.matrix);
			const entry = findEntry(set, flags.id);
			const family = findFamily(matrix, flags.family);
			const pin = family.top.model;
			const base = { bench_version: set.version, id: entry.id, prompt_sha: promptSha(entry), family: family.name, model: pin, run_at: nowIso() };
			let row: BenchRow;
			if (flags.status) {
				if (!flags.reason) throw new UsageError("--status needs --reason.", "Say why the family went dark or was skipped, e.g. --reason \"quota exhausted on both pins\".");
				const run = flags.events ? parseEvents(readFileOrUsage(flags.events, "events file", "Pass the events path `cf bench status` printed."), flags.events) : undefined;
				row = { ...base, status: flags.status, reason: flags.reason, ...(run ? { timing: timingOf(run) } : {}) };
			} else {
				if (!flags.grades || !flags.judge || !flags.events) {
					throw new UsageError("A scored row needs --grades, --judge and --events.", "cf bench record --id <id> --family <f> --grades <file> --judge <name> --events <file> — or --status dark|skipped --reason <text>.");
				}
				const grades = loadGrades(flags.grades, entry);
				const run = parseEvents(readFileOrUsage(flags.events, "events file", "Pass the events path `cf bench status` printed."), flags.events);
				const tag = modelTagOf(flags.events);
				const sampleAbs = join(dirname(resolve(flags.events)), `${tag}.md`);
				if (!existsSync(sampleAbs)) throw new UsageError(`No sample at \`${toPosix(relative(p.root, sampleAbs))}\`.`, "Run `cf bench extract " + toPosix(relative(p.root, flags.events)) + "` first.");
				row = {
					...base,
					status: "scored",
					prose_score: proseScore(grades),
					rubrics: grades,
					sample_path: toPosix(relative(p.root, sampleAbs)),
					timing: timingOf(run),
					judge: flags.judge,
				};
			}
			const cache = loadCache(p.cache);
			upsertRow(cache, row);
			mkdirSync(dirname(p.cache), { recursive: true });
			saveCache(p.cache, cache);
			writeFileSync(p.leaderboard, renderLeaderboard(cache, set, matrix));
			const detail = row.status === "scored" ? `prose ${row.prose_score} judge ${row.judge}` : `${row.status}: ${row.reason}`;
			console.log(`${row.status} ${row.id} ${row.family} ${row.model} — ${detail}`);
			console.log(`→ ${toPosix(relative(p.root, p.cache))}, ${toPosix(relative(p.root, p.leaderboard))}`);
		});

	bench
		.command("render")
		.description("Rebuild evals/benchmark.md from evals/benchmark.json.")
		.option("--root <dir>", "repository root (default: nearest git root)")
		.action((flags: RootFlag) => {
			const p = paths(flags.root);
			const cache = loadCache(p.cache);
			writeFileSync(p.leaderboard, renderLeaderboard(cache, loadPromptSet(p.promptSet), loadMatrix(p.matrix)));
			console.log(`wrote ${toPosix(relative(p.root, p.leaderboard))} (${cache.results.length} rows)`);
		});

	return bench;
}
