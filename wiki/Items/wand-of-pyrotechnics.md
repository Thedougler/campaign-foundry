---
title: Wand of Pyrotechnics
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wand, Common, 1 lb.*

This wand has 7 charges. While holding it, you can take a Magic action to expend 1 charge and create a harmless burst of multicoloured light at a point you can see up to 120 feet away. The burst of light is accompanied by a crackling noise that can be heard up to 300 feet away. The light is as bright as a torch flame but lasts only a second.

***Regaining Charges.*** The wand regains 1d6 + 1 expended charges daily at dawn. If you expend the wand's last charge, roll 1d20. On a 1, the wand erupts in a harmless pyrotechnic display and is destroyed.

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
