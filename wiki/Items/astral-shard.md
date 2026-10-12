---
title: Astral Shard
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Spellcasting Focus, Rare (Requires Attunement By a Sorcerer), 1 lb.*

This crystal is a solidified shard of the Astral Plane, swirling with silver mist. As an action, you can attach the shard to a Tiny object (such as a weapon or a piece of jewellery) or detach it. It falls off if your attunement to it ends. You can use the shard as a spellcasting focus while you hold or wear it.

When you use a Metamagic option on a spell while you are holding or wearing the shard, immediately after casting the spell you can teleport to an unoccupied space you can see within 30 feet of you.

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
