---
type: Location
kind: Region
summary: "An under-charted island chain in the Outer Reach, likely held under an
  ancient blue dragon's sphere of control even when no sighting occurs."
sources:
  - "archive/ssw-outer-reach.md"
parent: "[[Outer Reach]]"
revealed: ""
title: ""
---

## At a glance

- **Character.** An under-charted island chain.
- **Held by.** Unknown. The isles are probably under an ancient blue dragon's sphere of control, even when no direct sighting occurs.
- **Danger.** The same sphere, and charts that cannot be trusted.

> [!narration] Arrival
> Islands rise ahead where your chart shows open water. Set a second chart beside the first and the two chains do not match. Between the isles you meet no traffic.

## Play

### Travel

The chain is under-charted, and no two charts agree on it. The sphere over the isles persists whether or not a sighting comes, so route by the pilot's road and give the chain its distance.

## Depth

### Hidden truths

Some hulls pass the chain untouched. Others do not, and a pattern that has lasted this long stopped being luck long ago.

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
