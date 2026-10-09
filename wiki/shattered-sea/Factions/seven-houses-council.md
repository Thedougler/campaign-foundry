---
type: Faction
summary: "The council of seven Tessarine houses that leads the Concordat from
  Calveno; four houses usually vote its way while three stall."
aliases:
  - Seven Houses
  - Seven Houses of Calven and Calveno
sources: []
revealed: ""
title: "Seven Houses Council"
---

## At a glance

- **Goal.** Lead the [[tessarine-concordat|Tessarine Concordat]] from Calveno.
- **Base.** [[calven-and-calveno|Calveno]] counting houses.
- **Strength.** The usual vote runs four houses to three in the Concordat's favour.

> [!narration] Public face
> The council that leads the [[tessarine-concordat|Tessarine Concordat]] seats seven houses in Calveno. On most days the count reads four to three, and the holdouts can stall a decision.

## Play

- **When met.** Through the Concordat's clerks and counting houses in Calveno.
- **When opposed.** Three of the seven houses can still stall.

## Depth

### History

The Tessarine Concordat formed the Seven Houses of Calven and Calveno in 1210 DR. Debt to [[iacopo-fieschi|Iacopo Fieschi]] binds six of the seven, and his credit the rest.

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
