---
title: Elemental Essence Shard
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Rare (Requires Attunement By a Sorcerer), 1 lb.*

This crackling crystal contains the essence of an elemental plane. As an action, you can attach the shard to a Tiny object (such as a weapon or a piece of jewellery) or detach it. It falls off if your attunement to it ends. You can use the shard as a spellcasting focus while you hold or wear it.

Roll a d4 and consult the Elemental Essence Shards table to determine the shard's essence and property. When you use a Metamagic option on a spell while you are holding or wearing the shard, you can use that property.

#### Elemental Essence Shards

| |  d4 | | Element | | Shard                             | |
| :---: | :-------: | ------------------------------------- |
|  |  1 |  |   Air  | | *Elemental Essence Shard (Air)*   | |
|  |  2 |  |  Earth | | *Elemental Essence Shard (Earth)* | |
|  |  3 |  |   Fire | | *Elemental Essence Shard (Fire)*  | |
|  |  4 |  |  Water | | *Elemental Essence Shard (Water)* | |

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
