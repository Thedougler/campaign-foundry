---
title: Dictation Quill
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Common.*

When you take a Magic action to set this magic quill next to Paper or Parchment and a bottle of Ink and use a command word, the quill writes your next spoken or signed words, in the language you're using, at a rate of 25 words per minute. The quill writes for 1 hour; until it has no Paper, Parchment, or Ink; or until you use another command word to stop it (no action required).

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
