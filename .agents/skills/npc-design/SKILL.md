---
name: npc-design
description: Designs or deepens a named NPC, a person the DM plays whose statistics come from a linked Creature. Use when a Scene, Location, Faction, Quest, or existing page needs a person, a first meeting, recurring depth, a villain, social Influence, or a unique fighter. Do not use for an unnamed Creature or a PC.
---

# NPC design

An NPC is a named person who wants something now, with agency and a story. Their rules live on a Creature page. Scale the work to the time the NPC will receive, then stop at that scale.

## Guardrails

- The caller's `root`, `vault`, and Campaign are authoritative. In an isolated fixture, scope every read, search, edit, command, index, and log to that target. Leave the ambient live Wiki untouched.
- Read `CONTEXT.md`, `docs/wiki-layout.md`, and `wiki/templates/NPC.md`. The NPC template alone defines the page's sections and properties. Do not copy headings, fields, or paths from intent material.
- Canon precedence is explicit DM instruction, what the DM or Players established at the table and the played Session record, then the Wiki, then Raw. Preserve heard Narration, played Session pages, and `hot.md`, and change each other page as its `revealed` property allows (`CONTEXT.md` **Revealed**). An explicit DM change overrides them. When Canon is silent, choose one concrete answer at the selected scale, file it as Canon, and report the decision with the pages it grew from. Never ask for bookkeeping approval or confirmation of edits.
- Before invention, read the target Campaign folder's `index.md`, its `hot.md`, and the last ten entries of its `log.md`. Then search the Wiki, scoped to the caller's target (`.omp/AGENTS.md` § Wiki access), for the NPC, backlinks, home Location, Faction, connected people, relevant Threads and Recaps, and each relevant PC's `Goals and bonds` and `Plans`. Record every used hit or a reason it is irrelevant.
- Page links make pages reachable. Every new NPC, Creature, or Thread gets an incoming link other than an index link before the gate runs.

## Scale

| Scale | Use | Required result |
| --- | --- | --- |
| Incidental | one brief appearance | a memorable face, a want for right now, one speakable line, and an exit or next move; no unused biography, secret web, or unique statistics |
| Scene | the NPC changes one Scene | all core design and first-meeting play below |
| Recurring | the NPC returns or changes a Thread | Scene result, invitations tied to every relevant PC's existing Goals, bonds, or Plans, and a concrete next move if ignored |
| Villain | the NPC drives opposition across a Campaign | Recurring result plus an active plan on a suitable Campaign Thread, with the villain branch below |

An incidental NPC still follows `wiki/templates/NPC.md` if filed. Write each required section in a sentence or two at the incidental scale.

## Ordered work

### 1. Establish the target and canon

Resolve the target before searching. Read the target files named above, then retrieve the NPC's page if it exists and every backlink that bears on the NPC. Search for existing NPC and Creature candidates in the same Location, Faction, and role before inventing. Read the relevant PCs' actual Goals, bonds, and Plans; a PC connection is an invitation from one of those records, never an invented prior relationship.

**Gate:** the working inventory lists the target, scale, canon facts to preserve, heard Narration and played records, relevant pages, each relevant PC's invitation or `none`, and every proposed new page's owner.

### 2. Source before inventing

Use this order:

1. Reuse a fitting Wiki NPC, Creature, role, or existing Thread. State why each plausible role candidate does not fit before creating a new person.
2. For rules, statistics, and archetypes, load `dnd5e-srd-api` and source the 2024 SRD figure that fits.
3. Search official material outside the SRD, then existing published or homebrew material, when identity or a fitting baseline is still missing.
4. Invent only what remains, inspired by the closest material found.

Record where each fact came from. NPC frontmatter `sources` contains only repo-relative paths under `archive/` for archived Raw used by the page. Put external provenance in the page body where relevant. If a required source cannot be retrieved, say exactly what was unavailable and do not present an unverified rule, statistic, or attribution as sourced.

**Gate:** the working notes state the reuse, SRD, web, or invention path, its reason, the role candidates considered, and any missing retrieval. The page's `sources` contains no URL or unarchived path.

### 3. Build the person

Write facts that change play:

- **Want:** a concrete present-tense outcome reachable in the next Scene or Session.
- **Leverage and cost:** what the NPC can grant, deny, expose, or call on, and what using it costs them.
- **Fear or need:** what they dread losing or cannot do without.
- **Limit:** an oath, lack, dependency, value, or boundary that blocks the easy win.
- **Contradiction:** two true pressures that can collide in play.
- **Secret:** the explicit truth, who the NPC hides it from, why, and what happens if it is exposed. Give it a visible or behavioural tell and at least three distinct discovery paths with concrete evidence.
- **Knowledge:** for every question the page raises, state the truth separately from what the NPC knows, shares, sells, or lies about.
- **If ignored:** the next action the NPC takes without the Party.

Make the person distinctive. Give them a repeatable face with two or three specific visible details, a sourced sound or smell and an activity. Root their voice in what they care about, with word choice, rhythm, habit, an avoided subject, and an ask, refusal and pressure line. Apply the swap test against a plausible NPC from the same place or Faction. Put every hidden truth's tell in the DM-facing material, not in Player-facing Narration. A filed NPC whose drives are sound but whose presence reads generic gets a `flesh-out` pass in place of a rebuild.

