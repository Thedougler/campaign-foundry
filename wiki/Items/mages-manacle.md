---
title: Mage's Manacle
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Rare.*

As a Magic action while wearing this bracelet, you can target a Large or smaller creature within 5 feet of yourself that has the Grappled or Incapacitated condition. The target must succeed on a DC 15 Dexterity saving throw or become magically bound to you by a spectral chain and manacle that spring from the bracelet.

While bound in this way, the creature has the Restrained condition. When you move, the creature moves with you.

A creature remains bound for 8 hours or until you release it (no action required). If the manacle takes damage from a *Disintegrate* spell, it is destroyed; nothing else can break or harm it. Once the manacle has bound a creature, it can't be used again this way until the next dawn.

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
