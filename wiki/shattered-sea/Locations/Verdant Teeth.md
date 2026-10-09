---
type: Location
kind: Region
summary: "The Grung Clans' closed island cluster: sanctioned beach trade
  outward, interiors forbidden to outsiders."
sources:
  - "archive/ssw-grung.md"
  - "archive/ssw-midchain.md"
  - "archive/collab-2026-10-04-grung-gold-caste-gods.md"
  - "archive/Episode-09-Transcript.md"
parent: "[[Midchain]]"
revealed: "Session 10"
title: ""
---

## At a glance

- **Character.** A southern Midchain cluster of rainforest islands held closed by the [[Grung Clans]], met only at the waterline.
- **Held by.** The Grung Clans.
- **Changing.** The clans' failing water power feeds a captive pipeline inland toward [[Karath]].
- **Crossing.** Outsiders meet grung through beach trade, scouting parties, or rare blue-caste traders moving farther into the [[Midchain]].
- **Danger.** Past the sand, the closed rainforest begins, and the clans treat anything beyond it as a breach.

> [!narration] Arrival
> The beach is as far as the sand goes. Traders anchor offshore and wait while blue-caste grung meet them at the waterline. Out past the treeline, rainforest closes over whatever lies inland.

## Play

### Travel

Sanctioned contact happens on the beach, and the interior takes no visitors. The clans treat the treeline as the boundary of their world.

### Places

- [[Karath]], the grung island the Wiki names directly, with its reef gaps, hatcheries and captive pens.
- [[Sparhold]], a defended lumber town at the cluster's edge. Its crews risk capture and enslavement cutting the massive Grung trees for shipbuilding.

### Encounters

1. A blue-caste trade party at the waterline.
2. A grung scouting party working the coast.
3. A [[Grung (Creature)]] patrol in the shallows.
4. A [[Grung Elite Warrior]] guarding a route inland.
5. Captives moved under guard toward Karath.
6. A gold-caste presence no one addresses directly.

### Rumors

Free grung avoid Aruhe, and compelled ones are sent there. The clans trade toxin to the Crown through intermediaries.

## Depth

### History

The clans control five rainforest islands as one closed system of canopy routes, pools, flooded cuts and beaches. Their shrinking maritime power drives the raids, toxin exports and fighting-age levy that feed the pipeline toward Karath.

### Hidden truths

The clans' colour marks give social information without proving permanent ancestry or rank. What the gold presence the sages preserve is has been decided: it is the [[Gold Caste]], mortal grung who claim godhood for themselves.

### Threads

[[Bring the Pearl of Souls to Umberlee]] intersects the clans' routes.

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
