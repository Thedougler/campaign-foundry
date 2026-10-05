---
type: Campaign
summary: "Four survivors and fugitives seize a chance at a crew aboard the Saltwright while Crown inspection and the Drowned Maw close around them."
sources:
 - "archive/story-so-far.md"
 - "archive/campaign-timeline.md"
 - "archive/session-11-transcript.md"
 - "archive/ssw-lines-and-veils.md"
 - "archive/collab-2026-10-04-authority-themes.md"
session_length_hours:
---

## At a glance

- **Players.** Kaden, Frederick, Courtney, and Chad.
- **Premise.** Debts, pursuers, and secrets follow four strangers who become a crew in the Shattered Sea.
- **Party.** [[Perrin Black-Jaw]], [[Delmar Fisk]], [[Crissdalynn Khinriss]], and [[Jean-Claude Tabarnack]].
- **Cadence.** Sessions follow the Party's crossings, port bargains, and consequences.
- **Now.** After Session 11, the Party is camped at the River's slack basin on [[Aruhe]]. [[Jean-Claude Tabarnack]] is catatonic in [[Delmar Fisk]]'s coat, [[Matteo Scola]] wants passage off the island, and [[Talon Skarn]]'s attack on [[Crissdalynn Khinriss]] for the [[Fate Spinner]] remains unresolved. Session 12 Prep begins from this camp.

> [!narration] The Campaign
> You reached the Saltwright along separate roads. One of you lived through a wreck and another hides an older name, while a third was pulled from the sea. Hunters trail the fourth by one island. Crown sailors board to seize the ship while you are all together in the hold. Explaining whose ship it is will have to wait. Make the hold yours, get through the inspection, and decide what kind of crew crosses a sea where others own every route.

## Play

- **Session length.** Inherits DM Settings unless session_length_hours is set.
- **Table agreements.** The Campaign follows the World tone of consequential travel, hard choices, and discoveries that remain useful beyond one Session.
- **House Rules.** None established.
- **Tone, themes, Lines and Veils.** [[campaign-config|Tone, themes, Lines and Veils]]

## Depth

### Premise

The Party's first victory is also its first commitment. Taking the Saltwright from a Crown boarding crew gives it a ship and a shared enemy, while forcing it to keep moving. Its routes lead through colonial law, Passage obligations, Grung pursuit, the Pearl of Souls, and the Drowned Maw. The [[Campaign Timeline]] orders the causes behind those pressures. [[Session 11 Assets]] records the later evidence-routing procedure.

### Themes

The Campaign is about the different kinds of authority and who should wield it, and rebellion against authority drives it: over the Campaign the Party takes on increasingly greater forms of authority. Authority climbs rungs, from authorities through lords such as [[Barnaby Rook]] and [[Aleksander Malone]], kings, and the Gold caste's false gods, to the gods and the sea, where [[Umberlee]] is both. Earlier statements of the theme keep as facets. Found family versus inherited obligation remains in play, as do freedom against systems that demand papers, tribute or debt, and the cost of choosing who gets to pass safely.

### Direction

The Party is crossing [[Aruhe]] toward inland survivors while keeping the Fate Spinner from its hunters and protecting the Calveno survivors. Session 12 continues from the River's slack basin, with Hinewai's garden, the Grung orders, and Perrin's patron pressing the route. [[Take on Aruhe]] remains active. The [[Campaign Timeline]] orders the causes behind those pressures. [[Session 11 Assets]] records the later evidence-routing procedure.

## Links

```base
filters:
 and:
  - file.inFolder(this.file.folder)
views:
 - type: table
  name: PCs
  filters:
   and:
    - 'note.type == "PC"'
  order:
   - file.name
   - note.summary
 - type: table
  name: Threads
  filters:
   and:
    - 'note.type == "Thread"'
  order:
   - file.name
   - note.summary
   - note.status
 - type: table
  name: Quests
  filters:
   and:
    - 'note.type == "Quest"'
  order:
   - file.name
   - note.summary
   - note.status
 - type: table
  name: Prep
  filters:
   and:
    - 'note.type == "Prep"'
  order:
   - file.name
   - note.summary
   - note.date
 - type: table
  name: Recaps
  filters:
   and:
    - 'note.type == "Recap"'
  order:
   - file.name
   - note.summary
   - note.date
```
