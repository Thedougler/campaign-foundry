---
title: Reincarnation Dust
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Very Rare.*

When this small pouch of purple dust is sprinkled on a dead humanoid or a piece of a dead humanoid, the dust is absorbed by the remains. If willing, the dead creature returns to life with a new body as if the *reincarnate* spell had been cast on the remains.

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
