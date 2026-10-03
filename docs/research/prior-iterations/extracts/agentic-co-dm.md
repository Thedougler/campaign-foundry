# agentic-co-dm salvage extract

Copied sources: `sources/agentic-co-dm/.agents/skills/` (nine files, repo-root-relative paths preserved). Findings: `docs/research/prior-iterations/agentic-co-dm.md`.

## Campaign-scale horizons

- source: `.agents/skills/campaign-planning/SKILL.md` (found; siblings `references/season-architecture.md`, `references/replanning.md` found)
- destination: `new-campaign`; planning guidance for `plan-session`
- load-bearing:
  - Classify every future-facing statement as **anchor**, **possibility**, or **player-owned**. "A player-dependent outcome phrased as established fact goes back to the frontier."
  - Horizon resolution rule: "current season at high resolution, next at medium, later at low, endgame as silhouette. A later season with more detail than an earlier one is a violation."
  - Stress-tests: "What player decision could make this false?" (many answers → reclassify as possibility); "If the party ignores this season, can the campaign continue coherently?" (prefer causal structures: *if left unchecked, faction A pressures region B*).
  - Season map: each season needs **narrative function, season question, approximate range, transition conditions**. Season question = "a question play can genuinely answer in more than one way" (e.g. "Who will control the passage through the Mid-Chain?").
  - Season boundary tests — a new season is justified when one changes materially: central question, party operating scale, primary theater, dominant pressure, political order, party role, type of problems their power allows, consequences inherited. "Level advancement alone does not require a new season." Tier heuristic (1–4/5–10/11–16/17–20) is scaling, not compulsory boundaries.
  - Length estimation exposes mismatches: allocate session proportions per season and "do not hide impossible scope behind vague prose" (e.g. four seasons × 30 sessions inside a 70-session campaign → resolve now).
  - Transition conditions replace predetermined finales: local conflict becomes regionally impossible to ignore, factional alignment chosen, region becomes accessible, dominant threat neutralized/transformed/abandoned, power outgrows constraints, accumulated faction responses change politics, hidden layer becomes relevant. "Every planned season must evolve into the next phase through more than one plausible campaign state."
  - Replanning triggers (season transition, major player-made geopolitical change, faction alliance/destruction, interest shift, advancement-rate drift, runtime change, endgame change, distant possibility becoming actionable) and procedure: preserve anchors → replace contradicted assumptions → promote possibilities to anchors → retire irrelevant possibilities → redraw horizon → increase detail only for material approaching play.
- skip-from-this-file: vault paths, `hot.md`, template minting, grilling/wiki-agent wiring, GM-prep 30–40-minute gates, Obsidian MOC/organizer notes.

## Travel that changes arrival

- source: `.agents/skills/travel-events/SKILL.md` (found)
- destination: `prep-session` reference composing existing Scene skills
- load-bearing:
  - Five slots, in order: (1) **departure cost** — what going now leaves, spends, risks, or owes; (2) **landmark** — a named thing that can be approached, avoided, or exploited; (3) **events** — smallest set of derived beats; (4) **cost** — a concrete cost in time, resources, position, relationship, information, or danger; (5) **arrival changed** — how the party arrives different.
  - Scaling by travel time, not distance bands: minutes/hours leg ≈ 1 event; multi-day ≈ 2; route-as-session-subject ≈ 3–4 plus a centerpiece. Two or more events → include a non-combat beat, never repeat a register back-to-back.
  - Banned vocabulary: "close, far, very far, nearby, distant, inner, outer, range band, distance band" as route measures — use compass direction and travel time.
  - Event card fields: title + register tag; **PC hook** (named PC + role they can take); **Warning sign** (seen/heard before it reaches them); **Party choices** (approach, avoid, bargain, exploit, endure — each with what happens); **Resolution** (check and DC once chosen, what failure still moves forward); **Cost**; **If ignored** (the one next thing without the party); **Still in motion**.
  - Travel roles (scout/guide, lookout, quartermaster, method-appropriate station): "A failed role check becomes the next complication, not a flat penalty." Never pre-write a PC decision, feeling, or success.
  - Anti-filler gate: if no PC thread, faction pressure, or resource tension reaches the leg, ask which pressure to pull on — "never substitute generic filler."
  - Completion checklist per event: derivation, named connection, advancement, choice surface, toll, independent if-ignored movement, loose end; leg has landmark + arrival-changed line.
- skip-from-this-file: hot.md/fronts/quest reads, beat-template filing, routing to encounter-prep/vehicle-design, canon-authorization rules.

## Player-authored campaign bones (PC interview)

- source: `.agents/skills/pc-interview/SKILL.md` (found)
- destination: optional `new-campaign` interview reference, separate from `pull-pcs`
- load-bearing:
  - Invocation contract: human-started only, one question at a time, `Question N of 20.`, "Skip" accepted and recorded unanswered, resume by skipping topics the PC page already answers and building on them ("Besides [[their-sister]], who else…"), name existing entities in questions with links.
  - Twenty topics in order: name/call sign; origin; family; formative change; proud choice; regret/obligation; value; temptation; fear; desire; protector; distrust; authority; money/status/safety; worldview; misunderstanding; what would make them leave; what would make them stay; a useful play detail; **a question they want the world to ask**.
  - Persist only stated answers; append-only dated interview round on the PC page; "Leave unknown mechanics blank"; never invent class, mechanics, feelings, or unstated canon; contradictions with protected canon are a DM gate, not a silent overwrite.
  - Campaign-bone gate: extract who wronged the PC, who they loved, who hunts them, what they owe → "optional public stakes, relationships, and pressures that other skills can make playable. Never force the PC to care, choose, forgive, or follow one rail." A backstory rail is a pressure source, not a required destination.
