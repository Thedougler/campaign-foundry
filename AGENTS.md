# Campaign Foundry

## Sourcing content

Campaign content follows the 2024 D&D 5e rules. Reuse before inventing: whether writing a rules figure or creating new content (a Creature, Item, Spell, NPC, Location, adventure idea), take it from the first source that fits the DM's intent:

1. **The Wiki**: House Rules, homebrew and anything already recorded there is Canon.
2. **The SRD**: `dnd5e-srd-api` fetches SRD spell text, stat blocks, class tables and items.
3. **The web**: official content outside the SRD, then existing homebrew and published material to co-opt. Search with the project's web skills (`tavily-search`, `exa-search`, `firecrawl-scrape` and the rest).
4. **Novel content**, only when nothing found fits the intent, and inspired by the closest material the search turned up.

Foundry is never a source.

## Domain

At the start of every run, read `user-config.md` for the DM's preferences, then the active Campaign's `hot.md`, the World's `index.md`, the last ten `log.md` entries and task pages. When a write root is assigned, use its Campaign pages and filesystem paths; it is the only Campaign write root.

`CONTEXT.md` is the glossary: name every domain concept with its term. `docs/adr/` holds design decisions; read the ones touching an area before changing it. Read `docs/wiki-layout.md` before creating or moving a page. Find Wiki content with QMD first and retrieve the hits; the `qmd` skill owns mechanics. Trusted production sessions may use QMD MCP and `vault://_/` for the active vault. Protected Runners use their assigned capabilities under `evals/README.md`, including read-only live-source search; their write root has no QMD index. Production indexing follows actual canonical source writes, not temporary World edits.

## Models

Model selection belongs in harness configuration, native agent frontmatter, and `evals/models.yaml`, not shared instructions. Inside oh-my-pi, use its role-backed eval agents and configured fallbacks; other harnesses use the Matrix's cheap runner pins, rotation and grader pins. Keep at most four subagents running at once. Every large change or novel addition to agent-facing text — skills, native agent definitions, `AGENTS.md`, runbooks, pointers — is delegated to `skill-writer`, which follows `writing-for-agents`. The orchestrator writes briefs and owns eval fixtures, Wiki, and integration; it never authors those instruction files itself. Image generation uses the configured image workflow. Claude-specific instructions belong in `CLAUDE.md` and are maintained by Claude.

## Working rules

- **Install before building.** When an established package does the job, `bun add` it and use it; write custom code only for what no package covers.
- **Holistic design.** Every rule holds everywhere. A rule that needs a carve-out is too rigid: rework the rule until the case fits.
- **The repo is the memory.** Record every durable fact, preference or decision in the repo: terms in `CONTEXT.md`, decisions in `docs/adr/`, working rules here, rather than in harness memory files.
- **Intent is not implementation.** `docs/intent/` records what earlier skills and templates were meant to do. Read it for intent and build every v2 from scratch; its README has the rules.
- **Writing for agents.** You MUST read `writing-for-agents` before writing any text intended for agent consumption — skills, agent documents, runbooks, pointers — and follow it. Route that surface through `skill-writer`.
- **Skill verification.** Evals are the verification mechanism for agent skill changes; software tests are unnecessary for instruction-only changes. Verify executable code changes with software tests at their public interfaces.
- **Dogfooding evals.** Read `evals/README.md` before authoring, preparing, dispatching or grading skill evals, or processing home-Session feedback; it owns Shattered Sea grounding, enforced Runner access and Session-root lifetime.
- **Clean slate.** Facts come from this repo, the installed tools and the user. Earlier DM-assistant projects elsewhere on this machine are out of bounds: never read, cite or borrow from them.
- **User edits are intentional.** When the DM changes their own harness configuration — model roles, `cfg://` settings, `.omp/` files, agent definitions, eval pins — assume it is intended and proceed. Never audit, re-validate or investigate those changes unless the DM asks.
- **Commit everything.** When committing, include all tracked and untracked worktree changes, including the DM's edits. User changes are intentional work worth committing.
- **Close completed issues.** Once a GitHub issue's acceptance criteria are met and the work is verified and committed, close it with a brief completion comment citing the commit and verification.
