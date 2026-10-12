---
title: Potion of Mind Reading
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Potion, Rare, ½ lb.*

When you drink this potion, you gain the effect of the *Detect Thoughts* spell (save DC 13) for 10 minutes (no Concentration required).

This potion's dense, purple liquid has an ovoid cloud of pink floating in it.

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
