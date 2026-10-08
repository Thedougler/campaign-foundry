---
name: creature-design
description: >-
  Design, reuse, reskin, variant, or retune a D&D 2024 Creature: a complete
  statblock page tuned against the active Party and grounded in World canon.
  Use when a Creature is needed for an Encounter, NPC, Location or Scene, when
  an NPC needs shared statistics, or when the DM reports a Creature was too
  soft or too hard.
---

# Creature design

A **Creature** is rules: a statblock for a kind of being or one unique being.
The named person who uses those rules is an **NPC**. Keep the NPC's identity on its
NPC page and link it to the shared Creature. The target is a runnable 2024
Creature page that gives the Party a legible choice, a fair answer, and a place
in the World.

Use [references/sourcing-and-rules.md](references/sourcing-and-rules.md) for
source records and rules reconciliation, [references/tuning-and-budget.md](references/tuning-and-budget.md)
for Party math, and [references/filing-and-operations.md](references/filing-and-operations.md)
for the page and CLI contract.

## Steps

### 1. Establish scope and read the target Campaign

Capture the caller's Creature name, purpose, existing page, requested role and
difficulty, number of Creatures, terrain, encounter objective, and whether this
is reuse, creation, or retune. Resolve the caller's root, vault and Campaign
explicitly, and run all retrieval and writes inside them.

Read the World overview, the target Campaign's overview, `hot.md`, its Campaign
folder's `index.md` and the last ten entries of its `log.md`, applicable House
Rules, and every page the request touches. Read qmd results and retrieve the
full target-root pages they identify.

For a retune, read the existing Creature and its complete backlink set. Include
every NPC whose `creature` property names it and every planned or unplayed
Encounter, Prep or Scene that consumes it. Mark played Session records and
already-heard Narration as fixed evidence.

**Gate:** the working notes state the target path, World, Campaign, encounter
count, terrain, difficulty mapping, House Rules, source pages, and every
shared-stat consumer, and each required page has been read in full.

### 2. Build the Party dossier

Read every active-Campaign PC, not a sample. From the current Sheet and recent
records, record level, HP, AC, saving throws, attacks and actions, spell slots
and other resources, healing, hard control, concentration, mobility, escape
options, round-1 damage, sustained damage, and signature strengths. Record
unknown values as explicit assumptions.

Summarise the Party's nova, sustained damage, healing, control, mobility,
resource state, and the strengths that must remain useful. Include the
encounter's cover, elevation, water, hazards, civilians, objectives, allies,
rest and retreat conditions. Use the actual Party for tuning; if no active
Campaign exists, state that the estimate uses the retrieved peer's intended
party instead.

**Gate:** every PC has a filled row and the combined Party assumptions, terrain,
encounter count and relevant House Rules are written before numbers are chosen.

### 3. Retrieve candidates and choose the path

Search in this order: an existing fitting Creature in the target Wiki; the
2024 SRD through `dnd5e-srd-api`; official material outside the SRD; suitable
homebrew retrieved from the web; then a new design inspired by the closest
retrieved peers. Search by rules function and fantasy, not only by name.

Record candidates actually retrieved, their source tier, what fits, what fails,
and the decision. An unavailable provider or incomplete retrieval remains an
unknown. It does not prove that a source has no fitting candidate. Choose and
state one path:

- **Reuse** a fitting statblock unchanged.
- **Reskin** fiction only, preserving published numbers and rules.
- **Variant** with a named, limited set of feature changes.
- **New design** from retrieved peers when the role or decision loop cannot be
  reached by reuse, reskin or variant.
- **Retune** only where Party evidence justifies each changed value or feature.

Put only archived Raw paths in `sources` frontmatter. Put external attribution,
candidate names, the chosen path, and each deliberate change in the page body
or working record. ADR 0005 requires full sourced rules text in the Wiki.

**Gate:** the source ledger contains the retrieved candidate set, honest
retrieval status, one path decision, and a reason the earlier path is
insufficient. A reskin has no silent numerical changes.

### 4. Make the Creature specific and playable

For a variant or new design, write a stock version in one line, then define the
World-grown twist, ecological niche, role, goal, fear or limit, and the body
part or habit that exposes each signature. Run a swap test against a regional
neighbour: rewrite every line that remains true under the neighbour's name.

Give the Creature one concrete primary role and a morale or ending condition.
Build the signature as **Tell → Threat → Answers → Payoff**. Players see the
wind-up before the danger, have at least two mechanically usable answers, and
gain a concrete opening or changed choice when they answer it. Give a solo or
boss a relevant escalation. Cut each feature that has no tie to the concept
and no player response.

**Gate:** the role shows on the Creature's first turn. The signature has a fair
visible tell, two distinct mechanical answers and a payoff. The twist, niche and
signature fail the swap test. Morale and boss escalation are stated where they
apply.

