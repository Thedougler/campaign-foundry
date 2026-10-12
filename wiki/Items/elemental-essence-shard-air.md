---
title: Elemental Essence Shard (Air)
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Spellcasting Focus, Rare (Requires Attunement By a Sorcerer), 1 lb.*

This crackling crystal contains the essence of an elemental plane. As an action, you can attach the shard to a Tiny object (such as a weapon or a piece of jewellery) or detach it. It falls off if your attunement to it ends. You can use the shard as a spellcasting focus while you hold or wear it.

When you use a Metamagic option on a spell while you are holding or wearing the shard, you can use the following property:

***Property.*** You can immediately fly up to 60 feet without provoking opportunity attacks.

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
