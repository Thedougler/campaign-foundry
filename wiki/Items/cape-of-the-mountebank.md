---
title: Cape of the Mountebank
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Rare.*

This cape smells faintly of brimstone. While wearing it, you can use it to cast *Dimension Door* as a Magic action. This property can't be used again until the next dawn.

When you teleport with that spell, you leave behind a cloud of smoke. The space you left is Lightly Obscured by that smoke until the end of your next turn.

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
