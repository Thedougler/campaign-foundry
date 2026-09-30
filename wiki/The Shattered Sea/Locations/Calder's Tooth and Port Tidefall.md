---
type: Location
kind: Settlement
summary: "A cliff-tier fortress-port whose docks, trade shelf and Crestwall guns watch the far side Strait."
sources:
 - "archive/calders-tooth-and-port-tidefall.md"
parent: "[[Crown Islands]]"
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

The docks, Shelf, Crestwall, inspection pier and eastern harbour are distinct pressures. The Marrow ridge, mudflats and smaller villages sit beyond the port.

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

Calder's Tooth is limestone and basalt at the far side mouth of the central strait. The east side slopes to mudflats and mangroves.

### Hidden truths

Sealed Crestwall orders and the fort vaults are separate Crown secrets. The Tessarine house applies pressure through credit, legal paper and mail.

### Threads

[[Drowned Maw Awakening]], [[The Crown Inspection]], and [[Bring the Pearl of Souls to Umberlee]].

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
