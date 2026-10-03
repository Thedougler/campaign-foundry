# agent-skills

https://github.com/Thedougler/agent-skills · Claude Code skill/hook/subagent library consolidated from three projects; the shattered-sea half is a full prior iteration of an agent-run D&D 5e campaign wiki · last activity not visible (uniform clone mtimes, no git data read) · stack: SKILL.md skills + shell hooks + Python scripts (batch ingest, Whisper/pyannote audio), Obsidian vaults

## Summary
The shattered-sea TTRPG suite (~35 skills) is the closest prior art to Campaign Foundry: same pipeline (wiki-init → ingest → prep-* → session-recap → world-update → lint/query), same two-audience writing discipline, plus capabilities CF lacks — a living-world advancement skill, empirical combat calibration from real session data, and a live-table co-DM mode with audio transcription. Its strongest asset is a codified prose-creativity layer (Brennan voice + anti-slop rules + sandbox constraints) far more concrete than generic style guidance. The non-TTRPG half (Expo/Vercel/Cloudflare/job-search) is irrelevant.

## Worth salvaging
Ranked, most valuable to agentic creativity first.

1. **Anti-Slop Pass + two-mode audience selector** (`ttrpg-writing/SKILL.md`) — checkable prose rules: Deletion Test (keep an adjective only if removing it loses a mechanical fact), Negation Limit (≤2 negative constructions/page), banned structures (contrastive reframe, trite escalation, "the kind of", atmospheric rhetorical questions), no portentous withholding, no negative-space writing ("she didn't answer" → "she looked at the floor"), Two-Paragraph Rule (every atmospheric beat followed by a plain mechanical sentence), no invented stakes. Plus the mode split: DM-facing reference ("every sentence gives something to say, do, or decide") vs player-facing prose — opposite techniques, applied per-section. Brennan voice adds: consequence-first beats, retroactive stake reveals, NPC rhythm-not-personality, voice-governs-prose-not-statlines. Coverage: humanizer is generic; theatre-of-the-mind covers narration but not these checks. Adopt: fold rules into theatre-of-the-mind/humanizer; several are mechanically lintable as Vale checks.

2. **World-update living-world tick** (`world-update/SKILL.md`) — post-session ritual: triage every thread HOT/WARM/COLD by party engagement, roll d20 per thread, interpret, write. HOT gets full treatment; WARM one action + one visible ripple; COLD one sentence of offscreen movement with hooks that escalate "from whisper to collision". Clock discipline: never advance without citing the justifying situation; a filled clock flags the DM, never auto-fires; factions always show minimum passive activity. Core question everywhere: *"If the party had done nothing, what would have changed anyway?"* CF has no between-session world owner — adopt as a new skill or a lore-design extension.

3. **Situation pattern: if-ignored, Three Clue audit, PC Gravity** (`prep-situation/SKILL.md`, `sandbox-narrative/SKILL.md`, `ttrpg-writing/SKILL.md`) — the If-Ignored Requirement with the tick test (must name one visible in-world change; "tensions rise" fails). Three Clue Rule as a completion gate: 3 clues, different nodes, different discovery mechanics, ≥2 reachable without combat, or the page is incomplete. PC Gravity: per-PC Two Dials / Terminal Node / Active Friction, and the Gravity Filter (cut or retrofit anything pulling on no PC). Gravity Filter deepens npc/location/lore-design; tick test and clue gate are lintable.

4. **Empirical combat calibration** (`pc-combat-primer/SKILL.md`, `prep-encounter/SKILL.md`) — per-PC combat profiles with theoretical-vs-observed separation, append-only session logs ("record what happened, not what should have happened"), compiling into a party profile whose key output is an effective CR band derived from observed outcomes, confidence-tiered (`[low confidence]` under 3 encounters). prep-encounter consumes it: party primer Avoid flags are binding, ~25% CR discount for multi-faction fights, terrain must be actionable-not-decorative, tier tone table ("17–20: threaten things they love, not their HP"), 10-field encounter "toy" with Pressure Valve (targets party weakness) and Advantage Window (plays to their strength). CF pull-pcs gets sheets; nothing compounds observed performance — this makes fight content fit the actual table.

5. **Session-recap cascade: Spotlight Tracking + Predictions** (`session-recap/SKILL.md`) — one set of session notes cascades to recap, world state, situation lifecycle, entity stubs, config. Creative additions: Spotlight Tracking ("sessions since" each PC had a moment; reset/increment per session) keeps PCs centered; Predictions are revised (came true / stale / new), never appended — a creativity feedback loop.

