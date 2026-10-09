---
type: Vehicle
summary: "A deep-water flagship of the water east of the Drowned Maw and the
  Galewall's recovery lanes; its crew is not established."
sources:
  - "archive/ssw-outer-reach.md"
  - "archive/ssw-galewall.md"
  - "archive/ssw-central-strait.md"
revealed: ""
title: "Velvet Noose"
---

## At a glance

- **Kind.** A deep-water flagship, large enough that weather-beaten convoys negotiate before their guns are dry.
- **Size.** Unknown.
- **Speed.** Unknown.
- **Crew.** Unknown.
- **Captain.** Unknown.
- **Berth.** Unknown.

> [!narration] First sight
> Ask after the Velvet Noose and harbour voices drop. The answer always concerns another crew's hull.

## Play

### Underway

It works the water beyond the last chart, and the ships that meet it were already wounded. It appears among the [[outer-reach|Outer Reach]]'s known threats beside the deliberate crews of the eastern water.

The [[galewall|Galewall]] gave it a second hunting ground: the recovery lanes, where a crossing survivor is damaged, short-handed, and grateful for any sail that looks helpful. There, a weather-beaten convoy negotiates before its guns are dry. A report of it anywhere near the [[central-strait|Central Strait]] consolidates the convoys and rewrites the Crown patrol schedule by evening.

## Depth

### Hidden truths

Runners on the eastern road say the Velvet Noose takes only ships that are already hurt.

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
