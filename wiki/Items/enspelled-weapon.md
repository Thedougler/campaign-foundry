---
title: Enspelled Weapon
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Generic Variant (Requires Attunement).*

Multiple variations of this item exist, as listed below:

- *Enspelled Weapon (Cantrip)*
- *Enspelled Weapon (Level 1)*
- *Enspelled Weapon (Level 2)*
- *Enspelled Weapon (Level 3)*
- *Enspelled Weapon (Level 4)*
- *Enspelled Weapon (Level 5)*
- *Enspelled Weapon (Level 6)*
- *Enspelled Weapon (Level 7)*
- *Enspelled Weapon (Level 8)*

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
