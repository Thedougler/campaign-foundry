---
title: Ring of Swimming
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Ring, Uncommon.*

You have a Swim Speed of 40 feet while wearing this ring.

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
