---
title: Outer Essence Shard (Good)
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Spellcasting Focus, Rare (Requires Attunement By a Sorcerer), 1 lb.*

This flickering crystal holds the essence of an Outer Plane. As an action, you can attach the shard to a Tiny object (such as a weapon or a piece of jewellery) or detach it. It falls off if your attunement to it ends. You can use the shard as a spellcasting focus while you hold or wear it.

When you use a Metamagic option on a spell while you are holding or wearing the shard, you can use that property.

***Property.*** You or one creature of your choice that you can see within 30 feet of you gains 3d6 temporary hit points.

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
