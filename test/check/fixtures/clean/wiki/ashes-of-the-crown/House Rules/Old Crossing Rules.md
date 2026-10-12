---
type: House Rule
summary: "Crossing the bridge at Ravenhold costs a toll roll."
sources: []
revealed: ""
title: "Old Crossing Rules"
---

- **Changes.** Text.
- **Applies to.** Text.
- **In one line.** Text.

Text.

Text.

## Problem it solves

Text.

## Edge cases

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
