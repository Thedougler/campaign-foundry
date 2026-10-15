---
type: Location
kind: Site
summary: "A fire-cleared scar twenty feet across, burned from the coast deep
  into Aruhe by compelled Grung and lined with their clean white dead; it runs
  toward the grove."
sources:
  - "archive/the-burnt-road.md"
  - "archive/session-12-full.md"
parent: "[[the-quiet|The Quiet]]"
revealed: "Session 12"
title: "The Burnt Road"
---

> [!narration] Entering
> You arrive on the burnt road. It runs dead straight toward the island's heart, twenty feet across, open from side to side. Black flowers give underfoot, and ten feet out on either side the charred trunks grow thick enough to hide whatever hangs between them. You look down the cut, and the open ground keeps going. A skeleton lies sunk to its shoulders, twenty feet to the next, thirty at the most, bone white and clean of decay, roots run through its ribs. No bird crosses the open ground, and no fruit hangs anywhere on the burn. You hear nothing move in the trees. Every skeleton has something brown at its ribs, and gold glints in the brown.

## Areas

The Party can read the Gold caste's order chain here and follow the road towards [[memorial-grove|Memorial Grove]]. The [[lava-tubes|Lava Tubes]] open at the stone-table lavatories. A fruit-pile trail approaches from [[the-long-meadow|The Long Meadow]], and the eastern trail leads to [[the-pantry|The Pantry]].

### Road and rooted dead

==This road runs where you're going, straight toward the grove. The dead keep that spacing all the way down.== The twenty-foot road, bodies and seals, cracked fire pots, black flowers and east side trail.

### South-edge cleft

==About a hundred feet along the south edge, the road has slumped around a hole in the stone.== Between the Pantry trail and the grove, a cleft six feet across opens into the [[lava-tubes|Lava Tubes]]. From the approach, travellers can spot it about 100 feet ahead. The Grung's fire cracked the roof beneath the road. Pale roots line the lip, and a rubble slope descends 20 feet into the tubes. Wolfrabbits stop at the edge, and Bloodhawks cannot dive into the stone. Travellers following the tubes can climb to the grove through a root shaft at its sapling ring.

## Hazards

The regrown forest hides beyond ten feet, and past that line the hanging coils pass for vines. Leave the dead rooted and the burn keeps quiet: ==Only the wind moves the flowers, and that is all.== Pulling a body free or lighting a fire counts as a claim and wakes Vine-Lash: ==Ten feet into the regrowth, a loose root tip twitches once.==

## Occupants

The dead along the travelled stretch are Gold-caste Grung, a hundred-plus of them at one every twenty or thirty feet. Eleven more lie sunk in black flowers where the scar crosses [[the-quiet|The Quiet]]. [[hinewai|Hinewai]]'s voice comes from the treeline.

## Likely actions

Lift a spent seal, read the order chain or inspect the cracked fire pots. Follow fruit piles to [[the-pantry|The Pantry]], walk on towards [[memorial-grove|Memorial Grove]] or take the cleft into the Lava Tubes.

## History

Karath's Gold caste compelled the expedition to burn a way to the two graves. The island took all eleven and refuses to fruit on the scar.

### Session 12: the line of the dead

The Party came up from the [[lava-tubes|lava tubes]] at the stone-table lavatories and walked the road inland for a full day, to a clearing camp made at dusk several miles up. [[crissdalynn-khinriss|Crissdalynn]] mapped as they went, flying up to read the scar against the horizon. It starts at the coast near the Party's landing and meets the water at a mangrove forest, and from there it runs straight at the island's centre, ending where the trees grow thick. The grung had made good progress through the grasslands before the current effort halted. The scar stands bare of fruit, and its animals treat it as common ground.

The grung cut this burn as a firebreak, clearing about twenty feet across so fire cannot cross it. The dead lying here were compelled to the work in spring. A first look from the crevice counted parchment scraps and dragon bones along the trail, the fallen dropped as if mid-march. The closer read named them Grung dead: a hundred-plus bodies, one every twenty or thirty feet. Their bones are clean and white, unmarked by decay, and each lies with something brown carrying a flash of gold. The bones grow sparser inland and stop about an hour short of the road camp.

Every skeleton bears a spent [[grung-authority-seal|Grung Authority Seal]]. Read from oldest to newest, the orders run "Report the lives and land", "Replace the parties that were killed. Continue to roast", "Find the grove", "Find the graves at the grove" and at the last "Destroy the grave". The farthest, oldest seals speak of destroying two graves ([[two-grave-orders|Two-Grave Orders]]). [[jean-claude-tabarnack|Jean-Claude]] read the chain as the Gold caste's work alone and took samples of the older seals as evidence. The road's end is the grove: the sense [[hinewai|Hinewai]]'s parting words left pointed the Party down it, and they walked it inland to meet her.

## Hidden truths

The seals instruct their bearers to report inland and replace silent parties. They also order the destruction of two graves ([[two-grave-orders|Two-Grave Orders]]) and the burning of any forest in the way. The seals are spent metal.

## Threads

[[taking-on-aruhe|Taking on Aruhe]], [[the-crown-inspection|The Crown Inspection]].

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
