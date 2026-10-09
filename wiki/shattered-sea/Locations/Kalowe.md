---
type: Location
kind: Settlement
summary: "Three reef-linked islets joined by stone bridges, with one navigable
  gap, a seized fort council and a shrine that charges every hull."
sources:
  - "archive/kalowe.md"
  - "archive/ssw-midchain.md"
  - "archive/Episode-09-Transcript.md"
parent: "[[Midchain]]"
revealed: "Session 9"
title: ""
---

## At a glance

- **Size.** Three reef-linked islets, about 1,800 residents and more when the dry dock is full.
- **Ruled by.** The [[Chain Council]] governs from a seized fort and leaves the ruler's seat empty.
- **Mood.** Crowded, practical and deliberately undocumented.
- **Unsettled by.** Tribute, Crown papers and the silence around the Pearl theft.
- **Known for.** The Midchain's primary settlement and repair harbour, with one navigable gap, stone bridges and dry docks.

> [!narration] Arrival
> Reef water rings three islets, stone bridges tying one to the next. Dry-dock masts crowd beneath the seized fort, and each hull owes the shrine at the navigable gap.

## Play

### Districts

The reef gap and shrine, bridge-linked town, dry dock and seized fort each control a part of arrival.

### Services

Pilots, repairs, dry-dock work and free-port passage through the gap. Unregistered vessels find work here that outsiders have trouble locating.

### Factions here

The [[Chain Council]] and Waveservant shrine share control of arrival. Local yard interests press beneath them.

### Local rules

Every hull pays the shrine. Crown papers are not the only authority at the gap.

### Rumors

The yard bell at [[Ashkevet]] still rings. The Council has raised tribute to buy silence about the Pearl theft.

## Depth

### History

After the [[Red Lady]] sank, [[Master Kyzil]] tracked current and weather through Kalowe and Calder's Tooth while searching for Crissdalynn.

#### Session 9: a heading on the chart

Leaving [[Calven and Calveno|Calveno]], [[Geoffrey Draves]] marked Kalowe to the southwest as a major city. He estimated that sailing there would take a day or two longer than sailing to [[Sparhold]].

### Hidden truths

Kalowe's free-port posture is practical, not powerless: pilots, Council and shrine each control a different part of arrival.

### Threads

[[Bring the Pearl of Souls to Umberlee]] and [[Drowned Maw Awakening]].

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
