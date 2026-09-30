---
type: Campaign
summary: "Four survivors and fugitives seize a chance at a crew aboard the Saltwright while Crown inspection and the Drowned Maw close around them."
sources:
  - "archive/story-so-far.md"
  - "archive/campaign-timeline.md"
session_length_hours:
---

## At a glance

- **Players.** Kaden, Frederick, Courtney, and Chad.
- **Premise.** Four strangers with debts, pursuers, and secrets become a crew in the Shattered Sea.
- **Party.** [[Perrin Black-Jaw]], [[Delmar Fisk]], [[Crissdalynn Khinriss]], and [[Jean-Claude Tabarnack]].
- **Cadence.** Sessions follow the Party's crossings, port bargains, and consequences.
- **Now.** At the opening, the Party is aboard the Saltwright when the HCS Surety arrives to inspect her; the exact month is not established, in 1495 DR.

> [!narration] The Campaign
> You have each come to the Saltwright by a different road. One survived a wreck, another hides an older name, one was pulled from the sea, and another is one island ahead of hunters. You are together in the hold when Crown sailors come to take the ship. There is no time to explain whose ship it is. Make the hold yours, survive the inspection, and decide what sort of crew can cross a sea where every route belongs to someone else.

## Play

- **Session length.** Inherits DM Settings unless session_length_hours is set.
- **Table agreements.** The Campaign follows the World tone of consequential travel, hard choices, and discoveries that remain useful beyond one Session.
- **House Rules.** None established in the supplied material.

## Depth

### Premise

The Party's first victory is also its first commitment. Taking the Saltwright from a Crown boarding crew gives it a ship and a shared enemy, while forcing it to keep moving. Its routes lead through colonial law, Passage obligations, Grung pursuit, the Pearl of Souls, and the Drowned Maw. The [[Campaign Timeline]] orders the causes behind those pressures. [[Session 11 Assets]] records the later evidence-routing procedure.

### Themes

Found family versus inherited obligation. Freedom versus systems that demand papers, tribute, or debt. The cost of choosing who gets to pass safely.

### Direction

The opening Threads are the Crown inspection and the new crew's survival, Jean-Claude's hunters, Delmar's hidden Pearl debt, Perrin's connection to Nona and the Passage, and the awakening pressure around the Drowned Maw. The Party's choices determine which route and power claim them next. [[Take on Aruhe]] is an offered later task when the route reaches Aruhe.

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
