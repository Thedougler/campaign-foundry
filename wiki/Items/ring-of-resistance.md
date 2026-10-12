---
title: Ring of Resistance
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Ring, Rare.*

You have Resistance to one damage type while wearing this ring. The gemstone in the ring indicates the type, which the DM chooses or determines randomly by rolling on the following table.

| | d10 | | Damage Type | | Gem        | |
| :---: | ------------- | -------------- |
|  |  1 | | *Acid*      | | Pearl      | |
|  |  2 | | *Cold*      | | Tourmaline | |
|  |  3 | | *Fire*      | | Garnet     | |
|  |  4 | | *Force*     | | Sapphire   | |
|  |  5 | | *Lightning* | | Citrine    | |
|  |  6 | | *Necrotic*  | | Jet        | |
|  |  7 | | *Poison*    | | Amethyst   | |
|  |  8 | | *Psychic*   | | Jade       | |
|  |  9 | | *Radiant*   | | Topaz      | |
| |  10 | | *Thunder*   | | Spinel     | |

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
