---
title: Outer Essence Shard
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Spellcasting Focus, Rare (Requires Attunement By a Sorcerer), 1 lb.*

This flickering crystal holds the essence of an Outer Plane. As an action, you can attach the shard to a Tiny object (such as a weapon or a piece of jewellery) or detach it. It falls off if your attunement to it ends. You can use the shard as a spellcasting focus while you hold or wear it.

Roll a d4 and consult the Outer Essence Shards table to determine the shard's essence and property. When you use a Metamagic option on a spell while you are holding or wearing the shard, you can use that property.

#### Outer Essence Shards

| |  d4 | | Property | | Shard                           | |
| :---: | :--------: | ----------------------------------- |
|  |  1 |  |  Lawful | | *Outer Essence Shard (Lawful)*  | |
|  |  2 | |  Chaotic | | *Outer Essence Shard (Chaotic)* | |
|  |  3 |  |   Good  | | *Outer Essence Shard (Good)*    | |
|  |  4 |  |   Evil  | | *Outer Essence Shard (Evil)*    | |

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
