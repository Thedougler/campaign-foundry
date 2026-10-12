---
title: Throne Card
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Legendary.*

As an action, you can speak a command word while holding this card to gain advantage on Charisma (Intimidation or Persuasion) checks for 1 minute. In addition, for that duration, you can use this card to cast the *Command* spell (save DC 17) as an action. Once this property is used, it can't be used again until the next dawn.

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
