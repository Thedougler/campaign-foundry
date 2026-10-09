---
type: Location
kind: Site
summary: "A curiosity shop where the sea's oddities are bought, sold, and appraised."
sources:
  - "archive/ssw-whip-shark-barb.md"
parent: "[[The Shattered Sea]]"
revealed: ""
title: ""
---

## At a glance

- **Draws the Party because.** The [[Whip-Shark Barb]] sits here under appraisal.
- **Entrance.** None recorded.
- **Occupants.** [[Catalina Curio]].
- **Danger.** None recorded.
- **Prize.** Whatever her appraisal names for the [[Whip-Shark Barb]], a valuation or a use.

> [!narration] Entering
> Lamp oil and old brine hang in the air. The one showpiece is a serrated bone spike laid out on cloth, and [[Catalina Curio]] looks up from it and beckons you toward the counter.

## Play

### Areas

The [[Whip-Shark Barb]] rests on the counter, laid out under [[Catalina Curio]]'s lamp.

### Hazards

None are recorded.

### Occupants

- [[Catalina Curio]].

### Likely actions

Ask after the [[Whip-Shark Barb]]'s appraisal, or offer her something else the sea brought in.

## Depth

### History

[[Delmar Fisk]] brought the [[Whip-Shark Barb]] here for appraisal after the crew killed the whip-shark.

### Hidden truths

None are recorded.

### Threads

None are recorded.

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
