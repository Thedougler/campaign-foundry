---
type: Location
kind: Site
summary: "A small reef-bound island in the ring around the Blue Hole, with
  Umberlee's hidden shrine cut into its cliff."
sources:
  - "archive/ssw-umberlee-shrine.md"
  - "archive/ssw-campaign-timeline.md"
parent: "[[outer-reach|Outer Reach]]"
revealed: "Backstory"
title: "Vel-Orn"
---

## At a glance

- **Draws the Party because.** It is one of five small islands ringing the [[blue-hole|Blue Hole]], and [[umberlees-shrine|Umberlee's Shrine]] is cut into its cliff.
- **Danger.** The approach is sheer and reef-bound, hard on casual landings.

> [!narration] Entering
> Sheer black rock stands over a reef that guards every obvious line in, and the swell works the stone all day. Land behind a guide who knows the one workable approach.

## Play

### Hazards

The reef blocks each obvious approach. Bring a pilot who knows the island, and land where they say.

## Depth

### History

An unknown contractor engaged the [[chain-council|Chain Council]] in 1495 DR to assemble [[fisks-fleet|Fisk's Fleet]] against the shrine in this cliff. The theft succeeded on Day -6 without alerting the [[waveservants|Waveservants]], and the [[pearl-of-souls|Pearl of Souls]] departed aboard the Red Lady. In the days before, [[stripes-bitemore|Stripes Bitemore]] was on the island while his people watched the seas turn wrong.

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
