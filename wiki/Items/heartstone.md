---
title: Heartstone
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Very Rare.*

This lustrous black gem allows a **night hag** to become ethereal while it is in her possession. The touch of a heartstone also cures any disease. Crafting a heartstone takes 30 days.

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
