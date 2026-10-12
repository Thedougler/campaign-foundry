---
title: Potion of Clairvoyance
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Potion, Rare, ½ lb.*

When you drink this potion, you gain the effect of the *Clairvoyance* spell (no Concentration required).

An eyeball bobs in this potion's yellowish liquid but vanishes when the potion is opened.

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
