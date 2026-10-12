---
title: Enspelled Armor
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Generic Variant (Requires Attunement).*

Multiple variations of this item exist, as listed below:

- *Enspelled Armour (Cantrip)*
- *Enspelled Armour (Level 1)*
- *Enspelled Armour (Level 2)*
- *Enspelled Armour (Level 3)*
- *Enspelled Armour (Level 4)*
- *Enspelled Armor (Level 5)*
- *Enspelled Armor (Level 6)*
- *Enspelled Armor (Level 7)*
- *Enspelled Armor (Level 8)*

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
