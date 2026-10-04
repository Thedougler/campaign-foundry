---
type: Location
kind: Region
summary: "A closed Grung raid and hatchery island where the Gold caste sends compelled raiders toward Aruhe."
sources:
 - "archive/karath.md"
parent: "[[Midchain]]"
---

![[Karath - Handout Art.png]]

## At a glance

- **Character.** Rainforest island with black river mouths, reef gaps and hidden inland works.
- **Held by.** The Grung clans and their Gold caste.
- **Changing.** The Gold caste sends fire-bearing expeditions toward Aruhe's Grove.
- **Crossing.** Only a reef gap leads into the river mouths. Wet cuts flood quickly.
- **Danger.** Watchers fire on unapproved hulls, while hatcheries and captive pens hide inland.

> [!narration] Arrival
> Black-water mouths open behind gaps in the reef. Boats remain offshore while wet cuts run inland toward huts and pens beneath trees furred with bracket fungus. Aruhe lies across the near channel.

## Play

### Travel

The eastern chain route takes days by sail. A reef gap takes about an hour to pilot and is watched. The near channel to Aruhe is half a mile of exposed water and does not shorten Aruhe's crossing.

### Places

The reef gaps, hatcheries, captive pens and secret gold farms.

### Encounters

1. Grung watchers fire from the treeline.
2. A captive caster works a hatchery pen.
3. A compelled raiding party prepares to carry fire pots.
4. A lower-caste Grung hides a seal.
5. A patrol moves captives.
6. Gold-caste agents erase evidence.

### Rumors

Free Grung avoid Aruhe. Compelled ones are sent there. The Gold caste wants the two graves destroyed.

## Depth

### History

The Gold caste has used authority seals to compel lower-caste Grung and conceal its gold farms. Hinewai was captured and forced to work in the hatcheries before escaping to Aruhe.

### Hidden truths

Gold farms are secret even from lower castes. Raid trails, unusual poison or a captive's testimony connect Karath to the Midchain's losses.

Karath was identified as the Grung fleet's captive destination.

### Threads

[[The Crown Inspection]], [[Taking on Aruhe]], and [[Perrin and Nona]].

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
