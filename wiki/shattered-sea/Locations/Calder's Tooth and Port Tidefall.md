---
type: Location
kind: Settlement
summary: "A cliff-tier fortress-port whose docks, trade shelf and Crestwall guns
  watch the far side Strait."
sources:
  - "archive/calders-tooth-and-port-tidefall.md"
  - "archive/ssw-tessarine-trade-house.md"
parent: "[[Crown Islands]]"
revealed: ""
title: ""
---

## At a glance

- **Size.** Docks below a trade shelf and Fort Crestwall on the cliff crown.
- **Ruled by.** Governor Voss shares the harbour with Admiralty authority.
- **Mood.** Inspected, commercial and divided by sealed orders.
- **Unsettled by.** Maw staging and companies arriving under orders the Governor has not seen.
- **Known for.** Inspection Pier, Tessarine trade, salvage and cliff guns.

> [!narration] Arrival
> Cliff tiers descend from guns on the crown past a trade shelf to docks at the water. An inspection pier stands in the approach, and black nooses hang over the gate.

## Play

### Districts

The docks, Shelf, Crestwall, inspection pier and eastern harbour are distinct pressures. The Marrow ridge, mudflats and smaller villages lie beyond the port.

### Services

Charts, trade, salvage, sealed mail, pilots and repairs are available under paperwork and credit.

### Factions here

Governor Voss, the Crown Admiralty and Tessarine Concordat compete without sharing every order.

### Local rules

Every ship stops at the Inspection Pier and shows papers. A Tessarine bonded hold can be protected by treaty.

### Rumors

Extra companies and reef-diving gear are staged for the [[Drowned Maw]], but the Governor has not been told why.

## Depth

### History

Calder's Tooth is limestone and basalt at the far side mouth of the [[Central Strait]]. The east side slopes to mudflats and mangroves.

### Hidden truths

Orders arrive at Fort Crestwall sealed, and they stay Crown secrets even from Governor Voss. The fort's vaults keep a second secret of their own. The [[Tessarine Trade House|Tessarine house]] applies pressure through credit, legal paper and mail.

### Threads

The [[Drowned Maw Awakening]]'s staging grows beyond what the Governor has been told. Papers at the Inspection Pier drive [[The Crown Inspection]]. [[Bring the Pearl of Souls to Umberlee]] carries Umberlee's price into these waters.

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
