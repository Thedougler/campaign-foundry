---
title: Knight Card
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Legendary.*

As an action, you can throw this card to an unoccupied space on the ground within 60 feet of yourself while speaking a command word, whereupon the card magically transforms into a **deck defender** (see *chapter 9* for its stat block) for up to 1 minute or until you use an action to speak the command word again, whereupon it transforms back into a card. The deck defender obeys your spoken commands. If you issue no commands, it takes the Dodge action and moves to avoid danger. The deck defender reverts to a card early if it drops to 0 hit points. Once this property is used, it can't be used again until the next dawn.

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
