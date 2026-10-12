---
title: Figurine of Wondrous Power
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item.*

Multiple variations of this item exist, as listed below:

- *Figurine of Wondrous Power, Bronze Griffon*
- *Figurine of Wondrous Power, Ebony Fly*
- *Figurine of Wondrous Power, Golden Lions*
- *Figurine of Wondrous Power, Ivory Goats*
- *Figurine of Wondrous Power, Marble Elephant*
- *Figurine of Wondrous Power, Obsidian Steed*
- *Figurine of Wondrous Power, Onyx Dog*
- *Figurine of Wondrous Power, Serpentine Owl*
- *Figurine of Wondrous Power, Silver Raven*

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
