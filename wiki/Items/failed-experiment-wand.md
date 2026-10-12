---
title: Failed Experiment Wand
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wand, Rare (Requires Attunement By a Spellcaster), 1 lb.*

This wand has 2 charges. While holding it, you can use an action to expend 1 or more of its charges to cast either a green-flamed *fireball* or a blue *lightning bolt* at random from it (save DC 15).

For 1 charge, you cast the 3rd-level version of the spell. You can increase the spell slot level by one for each additional charge you expend.

The wand regains 1d6 + 1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed.

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
