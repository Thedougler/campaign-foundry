---
title: Ring of Jumping
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Ring, Uncommon (Requires Attunement).*

While wearing this ring, you can cast *Jump* from it, but can target only yourself when you do so.

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
