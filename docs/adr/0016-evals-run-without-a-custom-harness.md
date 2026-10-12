# Eval subagents run without a custom harness

Status: its Benchmark parts are superseded by [ADR 0038](0038-blind-council-benchmark.md). Benchmark Runners and graders are native `task` dispatches of the `bench-runner-<family>` and `bench-grader-<family>` agents, and no Benchmark run is an `omp -p` process.

ADR 0014 had Runners save pages through scoped `write` and `delete_page` capabilities. A JS harness (`evals/run.ts`, `evals/runner-tools.ts`) bound those capabilities, a grant-enforcing omp extension guarded them, and a private OS-temp Session root held source hashes. The harness ran to about two thousand lines of code and tests and depended on the JS kernel's `agent()`/`tool()` globals. It broke whenever omp's native task results changed shape.

Skill evals, skill-creator paired and description evals, and Benchmark runs are now agent instructions with no harness code. `evals/README.md#run-a-case` gives the recipe.

- **Runners and graders are native `task` dispatches.** The DM wants to watch them live in the active omp instance. The read-only boundary sits in agent frontmatter: `test-subject` gets `tools: [read, grep, glob, web_search, bash]` (`bash` is for diagnostic CLI such as `bun run cfcli -- encounter-budget`, not Wiki writes) and `prose-grader` gets `tools: [read, grep, glob]`. The `write` that remains reaches only `xd://` devices, so it cannot change files. Runners still get QMD search through `xd://mcp__qmd_query`. Subagents don't receive decision memory or `manage_skill`.
- **A Runner returns its pages, deletions and DM reply as its result.** It writes the DM reply as prose and puts each page in a four-backtick `markdown` fenced block whose info string names `file="<path>"`. An empty `delete` block marks each removal. The orchestrator copies `agent://<id>` to a file, and an `awk` one-liner splits it into the output overlay that `bun evals/check.ts` and the grader read. This reverses ADR 0014's rule that files on disk replace reply blocks, because a read-only tool set matters more than letting Runners reread their drafts. Graders return `{grades}` through `outputSchema`.
- **Description trigger checks and Benchmark runs are `omp -p` processes.** A trigger check needs a fresh skill catalog, and Benchmark runs need Matrix pins. `--config evals/subject.config.yml` turns decision memory and autolearn off for them, and Benchmark runners run with `--no-tools`.

Answer isolation (Runners do not read `evals/`) is an instruction in `.omp/agents/test-subject.md` and is not enforced. What is enforced is the read-only tool set, plus a before/after `git status` of `wiki raw archive`. Source hashing and Session roots are gone, and outputs live in a `mktemp -d` directory.

ADR 0014's live-Wiki reading, Outcome overlay, Checks and grounding rules still hold.
