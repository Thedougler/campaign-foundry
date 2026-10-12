---
title: Efreeti Chain
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Generic Variant, Legendary (Requires Attunement).*

While wearing this armour, you gain a +3 bonus to Armour Class, you have Immunity to Fire damage, and you know Primordial. In addition, you can stand on and move across molten rock as if it were solid ground.

***Base items.*** This item variant can be applied to the following base items:

- *Chain Mail* (*Efreeti Chain Mail*)
- *Chain Shirt* (*Efreeti Chain Shirt*)

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
