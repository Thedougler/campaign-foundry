---
title: Wand of Polymorph
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wand, Very Rare (Requires Attunement By a Spellcaster), 1 lb.*

This wand has 7 charges. While holding it, you can expend 1 charge to cast *Polymorph* (save DC 15) from it.

***Regaining Charges.*** The wand regains 1d6 + 1 expended charges daily at dawn. If you expend the wand's last charge, roll 1d20. On a 1, the wand crumbles into ashes and is destroyed.

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
