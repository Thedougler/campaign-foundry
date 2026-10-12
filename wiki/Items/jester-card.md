---
title: Jester Card
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Legendary.*

As an action, you can brandish this card and use it to cast the *Otto's Irresistible Dance* spell (save DC 17), and you have advantage on Constitution saving throws to maintain concentration on it. Once this property is used, it can't be used again until the next dawn.

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
