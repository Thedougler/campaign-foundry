---
type: Location
kind: Site
summary: "Umberlee's old shrine on Vel-Orn, cut into black stone off every
  colonial chart, keeper of drowned names and water-debts."
sources:
  - "archive/ssw-umberlee-shrine.md"
  - "archive/ssw-campaign-timeline.md"
parent: "[[vel-orn|Vel-Orn]]"
aliases:
  - "Umberlee Shrine — Sunken Crown"
  - "Umberlee's Hidden Shrine"
  - "Vel-Orn Shrine"
  - "Blue Shrine"
revealed: "Backstory"
title: "Umberlee's Shrine"
---

## At a glance

- **Draws the Party because.** The theft that sank [[fisks-fleet|Fisk's Fleet]] took the [[pearl-of-souls|Pearl of Souls]] from its deepest chamber, and [[bring-the-pearl-of-souls-to-umberlee|the debt behind it]] runs back here.
- **Entrance.** A tide-worn mouth in the cliff face of [[vel-orn|Vel-Orn]], found by guide or prior knowledge.
- **Danger.** The reef approach punishes a careless landing, and the shrine's business leans toward the drowned.

> [!narration] Entering
> Kelp parts around the black opening in the rock, a doorway worn smooth where the tide has worked it for generations. Candles burn inside, past wind that should have killed them. Your footsteps go quiet on the stone, and the first ledger names wait in the chamber beyond, each tied to its token.

## Play

### Areas

The passage runs in past kelp-wrapped pillars to the ledger chamber, where names wait beside their tokens: coins, fish bones, carved shells, and bits of ship or sailor kept as witness. Deeper still lies the deepest chamber, holding a tidal pool built to the Pearl's requirements.

### Hazards

The approach is the island's own hazard, sheer and reef-bound, off every colonial chart. Inside, sound softens, footsteps with it.

## Depth

### History

The shrine is older than the harbour collection and quieter in its work, marking debts and keeping drowned names, and the older worship of the [[blue-hole|Blue Hole]] is preserved here. On Day -6 of 1495 DR [[fisks-fleet|Fisk's Fleet]] stole the [[pearl-of-souls|Pearl of Souls]] from the deepest chamber without alerting the [[waveservants|Waveservants]], and Umberlee's answer sank all five ships over the [[drowned-maw|Drowned Maw]].

### Hidden truths

- The Pearl rested in the deepest chamber, over a tidal pool built to its requirements. Since the theft, the shrine's blessing over the [[sunken-crown|Sunken Crown]] has been failing.
- Near this shrine, [[stripes-bitemore|Stripes Bitemore]] feels a guiding pull toward it. [[delmar-fisk|Delmar Fisk]] gets dread in the same water instead.
- [[keth-naar|Keth-Naar]] uses the shrine to petition [[umberlee|Umberlee]] for terms, a channel compromised without the Pearl.

### Threads

- [[bring-the-pearl-of-souls-to-umberlee|Bring the Pearl of Souls to Umberlee]]

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
