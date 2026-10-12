---
title: Mythallar Bracelet
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Common.*

Three small, crystal beads made from a decommissioned mythallar are strung on this leather bracelet. As a Magic action, you can pluck one bead from the bracelet to gain Advantage on Strength (Athletics) checks for 1 minute.

A bead disappears immediately after it's plucked. Once all three beads have been plucked, the bracelet loses its magic.

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
