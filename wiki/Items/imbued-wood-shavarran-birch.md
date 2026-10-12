---
title: Imbued Wood (Shavarran Birch)
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Generic Variant, Common (Requires Attunement).*

An imbued wood focus is a rod, staff, or wand cut from a tree infused with extraplanar energy. If you're a spellcaster, you can use this item as a spellcasting focus.

When you cast a damage-dealing spell using this item as your spellcasting focus, you gain a +1 bonus to one force damage roll of the spell.

***Base items.*** This item variant can be applied to the following base items:

- *Rod* (*Shavarran Birch Rod*)
- *Staff* (*Shavarran Birch Staff*)
- *Wand* (*Shavarran Birch Wand*)

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
