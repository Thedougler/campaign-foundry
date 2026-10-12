---
title: Star Card
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Legendary.*

As a bonus action, you can speak a command word while holding this card aloft to gain advantage on all saving throws you make for the next 10 minutes. Once this property is used, it can't be used again until the next dawn.

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
