---
type: House Rule
summary: "One line."
sources: []
---

## At a glance

- **Changes.** Text.
- **Applies to.** Text.
- **In one line.** Text.

## Play

Text.

## Depth

Text.

### Why

Text.

### Edge cases

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
