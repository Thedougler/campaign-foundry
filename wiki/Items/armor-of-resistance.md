---
title: Armor of Resistance
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Generic Variant, Rare (Requires Attunement).*

You have Resistance to one type of damage while you wear this armour. The DM chooses the type or determines it randomly by rolling on the following table.

| | d10 | | Damage Type | |
| :---: | --------------- |
|  |  1 | | *Acid*      | |
|  |  2 | | *Cold*      | |
|  |  3 | | *Fire*      | |
|  |  4 | | *Force*     | |
|  |  5 | | *Lightning* | |
|  |  6 | | *Necrotic*  | |
|  |  7 | | *Poison*    | |
|  |  8 | | *Psychic*   | |
|  |  9 | | *Radiant*   | |
| |  10 | | *Thunder*   | |

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
