---
title: Wand of Slumber
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wand, Rare (Requires Attunement).*

This wand has 7 charges. While holding it, you can cast one of the spells on the following table from it. The table indicates how many charges you must expend to cast the spell.

***Regaining Charges.*** The wand regains 1d6 + 1 expended charges daily at dawn. If you expend the wand's last charge, roll 1d20. On a 1, the wand crumbles into sand and is destroyed.

| | Spell                | | Charge Cost | |
| ---------------------- | :-------------: |
| | *Catnap*             | |      3      | |
| | *Sleep* (save DC 15) | |      1      | |

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
