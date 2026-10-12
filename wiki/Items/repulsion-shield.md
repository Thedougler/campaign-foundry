---
title: Repulsion Shield
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Shield (*Shield*), Uncommon, 6 lb.*

AC +2

You gain a +1 bonus to Armour Class while wielding this shield.

The shield has 4 charges. While holding it, when a Large or smaller creature within 5 feet of you hits you with a melee attack roll, you can take a Reaction to expend 1 of the shield's charges and push the attacker up to 15 feet straight away. The shield regains 1d4 expended charges daily at dawn.

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
