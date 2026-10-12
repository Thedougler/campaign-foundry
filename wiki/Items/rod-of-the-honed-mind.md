---
title: Rod of the Honed Mind
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Rod (Requires Attunement By a Warlock).*

Evolving Item

In this example, a Warlock receives a *+1 Rod of the Pact Keeper*, an Uncommon magic item. The rod is a gift from a circle of sages who study the Warlock's mysterious patron, an entity from beyond the stars. The rod bears abstruse symbols of unknown origin; each time it evolves, they become more intricate.

***Evolving Item.*** *This item is an Evolving Item, see *Evolving Magic Items* for more information.*

Multiple variations of this item exist, as listed below:

- *Vigilant Rod of the Honed Mind*
- *Psionic Rod of the Honed Mind*
- *Tranquil Rod of the Honed Mind*

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