6. **Live co-DM mode discipline** (`live-co-dm/SKILL.md`) — mid-session mode that deliberately skips init/lint/index-regen, loads one fast context bundle (transcript tail + world state + last note), answers in seconds, defers all canon writes, keeps the live transcript as gitignored scratch promoted to canon via ingest afterward. Pattern worth stealing even without audio: rules suspension by mode.

7. **Cross-linker batch runbook** (`cross-linker/SKILL.md`) — orphan/deadend triage in 15–25-target batches prioritizing orphans and recent pages, `index.md` as the sole entity catalog, alias links first-mention-per-section, bidirectional durable relationships, explicit exclusion list, `## Related` fallback for stat-block-only pages, duplicate-entity flagging.

8. **Wiki write hooks** (`hooks/README.md`) — PostToolUse on wiki writes: frontmatter auto-completion, wikilink validation warnings, and regen-index/qmd-reindex that detach with a lockfile to coalesce burst edits into one trailing background run; PreToolUse exit-1 as a hard guard. The coalescing-regen and frontmatter-autocomplete patterns lift cleanly into cf CLI/Vale wiring.

9. **Visual-aid conventions** (`ttrpg-visual-aids/SKILL.md`) — art-style reference file read before every generation (style + negative constraints + per-category aspect overrides); character appearances pulled verbatim from wiki pages, never invented; alt text IS the full prompt (regeneration record); per-category slideshow folders; placement rules per document type; `[!visual-aid]` callout as the generation-failure fallback that preserves the prompt. Refines generate-image.

10. **Ingest anti-drift + batch mechanics** (`ttrpg-wiki-ingest/SKILL.md`) — dedupe before anything (inbox 50–70% duplicates), token-budget batches filled smallest-first with heading-chunking of oversized sources, source-truth hierarchy (raw source beats generated prose; session canon beats prep) with discrepancy-log escalation, and the "quality shortcuts under queue pressure" table naming each temptation and what it silently destroys. Hardens CF ingest against queue-size quality decay.

11. **Focused reviewer subagents** (`agents/content-quality-reviewer.md`, `agents/lore-consistency-checker.md`) — flag-only prompts with severity tiers and "do not invent issues"; the consistency checker defines what does NOT count (audience-split pages, prep superseded by session canon) and a canonical resolution order (session notes > ingest > prep; newer > older). Cheap to port as lint checks or eval criteria.

## Lore to retell
None — shattered-sea specifics appear only as inline examples (Nona, Anzolo, Calveno, Sable Company), not transferable lore.

## Skip
- `expo-*`, `react-native-*`, `vercel-*`, `supabase*`, `workers-best-practices`, `durable-objects`, `wrangler`, `agents-sdk`, `sandbox-sdk`, `web-perf`, `web-design-guidelines`, `ui-ux-pro-max`, `use-dom`, `native-data-fetching`, `building-native-ui`, `add-app-clip`, `upgrading-expo`, `eas-update-insights`, `openrouter-*` — nextturn app stack, no content-writing relevance.
- `job-application-assistant`, `job-scraper`, `upskill` — different domain.
- `obsidian-markdown`, `obsidian-cli`, `obsidian-json-canvas`, `obsidian-bases` — Obsidian-specific; CF has its own wiki conventions [INFERENCE: CF not Obsidian-backed].
- `skill-creator`, `find-skills`, `tdd`, `improve-codebase-architecture`, `create-agent`, `enforced-in-code` — CF already has equivalents (skill-creator, run-evals, writing-for-agents).
- `roll-dice` — trivial wrapper.
- `prep-ship`, `prep-island` — nautical one-offs; vehicle-design covers craft.
- `vault-health`, `ttrpg-wiki-organize`, `ttrpg-wiki-query`, `daily-update` — covered by CF lint/query; nothing beyond them seen.
- `live-transcription` — technically impressive (actor-vs-persona two-stage speaker ID, hot/cold Whisper passes, retrain-from-corrected-transcript loop) but a whole audio subsystem; only if mic capture is wanted.
- `session-ingest` — transcript→canon multi-pass design is sound but CF ingest owns it; its speaker-map retrain integration only matters with live-transcription.
- `ttrpg-llm-wiki-init`, `prep-session`, `prep-npc`, `prep-location`, `prep-faction`, `prep-creature`, `prep-dungeon`, `prep-hb-item` — same roles as CF new-world/prep-session/npc/location/faction/creature/dungeon/item-design; mine for the shared conventions cited above, not new skills.
