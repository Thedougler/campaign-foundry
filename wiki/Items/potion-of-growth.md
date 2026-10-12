---
title: Potion of Growth
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Potion, Uncommon, ½ lb.*

When you drink this potion, you gain the "enlarge" effect of the *Enlarge/Reduce* spell for 10 minutes (no Concentration required).

The red in the potion's liquid continuously expands from a tiny bead to colour the clear liquid around it and then contracts. Shaking the bottle fails to interrupt this process.

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
