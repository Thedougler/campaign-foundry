---
type: Location
kind: Site
summary: "A broken structure east of the Drowned Maw, structurally unstable and still subsiding."
sources:
 - "archive/ssw-outer-reach.md"
 - "archive/ssw-umberlee.md"
parent: "[[Outer Reach]]"
---

## At a glance

- **Draws the Party because.** It is the one fixed structure east of the [[Drowned Maw]], and eastbound pilots still use it for a mark.
- **Danger.** It is structurally unstable and still subsiding.

> [!narration] Entering
> Broken stone stands in a ring at the waterline ahead, sitting lower in the water than the last pilot's account of it. The ring gives you your mark for the leg ahead.

## Play

### Hazards

The structure is unstable and still subsiding. Keep to the boat beside it.

## Depth

### History

Salvage crews cut fresh depth marks into it each season, and the marks sit lower every year. The [[The Tithe of the Bitch Queen|Tithe of the Bitch Queen]] lies scattered across the seafloor around it.

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
