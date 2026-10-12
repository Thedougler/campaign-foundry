---
title: Potion of Diminution
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Potion, Rare, ½ lb.*

When you drink this potion, you gain the "reduce" effect of the *Enlarge/Reduce* spell for 1d4 hours (no Concentration required).

The red in the potion's liquid continuously contracts to a tiny bead and then expands to colour the clear liquid around it. Shaking the bottle fails to interrupt this process.

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
