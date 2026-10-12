---
title: Harkon's Bite
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Uncommon (Requires Attunement By a Humanoid).*

A dire wolf's tooth dangles from this simple cord necklace. You gain a +1 bonus to ability checks and saving throws while you wear this necklace.

***Curse.*** This necklace is cursed. Attuning to the necklace curses you; this curse can't be removed until **Harkon Lukas** dies. As long as you remain cursed, you become a **Werewolf** serving Harkon Lukas under the DM's control during the night of a full moon.

## Links

```base
filters:
  and:
    - file.hasLink(this.file)
views:
  - type: table
    name: Linked from
    groupBy:
      property: note.type
      direction: ASC
    order:
      - file.name
      - note.summary
```
