# Hooks

Shell scripts that fire automatically on Claude Code tool events via `settings.json`.
All hooks read the triggering file path from `$CLAUDE_TOOL_INPUT` (JSON).

## Hook inventory

| Script | Event | Trigger | Effect |
|---|---|---|---|
| `block-env-edits.sh` | PreToolUse | Write\|Edit on `*.env` / `.env.*` | Blocks the edit — exits 1 |
| `block-lockfile-edits.sh` | PreToolUse | Write\|Edit on lockfiles | Blocks direct lockfile edits — exits 1 |
| `format-python.sh` | PostToolUse | Write\|Edit on `*.py` | Runs `ruff format` on the file |
| `lint-python.sh` | PostToolUse | Write\|Edit on `*.py` | Runs `ruff check`; non-zero exit surfaces errors to the agent |
| `biome-fix.sh` | PostToolUse | Write\|Edit on `*.ts` / `*.tsx` | Runs `biome check --fix`; always exits 0 |
| `check-wikilinks.sh` | PostToolUse | Write\|Edit on `wiki/**/*.md` | Warns on unresolved `[[wikilinks]]` |
| `validate-frontmatter.sh` | PostToolUse | Write\|Edit on `wiki/**/*.md` | Auto-completes missing frontmatter fields |
| `regen-index.sh` | PostToolUse | Write\|Edit on `wiki/**/*.md` | Regenerates `wiki/index.md` in background |
| `qmd-reindex.sh` | PostToolUse | Write\|Edit on `wiki/**/*.md` or `.raw/**/*.md` | Runs `qmd update` + `qmd embed` in background |

## Installation

1. Copy the scripts you want into your project's `.claude/hooks/`:
   ```bash
   cp agent-skills/hooks/block-env-edits.sh my-project/.claude/hooks/
   ```

2. Wire them in `.claude/settings.json`:
   ```json
   {
     "hooks": {
       "PreToolUse": [
         {
           "matcher": "Write|Edit",
           "hooks": [
             { "type": "command", "command": "bash /abs/path/to/.claude/hooks/block-env-edits.sh" },
             { "type": "command", "command": "bash /abs/path/to/.claude/hooks/block-lockfile-edits.sh" }
           ]
         }
       ],
       "PostToolUse": [
         {
           "matcher": "Write|Edit",
           "hooks": [
             { "type": "command", "command": "bash /abs/path/to/.claude/hooks/format-python.sh" },
             { "type": "command", "command": "bash /abs/path/to/.claude/hooks/lint-python.sh" },
             { "type": "command", "command": "bash /abs/path/to/.claude/hooks/biome-fix.sh" }
           ]
         }
       ]
     }
   }
   ```

3. Add a `permissions.allow` entry so Claude doesn't prompt on every hook execution:
   ```json
   "Bash(bash /abs/path/to/.claude/hooks/*)"
   ```

## Notes

- **PreToolUse hooks that exit non-zero block the tool call.** Use this for guards (`block-*`).
- **PostToolUse hooks that exit non-zero surface an error to the agent** — it can retry or fix. Use this for linters (`lint-python.sh`).
- **Background hooks** (`regen-index.sh`, `qmd-reindex.sh`) always exit 0. They detach with a lockfile to coalesce burst edits into one trailing run.
- Wiki-specific hooks (`check-wikilinks.sh`, `validate-frontmatter.sh`, `regen-index.sh`, `qmd-reindex.sh`) contain paths and logic tied to the `shattered-sea` vault structure — update them for your project layout before use.
