---
title: Bow of Conflagration
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Generic Variant, Rare (Requires Attunement).*

Ammunition fired from this bow blazes brightly. When you hit with an attack roll using this bow, the target takes an extra 1d6 fire damage. If the target is a flammable, nonmagical object, it catches fire, taking 1d6 fire damage at the start of each of your turns until a creature uses an action to extinguish the flames.

***Base items.*** This item variant can be applied to the following base items:

- *Longbow* (*Longbow of Conflagration*)
- *Shortbow* (*Shortbow of Conflagration*)

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
