# campaign-os salvage extract

Copies live under `sources/campaign-os/` at the same relative paths. All paths below are relative to the clone root (`prior/campaign-os/`).

## Fronts & world-update (post-ingest clock ritual)

- source: `.claude/skills/world-update/SKILL.md` + `references/` (5 files) (found)
- destination: clock format into `faction-design`/`npc-design` pages; advancement ritual as a post-Ingest step
- load-bearing:
  - Front field list (`references/front-template.md`): `### Front: <Name>` with `**Lifecycle:** active|dormant|resolved`, `**Primary goal:**`, `**Consistent method:**`, `**Off-screen move if unopposed:**`, `**Trigger conditions:**` (list), `**Clock:** N segments (4 = fast-moving, 6 = slow burn) — filled: <n>`, `**Consequence at fill:**` (specific, observable, irreversible), optional `**Escalation timeline**` table, `**Possible outcomes (2-3):**`, `**PC connection:**`, `**Quest link:**`. A Front missing Trigger conditions or Consequence at fill is not ready to advance — flag, don't guess.
  - Core question, every Front, every run: *"If the party had done nothing, what would have changed anyway — toward or away from where this season/campaign is headed?"*
  - Hard rules: never advance without citing file+line evidence ("No citation, no line"); **never fire a filled Front silently** — partial advance up to (not through) the fill, then present the quoted consequence and wait for the DM; "A DM aside or chat note is never evidence" — only canon pages and session recaps count; **"Every 'nothing happened' is still something happening"** — a zero-observable-change result means the proposal wasn't specific enough; never define a new Front inline (hand off to the drafting guide); ground every proposal in season/campaign direction.
  - Triage tiers: HOT (engaged this session, named in recap/checked ledger) / WARM (party aware, not engaged this session) / COLD (active momentum, unopposed). `dormant` Fronts whose trigger hasn't fired are not COLD — not eligible at all. Present triage table, wait for DM confirmation before rolling.
  - Roll ritual per Front: deep read (full page + all wikilinked entities + season throughline) → Context Brief (standing goal/method, current position, this turn, quoted off-screen move, one detail the triage paste omitted, **Converges toward** season throughline — never blank) → one-sentence proposal → real d20 → interpret: **1–5 setback / 6–15 partial / 16–20 full success** → present to DM and revise to their read before writing (their read outranks the roll) → fill check → write.
  - Tier-flavored interpretation: HOT setback = faction's response weak/misdirected; HOT success = hits back hard next session. WARM success = "the party returns to changed ground." COLD setback = stalled on own friction.
  - Collisions: one roll for the collision, not per Front; high roll favors the side ahead on Context Briefs (resources, proximity, knowledge, timing, patience vs desperate); low roll favors the weaker/desperate side ("upsets are allowed and interesting"); one collaboration, two sets of ledger lines.
  - Cold escalation ladder (`references/clock-advance-workflow.md`): count advances since COLD → **0–1 Whisper** (visible only if someone's looking) → **2–3 Ripple** (NPC mentions, price shifts) → **4–5 Wave** (agents appear near party; reclassify WARM) → **6+ Collision** (touches something the party cares about; reclassify HOT).
  - Ledger: proposals to `world-turn-<date>.md`, grammar `- [ ] VERB target :: change (citation)`, closed verb set `FACT`/`APPEAR`/`NEW`/`QUEST`/`REVIEW`; every advance writes ≥1 FACT (clock edit) + ≥1 APPEAR (dated log entry); urgency tag (`low/medium/high/critical`) on APPEAR descriptions so run-guide greps can prioritize.
  - "Shallow reading" anti-pattern table: "The Concordat continues covering the skim" (bad) vs a proposal only the deep read could produce — the test: *could someone who only saw the triage paste have written this exact proposal? If yes, rewrite.*
- skip-from-this-file: zsh shell-safety notes, `git log` gate mechanics, owner_skill/uid frontmatter, Campaign OS path conventions (`vault/episodes/NNN/`).

## Player gravity (canon page shape)

- source: `vault/campaigns/shattered-sea/player-gravity.md`, `vault/refs/blm-player-gravity.md` (found)
- destination: Campaign state page read first by `plan-session`/`prep-session`
- load-bearing:
  - Page shape: one H2 per PC; each pull is one bullet — a concrete want ("Anything that may one day help her build a non-magical flying machine, the drive behind her whole arc"), gear-lust with purchase citations, unresolved bonds — **every bullet carries session citations** `(s02)`, `(s04, s08)`. Include recurring behavioral tells as gravity (Delmar's "Throwing chairs at things" with three cited instances, one of which killed the boss).
  - **Authority Ladder** table: per PC → authority tier (False divine social/cosmic, True divine, Foil, Magical orthodoxy) → expression, mapping each PC to the campaign's macro-theme; marks which arcs are player-owned ("Whether she breaks is player-owned").
  - From the Brennan reference: players are *"like water… going down the hill as fast as they can, seeking the path of least resistance"* — prep irrigates the slope, it doesn't pick the route; *"Freedom is real; the rails are invisible."* Backstory is "plot hooks you'll bite every time" vs free-floating mystery a party can decline. **Link of Relevance is a required output of every NPC/encounter generation** — record which backstory element it connects to. Session Zero is where goals/fears are learned.

## Cold opens

- source: `.claude/skills/writing-cold-opens/SKILL.md` + `references/` (4 files) (found)
- destination: new skill beside `hook-scene`, or an optional Prep scene kind
- load-bearing:
  - Default shape: `alternate POV → immediate situation → escalating checks → striking payoff → hard cut → main PCs`. One Hook Beat, not a miniature adventure. Target **20–30 minutes** and **five group checks or saves**.
  - **Five-check ratchet**: Opening frame → Check 1 Orientation → Check 2 Pressure → Check 3 Complication → Check 4 Crisis → Check 5 Payoff → Final image → Hard cut. Each check defines Prompt / Resolution / Success / Failure / Advance; "every check advances the fiction, every result changes at least one fictional state, and no failed roll can strand the scene." Failure usually imposes a cost, never halts the sequence.
  - **Knowledge firewall**: separate POV knowledge, player knowledge, PC knowledge; every revelation carries an explicit answer to "do the main PCs know this?" Use dramatic irony deliberately; show effects, never name the underlying explanation if it would collapse a live mystery.
  - **Predetermine the trajectory, not the outcome**: fix the start, the problem, the order of major pressures, the threshold, the cut point; leave injuries/resources/collateral/information/survival/exposure/position variable.
  - Timebox tactics: abstract pursuit/battle/escape/boarding through checks; introduce a proper noun only when needed now. POV default: a known friendly NPC, whole table shares one character; player can state who they are, what they want *right now*, what's happening — within a minute.
  - Ending opens a question: `final image → one beat of silence → main PCs`. **Preserve unresolved state in prep** — play establishes history; prep describes possibilities.
- skip-from-this-file: lint command, beat-page repo integration, sibling-skill routing table.

## Writers room, compete mode

- source: `.claude/skills/campaign-writers-room/SKILL.md`, `references/stances.md` (found)
- destination: skill reusing `bun run cf -- bench`-style judging; per-piece creative lever, not a leaderboard
- load-bearing:
  - Brief is built WITH the GM, capturing: Target, Goals/direction, Constraints (as wikilinks to canon pages, pasted hits), Mode (compete vs collab), N drafts (2–8, default 3; "full room" = 8, one per stance).
  - Compete pipeline: spawn N drafters in parallel, **one stance each** → lint all drafts to zero **before** judging ("a ranking taken now is thrown away" if lint rewrites land after) → comparative judge produces RANKED verdict → present ranking + one-paragraph digest per draft (stance, distinct strength, where it shines) → **the GM picks or directs a merge — never auto-select**.
  - **Synthesis wave**: one more drafter merges the GM-named top 2–3 into a best-of, *not an average* ("take draft C's opening, draft A's villain voice, draft F's closing image, per the verdict's quoted evidence"); the same judge instance re-scores it against the parents; still just another option on the table.
  - Hard rules: brief facts/canon constraints bind every drafter; style never binds; drafts never leave staging; landing goes through the owning skill at `status: pending`; one finding never blocks presenting drafts.
  - **The 8 stances** (lenses, not genres — each with Optimizes/Instincts/Risk): Character-first (interiority; risk: plot slows), Atmosphere-first (sensory immersion; risk: "gorgeous fog"), Plot-momentum (causality; risk: breathless), Subtext-heavy (the unsaid; risk: too oblique), Player-camera (write for the ear, front-load the image; risk: utilitarian), Mythic-register (epic weight anchored in personal stakes; risk: purple drift), Sparse-and-sharp (Strunk's knife; risk: austerity mistaken for depth), Hook-seeder (loaded guns, 2–3 hooks at different futures, "never aim the gun, just load it"; risk: junk drawer of threads). Pick stances that pull toward the GM's goals; maximally distinct when the goal is general.

## DM-voice profile & correction capture

- source: `.claude/skills/writing-style/SKILL.md`, `vault/refs/stories/prose-aesthetic.md`, `banned-patterns.md`, `influences.md` (found)
- destination: skill feeding `theatre-of-the-mind` (persistent DM voice beside `humanizer`)
- load-bearing:
  - Two branches: **Apply** (write prose at the profile's rhythm/distance) and **Build** (grow the profile). Build is additive-only; a run that would rewrite or delete an entry stops and asks.
  - **Correction capture rule**: "The moment the GM corrects a stylistic choice in the agent's writing — a word, a phrase, a rhythm, a habit — for **any** piece of writing, in any task, not only a dedicated editing pass: capture it here, same turn, before moving on." Never-do → banned-patterns.md; positive preference → prose-aesthetic.md; "A correction left only in the conversation gets repeated next time." Never populate the profile from agent-drafted prose — "that profiles the agent, not the GM."
  - **Move** = one technique, named, stated so it can be applied to material with no connection to its source; the source work never travels with it. **Transfer test**, applied per move: *could this be applied to material with zero relationship to its source?* Fail → borrowed content, cut.
  - **Influence entries carry both halves**: Moves + *Stays behind* ("naming the excluded half is what makes the entry safe to apply"). Example: King's moves (prosaic/terror juxtaposition, slow-burn community construction, register departure as mode signal, verb-forward plainness…) with Stays-behind "Horror itself… gore, shock, and monster-forward framing are not available as defaults because the techniques came from a horror writer." A work that shapes nothing gets one line saying so.
  - Declared-intentional is never a finding — editing passes check the profile first; "flagging a signature move as an error erodes the voice." Fixed profile skeleton: Core Aesthetic, Prose Style, Narrator and Voice, Structure, What You Do Not Do, Influences, Developmental Feedback Calibration, Source Note.
  - Prose-aesthetic signatures (examples of entry specificity): long comma-linked sentences carry intensity, fragments reserved for gut-punch beats; "single-sentence paragraphs are ironic payoffs, never suggest expanding them"; exact numbers ("4 Months, 22 Days, and 57 versions later") never rounded; a withheld identity is a choice, never fix it by naming; deadpan undercut lands *after* density, never during danger; every visible person gets a referable handle ("the bearded man"), not a judgment.
  - banned-patterns.md format: every rule is an instruction **with a worked example of the move done right** (never bad prose — "a bad sentence read before drafting is easier to write afterward, not harder"); Vale checks the same rules after; "A finding whose fix is structural is never closed by swapping the flagged word for a synonym that clears the check." Two gates: linter to zero, then a reader that is not you ("Writing a draft and judging it are two jobs, and the same writer does both badly"). New rule lands the same turn in three places: instruction+example, Vale detector, reasoning in the detail file.
- skip-from-this-file: Campaign OS routing tables, CLAUDE.md rule numbers, Vale path wiring.

## Travel/journey design

- source: `.claude/skills/travel-events/SKILL.md` + `references/` (9 files) (found)
- destination: new skill between `location-design` and `prep-session` (sea campaign + Vehicles)
- load-bearing:
  - **"A travel event advances something; a random encounter fills time."** Every event is chosen for this party — named PC thread × fact of the leg — and states its derivation in one clause: "<PC name>'s smuggler thread × the lane's thin patrols." No live material reaches the leg → ask, never a generic filler event. Dice enter only in-fiction (role/hazard checks), never to decide what the party encounters.
  - **Five journey slots, every leg, in order** (`references/journey-shape.md`): (1) **Departure cost** — what going now leaves behind ("Departure with no cost is a scene transition wearing a journey's clothes"); (2) **Landmark** — ≥1 named, steerable thing (approach/skirt/ignore, and the choice costs); survives being ignored; depth-by-allusion in one clause, never explained; (3) **Events** — typed, derived, interlaced when 3+; (4) **Toll** — ≥1 stated persistent cost (days against a clock, rations, exhaustion, a lost secret); numbers from a fixed menu, never invented; (5) **Arrival changed** — mandatory one line: "a leg that ends emotionally where it started was a transition, not a journey."
  - **Event typing palette** (Pointy Hat TES): Red Combat / Blue Roleplay / Yellow Exploration / Purple·Green·Orange combos / White all-three (rare, centerpiece). A register-balance palette to compose with, never a random table to roll. Travel method dresses the same six types; ship is this campaign's default.
  - Distance → count (keep distances vague — "a few days" beats "four days"): Close 1 (+1 if dramatically loaded), Far 2 (3 if centerpiece), Very Far 3–4 (5 for epic voyage).
  - Composition rules: never the same type twice in a row; ≥1 non-combat per leg of 2+; ≥1 connects to an active PC thread; every event names what it advances ("'It fills the day' → cut it"); ≥1 wonder/landmark beat; no event stars two casts of never-met strangers; leave loose ends — "a fully self-resolving event is wasted prep."
  - **Spotlight balancing**: the PC longest without a meaningful moment gets the leg's PC-connection event and first role pick. **Travel roles** (Trailhand, Scout, Quartermaster; at sea: one station per PC) offered to real PCs by name; **a failed check is the next complication, never a flat penalty.**
  - Hand-offs: combat/drama stakes to encounter-prep with premise + PC connection; recurring named entity to its own drafting guide; pure hazards stay here; reusable rolls become table rows (seeds only) — the skill writes nothing itself.
- skip-from-this-file: standard-queries greps, route-page `type:` plumbing, hand-off skill names.

## Exemplar corpus + craft-improvement runbook

- source: `vault/refs/runbook-craft-improvement.md` (found); corpus `docs/exemplars/` (found; NOT copied — filenames only); rubrics `vault/refs/exemplar-quality-rubric*.md` (found; copied)
- destination: gradeable gold standards for `theatre-of-the-mind`/`dnd-benchmark`; runbook as a procedure for adopting external methodology
- load-bearing:
  - Runbook trigger is a **found gap, not aesthetics**: "the source states a method, sequence, or step this repo's current skill/template doesn't cover or does worse. 'I like this style better' is not a gate pass." Campaign facts hiding in the same source go to ingest, not this pipeline.
  - Pipeline: source arrives with one `source:` path → triage for near-duplicates → **dispatch a recreation agent once, never recreate it yourself** ("the main loop already knows this repo's conventions well enough to unconsciously filter the recreation through them") → agent self-lints; lint re-run independently — "Never re-trust the agent's own report without corroboration" → guide joins the searchable corpus → improvement skills search it before proposing changes.
  - The gate, verbatim: **"no element of campaign-os is sacred; that material holds real GM-expert D&D methodology (5e SRD, Sly Flourish's LGMRD/Monster Builder) to improve against, not just campaign facts."** A recreated guide is "ammunition for the next skill or template revision."
  - Corpus: 11 published adventures/modules distilled to markdown alongside their PDFs — tomb-of-the-serpent-kings, the-wild-sheep-chase, the-night-hunter, fall-of-silverpine-watch, a-most-potent-brew, giffyglyphs-darker-dungeons, and five Pointy Hat pieces (way-of-the-flesh + monk-subclass, time-for-pleasantries + fae-adventure, the-necromaton, the-jinx + racial-option, domain-of-creation + cleric-subclass). Map/handout/printer-friendly PDF variants for some.
  - Six quality rubrics grade each exemplar per axis: structure, prose, layout, running, packaging (+ base rubric) — each a short checklist of what to steal vs what to skip.
- skip-from-this-file: `find-guidelines`/`guideline-recreator` agent plumbing, Inbox conventions, `npm run search:craft` mechanics.

## dndsim (rules-agnostic Monte-Carlo combat engine — idea only, no code port)

- source: `utils/dndsim/CONTEXT.md` (found; ADRs 0007–0011 referenced within)
- destination: Encounter balancing for `cliffhanger-scene`/`climax-scene` (or the auto-tune loop idea)
- load-bearing (concepts, not code):
  - **Rules pack** as an installable package over a core that holds none of the rules — the engine is rules-agnostic, the D&D layer plugs in via entry-point group (ADR-0007).
  - **Primitive**: closed vocabulary of executable effects; content composes primitives, never introduces one. **Mechanic**: one class carrying a primitive's `resolve` AND its expected value together, bound by a property test (ADR-0008) — the pairing is the drift-prevention contract.
  - **Universe**: one Monte-Carlo sample in a **lockstep batch** — combatant state as arrays indexed by universe, so one event dispatch advances thousands at once.
  - **Importer** compiles authored content (vault ` ```statblock ` fence, SRD attack prose) to primitives; the fence stays authoritative (ADR-0009). **Policy**: pluggable turn decider (greedy expected-value, fixed routine, random, rollout).
  - **Divergence**: an intentional behavior difference from a predecessor, recorded with mechanism and measured win-rate effect — "a divergence is neither a bug fix nor a regression; parity is defined around it."
  - Output: DPR distributions, win-rate curves, effective-CR measurements feeding encounter tuning.
- skip-from-this-file: TUI, lint subsystem, test tree, parity fixtures (not copied).

## Gravity metrics (ADR-0051 — idea only)

- source: `utils/wiki-cli/CONTEXT.md` § Expanded PageRank (ADR-0051) (found)
- destination: `query`/QMD context selection and hot-page reporting
- load-bearing:
  - Three independent importance signals on one `page_metrics` row:
    1. **Structural rank** — weighted power-iteration PageRank over the link graph; **typed frontmatter relationship edges (CONTAINS, LOCATED_AT…) carry a 3× multiplier** over body wikilinks. "Objective narrative centrality."
    2. **Player gravity** — accumulated player attention from corrected transcripts: `(page, session_num, mention_count)` rows written during ingest; tiers `active` (mentioned in last N sessions) / `encountered` (any prior) / `unencountered`. "Measures player engagement, not narrative link-graph centrality."
    3. **Agent reads** — rolling count of deliberate Read calls via PostToolUse hook; **diagnostic only, never mutates rankings**; divergence from the other two signals "identifies unnecessary or misrouted reads" (context-cost concentration).
  - Never conflate the three; tier labels are not ranking signals in isolation.
  - Related, skipped: Louvain community-detection vault organiser (ADR-0049) — conflicts with CF's fixed template layout; take the metrics, skip the organiser.
- skip-from-this-file: wiki-cli CLI surface, lint vocabulary, organiser thresholds.

## Beat pattern catalogues (cliffhanger)

- source: `.claude/skills/writing-cliffhanger-beats/references/cliffhanger-patterns.md`, `references/cliffhanger-beats.md` (found)
- destination: reference files under the scene skills (`cliffhanger-scene` and kin)
- load-bearing:
  - **13 named pressure patterns** (from *Scripting the Game*, adapted for sandbox): Chase (PCs catch a moving target), Pursuit (superior force chases PCs), Race (compete to reach an objective first), Fist Fight (ritualized bounded combat), Dogfight (mobile aerial), Confrontation (non-physical leverage showdown), Duel (one-on-one under understood terms), Battle (both sides commit openly), Monster (non-intelligent force), Ambush (one side starts from surprise), Obstacle (trap/terrain/confinement), Contest (ritualized winner/loser), Skirmish (limited combat, withdrawal likely). **Choose by dramatic mechanics, not aesthetics** — "a fight on horseback may still be a Race if reaching the bridge first is what determines the outcome."
  - Per-pattern template: **Pressure / Requires / Prep (define list) / Sandbox check / Handoff (changed states)**. Each Sandbox check guarantees player choices produce coherent states ("Standing to fight remains a valid player decision… Do not make the pursuers invulnerable merely because pursuit was the prepared pattern").
  - **Contract chain**: Gravity → Ignition → Pressure → Vectors → Escalation → Fallout → Handoff — semantic requirements, not page headings. Gravity = Link of Relevance to an established investment (order: explicit gravity anchor → established goal/fear/stake → demonstrated party goal → consequence of prior player choice; "Do not manufacture a new backstory connection merely to justify the encounter").
  - **Escalation ladder of 2–4 state thresholds**, never a round-by-round script: current pressure → opposition commits a stronger resource → environment/objective deteriorates → irreversible consequence approaches. Escalation may increase force/exposure/urgency/collateral/political consequences/enemy commitment; "escalate later Cliffhangers above earlier ones in consequence and commitment, not merely numerical difficulty."
  - **Four fallout classes**: Success / Complication (achieved at significant cost or only part) / Setback (the opposition substantially succeeds) / Bypass (PCs avoid it) — "Do not decide which result occurs"; each must alter ≥1 meaningful campaign state; "Where a result merely says 'the PCs continue,' the Cliffhanger has probably failed to matter."
  - **Water test**: "If the players take the fastest route toward what they want, does the prepared situation still work?" If it depends on the "intended" solution, redesign the pressure.
  - Opposition as **intent + means + limits** (+ withdrawal condition, escalation trigger, bargaining leverage) — "a compact behavioral model that remains useful after the first unexpected player action."
  - Sandbox continuity rules: **Bypass is play** (determine what the force accomplishes without them; never relocate the encounter); **Premature victory is play** (preserve it; never restore the threat to recover the planned beat); **Unexpected alliance is play** (update relationship/objective; never preserve its encounter role after its fictional role changed); **Sequence drift is play** (re-establish canon, find the unresolved question and current gravity, re-decide beat type; "The Beat Chart is a pacing instrument. It is not a recovery rail.").
  - Runtime payload the completed beat must make cheaply recoverable: Situation, Link of Relevance, Active Force, Objective, Stakes, Ignition, Vectors, Escalation, Fallout, Handoff. Situation-not-sequence: the beat must survive attack/flee/bargain/hide/split/surrender/unexpected ability/recruit/change objective/bypass.
- skip-from-this-file: repo beat-template wiring, "map into the canonical template" clauses.

## Blind-proof gate

- source: `.claude/skills/campaign-os/SKILL.md` § Validate (found)
- destination: complements `run-evals` as a lighter per-change check
- load-bearing:
  - Two tiers: a **simple fix** (typo, dead link, stale path, frontmatter key) ships on the linter alone. Anything more — "new or reworded skill guidance, a changed template, a guide, a runbook, a rule — is not trusted until blind-proof proves it": dispatch a **fresh cheap-model tester blind** on the realistic task the material exists for, then judge its returned output yourself, quoting the line that shows the change landed. "An improvement you haven't blind-proofed is `EDITED-UNVERIFIED`, not done."
  - Pass bar: correct output on the **first blind attempt**, needing nothing past minor linter-fixable correction. "First-attempt reliability is the bar, never 'an agent gets there eventually with iteration.'"
  - The diagnostic move: a tester that needs iteration isn't a capability gap — **"it's the unit still bundling more than one concern — split it further or sharpen the guide's completion criteria."**
- skip-from-this-file: Haiku-specific model name, atomicity/`content-drafter` machinery around it.
