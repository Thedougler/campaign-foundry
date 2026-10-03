---
name: npc-design
description: Designs or deepens a named NPC, a person the DM plays whose statistics come from a linked Creature. Use when a Scene, Location, Faction, Quest, or existing page needs a person, a first meeting, recurring depth, a villain, social Influence, or a unique fighter. Do not use for an unnamed Creature or a PC.
---

# NPC design

An NPC is a named person with a present want, agency, and a story. Their rules live on a Creature page. Scale the work to the time the NPC will receive, then stop at that scale.

## Guardrails

- The caller's `root`, `vault`, and World are authoritative. In an isolated fixture, scope every read, search, edit, command, index, and log to that target; never touch the ambient live Wiki.
- Read `CONTEXT.md`, `docs/wiki-layout.md`, and `wiki/templates/NPC.md`. The NPC template alone defines the page shape. Do not copy headings, fields, or paths from intent material.
- Canon precedence is explicit DM instruction, what the DM or Players established at the table and the played Session record, then the Wiki, then Raw. Preserve existing facts, heard Narration, played Session pages, and `hot.md`; a DM's explicit change wins. When Canon is silent, choose one concrete answer at the selected scale, file it as Canon, and report the decision with the pages it grew from. Never ask for bookkeeping approval or confirmation of edits.
- Before invention, read the target World's `index.md`, the active Campaign's `hot.md` when one exists, and the last ten entries of the target World's `log.md`. Then use target-scoped QMD retrieval for the NPC, backlinks, home Location, Faction, connected people, relevant Threads and Recaps, and each relevant PC's `Goals and bonds` and `Plans`. Record every used hit or a reason it is irrelevant.
- Page links make pages reachable. Every new NPC, Creature, or Thread gets an incoming link other than an index link before the gate runs.

## Scale

| Scale | Use | Required result |
| --- | --- | --- |
| Incidental | one brief appearance | a memorable face, an immediate want, one speakable line, and an exit or next move; no unused biography, secret web, or unique statistics |
| Scene | the NPC changes one Scene | all core design and first-meeting play below |
| Recurring | the NPC returns or changes a Thread | Scene result, invitations tied to every relevant PC's existing Goals, bonds, or Plans, and a concrete next move if ignored |
| Villain | the NPC drives opposition across a Campaign | Recurring result plus an active plan on a suitable Campaign Thread, with the villain branch below |

An incidental NPC still follows `wiki/templates/NPC.md` if filed. Keep each required section short rather than expanding the NPC to a larger scale.

## Ordered work

### 1. Establish the target and canon

Resolve the target before searching. Read the target files named above, then retrieve the NPC's page if it exists and every meaningful backlink. Search for existing NPC and Creature candidates in the same Location, Faction, and role before inventing. Read the relevant PCs' actual Goals, bonds, and Plans; a PC connection is an invitation from one of those records, never an invented prior relationship.

**Gate:** the working inventory names the target, scale, canon facts to preserve, heard Narration and played records, relevant pages, each relevant PC's invitation or `none`, and every proposed new page's owner.

### 2. Source before inventing

Use this order:

1. Reuse a fitting Wiki NPC, Creature, role, or existing Thread. State why each plausible role candidate does not fit before minting a new person.
2. For rules, statistics, and archetypes, load `dnd5e-srd-api` and source the 2024 SRD figure that fits.
3. Search official material outside the SRD, then existing published or homebrew material, when identity or a fitting baseline is still missing.
4. Invent only what remains, inspired by the closest material found.

Record provenance honestly. NPC frontmatter `sources` contains only repo-relative paths under `archive/` for archived Raw used by the page. Put external provenance in the page body where relevant. If a required source cannot be retrieved, say exactly what was unavailable and do not present an unverified rule, statistic, or attribution as sourced.

**Gate:** the working notes name the reuse, SRD, web, or invention path, its reason, the role candidates considered, and any missing retrieval. The page's `sources` contains no URL or unarchived path.

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

Make the person distinctive: a repeatable face with two or three specific visible details, a sourced sound or smell, and an activity; a voice rooted in what they care about, with word choice, rhythm, habit, avoided subject, and an ask, refusal, and pressure line. Apply the swap test against a plausible NPC from the same place or Faction. Put every hidden truth's tell in the DM-facing material, not in Player-facing Narration.

**Gate:** every required drive field is concrete, the secret has stakes and three non-duplicate routes, truth and NPC knowledge are separate, the face and voice fail the swap test, and every hidden truth has a testable tell.

### 4. Plan the first meeting and social play

Use `references/craft.md` for face, voice, and tells. For a Scene or larger, state where the NPC is, what they are doing, their opening move, starting Attitude, what opens and shuts them down, what they protect first, the Party's likely requests, and each answer, price, and meaningful outcome.

