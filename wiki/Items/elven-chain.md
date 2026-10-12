---
title: Elven Chain
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Generic Variant, Rare.*

You gain a +1 bonus to Armour Class while you wear this armour. You are considered trained with this armour even if you lack training with Medium or Heavy armour.

***Base items.*** This item variant can be applied to the following base items:

- *Chain Mail* (*Elven Chain Mail*)
- *Chain Shirt* (*Elven Chain Shirt*)

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
