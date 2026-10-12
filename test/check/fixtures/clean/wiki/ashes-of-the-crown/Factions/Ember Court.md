---
type: Faction
summary: "Nobles who guard the memory of the Crown."
sources: []
revealed: ""
title: "Ember Court"
---

## Dealings

- **Goal.** Text.
- **Next move.** Text.
- **Led by.** [[Mara Voss]]
- **Base.** Text.
- **Strength.** Text.

> [!narration] Public face
> Gold masks turn toward every new tale.

- **When met.** Text.
- **When opposed.** Text.
- **Offers.** Text.
- **Costs.** Text.
- **How to notice or interfere.** Text.

Text.

## History

Text.

## Hidden truths

Text.

## Threads

Text.

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
