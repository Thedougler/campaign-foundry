# agentic-co-dm

https://github.com/Thedougler/agentic-co-dm · Skill-driven Obsidian toolkit for Campaign preparation and reconciliation · last activity [2026-09-27](https://github.com/Thedougler/agentic-co-dm/commits/HEAD/) · stack Python 3.12+, Node 22+, uv, Markdown, Vale, QMD, omp

## Summary

Agents prepared and wrapped up tabletop Sessions through specialised writing skills, typed Wiki pages, linked canon, and maintenance CLIs. Its later instructions explicitly made content quality and usefulness at the table primary, with scripts supporting rather than grading creative work. Campaign Foundry already inherits much of this architecture and its Scene craft; no explicit retirement rationale was found in the examined documentation and recent history.

## Worth salvaging

1. **[Campaign-scale horizons](https://github.com/Thedougler/agentic-co-dm/blob/HEAD/.agents/skills/campaign-planning/SKILL.md)** (`.agents/skills/campaign-planning/SKILL.md`, `.agents/skills/campaign-planning/references/season-architecture.md`, `.agents/skills/campaign-planning/references/replanning.md`) — Classify future material as anchors, possibilities, or Player-owned; detail the current season, sketch the next, and leave the endgame a silhouette. Seasons answer dramatic questions and end through alternative transition conditions, not predetermined finales. Co-opt into `new-campaign` and campaign-planning guidance for `plan-session`. Current Campaign creation covers premise, tone and Threads, but not this explicit long-range method. Re-plan only after architectural changes.

2. **[Travel that changes arrival](https://github.com/Thedougler/agentic-co-dm/blob/HEAD/.agents/skills/travel-events/SKILL.md)** (`.agents/skills/travel-events/SKILL.md`) — Five slots: departure cost, steerable landmark, derived events, concrete cost, and arrival changed. Failed scouting or quartermaster checks become the next complication rather than flat penalties. Co-opt as a short `prep-session` reference, composing existing Scene skills instead of introducing another page kind. Current Prep already connects Scenes to Threads and Spotlights; this supplies a journey-specific creative engine and rejects random filler.

3. **[Player-authored campaign bones](https://github.com/Thedougler/agentic-co-dm/blob/HEAD/.agents/skills/pc-interview/SKILL.md)** (`.agents/skills/pc-interview/SKILL.md`) — An explicitly requested, resumable, one-question-at-a-time interview explores regrets, obligations, temptation, protectors, and what question the Player wants the World to ask. Only stated answers become PC story. Adapt as an optional `new-campaign` interview reference, separate from `pull-pcs` sheet ownership. Current creation gathers known backstory but lacks this structured discovery method. Avoid making twenty questions a mandatory onboarding toll.

4. **[Learnable challenges](https://github.com/Thedougler/agentic-co-dm/blob/HEAD/.agents/skills/traps-trials/SKILL.md)** (`.agents/skills/traps-trials/SKILL.md`) — A reveal ladder moves from immediate evidence through investigation and understanding to mastery: shutting down, redirecting, or weaponising the mechanism. Explicit state transitions change the problem rather than merely raising DCs. Co-opt into `cliffhanger-scene` and `dungeon-design` references. Their existing warnings, counterplay and fail-forward rules already cover much; salvage the information ladder and mechanism-based adjudication, not a duplicate skill.

5. **[Transcript discourse classification](https://github.com/Thedougler/agentic-co-dm/blob/HEAD/.agents/skills/reconciling-session-evidence/SKILL.md)** (`.agents/skills/reconciling-session-evidence/SKILL.md`) — Distinguish adjudication, resolved actions, in-character speech, speculation, and OOC jokes; separately label present, historical, intentional, hypothetical, and parallel discourse. Corroborate summaries against source spans and preserve ambiguous ASR readings. Add a compact Transcript procedure to `ingest`: its claim-level Canon precedence already exists, but this protects creative continuity from imagined actions and falsely authoritative summaries without importing the predecessor's approval machinery.

6. **[Adversarial craft briefs](https://github.com/Thedougler/agentic-co-dm/blob/HEAD/.agents/skills/npc-design/evals/evals.json)** (`.agents/skills/npc-design/evals/evals.json`, `.agents/skills/_eval-notes/quality-bar-abc-audit.md`) — Prompts challenge lore-dump NPCs, allies solving the adventure, immune monologue exits, compulsory redemption, and single-Clue villains. Retell useful pressures inside existing content evals. Campaign Foundry already has professional-quality cases and a prose benchmark; do not port the old suite-count targets or assertions wholesale. The sampled NPC suite contains contradictory demands for both an “At a Glance” section and its absence.

## Lore to retell

- **Skarn as a rival who learns** — `wiki/entities/npc/talon-skarn.md`: after unexpected counterplay he says “Again,” remembers that PC, and targets them next meeting. Captured, he offers one future job in exchange for release, excluding his master. His familiar parry and robe let Crissdalynn recognise Kyzil's martial lineage without a roll. Current Skarn already preserves the basic rivalry and Spinner motive; these concrete interactions merit restoration through `npc-design`, not another biography.
- **The Council's misdirected commission** — `wiki/entities/faction/chain-council.md`: Cosimo Verantio hides behind a signatory while targeting Aldric Drave; the Council thinks it purchased Umberlee's mercy. Current Pearl, Kalowe and Concordat pages mention Council involvement. Retell the concealed-principal fracture as a discoverable political pressure, reconciling it with those owners first.

## Skip

- `docs/intent`-equivalent beat craft, Wiki templates, QMD, and narration fundamentals: already substantially carried forward.
- `wiki/entities/place/hungry-isle.md`: Aruhe's scale, receiving-versus-taking rule and grief-bound ecology already exist; do not mint a duplicate Site.
- `.agents/skills/world-tick/SKILL.md`: salvage consequential offscreen movement only if needed; repeated confirmations, ledger approval and obsolete fronts paths clash with current autonomous writing.
- `tools/wiki_ops/template_contracts.py` and `docs/creative-linting.md`: useful precedent, not another Python subsystem beside `cf` and its unified gate.
