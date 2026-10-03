# agent-skills salvage extract

Repo root holds one directory per skill (`<skill>/SKILL.md`), plus `hooks/` and `agents/`. All 14 listed files found and copied under `sources/agent-skills/`.

## Anti-Slop Pass + two-mode audience selector
- source: `ttrpg-writing/SKILL.md` (found)
- destination: `theatre-of-the-mind`, `humanizer`
- load-bearing:
  - **Mode selector**: "Every piece of TTRPG content targets one of two audiences... the techniques are opposite and applying one to the other context actively degrades the output." DM-facing reference mode: "Every sentence must give them something to say, do, or decide — nothing else." Player-facing prose mode for read-aloud/handouts/recaps. Mixed pages: "apply each mode to its section separately."
  - **Deletion Test**: "For every adjective and adverb: if removing it doesn't eliminate a mechanical fact about the world, delete it." ("Rusty iron door" keeps rust — signals noisy/weakened; "imposing stone wall" cuts.)
  - **Negation Limit**: "Cap negative constructions ('didn't move', 'without speaking', 'not painful') at two per page."
  - **Banned structures**: contrastive reframes ("It wasn't just cold. It was a cold that reached into your soul."), trite escalation ("Little did they know..."), the "kind of" construction ("the kind of silence that has teeth"), atmospheric rhetorical questions ("What lurks beneath these ancient stones?").
  - **No portentous withholding**: "'He's terrified of the guild' is better than 'those who know him say he carries old debts.'"
  - **No negative-space writing**: "Never describe what characters didn't do, didn't say, or didn't notice. 'She didn't answer' → 'She looked at the floor.'"
  - **Two-Paragraph Rule**: "After any atmospheric or editorial sentence, the next sentence must be plain and mechanical."
  - **No invented stakes**: "Never add motives, emotions, dangers, secrets, or lore not present in the source material or explicit brief."
  - **Brennan voice**: consequence first ("'She counterspells. She drops a sixth-level slot. It doesn't work.' Not 'You watch her try to counterspell.'"); "When the moment is big, get small"; specificity as the emotional hit; "Reveal retroactive stakes. After a dramatic outcome, say what would have happened the other way"; "NPC rhythms, not personalities"; avoid atmosphere-before-action, "You see X" when "X happens" is available, softened consequences, narrating player feelings, labeling things anomalous.
  - **Voice scope rule**: voice governs prose, not data — "It does NOT govern mechanical reference: stat blocks, DC tables, clock entries, frontmatter... Applying voice to a stat line wastes the DM's scan time."
  - Silent-fix rule: when touching a page, fix violations silently; only `> [!contradiction]`/`> [!lint]` markers are exempt.
- skip-from-this-file: callout-standard table, publish contracts/paired pages, path verification, multi-pass generation routing, Obsidian wikilink conventions.

## World-update living-world tick
- source: `world-update/SKILL.md` (found)
- destination: new post-`ingest` skill or `lore-design` extension; clock format for `faction-design`/`npc-design`
- load-bearing:
  - Core question everywhere: "*If the party had done nothing, what would have changed anyway?* Factions pursue their own goals. The party is one variable — not the engine."
  - Triage tiers: **HOT** (directly engaged this session → "How effectively the faction/force reacts to party action"), **WARM** (engaged before, not this session → "one action and one visible ripple the party could notice"), **COLD** (brewing → "one sentence of offscreen movement and a hook that strengthens... hooks escalate from whisper to collision").
  - Clock advance discipline: (1) read the situation's trigger condition per segment; (2) advance only if the trigger occurred; (3) record citation `[from: {situation-slug}]` — "Never advance without one"; (4) "Clock fills → flag to DM, do not fire. No triggered event executes without DM confirmation."; (5) "No trigger → document what the faction did anyway (minimum passive activity). Factions don't pause."
  - Every thread rolls a d20 via roll.sh; "The result is canon."
  - Workflow: load recap/world-state → triage (present for DM confirmation) → per thread: deep read → propose action → roll → interpret → write, one thread at a time → PC arc weaving → close out.
  - Prep-vs-canon split: "prep-session simulates likely clocks as pending. world-update owns the canon write."
