---
title: Ring of Telekinesis
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Ring, Very Rare (Requires Attunement).*

While wearing this ring, you can cast *Telekinesis* from it.

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
