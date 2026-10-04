---
type: NPC
summary: "A tribesman who was on Vel-Orn as the seas turned wrong, and feels a guiding pull from the shrine water."
sources:
 - "archive/ssw-campaign-timeline.md"
 - "archive/ssw-umberlee-shrine.md"
creature: ""
---

## At a glance

- **Role.** His people's eyes on [[Vel-Orn]] while the seas turned wrong.
- **Found at.** [[Vel-Orn]], and the water near [[Umberlee's Shrine]].

> [!narration] First look
> Stripes Bitemore stands on the rocks above the landing, and his weight leans toward the black cliff before the rest of him decides. A pull comes off the shrine water and his whole body follows it, while dread finds Delmar in the same swell.

## Play

- **Opens them up.** The seas turning wrong around his people.
- **Will share.** The pull the shrine water gives him.

## Depth

### History

In the days before the Pearl theft he was on [[Vel-Orn]] while his people watched the seas turn wrong.

### Hidden truths

The shrine water gives him a guiding pull toward [[Umberlee's Shrine]], while [[Delmar Fisk]] gets dread in the same water instead.

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
