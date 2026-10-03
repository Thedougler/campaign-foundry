---
type: Location
kind: Settlement
summary: "Calven's marsh, tidal flats and farms rise to Calveno, a canal city whose harbour flies the Dravosi flag while debt controls its politics."
sources:
 - "archive/calven-and-calveno.md"
 - "archive/ssw-il-palio-delle-voci.md"
parent: "[[Crown Islands]]"
---

## At a glance

- **Size.** Marshes and tidal flats, a middle plateau and one city on solid ground.
- **Ruled by.** Dravosi Crown harbour authority alongside the Seven Houses Council.
- **Mood.** Commercial, watched and shaped by debt.
- **Unsettled by.** Crown inspection, Concordat credit and Passage routes below.
- **Known for.** Canals, bridges, harbour flags and records.

> [!narration] Arrival
> Marsh and tidal flats run up to farms on a middle plateau, then to one city on the only solid ground. The canals serve as streets. Pale four- and five-storey buildings line the harbour.

## Play

### Districts

Calveno's canals and bridges include [[Le Paludi]] and the Velo Quarter. Each year the Palio stages rise on the Mercatura plaza, across the Velo Quarter bridges and on the [[Le Paludi]] dock ([[Il Palio delle Voci Contese]]). The far harbour has an unmarked pale building where someone watches arrivals.

### Services

Harbour ratings, trade, credit, canals and discreet routes below the city. [[The Ponte Bassa]] keeps ship memory. [[The Cabinet of Morsani]] sells rare objects.

### Factions here

[[Dravosi Crown]], [[Tessarine Concordat]], Seven Houses Council, Passage and Rattkin communities.

### Local rules

A harbour paper can conflict with a Tessarine credit record. Either can close a gate. Water is the street.

### Rumors

Crown toxin substitute stock appeared in the sewers. Rattkin have occupied old drains longer than either colonial power.

## Depth

### History

Calven is older and wetter. Calveno harbour flies the Dravosi flag while merchant families retain influence through debt and credit.

### Hidden truths

The Crown inspects while the Concordat invoices. Both pay Umberlee as infrastructure, and the pale harbour building may expose an unresolved issue involving Tessarine interests.

### Threads

[[The Crown Inspection]], [[Perrin and Nona]], and [[Simone's Hunters]].

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
