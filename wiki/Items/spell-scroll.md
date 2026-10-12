---
title: Spell Scroll
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Scroll.*

Multiple variations of this item exist, as listed below:

- *Spell Scroll (Cantrip)*
- *Spell Scroll (Level 1)*
- *Spell Scroll (Level 2)*
- *Spell Scroll (Level 3)*
- *Spell Scroll (Level 4)*
- *Spell Scroll (Level 5)*
- *Spell Scroll (Level 6)*
- *Spell Scroll (Level 7)*
- *Spell Scroll (Level 8)*
- *Spell Scroll (Level 9)*

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
