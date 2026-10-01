---
type: Location
kind: Site
summary: "Aruhe's one known sea approach: a reef half a mile offshore with a boat gap, short shingle beach and Uncertainty waiting beyond."
sources:
  - "archive/western-landing.md"
parent: "[[Aruhe]]"
---

![[Western Landing - Battle Map.jpg]]

![[Western Landing - Battle Map Alternative.jpg]]

## At a glance

- **Draws the Party because.** It is the only usable boat gap and route inland.
- **Entrance.** The reef gap at the western coast.
- **Occupants.** Reef-Skulls, giant crabs, giant sharks and Bloodhawks.
- **Danger.** Tide, surf, reef creatures, [[Grubnade]]s and Spiritpollen.
- **Prize.** A route to [[Old Gardens]] and a way back to [[Uncertainty]].

> [!narration] Entering
> Jagged coral teeth ring a short grey shingle beach. One gap opens for a boat. A stream comes down beneath wet leaves, with clear plums and heavy guavas at the inland edge.

## Play

### Areas

Reef gap, shingle, stream, fruit shade and inland slope.

### Hazards

Perception and Survival read the gap and tide. Water Vehicles piloting fails into delay. Grubnade and Spiritpollen punish careless disturbance.

### Occupants

Reef-Skulls, giant crabs, giant sharks and [[Bloodhawk]]s.

### Likely actions

Watch offshore, pilot in, mark the route, forage fallen fruit or retreat before tide and claims change the exit.

## Depth

### History

The reef gap is the known entry point after the Calveno raid's wrecks. The Uncertainty remains offshore.

### Hidden truths

The southern mangrove wall marks the coast. [[Taking on Aruhe]] treats a living reef creature as a claim.

### Threads

[[Taking on Aruhe]] and [[Perrin and Nona]].

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
