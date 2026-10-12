---
title: Ersatz Eye
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Common.*

This magical eye replaces a real one that was lost or removed. While the Ersatz Eye is embedded in your eye socket, you can see through the tiny orb as though it were your natural eye. You can insert or remove the Ersatz Eye as a Magic action, and it can't be removed against your will while you are alive.

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
