# Description evals — trigger testing

Read this when the DM accepts skill-creator step 6. It measures whether a description leads a fresh agent to read the skill — invocation, not output quality. Each observation is one `omp -p` process with skills on, so it loads the skill catalog from the working tree at start: the description it sees is whatever `SKILL.md` holds at that moment. Artifacts live in `<workspace>/description-evals/`.

## 1. Query set

20 realistic queries the DM would actually type — concrete and detailed: real-looking paths, personal context, column names, URLs, casual speech, abbreviations, typos, mixed lengths. Queries must be substantive enough that consulting a skill plausibly helps; trivial one-step asks don't trigger skills regardless of description quality.

- ~10 should-trigger: varied phrasings of the same intent (some formal, some casual), some that need the skill without naming it, some where a competing skill could answer but this one should win.
- ~10 near-miss should-not-trigger: adjacent domains and keyword overlap where a naive match would fire but another tool or skill is right. A negative nothing would mistake for a positive tests nothing.

Save as `trigger-eval.json`:

```json
[{"query": "…", "should_trigger": true}, {"query": "…", "should_trigger": false}]
```

**Done when** the saved set covers the skill's trigger branches and adjacent near-misses with explicit expected outcomes.

## 2. DM review

```bash
bun run cf -- eval description-review <workspace>/description-evals/trigger-eval.json \
  --skill-name <name> --description "<current description>" \
  --static <workspace>/description-evals/review.html
```

Open the returned path in the browser. The DM edits queries, toggles should-trigger, adds and removes entries; **Export Eval Set** downloads `eval_set.json`, which becomes the working set. Bad labels measure the wrong target, so finish review before measuring.

**Done when** the DM's export is saved as `eval_set.json` with 20 labeled queries.

## 3. Observe

Each candidate gets one observation per query; that single observation decides the query's pass or fail.

1. Back up the live file: `cp <skill-path>/SKILL.md <workspace>/description-evals/SKILL.md.live`, then write the candidate into the frontmatter `description` of `<skill-path>/SKILL.md` and save it verbatim as `<workspace>/description-evals/<candidate>/description.txt`.
2. Run the batch and restore in one Bash call. The prompt is the raw query — no skill name, path or hint; `< /dev/null` keeps `omp` from swallowing the loop's input.

   ```bash
   d=<workspace>/description-evals/<candidate>; mkdir -p "$d"; i=0
   while IFS= read -r q; do
     i=$((i+1))
     omp -p --mode json --no-session --config evals/subject.config.yml --model @TEST-SUBJECT \
       --tools read,grep,glob "$q" < /dev/null > "$d/q$i.jsonl" 2> "$d/q$i.err" &
   done < <(jq -r '.[].query' <workspace>/description-evals/eval_set.json)
   wait
   cp <workspace>/description-evals/SKILL.md.live <skill-path>/SKILL.md
   ```

   If the call is interrupted, run that final `cp` before anything else.
3. Score each events file; `qN` is the query's position in `eval_set.json`:

   ```bash
   for f in <workspace>/description-evals/<candidate>/q*.jsonl; do
     grep -q '"type":"agent_end"' "$f" || { echo "$f missing"; continue; }
     grep -qE '"toolName":"read","args":\{"path":"(skill://<name>|[^"]*/<name>/SKILL\.md)(:[^"]*)?"' "$f" && echo "$f 1" || echo "$f 0"
   done
   ```

`1` is a `read` tool call on the candidate's `SKILL.md` or `skill://<name>`; a name appearing in the catalog, prompt or tool output does not count. A file without `agent_end` is a missing observation, not a `0`. A query passes when its score matches `should_trigger`.

**Done when** every query has a scored observation or is listed as missing, and `git diff <skill-path>/SKILL.md` shows no candidate left in place.

## 4. Iterate and select

Observe the current description first. `skill-writer` drafts each next candidate (frontmatter `description` only) from the failing queries, written as the trigger branches they miss or wrongly fire on rather than as query text. Keep a candidate when failures went down and nothing new broke: at least one failing query now passes and no passing query now fails; otherwise discard it and draft from the last kept description. Stop when every query passes or after three discarded candidates. Apply the last kept description permanently and run `bun run cf -- eval validate <skill-dir>`.

Report, per candidate observed: passing queries over completed observations, should-trigger misses, near-miss false positives, missing observations, and the keep or discard decision.

**Done when** every tried candidate has its results reported from scored events, and the last kept description is in `SKILL.md` and validates.