- skip-from-this-file: `references/update-workflow.md` ritual detail, roll.sh, PC-arc weaving mechanics.

## If-Ignored, Three Clue audit, PC Gravity
- source: `prep-situation/SKILL.md`, `sandbox-narrative/SKILL.md`, `ttrpg-writing/SKILL.md` (all found)
- destination: Gravity Filter → `npc-design`/`location-design`/`lore-design`; tick test + clue gate → `prep-session` and scene skills (lintable)
- load-bearing:
  - **If-Ignored Requirement** (ttrpg-writing): "Every situation, location hook, NPC objective, and session-prep beat must answer: what happens if the party doesn't engage?" Good: "the commission assembles and departs; the wreck is not empty when they reach it." Bad: "tensions rise. (Unshowable. Rise how? Who notices?)"
  - **Tick test**: "if you can't describe a single visible, in-world change the DM can narrate or the players can stumble across, the if-ignored consequence isn't concrete enough."
  - **Three Clue Rule** (prep-situation + sandbox-narrative): "Apply when the situation has a hidden conclusion... Skip when the situation is fully visible." Audit format: "Conclusion: [what players must understand] / Clue 1–3: [node] — [specific discovery mechanic, different mechanic each]". "Redundancy rule: clues must span different nodes. Two clues at the same location fails." "At least two clues reachable without combat." "If you cannot name three distinct clues, the situation is incomplete."
  - **PC Gravity** (sandbox-narrative): per PC "Two Dials — two core behavioral axes (e.g., family loyalty / reckless ambition). Internal tensions, not surface traits"; "Terminal Node — deepest long-term desire. Asymptotic — approaches but never arrives"; "Active Friction — what currently blocks them. This is where you place toys." **Gravity Filter**: "Does this element pull on at least one PC's dials or terminal node? Yes → include it, note which PC and how. No → cut it, or retrofit a connection."
  - **Faction Timeline table**: Day 1 / Day 3 / Day 7 rows of "Actor Action | Observable Signal" — "a playable consequence chain, not flavor."
  - **Outcome rule**: "if every outcome requires the players to do X first, rewrite. Situations resolve with or without party involvement. Player action changes *which* outcome, not *whether* one occurs."
  - **Toy properties** (sandbox-narrative): Clarity / Agency / Reactivity / Portability; "Three Hooks Rule: Every major toy needs moral, personal, and opportunistic entry points."
  - "If you removed the players and the world wouldn't change — you wrote a plot, not a sandbox."
  - Clock YAML: `name / segments (4 fast, 6 slow) / filled / trigger / consequence`; consequence rules: "specific > vague. Observable > atmospheric. Irreversible > undoable."
- skip-from-this-file: lifecycle filing to active/dormant/resolved dirs, frontmatter hook auto-completion, narrative-device table, commit conventions.

