---
title: Potion of Comprehension
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Potion, Common, ½ lb.*

When you drink this potion, you gain the effect of the *Comprehend Languages* spell for 1 hour.

This potion's liquid is a clear concoction with bits of salt and soot swirling in it.

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
