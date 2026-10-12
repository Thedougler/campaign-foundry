---
title: Blood Amulet
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Rare (Requires Attunement).*

This delicate amulet looks like a diminutive beating heart impaled with spikes. It has 3 charges and regains 1d3 charges daily at dawn.

Whenever you deal damage to a creature, you can expend 1 charge to deal an extra 2d10 Necrotic damage to the target and force it to make a DC 15 Constitution saving throw. On a failed save, the target gains 1 Exhaustion level.

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
