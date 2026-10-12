---
title: Wand of Conducting
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wand, Common, 1 lb.*

This wand has 3 charges. While holding it, you can take a Magic action to expend 1 charge and create orchestral music by waving it around. The music can be heard out to 120 feet and ends when you stop waving the wand.

***Regaining Charges.*** The wand regains all expended charges daily at dawn. If you expend the wand's last charge, roll 1d20. On a 1, a sad tuba sound plays as the wand crumbles into dust and is destroyed.

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