For Influence, read `references/influence.md` and source the 2024 Influence rule before applying it. Keep Attitude separate from request willingness. Mark requests automatically willing or automatically unwilling when the NPC's goals or limits make that clear; use Hesitant only when the request is uncertain, with the sourced DC `max(15, the NPC's Intelligence score)`. Apply the sourced advantage or disadvantage for Attitude. Use only approaches that fit the NPC and are truthful in the fiction, such as evidence, Persuasion, Deception, or a threat. Roll only when stakes and outcome are uncertain. State what success changes and what a miss costs or changes. A bespoke social procedure is a declared invention, never an official 2024 rule.

Do not put an essential clue behind one roll. Give each essential conclusion about three independent routes such as a statement, trace, witness, document, or consequence; a miss can add cost, danger, delay, or uncertainty while leaving a way forward.

**Gate:** the DM can run the first five minutes, every likely request has an answer and outcome, Attitude and willingness are separate, every roll has a sourced rule, Ability (Skill), DC, success, and meaningful miss, and essential information has independent routes.

### 5. Attach rules without turning the NPC into a Creature

Set the NPC's `creature` property to an actual complete Creature page. Reuse a fitting Creature for an ordinary identity; a name alone does not justify unique statistics. Preserve shared Creature statistics unless the DM explicitly asks for a retune. NPC pages never contain or embed statblocks. Only an Encounter embeds a Creature statblock.

When the NPC is a unique fighter, invoke `creature-design` with the person's concept, visible tells, terrain, number of fighters, and requested difficulty. Use the returned Creature path and keep all rules on that Creature page. Supporters, guards, beasts, crews, and other fighters the NPC can call on link to their actual Creature pages; do not duplicate their rules or invent an unlinked block. Do not make a full PC sheet for an enemy.

**Gate:** `creature` resolves to a complete Creature, every reachable fighter has an actual Creature link, no NPC statblock or Creature embed exists, and any retuned shared Creature is explicitly DM-requested.

### 6. Branch: recurring NPC

Tie the NPC to each relevant PC only through an existing Goal, bond, or Plan. Each connection is optional and gives that PC a meaningful choice, not a fabricated history or forced hook. Link existing Threads rather than duplicating future plans. Give the NPC a next move and a cost if ignored.

**Gate:** every relevant PC has a distinct invitation or an explicit `none`, the invitation has a choice and cost, and the NPC's next move cannot be mistaken for a duplicate Thread.

### 7. Branch: villain

Read `references/villain.md`. In an active Campaign, put the plan on an existing suitable Thread; reuse that Thread rather than creating a parallel future plan. If no suitable Thread exists, create a Thread with `wiki/templates/Thread.md`, link it from the NPC, and make it reachable. The Thread must have visible, interruptible steps, each with a trigger, sign, resource or cost, consequence if ignored, Party interruption, fallback, and villain reaction. Include at least three live endings reached through play, not a required single roll or cutscene. The villain acts between appearances and knows only what the fiction gives them.

With no active Campaign, retain the plan on the NPC in the World, do not invent a Campaign or Campaign Thread. Keep the plan active, interruptible, and consequential at World scale.

**Gate:** the plan's owner and location are correct, its ignored consequences and interruption points are visible, every step has a fallback, and at least three distinct endings remain live.

### 8. Write Narration and file the pages

Load `theatre-of-the-mind` for the NPC template's `[!narration] First look` slot. Give it the established face, voice, activity, and plain visible tells; keep secrets, mechanics, DCs, and unearned knowledge outside the callout. Preserve Narration already heard at the table unless the DM explicitly requests a rewrite.

Copy `wiki/templates/NPC.md` exactly in `<World>/NPCs/`. Fill its required `At a glance`, `Play`, `Depth`, and `Links` sections with only the facts the selected scale needs. Link the Creature, Location, Faction, PCs, Threads, supporters, and other owners. If a Creature or Thread was created, file it with its own template and link it from the owner page.

**Gate:** the page has the template's required properties, sections, and callout; the first look is speakable and Player-safe; every new page is inbound-linked; no page contains agent process notes, inline rules, or empty filler.

### 9. Run the repository gate and log once

Use the actual CLI against the caller's target, not an ambient default:

```sh
bun run cf -- index --vault "$VAULT" --root "$ROOT"
bun run cf -- check --fix --vault "$VAULT" --root "$ROOT" --templates "$VAULT/templates"
bun run cf -- check --vault "$VAULT" --root "$ROOT" --templates "$VAULT/templates"
```

Run the full gate with no path or `--layer` filter. It checks placement, links, orphans, statblock arithmetic, index, hot, log, Markdown, spelling, grammar, and style. Link every Creature the NPC uses so its 2024 arithmetic is checked. Fix findings on the NPC, Creature and Thread pages, and rerun until green. Never hand-edit `index.md`.

For a standalone NPC creation, append one `create` entry only after the gate is green:

```sh
bun run cf -- log --world "$WORLD" --op create --title "<one-line result>" --page "$NPC_PATH" --page "$CREATURE_PATH" --page "$THREAD_PATH" --vault "$VAULT" --root "$ROOT"
```

Omit absent `--page` values. If an enclosing Ingest, Prep, Push, Audit, Pull, or Query operation owns the work, that operation logs once; do not add a second `create` entry.

**Done:** the selected-scale result is complete; canon and explicit inventions are preserved and reported; every source limitation is honest; all relevant Creature and Thread pages are linked; the full target gate is green; the index is regenerated; and logging follows the standalone-versus-enclosing rule.
