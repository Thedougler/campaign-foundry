---
title: Deck of Oracles
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Rare (Requires Attunement).*

The illustrations on this deck of oracle cards move or change subtly when viewed indirectly. When you finish a long rest, you can spend 10 minutes consulting the cards for an omen of the coming day. Roll a d20 and record the number rolled. Once in the next 8 hours, immediately after a creature within 60 feet of you makes an ability check, an attack roll, or a saving throw, you can use your reaction to discard the d20 roll; the creature must use the number you rolled in place of its roll.

Additionally, while holding the cards, you can cast *Divination* from them. Once this property is used, it can't be used again until the next dawn.

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
