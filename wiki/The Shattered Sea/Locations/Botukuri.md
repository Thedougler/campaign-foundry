---
type: Location
kind: Settlement
summary: "A Grung settlement of the clans and the birthplace of Jean-Claude Tabarnack, the blue-caste fugitive."
sources:
 - "archive/ssw-grung.md"
 - "archive/jean-claude-tabarnack.md"
parent: ""
---

## At a glance

- **People.** Grung of the [[Grung Clans]], colour-sorted into castes.
- **Known for.** Birthplace of [[Jean-Claude Tabarnack]], born blue caste.
- **Unsettled by.** The flight of a born son his own family chases through [[Simone's Hunters]].

> [!narration] Arrival
> You come to a settlement of the [[Grung Clans]], where colour sets every grung's work and word. [[Jean-Claude Tabarnack]] was born within it, a blue-caste child. He freed slaves and ran when the reprisal took [[Pell]]. The family he left still sends its hunters, and his sister [[Simone Tabarnack]] commands them.

## Play

The table knows Botukuri only through its runaway son and the hunters on his trail.

## Depth

The record holds little of the place itself. Its story so far is the flight of a son and the hunters his sister sends.

## Links

```base
filters:
  and:
    - file.hasLink(this.file)
views:
  - type: table
    name: Contains
    filters:
      and:
        - parent == this
    groupBy:
      property: note.kind
      direction: ASC
    order:
      - file.name
      - note.summary
  - type: table
    name: Linked from
    filters:
      and:
        - parent != this
    groupBy:
      property: note.type
      direction: ASC
    order:
      - file.name
      - note.summary
```
