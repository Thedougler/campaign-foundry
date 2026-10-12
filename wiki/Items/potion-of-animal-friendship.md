---
title: Potion of Animal Friendship
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Potion, Uncommon, ½ lb.*

When you drink this potion, you can cast the level 3 version of the *Animal Friendship* spell (save DC 13).

Agitating this potion's muddy liquid brings little bits into view: a fish scale, a hummingbird feather, a cat claw, or a squirrel hair.

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
