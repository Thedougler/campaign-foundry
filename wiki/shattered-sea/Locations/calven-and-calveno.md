---
type: Location
kind: Settlement
summary: "Calven's marsh, tidal flats and farms rise to Calveno, a neutral canal
  city the Tessarine Concordat primarily controls, where Crown law stops at the
  waterline."
sources:
  - "archive/calven-and-calveno.md"
  - "archive/ssw-il-palio-delle-voci.md"
  - "archive/collab-2026-10-04-calveno-and-rattkin-bounty.md"
  - "archive/Episode-09-Transcript.md"
parent: "[[crown-islands|Crown Islands]]"
revealed: "Backstory"
title: "Calven and Calveno"
---

## At a glance

- **Size.** Marshes and tidal flats, a middle plateau and one city on solid ground.
- **Ruled by.** The [[tessarine-concordat|Tessarine Concordat]] alongside the Seven Houses Council. Calveno is neutral ground under Tessarine control.
- **Mood.** Commercial, watched and shaped by debt.
- **Unsettled by.** Concordat credit, [[passage|Passage]] routes below, and Crown sailors ashore between resupply and shore leave.
- **Known for.** Canals, bridges, harbour flags and records.

> [!narration] Arrival
> Marsh and tidal flats run up to farms on a middle plateau, then to one city on the only solid ground. The canals serve as streets. Pale four- and five-storey buildings line the harbour.

## Play

### Districts

Calveno's canals and bridges include [[le-paludi|Le Paludi]] and the Velo Quarter. Each year the Palio stages rise on the Mercatura plaza, across the Velo Quarter bridges and on the [[le-paludi|Le Paludi]] dock ([[il-palio-delle-voci-contese|Il Palio delle Voci Contese]]). The far harbour has an unmarked pale building where someone watches arrivals.

### Services

Harbour ratings, trade, credit, canals and discreet routes below the city. [[the-ponte-bassa|The Ponte Bassa]] keeps ship memory. [[the-cabinet-of-morsani|The Cabinet of Morsani]] sells rare objects.

### Factions here

[[tessarine-concordat|Tessarine Concordat]], [[seven-houses-council|Seven Houses Council]], [[passage|Passage]] and Rattkin communities. Dravosi naval officers still come to Calveno to resupply and take shore leave, and they do it as visitors under Tessarine rules.

### Local rules

A harbour paper can conflict with a Tessarine credit record. Either can close a gate. Water is the street.

### Rumors

Crown toxin substitute stock appeared in the sewers. Rattkin have occupied old drains longer than either colonial power. Crews leaving the harbour say there is a shrine in the city for paying the sea toll that [[umberlee|Umberlee]] asks of every keel.

## Depth

### History

Calven is older and wetter. Calveno is a neutral port under the Concordat's control, and merchant families keep their influence through debt and credit.

#### Session 9: the incident draws the Crown back

After the incident in the city, the Crown dispatched the [[hcs-ordinance|HCS Ordinance]] to hunt [[shepherd-grigori|Shepherd Grigori]], believing the aberration had been dropped somewhere in Calveno ([[grigori-and-the-crown-hunt|Grigori and the Crown hunt]]). [[aleksander-malone|Aleksander Malone]] said as much when his boarding party came across the deck of the [[uncertainty|Uncertainty]], and the warship turned back for Calveno once its inspection ended. [[nona-black-jaw|Nona Black-Jaw]] had warning of the approach by sending stone and asked whether the Crown meant to occupy the harbour. [[perrin-and-nona|Perrin and Nona]] carries the exchange.

### Hidden truths

The Concordat invoices a port with no Crown authority to inspect it. Crown sailors and Concordat clerks alike pay Umberlee as infrastructure, and the pale harbour building may expose an unresolved issue involving Tessarine interests.

### Threads

[[the-crown-inspection|The Crown Inspection]], [[perrin-and-nona|Perrin and Nona]], and [[simones-hunters|Simone's Hunters]].

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
