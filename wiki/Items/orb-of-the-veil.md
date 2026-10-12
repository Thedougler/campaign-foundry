---
title: Orb of the Veil
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Very Rare (Requires Attunement), 3 lb.*

This onyx sphere bears deep, spiralling grooves and dangles from an iron chain. While the orb is on your person, you gain the following benefits:

- Your Wisdom score increases by 2, as does your maximum for that score.
- You gain darkvision out to a range of 60 feet. If you already have darkvision, the orb increases its range by 60 feet.
- You have advantage on Wisdom checks to find hidden doors and paths.

***Curse.*** The orb is cursed, and becoming attuned to it extends the curse to you. As long as you remain cursed, you are unwilling to part with the orb, keeping it on your person at all times. All nonmagical flames within 30 feet of you automatically extinguish, and fire damage dealt by you is halved.

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