## Empirical combat calibration
- source: `pc-combat-primer/SKILL.md`, `prep-encounter/SKILL.md` (both found)
- destination: `dnd-benchmark`/encounter calibration in `cliffhanger-scene`/`climax-scene`; `pull-pcs` adjacency
- load-bearing:
  - Premise: "replaces CR's generic assumptions with empirical data from this table: real dice rolls, real damage, real tactics."
  - Data principle: "**record what happened, not what should have happened.** Theoretical calculations come from the sheet; the session log records empirical reality."
  - PC profile sections: Fast Read (role, sustained DPR, nova DPR, effective HP) / Offensive / Defensive / Resource Economy / Counter Profile ("what shuts this PC down") / Synergy Hooks / Session Combat Log (append-only) / Calibration Notes.
  - Party profile compiles PC profiles; its "most important output" is the **Effective CR Band**: start from standard 5e XP thresholds, then "if party consistently trivializes encounters at a given CR → raise the floor"; "if party nearly TPKs → lower the ceiling"; "Weight recent sessions more heavily"; factor no-AoE / solo-target / coordination; express as CR ranges per tier with confidence notes. "Mark any band derived from fewer than 3 encounters at that tier as `[low confidence]`."
  - Quality gates: "Every number must cite its source: `[sheet]`, `[session-NN]`, `[calculated]`"; "Never mix theoretical and observed in the same field"; "Session log entries are append-only"; confidence: high 5+ sessions, medium 3–4, low 1–2, theoretical 0.
  - **Avoid flags are binding**: "The party primer's Avoid section is binding. If your encounter would violate it, redesign before proceeding."
  - **Multi-faction discount**: "When two or more enemy groups are present... discount the total CR budget by ~25% — enemies that fight each other reduce effective pressure on the party."
  - **Terrain**: "Always includes 2–3 actionable terrain features. Decorative is not actionable — each feature must have a mechanical use available to both sides."
  - **Tier tone table**: 1–4 "Danger is real. Terrain Shift is a lifeline."; 5–8 "Target action economy and concentration."; 9–12 "Moving parts. Multiple objectives."; 13–16 "Consequences beyond the room."; 17–20 "Threaten things they love, not their HP."
  - **10-Field Toy** (frontmatter six + body four): `primary_goal` (thematic, not tactical — what this encounter proves), `consistent_method`, `active_problem` (in motion before party arrives), `performance_hooks` (one vibe + one tic for lead antagonist), `link_of_relevance` (which PC's backstory/fear/goal — required), `terrain_shift` (one timed mid-encounter change); body: Challenge Calibration, **Pressure Valve** ("Targets party weakness — tension without unfairness"), **Advantage Window** ("Plays to party strength — lets them feel powerful if found"), Drama Suite (DC table 10/15/20, shenanigan offers, Box of Doom flags).
  - Sandbox check: PC Boundary (never write PC decisions/feelings), NPC Agency (goals predate the party), Pressures Not Plots ("No 'if players do X then Y' chains more than one step deep"), PC-Connection Requirement.
- skip-from-this-file: PDF sheet conversion, dot workflow graphs, filing/commit conventions, CR-TABLES reference (standard DMG math).

## Session-recap cascade: Spotlight Tracking + Predictions
- source: `session-recap/SKILL.md` (found)
- destination: CF `ingest` post-play path / recap area
- load-bearing:
  - Cascade concept: "A coordinated update across every file that tracks current world state, triggered by one set of session notes. Without this, post-session updates are scattered... easy to miss one." One notes input → recap + world state + situation updates + clock review + party tracking + config refresh.
  - **Predictions**: "revise: which came true, which are stale, what's new" — a revised list, never append-only.
  - **Spotlight Tracking**: "reset 'Sessions Since' for PCs who had moments, increment others" — per-PC sessions-since-a-moment counter in the world state file.
  - Recap gate: "Session recap reads as player-facing prose, not DM notes"; "hot.md reflects the world state at the END of the session"; "Every new entity mentioned in the recap has a wikilink and at least a stub page"; "No situation file still references pre-session state"; "Predictions are revised, not just appended to."
  - Clock writes defer: "note any advances (defer canon clock writes to `world-update`)."
- skip-from-this-file: CLAUDE.md party-block updates, commit prefixes, scene-art generation step.

## Live co-DM mode discipline
- source: `live-co-dm/SKILL.md` (found)
- destination: pattern only — rules-suspension-by-mode for any future fast path; CF itself is between-sessions only
- load-bearing:
  - "In live mode you deliberately skip most operational rules." Startup is exactly one fast context loader ("transcript tail 80 lines + world state + previous session note pointer") — "SKIP ... ttrpg-wiki-lint, index regen, frontmatter passes, full audits, and every other maintenance/startup task. Do not read the full vault. You are on the clock — the players are waiting."
  - "Answer in seconds, not paragraphs. A name, three bullet options, one stat line, a yes/and."
  - One specific fact → single targeted lookup, "don't bulk-load."
  - "Defer all canon writes. No session recap, ingest, cross-linking, or page edits mid-session. The live transcript is gitignored scratch; it gets promoted to canon *after* the game."
  - "Flag invented detail as a proposal, not canon." Never fire a trigger without offering it as a choice.
- skip-from-this-file: all of Mode B (voice profiling, transcription, Whisper passes) per findings.

## Cross-linker batch runbook
- source: `cross-linker/SKILL.md` (found)
- destination: `cf` lint/query companion idea; wiki cross-linking guidance
- load-bearing:
  - Batching: "A full-vault pass is impractical in one session. Every run targets a batch." 15–25 targets per run, prioritized: "Orphans over deadends (orphans are invisible to the graph)"; entity pages over generic items; "Recently created/ingested pages"; skip junk/duplicates and "stat-block-only creature pages (these are reference data, not narrative — link them only if a narrative page references the creature)."
  - `index.md` is "the entity catalog with slugs, display names, and summaries. Use it as your lookup... Do NOT build a separate registry."
  - Orphan fix: search display name and slug (accented + stripped forms), wrap "the first natural mention" per page; if no prose mention exists, use an obvious semantic parent or a `## Related` block.
  - Deadend fix: link un-wikilinked entity names; generic items link to owner/user/place; stat-block-only pages use the `## Related` fallback.
  - "Bidirectional rule: If A links B as a durable relationship (not a passing mention), B should link back to A."
  - **Exclusions**: system/meta dirs and files (`index.md`, `hot.md`, `log.md`, `discrepancy-log.md`...); never link to index/hot from content pages — "they are agent-facing, not content entities."
  - Duplicate-entity check: mentions already linking a similar-named file → "Flag these for the DM rather than adding a second link."
  - Report format: links added / orphans resolved / deadends resolved / remaining for next run.
- skip-from-this-file: git commit conventions, lint-command wiring.

## Wiki write hooks (coalescing regen idea)
- source: `hooks/README.md` (found)
- destination: `cf` CLI / Vale wiring idea only
- load-bearing:
  - Inventory worth noting: PreToolUse guards that "exit non-zero block the tool call" (env files, lockfiles); PostToolUse linters whose non-zero exit "surface[s] an error to the agent — it can retry or fix"; PostToolUse wiki hooks: wikilink validation warnings, frontmatter auto-completion, background index regen + QMD reindex.
  - **Coalescing pattern**: "Background hooks (`regen-index.sh`, `qmd-reindex.sh`) always exit 0. They detach with a lockfile to coalesce burst edits into one trailing run." — the portable idea for expensive regen after burst writes.
- skip-from-this-file: Claude Code settings.json wiring, Python/TS format hooks, per-project path caveats.

## Visual-aid conventions
- source: `ttrpg-visual-aids/SKILL.md` (found)
- destination: `generate-image`
- load-bearing:
  - "Read your project's art-style reference file... before every generation task... Apply its directives to every prompt — no exceptions." Style file defines style prompt, negative constraints, per-category aspect overrides, character appearance references. Missing file → stop and ask.
  - Prompt assembly order: base style → category modifiers → scene content → **"Character descriptions — pulled verbatim from wiki pages, never invented"** ("If a character lacks sufficient visual description on their page, ask the DM — do not approximate") → negative constraints last.
  - **"Alt text is the prompt."** Full generation prompt embedded as alt text: "both accessibility text and a regeneration record. Long embed lines are expected and intentional."
  - Per-category storage folders double as slideshow sources (portraits/banners/sessions/scenes/combat/maps/handouts); kebab-case; zero-padded session folders; `.webp` default, `.png` only for maps/handouts.
  - Placement caps: NPC page 1 portrait after Roleplay Concept; location 1 banner after opening read-aloud; session recap 1 per major beat; encounter 1 scene-setter. "Never embed images inside callouts" or between consecutive prose paragraphs.
  - **Failure fallback**: "write the full prompt as a `> [!visual-aid]` callout where the image would go" — preserves the prompt for later generation.
  - When to generate vs not: yes for prep/recap/entity art/DM request; no during structural edits, when art exists, or for minor entities.
- skip-from-this-file: openrouter-image-gen script invocation, OBS/Obsidian gallery specifics, legacy-asset migration.

## Ingest anti-drift + batch mechanics
- source: `ttrpg-wiki-ingest/SKILL.md` (found)
- destination: CF `ingest`
- load-bearing:
  - **Dedupe first**: "A large Inbox can be 50–70% duplicates. The script is cheap; the ingest loop is expensive." Prune byte-identical inbox files before anything else.
  - **Token-budget batches**: default 30k tokens, "walking the queue smallest-first and stopping when the next file would exceed the budget"; oversized files "automatically chunked by `##` headings"; one commit per batch; script handles resumption.
  - **Batch-local focus**: "Your job is this batch. Not the queue... The 7th source deserves the same reciprocal links... as the 1st."
  - **Quality-shortcuts-under-pressure table** (each temptation → what it silently destroys): skip dedupe packet → "Miss existing pages, create duplicate stubs"; thin reciprocal links → "Wiki graph becomes sparse and one-directional"; skip reference files → "Format drift, missed edge cases"; summarize instead of decompose → "Claims lose granularity, become un-linkable"; stub when source has extractable content → "Information buried, never surfaces"; vague log messages → "Future queries can't find what changed". "None of these save meaningful time. They trade durable wiki quality for the feeling of progress."
  - **Source-truth hierarchy**: "Raw source beats generated prose. Flag contradictions unless wiki has a later source. Clean reviewed transcript beats raw noise. DM instruction in current request beats old source notes. Existing wiki canon beats model inference. Never add a secret, motive, or consequence because it 'fits'." Conflicts → discrepancy log, escalate to DM.
  - Decompose, don't summarize: "break the source into durable claims, giving each claim one canonical home"; `summary` ≤ two sentences.
- skip-from-this-file: Python scripts (check_ingest.py, ingest_packet.py, archive_source.py), PDF preprocessing, commit message formats.

## Focused reviewer subagents
- source: `agents/content-quality-reviewer.md`, `agents/lore-consistency-checker.md` (both found)
- destination: lint checks or eval criteria (flag-only reviewer prompts)
- load-bearing:
  - Shared shape: flag-only ("Do not rewrite content — just identify problems"), severity tiers, and "If nothing is flagged, say so. Do not invent issues or flag style preferences."
  - content-quality-reviewer rules: **PC Boundary** ("never write what a PC decides, chooses, intends, feels... 'the party decides to' or 'Perrin feels uneasy' are violations"); **NPC Agency** ("NPC goals must predate the party... A situation file where an NPC only acts in response to PC actions (with no independent momentum) is a violation"); **Pressures Not Plots** ("Any 'if players do X then Y' chain more than one step deep is a violation. Predictions and DM notes in `hot.md` are exempt — those are planning tools"); **PC-Connection Requirement** ("If you can't identify which PC cares and why, flag it as 'missing PC connection'").
  - Severity scale: high = PC boundary / plot scripting; medium = NPC agency / missing connection; low = frontmatter. Violations cite file, quoted text, rule, severity; files with no violations are omitted.
  - lore-consistency-checker defines what does NOT count: "Audience-split pages... are deliberately different"; "Prep-vs-session divergence — session transcripts are canon. Prep that disagrees with what actually happened at the table is not a contradiction, it's superseded"; "Vague vs specific... is not a contradiction unless they're clearly referring to different places."
  - Contradiction classes: timeline, location, faction membership drift, relationship inconsistencies, diverging physical descriptions, mechanical facts (CR, class, level, item properties).
  - **Canonical resolution order**: "prefer session notes > ingest > prep, newer > older"; don't re-report items already in `discrepancy-log.md`.
- skip-from-this-file: `model: sonnet` pins, campaign-specific naming, output formatting minutiae.
