# Description evals: trigger testing

Read this when the DM accepts a trigger check (`skill-creator` step 3, or `dogfood` `references/optimise.md`). It measures whether a description leads a fresh agent to read the skill: invocation, not output quality. Each observation is one `omp -p` process with skills on, so it loads the skill catalog from the working tree at start, and the description it sees is whatever `SKILL.md` holds at that moment. Artifacts live in `<workspace>/description-evals/`, where `<workspace>` is a `cd "$(mktemp -d)" && pwd -P` directory written out literally in every later command.

## 1. Query set

Write 10 to 20 realistic queries the DM would actually type. Make them concrete and detailed, with real-looking paths and personal context, casual speech, abbreviations, typos and mixed lengths. Each is substantive enough that consulting a skill plausibly helps, because a trivial one-step ask doesn't trigger a skill whatever the description says.

- About half should trigger. These are obvious requests and paraphrases of the same intent in formal and casual registers, including asks that need the skill without mentioning it.
- About half should not. These are unrelated requests and near-misses from adjacent domains, where keyword overlap would fire a naive match but another skill is right.

Save as `trigger-eval.json`:

```json
[{"query": "…", "should_trigger": true}, {"query": "…", "should_trigger": false}]
```

**Done when** the saved set covers each trigger branch and its adjacent near-misses, every query with its expected outcome.

## 2. DM review

```bash
bun run cfcli -- eval description-review <workspace>/description-evals/trigger-eval.json \
  --skill-name <name> --description "<current description>" \
  --static <workspace>/description-evals/review.html
```

Give the DM the returned path to open. The DM edits queries and toggles should-trigger, adding or removing entries as needed. **Export Eval Set** downloads `eval_set.json`, which becomes the working set. Labels decide what is measured, and the DM reviews them before any observation.

**Done when** the DM's export is saved as `<workspace>/description-evals/eval_set.json`.

## 3. Observe

One observation per query decides that query's pass or fail.

1. Run the whole batch in one Bash call, passing each raw query as the prompt with no skill name, path or hint. `< /dev/null` keeps `omp` from swallowing the loop's input.

   ```bash
   d=<workspace>/description-evals/run; mkdir -p "$d"; i=0
   while IFS= read -r q; do
     i=$((i+1))
     omp -p --mode json --no-session --config evals/subject.config.yml --model @TEST-SUBJECT \
       --tools read,grep,glob "$q" < /dev/null > "$d/q$i.jsonl" 2> "$d/q$i.err" &
   done < <(jq -r '.[].query' <workspace>/description-evals/eval_set.json)
   wait
   ```

2. Score each events file; `qN` is the query's position in `eval_set.json`:

   ```bash
   for f in <workspace>/description-evals/run/q*.jsonl; do
     jq -Rrs --arg f "$f" 'if test("\"type\":\"agent_end\"") | not then "\($f) missing" elif test("\"toolName\":\"read\",\"args\":\\{\"path\":\"(skill://<name>|[^\"]*/<name>/SKILL\\.md)(:[^\"]*)?\"") then "\($f) 1" else "\($f) 0" end' "$f"
   done
   ```

`1` is a `read` tool call on the skill's `SKILL.md` or `skill://<name>`; a name appearing in the catalog, prompt or tool output does not count. A file without `agent_end` is a missing observation, not a `0`. A query passes when its score matches `should_trigger`.

**Done when** every query has a scored observation or is listed as missing.

## 4. Report

Report passing queries over completed observations, should-trigger misses, near-miss false positives and missing observations. When any query fails, dispatch `skill-writer` once with the failing queries, written as the trigger branches the description misses or wrongly fires on rather than as query text; it revises the frontmatter `description` alone, and `bun run cfcli -- eval validate <skill-dir>` must pass after.

**Done when** the results are reported from scored events and the description in `SKILL.md` validates.
