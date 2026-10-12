---
title: Imbued Wood Focus
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Spellcasting Focus, Common (Requires Attunement).*

An imbued wood focus is a rod, staff, or wand cut from a tree infused with extraplanar energy. If you're a spellcaster, you can use this as a spellcasting focus.

When you cast a damage-dealing spell using this item as your spellcasting focus, you gain a +1 bonus to one damage roll of the spell, provided the damage is of the type associated with the item's wood. The types of wood and their associated damage types are listed in the Imbued Wood Focus table.

#### Imbued Wood Focus

| | Wood                  | | Damage Type          | |
| ----------------------- | ------------------------ |
| | *Fernian Ash*         | | Fire                 | |
| | *Irian Rosewood*      | | Radiant              | |
| | *Kythrian Manchineel* | | Acid or poison       | |
| | *Lamannian Oak*       | | Lightning or thunder | |
| | *Mabaran Ebony*       | | Necrotic             | |
| | *Risian Pine*         | | Cold                 | |
| | *Shavarran Birch*     | | Force                | |
| | *Xorian Wenge*        | | Psychic              | |

Multiple variations of this item exist, as listed below:

- *Imbued Wood (Fernian Ash)*
- *Imbued Wood (Irian Rosewood)*
- *Imbued Wood (Kythrian Manchineel)*
- *Imbued Wood (Lamannian Oak)*
- *Imbued Wood (Mabaran Ebony)*
- *Imbued Wood (Risian Pine)*
- *Imbued Wood (Shavarran Birch)*
- *Imbued Wood (Xorian Wenge)*

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
