---
title: Secret Keeper's Circlet
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Rare (Requires Attunement).*

This circlet allows the wearer to wipe from their memory any knowledge of a specific deed or time in their life, making it useful for those who fear mages plumbing their minds with magic.

While wearing this circlet, you can take a Magic action to specify a trigger such as "after I leave this temple" or "when I cast the *Animate Dead* spell." For the next 24 hours, if that trigger occurs, the circlet erases your memories of everything from the time you chose the trigger until the trigger occurred. No magic short of a *Wish* spell can restore your memory of this time. Once you use this property, you can't use it again until the next dawn.

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
