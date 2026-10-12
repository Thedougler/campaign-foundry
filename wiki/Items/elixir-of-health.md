---
title: Elixir of Health
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Potion, Rare, ½ lb.*

When you drink this potion, you are cured of all magical contagions. In addition, the following conditions end on you: Blinded, Deafened, Paralysed, and Poisoned.

The clear, red liquid has tiny bubbles of light in it.

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
