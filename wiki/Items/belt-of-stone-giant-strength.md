---
title: Belt of Stone Giant Strength
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Very Rare (Requires Attunement).*

While wearing this belt, your Strength score changes to 23. The item has no effect on you if your Strength without the belt is equal to or greater than the belt's score.

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
