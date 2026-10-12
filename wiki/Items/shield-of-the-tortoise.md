---
title: Shield of the Tortoise
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Shield (*Shield*), Uncommon (Requires Attunement), 6 lb.*

AC +2

While you are wielding this shield, you gain a +1 bonus to AC. This bonus is in addition to the shield's normal bonus to AC.

***Curse.*** This item is cursed. Attuning to it extends the curse to you until you are targeted by a *Remove Curse* spell or similar magic. You cannot discard the shield, and remain attuned to it, as long as you are cursed. As long as you are cursed, you are sluggish. Your speed is halved. When you roll initiative, treat the roll on your d20 as a 1. You can't change your initiative by any means.

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