### 5. Tune a legal 2024 Encounter

Read [references/tuning-and-budget.md](references/tuning-and-budget.md). Use the
2024 Low, Moderate or High XP budget for the actual Party, creature count and
levels. When the caller asks for **Hard**, write that this maps to the 2024
**High** budget. Keep the budget label separate from the Creature's CR.

Model three legal rounds with explicit assumptions: initiative, distance,
terrain, target selection, PC resources and concentration, allies, recharge,
area target count, healing, control, and each side's strongest reasonable
response. Apply 2024's one-spell-slot-per-turn rule; do not apply the 2014
Bonus Action spell restriction. Separate round-1 burst from sustained output.

Compute attack chances once, clamped to 5% to 95% for natural 1 and natural 20;
do not multiply accuracy into damage twice. Show save failure and success
branches using the applicable 2024 rule. Include survival rounds and estimated
time to drop the most exposed PC, with healing, action economy, control and
mobility assumptions. Label these as estimates, and leave PC strengths usable.

Ground defensive and offensive CR estimates in a retrieved published peer and
label both as estimates. Do not invent a 2024 CR formula or force defensive and
offensive estimates into an average. State why the chosen `cr` label is the
honest published anchor or deliberate design choice. Trade durability, damage,
control, mobility and action economy instead of stacking defences without a
fiction-backed answer.

**Gate:** the notes show Low/Moderate/High budget, requested difficulty mapping,
encounter count and terrain, legal round-one and sustained actions, attack/save
chances, resources, estimated survival, time-to-drop, sourced peer, and
separately labelled CR estimates.

### 6. Put the Creature in the World and hand off Narration

Give it a habitat, diet, social life, local name or use, predators or prey,
ecology, and a niche that differs from neighbours. For every signature ability,
write a trace players can find before contact: tracks, kills, shed material,
damaged terrain, smell, sound, or a changed pattern of prey. State origin and
hidden truths with concrete ways the Party can learn them.

Prepare a First sight packet for `theatre-of-the-mind`: body and size against a
familiar object, striking feature, surface, one sound or smell, behaviour at
rest, and the visible appearance behind every signature. Request optional
in-action narration only when the page's Tactics needs it. The player-facing
packet contains appearance and what the Players can sense from where they
stand. Keep rules, numbers, secrets and any name the Party has not learned out
of it.

**Gate:** every signature has an ecological sign and a visible Narration tell;
habitat, niche, ecology, origin, learnable truths and morale agree with the
statblock and canon.

### 7. File, account for consumers, and preserve records

Follow [references/filing-and-operations.md](references/filing-and-operations.md)
and copy `wiki/templates/Creature.md` exactly to `<campaign-folder>/Creatures/<Name>.md`.
Fill its sections in the template's order, following each section's `%%`
guidance and leaving out the `###` parts this Creature has nothing for. Keep one `statblock` fence with `Basic 5e
Layout`, complete 2024 rules text, explicit derived values, and the template's
Base view. Add at least one real incoming wikilink besides the generated index;
an NPC's `creature` property counts.

For a retune, enumerate every affected NPC and unplayed consumer in the reply.
Change the shared Creature once. Preserve each NPC's identity, history,
personality and link, and preserve established appearance, ecology, origin,
non-speaking behaviour, counterplay and heard Narration. Played Session Prep,
Scenes, Recaps, Previously On pages, Transcript-derived records and `hot.md`
remain unchanged. Never place a duplicate statblock on an NPC or Encounter.

Keep ordinary reused statistics proportionate: complete sourced rules text, the
required template facts, and concise fiction; reserve detailed tuning notes
for a design or retune.

**Gate:** the page has every template property and required heading. It has one
valid statblock and one incoming link, complete source attribution, and no
changed played record or NPC identity.

### 8. Run the actual gate and finish the operation

Before commands, read the installed syntax with `bun run cf -- index --help`,
`bun run cf -- check --help`, and `bun run cf -- log --help`. Regenerate indexes with the
scoped `bun run cf -- index` command. Run the page gate, `bun run cf -- check`
with no `--layer` given the Creature page and every page this run touched; all
layers are mandatory.
Use `--fix` only for mechanical repairs, then rerun the page gate.

Log only once the page gate prints `ok: 0 findings`. When another skill invoked
this one, that caller writes the operation log. Append a `create` log entry
only when this invocation is explicitly standalone and responsible for logging. Report the page path, source
candidates and decision, tuning assumptions and estimates, affected consumers,
new canon and verification result.

**Final gate:** the target-root page passes the page gate. The generated
indexes, links, source record, Party dossier, three-round model and consumer
audit are all complete, and every pointer in this skill resolves to an existing
file or installed skill.
