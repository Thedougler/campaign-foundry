# Tests

`bun run test` (vitest, pool `forks`: one real process per file, tests within a file run in order).
Everything else the CI gate runs lives in `check:all`.

## The one harness: `test/check/helpers.ts`

- **`cf(args, cwd?, stdin?)`** runs one `cf` invocation **in this process** (`runCli` from `src/cli.ts`):
  same commander program the spawned CLI runs, stdout/stderr captured, exit code returned as `code`.
  Use it for everything a test asserts about command behaviour — help, exit codes, JSON reports, files
  written. A suite pays the CLI's module load once per worker, not once per invocation.
- **`cfWithEnv(args, env, cwd?, stdin?)`** is `cf` with process env entries set for the call and
  restored after (`undefined` removes). Use it when a command must see a doctored environment
  (for example a `PATH` without `vale`).
- **`checkFixture(fixture, extra?)`** / **`copyFixture(fixture)`** / **`vaultFlags(dir)`** /
  **`findingsFor(report, page)`**: the fixture vaults under `test/check/fixtures/`, copies for `--fix`
  runs (`.cache` excluded), and finding lookup by page.

Only three things still spawn processes, each for a reason the in-process runner cannot cover:

1. `test/cli.test.ts` — one smoke test through `bun run cf --`, pinning the npm-script invocation channel.
2. `test/foundry-control/cli.test.ts` — `foundry serve`, a real stdio MCP server that must own a process.
3. `test/check/prose-layers.test.ts` — two tests that put a stub `vale` on a child's `PATH` (env-shim tests).

Everything else (backup git repos, the wiki-check hook) shells out to `git`/`node` for non-CLI tools.

## Rules the suite follows

- Tests protect consumer-visible behaviour: what a command prints, writes, exits, and refuses. No test
  pins private wording, implementation details, or forwarder plumbing; a judgement over prose or meaning
  is agent work and is not coded here.
- Perf assertions compare relative cold/warm cost with generous absolute bounds, so a loaded machine
  flakes neither way.
- Timing-sensitive logic (throttling) asserts its invariant (spacing) with real sleeps, not wall-clock
  remainders that scheduler delay can shrink.

## In-process runner constraints (why some tests are shaped the way they are)

`runCli` serialises concurrent calls in a worker: the invocations share one process's cwd, argv, exit
code and stdio, so each call owns all four in turn, with output routed per call. Consequences:

- Concurrent `cf()` calls (for example `Promise.all` over layers) queue rather than interleave; they
  keep their own output and codes. True process-level races (parallel spawned agents appending to one
  log) are not what these tests measure any more — the log concurrency test now proves the command
  keeps every entry and reports idempotency, not OS append atomicity.
- Tests that need a *child* to see a different environment spawn instead of calling `cf`.
