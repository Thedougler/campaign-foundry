---
type: Location
kind: Settlement
summary: "Three reef-linked islets joined by stone bridges, with one navigable gap, a seized fort council and a shrine that charges every hull."
sources:
 - "archive/kalowe.md"
parent: "[[Midchain]]"
---

## At a glance

- **Size.** Three reef-linked islets, about 1,800 residents and more when the dry dock is full.
- **Ruled by.** The Chain Council sits in a seized fort and leaves the ruler's seat empty.
- **Mood.** Crowded, practical and deliberately undocumented.
- **Unsettled by.** Tribute, Crown papers and the silence around the Pearl theft.
- **Known for.** One navigable gap, stone bridges and dry docks.

> [!narration] Arrival
> Reef water rings three islets, stone bridges tying one to the next. Dry-dock masts crowd beneath the seized fort, and each hull owes the shrine at the navigable gap.

## Play

### Districts

The reef gap and shrine, bridge-linked town, dry dock and seized fort each control a part of arrival.

### Services

Pilots, repairs, dry-dock work and a practical free-port passage through the gap.

### Factions here

The Chain Council and Waveservant shrine share control of arrival. Local yard interests press beneath them.

### Local rules

Every hull pays the shrine. Crown papers are not the only authority at the gap.

### Rumors

The yard bell at Ashkevet still rings. The Council has raised tribute to buy silence about the Pearl theft.

## Depth

### History

After the Red Lady sank, [[Master Kyzil]] tracked current and weather through Kalowe and Calder's Tooth while searching for Crissdalynn.

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
