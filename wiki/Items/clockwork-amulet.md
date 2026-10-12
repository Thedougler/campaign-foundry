---
title: Clockwork Amulet
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Common.*

This copper amulet contains tiny interlocking gears and is powered by magic from Mechanus, a plane of clockwork predictability. Faint ticking and whirring noises emanate from within.

When you make an attack roll while wearing the amulet, you can forgo rolling the d20 to get a 10 on the die. Once used, this property can't be used again until the next dawn.

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
