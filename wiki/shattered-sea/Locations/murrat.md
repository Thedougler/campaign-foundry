---
type: Location
kind: Region
summary: "A lethal Midchain reef whose billions of Moucherons swarm ships within half a mile of shore."
sources:
  - "archive/murrat.md"
  - "archive/ssw-midchain.md"
  - "archive/collab-2026-10-13-moucheron-original.md"
  - "archive/agentic-co-dm-Midchain.md"
parent: "[[midchain|Midchain]]"
revealed: "Session 2"
title: "Murrat"
---

![[murrat-banner.webp]]

> [!narration] Arrival
> You see a black cloud wrapped around the island's treetops, hanging above the limestone reef while the wind moves past it. It doesn't break or drift away. Below it, the canopy hides the hollows in the cliffs and the rope bridges. You know the pilots' warning. That cloud is wings, and it can reach a ship half a mile from shore. To the east, the current draws water between two wrecks. Ahead, the cloud hangs over the trees.

## Travel

Murrat is a mile-and-a-half limestone reef between [[kalowe|Kalowe]] and the [[verdant-teeth|Verdant Teeth]]. Open water surrounds its reef ring, and the tide pulls east towards two wrecks. The reef extends farther than its visible edge. Ships must remain more than half a mile offshore: the permanent black cloud above the treetops consists of billions of [[moucheron|Moucherons]] and reaches out to vessels inside that line.

A course that skirts the island outside the swarm's reach keeps the crew offshore. Even a clear route through the reef exposes anyone who closes for the cliff hollows or rope bridges. Landing unnoticed or buying passage with blood isn't viable.

Murrat's only inhabitants are its native Moucherons and local wildlife. The Moucherons are sentient and nearly feral towards anyone else. They hunt outsiders who reach the shore, and their numbers can drain an adult human dry in seconds. Neither law nor government protects an outsider, and nobody can sell a safe landing.

The Midchain considers shipwrecked crews lost. Nobody mounts a rescue for those who go willingly, either. People who tried to persuade the Moucherons died there. Their bodies were never confirmed, but the wider Sea counted them dead when they chose to go.

## Powers

Kin-groups occupy cliff hollows and canopy, feeding on the island's wildlife. Their consensual blood economy governs exchanges between Moucherons, not a foreigner's approach. It doesn't amount to a government or justice system.

Murrat holds a seat on the [[chain-council|Chain Council]], like the other Midchain islands, but rarely sends a delegate. That outside seat gives the Council no authority within Murrat.

The [[five-blades|Five Blades]] are an off-island company hired from Kalowe. Their fame leads sailors to imagine a Moucheron army that no power in the Sea could beat. Such an army is impractical. Billions of feral, disorganised fighters cannot realistically be rallied, and nobody could supply their blood on days without a battle.

## Rumors

Kalowe's pilots warn that outsiders cannot bargain for passage ashore. Blood agreements settle dealings between Moucherons and with their employers elsewhere, beyond Murrat's swarm.

## History

The kin-villages built their cliff hollows and rope bridges above the tide, concealed from ships by the canopy. [[ket|Ket]] flew home here after the Party freed him from [[barnaby-rook|Barnaby Rook]]'s cage in Session 2.

## Threads

[[perrin-and-nona|Perrin and Nona]] crosses the Midchain, where Murrat's lost crews remain beyond rescue.

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
