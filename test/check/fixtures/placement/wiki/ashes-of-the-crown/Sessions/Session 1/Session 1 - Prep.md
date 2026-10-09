---
type: Prep
summary: "One line."
sources: []
date: ""
revealed: ""
title: "Session 1 - Prep"
---

## At a glance

- **Session question.** Text.
- **Party at.** Text.
- **Length.** Text.
- **Threads in play.** Text.

## Scene Chart

| #   | Scene | Kind | Minutes | Threads |
| --- | ----- | ---- | ------- | ------- |
| 1   |       | Hook |         |         |

## Threads

Text.

## Opposition

Text.

## Clues

| Clue | Found in |
| ---- | -------------- |
|      |                |

## Links

```base
filters:
  and:
    - file.inFolder(this.file.folder)
views:
  - type: table
    name: Scenes
    filters:
      and:
        - 'note.type == "Scene"'
    groupBy:
      property: note.kind
      direction: ASC
    order:
      - file.name
      - note.summary
  - type: table
    name: Handouts
    filters:
      and:
        - 'note.type == "Handout"'
    order:
      - file.name
      - note.summary
```