**Gate:** every required drive field is concrete. The secret has stakes and three non-duplicate routes. Truth and NPC knowledge are separate, the face and voice fail the swap test, and every hidden truth has a testable tell.

### 4. Plan the first meeting and social play

Use `references/craft.md` for face, voice, and tells. For a Scene or larger, write the first meeting:

- where the NPC is and what they are doing
- their opening move and starting Attitude
- what opens them up and what shuts them down
- what they protect first
- the Party's likely requests, each with its answer, price and what it changes

For every Influence request, apply `references/influence.md`: it holds the sourced 2024 rule (Attitude, willingness, the check and its DC) and the procedure for running it.

Do not put an essential clue behind one roll. Give each essential conclusion about three independent routes such as a statement, trace, witness, document, or consequence; a miss can add cost, danger, delay, or uncertainty while leaving a way forward.

**Gate:** the DM can run the first five minutes, and every likely request has an answer and outcome. Attitude and willingness are separate. Each roll states a sourced rule, Ability (Skill), DC, success and a miss that changes the situation. Essential information has independent routes.

### 5. Attach rules without turning the NPC into a Creature

Set the NPC's `creature` property to an actual complete Creature page. Reuse a fitting Creature for an ordinary identity. A name alone does not justify unique statistics. Preserve shared Creature statistics unless the DM requests a retune. NPC pages never contain or embed statblocks. Only an Encounter embeds a Creature statblock.

When the NPC is a unique fighter, invoke `creature-design` with the person's concept, visible tells, terrain, number of fighters, and requested difficulty. Use the returned Creature path and keep all rules on that Creature page. Supporters, guards, beasts, crews, and other fighters the NPC can call on link to their actual Creature pages, where all their rules are written. An enemy gets a linked Creature, never a full PC sheet.

**Gate:** `creature` resolves to a complete Creature, every reachable fighter has an actual Creature link, no NPC statblock or Creature embed exists, and any retuned shared Creature is explicitly DM-requested.

### 6. Branch: recurring NPC

Tie the NPC to each relevant PC only through an existing Goal, bond, or Plan. Each connection is optional and offers that PC a choice built from their own Goals, bonds or Plans. Link existing Threads rather than duplicating future plans. Give the NPC a next move and a cost if ignored.

**Gate:** every relevant PC has a distinct invitation or an explicit `none`, and each invitation has a choice and a cost. The NPC's next move differs from every existing Thread's.

### 7. Branch: villain

Read `references/villain.md`. In an active Campaign, put the plan on an existing suitable Thread and build on it in place of a parallel future plan. If no suitable Thread exists, create a Thread with `wiki/templates/Thread.md`, link it from the NPC, and make it reachable. Each step of the Thread is visible and interruptible, with a trigger, sign, resource or cost, consequence if ignored, Party interruption, fallback and villain reaction. Include at least three live endings reached through play, not a required single roll or cutscene. The villain acts between appearances and knows only what the fiction gives them.

With no active Campaign, retain the plan on the NPC in the World, do not invent a Campaign or Campaign Thread. Keep the plan active, interruptible, and consequential at World scale.

**Gate:** the plan's owner and location are correct, and its ignored consequences and interruption points are visible. Each plan step has a fallback, and at least three distinct endings remain live.

### 8. Write Narration and file the pages

Load `theatre-of-the-mind` for the NPC template's `[!narration] First look` and write it to the recipe in [references/craft.md](references/craft.md#first-look). Preserve Narration already heard at the table unless the DM explicitly requests a rewrite.

Copy `wiki/templates/NPC.md` exactly in `<campaign-folder>/NPCs/`. A page already filed keeps its folder. Fill its required `At a glance`, `Play`, `Depth`, and `Links` sections with only the facts the selected scale needs. Fill the optional `Quotes` only with lines the DM, a Transcript or a source gives this person, word for word, and leave it out when there are none. Link the Creature, Location, Faction, PCs, Threads, supporters, and other owners. If a Creature or Thread was created, file it with its own template and link it from the owner page.

**Gate:** the page has the template's required properties, sections, and callout; the first look is speakable and Player-safe; every new page is inbound-linked; no page contains agent process notes, inline rules, or empty filler.

### 9. Close against the caller's target

Close per `skill://lint` § Commands over the NPC, Creature and Thread pages and every other page this run touched, using the caller's target, not an ambient default (**Another root** there: every command takes `--vault "$VAULT" --root "$ROOT"`, each check `--templates "$VAULT/templates"`). The page gate runs every layer on them: placement, links, orphans, statblock arithmetic, index, hot, log, Markdown, spelling, grammar, and style. Link every Creature the NPC uses so its 2024 arithmetic is checked. Never hand-edit `index.md`.

Omit absent `--page` values (`$NPC_PATH`, `$CREATURE_PATH`, `$THREAD_PATH`). If an enclosing Ingest, Prep, Push, Audit, Pull, or Query operation called this skill, that operation writes the log entry for the work and this skill writes none.

**Done:** the selected-scale result is complete. Canon and explicit inventions are preserved and reported, and every source limitation is stated. All relevant Creature and Thread pages are linked, and the close is complete, with one `create` entry under the standalone-versus-enclosing rule.