- skip-from-this-file: `wiki/entities/pc/` filing, PII rules, Obsidian/frontmatter lint, pc-state runtime, audience tagging.

## Learnable challenges (reveal ladder)

- source: `.agents/skills/traps-trials/SKILL.md` (found)
- destination: `cliffhanger-scene` and `dungeon-design` references
- load-bearing:
  - Operating words: Telegraph (actionable evidence before consequences), Afford (obvious ways to investigate/manipulate), Open (problem with rules, not a prescribed solution), Fail-forward, Escalate (state changes, not repeated checks), Fuse (waiting is unsafe), "Reveal, don't punish — telegraph enough for an informed choice; a hidden step → damage tax is not a challenge."
  - Challenge contract, one sentence: *Characters encounter [problem] caused by [mechanism]; they risk [stakes] while trying to achieve [goal].*
  - **Reveal ladder**: Immediate (sensory evidence, no check) → Investigated (check-gated actionable information) → Understood (mechanism, pattern, timing, vulnerable component) → Mastered (control point, shutdown, safe window, redirect, weaponize). "Essential information must remain obtainable after a failed check."
  - Hidden mechanism modeling: simple = trigger, mechanism, effect, duration, reset; dynamic = explicit states (e.g. `Dormant → Disturbed → Active → Escalating → Resolved`) with cause, observable change, mechanical-effect change, remaining actions per transition.
  - Suspense gate five-part bomb test: (1) reveal the threat (dart holes, scorch, dead insects, claw marks inside a door); (2) show the fuse; (3) hide the clean answer, not the problem; (4) price every route — time, HP, spells, gear, position, relationships, future leverage, moral cost; (5) let them act — "prepare the mechanism, not the ending." "A revealed trap is a puzzle; a puzzle plus a fuse is a scene."
  - Solution vectors: avoid, disable, solve, redirect, endure, shield, outrun, exploit, alter, satisfy, subvert — ≥2 genuinely different approaches (≥3 for suspense scenes). Unanticipated approaches adjudicated from the mechanism.
  - Escalation changes the **problem**, not the difficulty number — each stage changes information, options, position, stakes, or mechanics. A wrong answer should reveal information, advance the fuse, or transform the problem. Tune four dimensions separately: detection difficulty, interaction difficulty, consequence severity, pressure/escalation speed.
- skip-from-this-file: note-type taxonomy and templates, wiki filing, `[[wikilink]]`/lint machinery, DM-guide hazard template wording, monster-design/place-design routing.

## Transcript discourse classification

- source: `.agents/skills/reconciling-session-evidence/SKILL.md` (found)
- destination: `ingest` transcript procedure
- load-bearing:
  - Speech-act labels for state-changing segments: DM narration/adjudication; player declaration plus result; resolved mechanic; in-character speech; planning/speculation; rules talk; OOC/joke.
  - Temporal label, exactly one per segment: `present`, `historical`, `intention`, `hypothetical`, `parallel`. "Only present play advances current state; a plan is not an action."
  - Summary discipline: "A summary is an index of candidate claims; corroborate it or mark consequential claims `summary-only`." Treat prep as context, never proof. Verify against source spans with actor/action/object/outcome.
  - ASR normalization: auto-fix only obvious errors (unique phonetic alias, punctuation, duplicate fragment, unambiguous speaker continuation, clear dice notation); keep probable/ambiguous readings as diagnostics with locator, raw, normalized, class, support, confidence recorded.
  - Extract only durable things: events, elapsed time, discoveries, completed actions, NPC decisions, relationships, quest/front/clock changes, item transfers, durable PC changes, rulings, improvised named entities. Each claim gets exactly one disposition; clear play replaces provisional prep; locked-canon conflict = evidence plus human gate. In-character speech is belief; speculation is not occurrence. "Never use raw transcript wording as the vault's durable prose."
- skip-from-this-file: page-kind routing, decomposing-campaign-content branch, 24-hour synthesis gate, `## Log` conventions, world-tick routing.

## Adversarial craft briefs

- source: `.agents/skills/npc-design/evals/evals.json` (found; `quality-bar-abc-audit.md` found at `.agents/skills/_eval-notes/`)
- destination: existing CF content evals (`run-evals`, prose benchmark) — pressures retold, not suites ported
- load-bearing:
  - Adversarial prompt patterns (success = refuse/redesign/offer alternatives, not craft): force a secret rewrite of established canon ("rewrite Varn so he is secretly a Crown agent… presenting that as established canon"); lore-dump NPC whose "only job is to dump everything the party needs to know… in one monologue"; ally who "will choose the party's plan and solve the expedition for them"; single-clue villain ("if the party misses the cufflink the arc is ruined"); immune monologue exit (villain "leaves because he is immune to attack until the final session"); all-traitors surprise; redemption locked before play ("write Talon Skarn's inevitable redemption ending before play begins"); PC 12-level statblock for an NPC; Persuasion 25 making a Hostile guard abandon oath and murder on the spot; wait-in-final-room leader doing nothing until the party arrives; authoring PC decisions ("the party installs a new duke"); secrets/DCs pasted into player narration; one mandatory plot rail with no alternate approaches.
  - Audit bar itself (quality-bar-abc-audit.md): "≥2 strong adversarial/resist prompts where success = refuse / redesign / offer alternatives"; rating key yes/thin/no; priority follow-ups ranked by thinnest suites. Useful as eval-design vocabulary, not as count targets.
  - Known contradiction to avoid porting: the sampled npc-design suite demands both an "At a Glance" section and its absence.
- skip-from-this-file: suite-count targets (~9–13), abc-patches machinery, per-suite count tables.
