---
type: Location
kind: Region
summary: "An island chain whose name is geographic: the Dravosi Crown and the
  Tessarine Concordat hold separate harbours across it, and trade credit and old
  routes meet between them."
sources:
  - "archive/calven-and-calveno.md"
  - "archive/high-eyrie.md"
  - "archive/calders-tooth-and-port-tidefall.md"
  - "archive/ssw-galewall.md"
  - "archive/ssw-verdant-scatter.md"
  - "archive/collab-2026-10-04-calveno-and-rattkin-bounty.md"
parent: ""
revealed: "Backstory"
title: "Crown Islands"
---

## At a glance

- **Character.** Five larger, mountainous islands of canals, cliffs, forested highlands and watched sea lanes.
- **Held by.** [[calders-tooth-and-port-tidefall|Port Tidefall]] and other harbours fly the [[dravosi-crown|Dravosi Crown]]'s flag, and [[calven-and-calveno|Calven and Calveno]] flies the [[tessarine-concordat|Tessarine Concordat]]'s colours. The name is geographic rather than a deed.
- **Changing.** Admiralty orders and Drowned Maw staging increase pressure.
- **Crossing.** Use harbours and pilots, but expect inspection or credit claims.
- **Danger.** Crown secrecy, reefs, cliffs and the Maw's changing water.

> [!narration] Arrival
> Pale buildings and cliff guns rise from water cut by canals and reefs. Flags tell you who claims the harbour. Ledgers tell you who actually controls it.

## Play

### Travel

[[calven-and-calveno|Calven and Calveno]] and [[calders-tooth-and-port-tidefall|Calder's Tooth and Port Tidefall]] are established harbour nodes. [[high-eyrie|High Eyrie]] lies beyond the eastern chain. The southern coasts face the [[central-strait|Central Strait]], where [[harwick|Harwick]]'s yard and the deep-water Reach form the Crown's strongest regional foothold.

### Places

- [[calven-and-calveno|Calven and Calveno]]
- [[calders-tooth-and-port-tidefall|Calder's Tooth and Port Tidefall]]
- [[high-eyrie|High Eyrie]]

### Encounters

1. A Crown party checks the ship's papers.
2. A Tessarine courier carries sealed mail.
3. A pilot offers a safer channel for a price.
4. A clerk compares harbour and credit records.
5. A Sentinel watches the Maw.
6. A ship runs before an Admiralty order.

### Rumors

A Crown harbour inspects, and a Concordat harbour invoices. Both collect from the same fishermen.

Every port shrine on the western side keeps a board with names on it for the [[galewall|Galewall]] crossing's lost.

## Depth

### History

Calven's old marshes and Calveno's harbour outlast the flags placed over them. The Sentinels have watched the Maw since 1295 DR.

### Hidden truths

The Crown keeps Fort Crestwall's sealed orders and its vaults to itself, away from every other flag on the chain. Harbour papers can conflict with Tessarine credit records.

### Threads

The Sentinels' watch since 1295 DR keeps the [[drowned-maw-awakening|Drowned Maw Awakening]] in sight. Conflicting harbour papers and credit ledgers pull the chain into [[the-crown-inspection|The Crown Inspection]], and [[bring-the-pearl-of-souls-to-umberlee|Bring the Pearl of Souls to Umberlee]] trails the Party into every harbour it enters.

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
