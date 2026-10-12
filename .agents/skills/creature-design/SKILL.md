---
name: creature-design
description: >-
  Design, reuse, reskin, variant, or retune a D&D 2024 Creature: a complete
  statblock page tuned against the active Party and grounded in World canon.
  Use when a Creature is needed for an Encounter, NPC, Location or Scene, when
  an NPC needs shared statistics, when the DM wants a reusable monster tied to
  no World, or when the DM reports a Creature was too soft or too hard.
---

# Creature design

A **Creature** is rules: a statblock for a kind of being or one unique being.
The named person who uses those rules is an **NPC**. Keep the NPC's identity on its
NPC page and link it to the shared Creature. The target is a runnable 2024
Creature page that gives the Party a legible choice, a fair answer, and a place
in the World.

Use [references/sourcing-and-rules.md](references/sourcing-and-rules.md) for
source records and rules reconciliation, [references/tuning-and-budget.md](references/tuning-and-budget.md)
for Party math, [references/filing-and-operations.md](references/filing-and-operations.md)
for the page and CLI contract, and `skill://fantasy-statblock` for the
statblock's format.

## Steps

### 1. Establish scope and read the target Campaign

Capture the caller's Creature name, purpose, existing page, requested role and
difficulty, number of Creatures, terrain, encounter objective, and whether this
is reuse, creation, or retune. When the DM asks for a reusable monster tied to
no World or Campaign, follow [World-free Creature](#world-free-creature)
in place of these steps. Otherwise resolve the caller's root, vault and
Campaign explicitly, and run all retrieval and writes inside them.

Read the World overview, the target Campaign's overview, `hot.md`, its Campaign
folder's `index.md` and the last ten entries of its `log.md`, applicable House
Rules, and every page the request touches. Search the Wiki (`.omp/AGENTS.md`
§ Wiki access) and retrieve the full target-root pages each hit identifies.
Change each page as its `revealed`
property allows (`CONTEXT.md` **Revealed**).

For a retune, read the existing Creature and its complete backlink set. Include
every NPC whose `creature` property names it and every planned or unplayed
Encounter, Prep or Scene that consumes it. Mark played Session records and
already-heard Narration as fixed evidence.

**Gate:** the working notes state the target path, World, Campaign, encounter
count, terrain, difficulty mapping, House Rules, source pages, and every
shared-stat consumer, and each required page has been read in full.

### 2. Build the Party dossier

Read every active-Campaign PC, not a sample. From the current Sheet and recent
records, record level, HP, AC, saving throws, attacks and actions, damage
types dealt, spell slots and other resources, healing, hard control,
concentration, mobility, escape options, round-1 damage, sustained damage, and
signature strengths. Record unknown values as explicit assumptions.

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
retrieved peers. Search by rules function and fantasy, not only by name. A
World-free Creature in the vault-root `Creatures/` folder is a candidate the
Campaign copies into its own version (`docs/wiki-layout.md` **Campaign versions**).

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

For a variant or new design, define the World-grown twist, ecological niche,
role, goal, fear or limit, and the body part or habit that exposes each
signature. Run a swap test against a regional neighbour: rewrite every line
that remains true under the neighbour's name.

Give the Creature one concrete primary role and a morale or ending condition.
Build the signature as **Tell → Threat → Answers → Payoff**. Players see the
wind-up before the danger, have at least two mechanically usable answers, and
gain a concrete opening or changed choice when they answer it. Give a solo or
boss a relevant escalation. Cut each feature that has no tie to the concept
and no player response. Write each feature as the statblock entry that does
the work: a class burst such as Action Surge becomes a `Multiattack` option or
a limited-use action (Recharge or X/Day) that makes its attacks itself, since
an action that grants another action spends the action it gives. A creature
concentrates on one spell at a time (SRD 5.2.1, Concentration), so an aura
and a summoned weapon that both need Concentration take turns: the Creature
fights with one running, or carries the other as an entry without
Concentration.

**Gate:** the role shows on the Creature's first turn. The signature has a fair
visible tell, two distinct mechanical answers and a payoff. The twist, niche and
signature fail the swap test. Morale and boss escalation are stated where they
apply. Every burst action makes its own attacks, and one Concentration effect
runs at a time. An answer that rests on a PC's capability matches that PC's
page or the SRD entry for it.

### 5. Tune a legal 2024 Encounter

Read [references/tuning-and-budget.md](references/tuning-and-budget.md). Use the
2024 Low, Moderate or High XP budget for the actual Party, creature count and
levels. When the caller asks for **Hard**, write that this maps to the 2024
**High** budget. Keep the budget label separate from the Creature's CR.

Model three legal rounds with explicit assumptions: initiative, distance,
terrain, target selection, PC resources and concentration, allies, recharge,
area target count, healing, control, and each side's strongest reasonable
response. Write each round as one **round ledger** line of the statblock
entries it spends, at most one Action, one Bonus Action and one Reaction plus
any legendary or limited-use entry, each with the effect its own text gives:
`R1: Multiattack + Spiritual Weapon`, then
`R2: Barrage if its Recharge 5 or 6 returns (1 in 3), else Multiattack`.
Compute every damage estimate from those
lines. Apply 2024's one-spell-slot-per-turn rule; do not apply the 2014 Bonus
Action spell restriction. Separate round-1 burst from sustained output.

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

Each claim about what the Party can or cannot do cites the PC page it rests on
from the step 2 dossier, a damage type or a counter included. A claim that no
PC page supports is rewritten to what the pages show.

**Gate:** the notes show Low/Moderate/High budget from each PC's recorded level,
requested difficulty mapping, encounter count and terrain, the round ledger,
attack/save chances, resources, estimated survival, time-to-drop, sourced peer,
and separately labelled CR estimates. Each ledger line spends at most one
Action, every damage figure traces to a ledger line, and every Party claim
cites its PC page.

### 6. Put the Creature in the World and hand off Narration

Place it in the World: where it lives, how it fits there (what it eats, lives
beside or is used for, as its kind allows) and a niche that differs from
neighbours. For every signature ability,
write a trace players can find before contact: tracks, kills, shed material,
damaged terrain, smell, sound, or a changed pattern of prey. State origin and
hidden truths with concrete ways the Party can learn them. A filed Creature
whose statistics are sound but whose presence reads generic gets a
`flesh-out` pass in place of a retune.

When the Party will see it, hand `theatre-of-the-mind` the First sight slot
with the visible appearance behind every signature. Write the tell
before its signature in Tactics as a Cue (`==…==`, `theatre-of-the-mind`
`references/recipes.md` § Cues). Keep rules, numbers, secrets and any name the
Party has not learned out of First sight.

**Gate:** every signature has an ecological sign and a visible Narration tell;
habitat, niche, ecology, origin, learnable truths and morale agree with the
statblock and canon. First sight gives size in feet or against a familiar
thing, and each of its details is one the Party can sense from where it stands.
Its counts match the things it describes and Canon.

### 7. File, account for consumers, and preserve records

Follow [references/filing-and-operations.md](references/filing-and-operations.md)
and copy `wiki/templates/creature.md` exactly to `<campaign-folder>/Creatures/<slug>.md`, the slug of its `title`.
Write its required `##` sections in the template's order, following each
section's `%%` guidance. Add each optional section, callout and At a glance
bullet whose guidance condition this Creature meets, per `docs/wiki-layout.md`
**Templates define pages**, and leave out the `###` parts it has nothing for.
Write its one `statblock` fence per `skill://fantasy-statblock` and keep the
template's Base view. Add at least one real incoming wikilink besides the generated index;
an NPC's `creature` property counts. Hand the filed page to `visuals`.

For a retune, enumerate every affected NPC and unplayed consumer in the reply.
Change the shared Creature once. Preserve each NPC's identity, history,
personality and link, and preserve established appearance, ecology, origin,
non-speaking behaviour, counterplay and heard Narration. Played Session Prep,
Scenes, Recaps, Previously On pages, Transcript-derived records and `hot.md`
remain unchanged. Never place a duplicate statblock on an NPC or Encounter.

Keep ordinary reused statistics proportionate: complete sourced rules text, the
required template facts, and concise fiction; reserve detailed tuning notes
for a design or retune.

Once the page is drafted, **compare** its prose with its sources. List each
claim in At a glance, Tactics, Outside a fight and Depth: every ability,
resource, trigger, condition, exit, counter and answer it names, every PC
capability it cites, and every Canon fact or played event it retells. Beside
each, quote the line it rests on: the statblock entry with its trigger, the
PC's page or SRD entry, or the record line with its actor and outcome. Rewrite
the claim or the statblock until the two agree. A claim with no line behind it
goes.

**Gate:** the page has every template property and `##` heading. It has one
valid statblock and one incoming link, complete source attribution, and no
changed played record or NPC identity. The compare list pairs every claim with
a quoted line that says the same.

### 8. Close the operation

Close per `skill://lint` § Commands over the Creature page and every page this
run touched, reading `bun run cfcli -- check --help` first for the installed
syntax. The page gate runs every layer, and `--fix` covers the mechanical
repairs it names. Log only once the page gate prints `ok: 0 findings`. When
another skill invoked this one, that caller writes the operation log. Append a
`create` log entry only when this invocation is explicitly standalone and
responsible for logging. Report the page path, source candidates and decision,
tuning assumptions, the round ledger with the estimates computed from it, the
compare list, affected consumers, new canon and verification result.

**Final gate:** the target-root page passes the page gate (`skill://lint`
§ Commands). The generated indexes, links, source record, Party dossier,
three-round model and consumer audit are all complete, and every pointer in
this skill resolves to an existing file or installed skill.

## World-free Creature

A reusable monster tied to no World or Campaign is a World-free page
(`docs/wiki-layout.md` **World-free pages**): a copy of
`wiki/templates/creature.md` that keeps its frontmatter, `## Statblock` and
`## Links`, leaves out its Campaign-bound `revealed` and every optional
section, and is filed at the vault root's
`wiki/Creatures/<slug>.md`. When the DM asks for the block in chat, the reply
contains it and the run files no page. The page has no Narration, Party tuning
or setting lore, so this branch skips the Campaign reads, the Party dossier and
steps 5 to 8. The vault root has no `log.md`, so the run doesn't log.

1. **Scope.** Record the concept, role, CR or tier and signature the DM gives.
   **Done when** the notes state each, with a detail the ask leaves open
   written as your stated choice.
2. **Source.** Search step 3's ladder from the SRD tier on, and find published
   peers by CR and kind in `raw/bestiary-cr1-cr30.md`, reading only the
   matching blocks. Choose the path. A converted or new monster still files
   as its own page at `wiki/Creatures/<slug>.md`. **Done when** the notes list
   the retrieved candidates, their retrieval status, the path and why each
   earlier path does not fit.
3. **Design.** Apply step 4, taking the twist from the concept and running
   the swap test against the closest retrieved peer. The signature's tell,
   answers and limit sit in its own entries (a recharge or wind-up, an escape
   DC, a save that ends the effect). Anchor `cr` to the
   retrieved peer as step 5's last paragraph does, without a Party model.
   Every name and description stays setting-neutral: the kind's plain name,
   and no proper noun, place, faction, deity or World event. Less is more:
   include a feature beyond the core block (a lore trait, lair actions,
   regional effects) only when it fits any setting and is naturally relevant
   to the monster, and leave it out when in doubt. **Done when**
   step 4's gate holds for role, signature and swap test, and the notes name
   the CR's peer.
4. **Write and verify** the block per `skill://fantasy-statblock`. **Done
   when** its check prints `ok: 0 findings`, or the scratch-vault check does
   for a chat-only block.
5. **File** the page from the template: `title` the kind's plain name,
   `summary` one line on its role and CR, `sources` any archived Raw it came
   from or `[]`, the block under `## Statblock` and the template's `## Links`
   Base. Delete the `revealed` line with its `# Campaign-bound.` comment and
   every optional section. The page doesn't need an inbound link.
   Close per step 8's gate commands over every page this run touched.
   **Done when** the page gate prints `ok: 0 findings`.
6. **Reply** with the page path, or the ` ```statblock ` fence for a
   chat-only ask, then one line that states the path, the peer the CR rests on and
   the attribution for any published material. **Done when** the reply
   contains them.
