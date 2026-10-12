---
title: Philter of Love
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Potion, Uncommon, ½ lb.*

The next time you see a creature within 10 minutes after drinking this philter, you are charmed by that creature and have the Charmed condition for 1 hour.

This rose-hued, effervescent liquid contains one easy-to-miss bubble shaped like a heart.

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
