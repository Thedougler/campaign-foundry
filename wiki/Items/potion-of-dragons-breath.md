---
title: Potion of Dragon's Breath
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Potion, Uncommon.*

When you drink this potion, you gain the effect of the *Dragon's Breath* spell for 1 minute (save DC 13, no Concentration required). The damage type associated with that spell is determined by the colour of the potion when the potion was created, as shown in the table below.

Light catches off the glittery liquid inside this potion, which is made from the pulverized scale of a chromatic dragon.

| | Colour | | Damage Type | |
| :------: | :-------------: |
|  | Black | |     Acid    | |
|  |  Blue | |  Lightning  | |
|  | Green | |    Poison   | |
|  |  Red  | |     Fire    | |
|  | White | |     Cold    | |

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
