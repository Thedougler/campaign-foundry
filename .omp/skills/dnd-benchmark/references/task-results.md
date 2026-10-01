# Task results → events artifacts

**Task-derived, not a CLI capture.** Preserve the complete native tool response unchanged, save an explicit normalized evidence object, and derive the existing extraction input from observed evidence. The installed blocking task response exposes individual completions at `details.results`; summarized automatic delivery is not the evidence source.

## Capture (`eval`, JS)

Dispatch through `tool.task` in JS `eval` using the benchmark runner's `blocking: true` definition. Save the complete return value before conversion. This single-family capture uses the committed brief bytes; expand `tasks` for the Round's independent MISSes:

```js
const { readFileSync } = await import("node:fs");
const brief = readFileSync("<absolute-committed-brief.md>", "utf8");
const response = await tool.task({
  i: "Running committed benchmark brief",
  context: "Return only the assigned brief's prose through yield; mutate no files.",
  tasks: [{
    name: "BenchRunner",
    agent: "dnd-benchmark-<family>",
    task: brief,
    solutionSpace: "One committed narration brief; prose choices open, facts fixed",
  }],
});
await write("<absolute-raw-task-response.json>", JSON.stringify(response, null, 2));
```

**Done when** the saved raw response contains the expected individual result in `details.results`, including `exitCode`, model provenance, `tokens` and `durationMs`, or the execution failure is preserved and reported. Preserve this saved response's bytes unchanged during conversion.

## Evidence gate and normalization

Before conversion, select the family's `details.results` entry and check:

- **Success** — `exitCode === 0`, no error or abort, and one non-empty successful terminal string yield. The observed `output` is a JSON-encoded string; `extractedToolData.yield[0].data` is the decoded prose. If output is encoded, parse the whole string and require exact equality with the yield. If terminal yielded data is absent, accept only a whole-output `JSON.parse` that returns a string. Ambiguous yields, mismatches or malformed output retain raw evidence and a rejection reason; prose is never repaired.
- **Identity** — observed `resolvedModelIdentity` equals the family's current top or fallback pin. Preserve `resolvedModel` (possibly `:high`) and `resolvedThinkingLevel` separately; identity is not inferred by trimming a selector. Unsupported thinking, access failures and unexpected routing are missed runs.
- **Metrics** — observed `tokens` and `durationMs` are numeric, finite and nonnegative. Copy these exact fields, including observed zeros; aggregate metrics, `usage.totalTokens` and estimates are not substitutes.

**Done when** the selected completion satisfies all three gates, or its raw response and rejection reason are saved.

## Paths and parser contract

Use `<root>/evals/benchmark-samples/<bench_version>/<id>/`, with the live or temporary benchmark root:

- Original complete response: `<id>.<tag>.task-result.json`.
- Normalized evidence with source fields: `<id>.<tag>.normalized.json`.
- Task-derived extraction artifact: `<id>.<tag>.events.jsonl`.
- Extracted sample: `<tag>.md`.

Use `modelTag` from `src/bench/matrix.ts` for the actual observed identity; read that path when resolving filename tags. If any destination already exists, use an unused provider-suffixed tag (and numeric suffix if necessary) consistently. Preserve earlier artifacts. Fallback identity remains truthful regardless of filename suffix and receives no scored top-pin row.

Emit one `turn_end` record as this conversion's convention. `src/bench/events.ts` accepts multiple JSONL events, ignores blank lines and extracts the last `turn_end`; read that path when diagnosing extraction. A second JSONL line is not a parser error by itself.

## Normalize and convert (`eval`, JS)

Fill paths and select the family's result index from the saved response. Brief generation has already created the directory. Before writing, choose an unused tag across all four artifact paths above. The example below reproduces the observed successful terminal-yield shape after the evidence gate; for the whole-output-only branch, set `prose = JSON.parse(r.output)` and its source to `details.results[index].output (whole JSON string decoded)`.

```js
const { readFileSync, writeFileSync } = await import("node:fs");
const { join } = await import("node:path");
const source = "<absolute-raw-task-response.json>";
const directory = "<absolute-root>/evals/benchmark-samples/<bench_version>/<id>";
const id = "<entry-id>";
const tag = "<unused-actual-model-tag>";
const index = 0; // select this family's observed details.results entry
const raw = readFileSync(source, "utf8");
const response = JSON.parse(raw);
const r = response.details.results[index];
const terminal = r.extractedToolData.yield.find(
  (y) => y.type === "result" && y.status === "success");
const prose = terminal.data; // decoded successful string; raw output stays in original
const outputSource = `details.results[${index}].extractedToolData.yield (successful terminal string)`;
const normalized = {
  output: prose,
  resolvedModelIdentity: r.resolvedModelIdentity,
  resolvedModel: r.resolvedModel,
  resolvedThinkingLevel: r.resolvedThinkingLevel,
  tokens: r.tokens,
  durationMs: r.durationMs,
  sources: {
    rawResponse: source, resultIndex: index,
    output: outputSource,
    identity: `details.results[${index}].resolvedModelIdentity`,
    selector: `details.results[${index}].resolvedModel`,
    thinking: `details.results[${index}].resolvedThinkingLevel`,
    tokens: `details.results[${index}].tokens`,
    durationMs: `details.results[${index}].durationMs`,
  },
};
const stem = join(directory, `${id}.${tag}`);
const original = `${stem}.task-result.json`;
const evidence = `${stem}.normalized.json`;
const events = `${stem}.events.jsonl`;
writeFileSync(original, raw, { flag: "wx" });
writeFileSync(evidence, JSON.stringify(normalized, null, 2), { flag: "wx" });
writeFileSync(events, JSON.stringify({ type: "turn_end", message: {
  content: [{ type: "text", text: normalized.output }],
  model: normalized.resolvedModelIdentity,
  usage: { totalTokens: normalized.tokens },
  duration: normalized.durationMs,
} }) + "\n", { flag: "wx" });
console.log(JSON.stringify({ original, evidence, events, model: normalized.resolvedModelIdentity }));
```

**Done when** raw response, normalized evidence and derived event exist beside one another, with exact observed identity/metrics and decoded prose, or the rejected run retains its raw response and explicit reason. Read `.omp/skills/dnd-benchmark/SKILL.md` after conversion and follow steps 4–6 for extraction, anonymous judging and top-only recording.
