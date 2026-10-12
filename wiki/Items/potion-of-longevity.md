---
title: Potion of Longevity
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Potion, Very Rare, ½ lb.*

When you drink this potion, your physical age is reduced by 1d6 + 6 years, to a minimum of 13 years. Each time you subsequently drink a Potion of Longevity, there is 10 percent cumulative chance that you instead age by 1d6 + 6 years.

Suspended in this amber liquid is a tiny heart that, against all reason, is still beating. These ingredients vanish when the potion is opened.

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
