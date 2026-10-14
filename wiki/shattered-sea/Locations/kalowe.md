---
type: Location
kind: Settlement
summary: "Three reef-linked islets joined by stone bridges, with one navigable
  gap, a seized fort council and a shrine that charges every hull."
sources:
  - "archive/kalowe.md"
  - "archive/ssw-midchain.md"
  - "archive/Episode-09-Transcript.md"
  - "archive/collab-2026-10-13-moucheron-original.md"
parent: "[[midchain|Midchain]]"
revealed: "Session 9"
title: "Kalowe"
---

![[kalowe-banner.webp]]

> [!narration] Arrival
> Reef water rings three islets, stone bridges tying one to the next. Dry-dock masts crowd beneath the seized fort, and each hull owes the shrine at the navigable gap.

## Districts

About 1,800 people live across Kalowe's three reef-linked islets, with more when the dry dock is full. The Midchain's main settlement and repair harbour is crowded, practical and deliberately undocumented. Tribute and Crown papers trouble it alongside silence about the Pearl theft. Stone bridges connect the town. The reef gap and shrine, dry dock and seized fort each control a part of arrival. Within the fort, the Chain Council meets with an empty ruler's seat.

## Services

Pilots, repairs, dry-dock work and free-port passage through the gap. Unregistered vessels find work here that outsiders have trouble locating.

[[reweti-kahurangi|Reweti Kahurangi]] at [[the-flat-water|the Flat Water]] passes job enquiries on to the [[five-blades|Five Blades]]. Other factors who know to ask can reach the company too. [[moucheron|Moucheron]] mercenaries state their blood payment before signing, including on jobs without a fight.

## Factions here

The [[chain-council|Chain Council]] and Waveservant shrine share control of arrival. Local yard interests press beneath them.

The Five Blades hire out as intact squads of four. They are commonly counted among the Sea's greatest fighting forces. Steady contracts make these Moucherons patient without making them tame.

## Local rules

Every hull pays the shrine. Crown papers are not the only authority at the gap.

## Rumors

The yard bell at [[ashkevet|Ashkevet]] still rings. The Council has raised tribute to buy silence about the Pearl theft.

## History

After the [[red-lady|Red Lady]] sank, [[master-kyzil|Master Kyzil]] tracked current and weather through Kalowe and Calder's Tooth while searching for Crissdalynn.

### Session 9: a heading on the chart

Leaving [[calven-and-calveno|Calveno]], [[geoffrey-draves|Geoffrey Draves]] marked Kalowe to the southwest as a major city. He estimated that sailing there would take a day or two longer than sailing to [[sparhold|Sparhold]].

## Hidden truths

Kalowe's free-port posture is practical, not powerless: pilots, Council and shrine each control a different part of arrival.

## Threads

[[bring-the-pearl-of-souls-to-umberlee|Bring the Pearl of Souls to Umberlee]] and [[drowned-maw-awakening|Drowned Maw Awakening]].

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
