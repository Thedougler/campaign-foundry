---
title: Potion of Superior Healing
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Potion, Rare, ½ lb.*

You regain 8d4 + 8 Hit Points when you drink this potion. The potion's red liquid glimmers when agitated.

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
