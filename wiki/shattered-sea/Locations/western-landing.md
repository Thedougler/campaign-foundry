---
type: Location
kind: Site
summary: "Aruhe's one known sea approach: a reef half a mile offshore with a
  boat gap, short shingle beach and Uncertainty waiting beyond."
sources:
  - "archive/western-landing.md"
  - "archive/agentic-co-dm-Aruhe-Hungry-Isle.md"
  - "archive/session-10.md"
parent: "[[aruhe|Aruhe]]"
revealed: "Session 10"
title: "Western Landing"
---

![[Western Landing - Battle Map.jpg]]

![[Western Landing - Battle Map Alternative.jpg]]

## At a glance

- **Draws the Party because.** It is the only usable boat gap and route inland.
- **Entrance.** The reef gap at the western coast.
- **Occupants.** Reef-Skulls, giant crabs, giant sharks and Bloodhawks.
- **Danger.** Tide, surf, reef creatures, [[grubnade|Grubnade]] and Spiritpollen.
- **Prize.** A route to [[old-gardens|Old Gardens]] and a way back to [[uncertainty|Uncertainty]].

> [!narration] Entering
> Jagged coral teeth ring a short grey shingle beach. One gap opens for a boat. A stream comes down beneath wet leaves, with clear plums and heavy guavas at the inland edge.

## Play

### Areas

Reef gap, shingle, stream, fruit shade and inland slope.

### Hazards

Perception and Survival read the gap and tide. The water in the gap is deceptively shallow, probably the reason other boats came to grief here. Water Vehicles piloting fails into delay. Grubnade and Spiritpollen punish careless disturbance.

### Occupants

Reef-Skulls, giant crabs, giant sharks and [[bloodhawk|Bloodhawk]]s.

### Likely actions

Watch offshore, pilot in, mark the route, forage fallen fruit or retreat before tide and claims change the exit.

## Depth

### History

The reef gap is the known entry point after the Calveno raid's wrecks. The Uncertainty remains offshore. The broken [[vethka|Vethka]] hull above the tideline sheltered the beach's last two castaways, [[sandro|Sandro]] and [[nino|Nino]], until Session 10 flew them out to the ship. Before that, their signal fires marked the gap.

#### Session 10: the gap threaded and the castaways flown

Delmar Fisk threaded [[uncertainty|Uncertainty]] through the gap on a save of 24 against a DC 14, and brought her to a stop sixty feet off the sand with sails ready and no anchor down. A campfire burned on the sand, and two castaways waved for rescue. The shattered hulls of at least five [[vethka|Vethka]] vessels lay strewn behind them. Dog-sized crabs wearing human and grung skulls trailed the ship offshore, harmless while she stood off. Delmar and [[crissdalynn-khinriss|Crissdalynn]] flew the two castaways out to the ship. Aboard, [[sandro|Sandro]] and [[nino|Nino]] told of the raid that wrecked them and of [[tomo|Tomo]]'s death. Some survivors went inland toward the terraces, and none were seen again. Footprints led from the landing into the jungle and toward the grassy plain.

### Hidden truths

The southern mangrove wall marks the coast. [[taking-on-aruhe|Taking on Aruhe]] treats a living reef creature as a claim.

### Threads

A living reef claim and the island's only boat gap bind this shore to [[taking-on-aruhe|Taking on Aruhe]] and [[perrin-and-nona|Perrin and Nona]].

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
