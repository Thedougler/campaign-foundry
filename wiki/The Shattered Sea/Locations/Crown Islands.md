---
type: Location
kind: Region
summary: "The Crown-controlled island chain where harbour authority, trade credit and old routes meet."
sources:
 - "archive/calven-and-calveno.md"
 - "archive/high-eyrie.md"
 - "archive/calders-tooth-and-port-tidefall.md"
 - "archive/ssw-galewall.md"
 - "archive/ssw-verdant-scatter.md"
parent: ""
---

## At a glance

- **Character.** Five larger, mountainous islands of canals, cliffs, forested highlands and watched sea lanes.
- **Held by.** The Dravosi Crown, Tessarine Concordat and local authorities.
- **Changing.** Admiralty orders and Drowned Maw staging increase pressure.
- **Crossing.** Use harbours and pilots, but expect inspection or credit claims.
- **Danger.** Crown secrecy, reefs, cliffs and the Maw's changing water.

> [!narration] Arrival
> Pale buildings and cliff guns rise from water cut by canals and reefs. Flags tell you who claims the harbour. Ledgers tell you who actually controls it.

## Play

### Travel

[[Calven and Calveno]] and [[Calder's Tooth and Port Tidefall]] are established harbour nodes. [[High Eyrie]] lies beyond the eastern chain. The southern coasts face the [[Central Strait]], where [[Harwick]]'s yard and the deep-water Reach hold the Crown's strongest regional foothold.

### Places worth reaching

- [[Calven and Calveno]]
- [[Calder's Tooth and Port Tidefall]]
- [[High Eyrie]]

### Encounters

1. A Crown party checks the ship's papers.
2. A Tessarine courier carries sealed mail.
3. A pilot offers a safer channel for a price.
4. A clerk compares harbour and credit records.
5. A Sentinel watches the Maw.
6. A ship runs before an Admiralty order.

### Rumors

The Crown inspects while the Concordat invoices. Both collect from the same fishermen.

Every port shrine on the western side keeps a board with names on it for the [[Galewall]] crossing's lost.

## Depth

### History

Calven's old marshes and Calveno's harbour outlast the flags placed over them. The Sentinels have watched the Maw since 1295 DR.

### Hidden truths

Sealed Crestwall orders and the fort vaults are separate Crown secrets. Harbour papers can conflict with Tessarine credit records.

### Threads

The Sentinels' watch since 1295 DR keeps the [[Drowned Maw Awakening]] in sight. Conflicting harbour papers and credit ledgers pull the chain into [[The Crown Inspection]], and [[Bring the Pearl of Souls to Umberlee]] trails the Party into every harbour it enters.

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
