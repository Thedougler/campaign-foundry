---
type: Location
kind: Site
summary: "A stop on the Midchain run where a yard bell rings from shore and the
  hand behind it has never shown itself."
sources:
  - "archive/kalowe.md"
  - "archive/agentic-co-dm-Midchain.md"
parent: "[[midchain|Midchain]]"
revealed: ""
title: "Ashkevet"
---

> [!narration] Entering
> Your boat finds the landing and the sound comes across the water again, a yard bell rung in steady strokes behind the rooftops. The landing shows empty stone, and the ringing goes on at its own pace while you look for the rope.

## Areas

The Party can come ashore to find what rings the yard bell. Ashkevet lies near [[kalowe|Kalowe]] in the western [[midchain|Midchain]]. Bare stone forms the landing, with rooftops beyond it and the bell sounding from somewhere behind them.

At the landing: ==The bell carries over the water, stroke after stroke. No one stands on the stone landing.== Whoever rings it has never shown themselves, and the danger ashore remains unknown. Following the sound is the only established lead.

## Likely actions

Find the bell's rope or whatever swings it.

## History

The unexplained ringing is Ashkevet's only reported history.

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
