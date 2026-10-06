---
type: Location
kind: Site
summary: "A fire-cleared scar twenty feet across, burned from the coast deep into Aruhe by compelled Grung and lined with their clean white dead; it runs toward the grove."
sources:
 - "archive/the-burnt-road.md"
 - "archive/session-12-full.md"
parent: "[[The Quiet]]"
---

## At a glance

- **Draws the Party because.** Gold-caste seals expose the order chain, the Pantry trail turns east, and the road now runs the Party's way to [[Memorial Grove]].
- **Entrance.** The lava tubes open onto it at the stone-table lavatories, and a fruit-pile trail leads in from [[The Long Meadow]].
- **Occupants.** A hundred-plus dead Grung mark the travelled stretch at one every twenty or thirty feet. Eleven more lie sunk in black flowers where the scar crosses [[The Quiet]]. Hinewai speaks to any Grung on the road.
- **Danger.** Fire or disturbing bodies is a claim that wakes Vine-Lash.
- **Prize.** Spent authority seals and evidence of the attack on the Grove.

> [!narration] Entering
> A straight cut the width of a village street runs through charcoal-rooted trees. Black flowers give underfoot. Bodies lie sunk to the shoulders with roots through their ribs, and no fruit or bird breaks the scar.

## Play

### Areas

The twenty-foot road, bodies and seals, cracked fire pots, black flowers and east side trail.

### Hazards

The regrown forest hides beyond ten feet. Pulling a body free or burning anything invokes Aruhe's response.

### Occupants

The dead along the travelled stretch are Gold-caste Grung, a hundred-plus of them at one every twenty or thirty feet. Eleven more lie sunk in black flowers where the scar crosses [[The Quiet]]. [[Hinewai]]'s voice comes from the treeline.

### Likely actions

Lift a spent seal, read the order chain, follow fruit piles to [[The Pantry]], or walk on toward [[Memorial Grove]].

## Depth

### History

Karath's Gold caste compelled the expedition to burn a way to the two graves. The island took all eleven and refuses to fruit on the scar.

#### Session 12: the line of the dead

The Party came up from the [[Lava Tubes|lava tubes]] at the stone-table lavatories and walked the road inland for a full day, to a clearing camp made at dusk several miles up. [[Crissdalynn Khinriss|Crissdalynn]] mapped as they went, flying up to read the scar against the horizon. It starts at the coast near the Party's landing and meets the water at a mangrove forest, and from there it runs straight at the island's centre, ending where the trees grow thick. The grung had made good progress through the grasslands before the current effort halted. The scar stands bare of fruit, and its animals treat it as common ground.

The grung cut this burn as a firebreak, clearing about twenty feet across so fire cannot cross it. The dead lying here were compelled to the work in spring. A first look from the crevice counted parchment scraps and dragon bones along the trail, the fallen dropped as if mid-march. The closer read named them Grung dead: a hundred-plus bodies, one every twenty or thirty feet. Their bones are clean and white, unmarked by decay, and each lies with something brown carrying a flash of gold. The bones grow sparser inland and stop about an hour short of the road camp.

Every skeleton bears a spent [[Grung Authority Seal]]. Read from oldest to newest, the orders run "Report the lives and land", "Replace the parties that were killed. Continue to roast", "Find the grove", "Find the graves at the grove" and at the last "Destroy the grave". The farthest, oldest seals speak of destroying two graves ([[Two-Grave Orders]]). [[Jean-Claude Tabarnack|Jean-Claude]] read the chain as the Gold caste's work alone and took samples of the older seals as evidence. The road's end is the grove: the sense [[Hinewai]]'s parting words left pointed the Party down it, and they walked it inland to meet her.

### Hidden truths

The seals instruct their bearers to report inland and replace silent parties. They also order the destruction of two graves ([[Two-Grave Orders]]) and the burning of any forest in the way. The seals are spent metal.

### Threads

[[Taking on Aruhe]], [[The Crown Inspection]].

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
