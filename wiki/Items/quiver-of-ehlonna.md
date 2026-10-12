---
title: Quiver of Ehlonna
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Uncommon, 2 lb.*

Each of the quiver's three compartments connects to an extradimensional space that allows the quiver to hold numerous items while never weighing more than 2 pounds. The shortest compartment can hold up to 60 *Arrows*, *Bolts*, or similar objects. The midsize compartment holds up to 18 *Javelins* or similar objects. The longest compartment holds up to 6 long objects, such as bows, *Quarterstaffs*, or *Spears*.

You can draw any item the quiver contains as if doing so from a regular quiver or scabbard.

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
