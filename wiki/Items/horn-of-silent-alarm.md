---
title: Horn of Silent Alarm
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Instrument (*Horn*), Common.*

This horn has 4 charges and regains 1d4 expended charges daily at dawn. As a Magic action, you can blow the horn while expending 1 charge. One creature of your choice hears the horn's blare, provided that creature is within 600 feet of the horn. No other creature hears the horn.

***Tool (Musical Instrument).*** If you have proficiency with a tool, add your Proficiency Bonus to any ability check you make that uses the tool. If you have proficiency in a skill that's used with that check, you have Advantage on the check too.

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
