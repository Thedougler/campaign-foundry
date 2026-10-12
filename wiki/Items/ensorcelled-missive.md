---
title: Ensorcelled Missive
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Common.*

This item functions as a sheet of Parchment. After writing on it, you can take a Magic action to fold or roll the sheet and seal it while speaking or signing a word or short phrase. If a creature unseals the sheet without using the same word or phrase, the writing on the sheet appears as if it were written in an unknown and unintelligible script.

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
