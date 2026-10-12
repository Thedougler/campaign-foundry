---
title: Potions of Healing
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Potion, ½ lb.*

Multiple variations of this item exist, as listed below:

- *Potion of Healing*
- *Potion of Greater Healing*
- *Potion of Superior Healing*
- *Potion of Supreme Healing*

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
