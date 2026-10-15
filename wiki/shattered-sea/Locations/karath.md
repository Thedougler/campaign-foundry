---
type: Location
kind: Region
summary: "A closed Grung raid and hatchery island where the Gold caste sends
  compelled raiders toward Aruhe."
sources:
  - "archive/karath.md"
  - "archive/agentic-co-dm-arc-blight-of-aruhe.md"
  - "archive/collab-2026-10-04-calveno-and-rattkin-bounty.md"
  - "archive/collab-2026-10-12-midchain-arc-plan.md"
  - "archive/agentic-co-dm-Midchain.md"
parent: "[[verdant-teeth|Verdant Teeth]]"
revealed: "Session 9"
title: "Karath"
---

![[karath-banner.webp]]

![[karath-handout-art.webp]]

> [!narration] Arrival
> Black-water mouths open behind gaps in the reef. Boats remain offshore while wet cuts run inland toward huts and pens beneath trees furred with bracket fungus. Aruhe lies across the near channel.

## Travel

Karath is the eastern island of the [[verdant-teeth|Verdant Teeth]], with rainforest, black river mouths, reef gaps and hidden inland works. The eastern chain route takes days by sail. Only a reef gap leads into the river mouths. It takes about an hour to pilot and is watched. Wet cuts flood quickly. At their closest point, [[aruhe|Aruhe]] and Karath are half a mile apart across exposed water. Aruhe's heart is still hundreds of miles inland from that shore. Watchers fire on unapproved hulls.

## Places

The reef gaps, hatcheries, captive pens and the secret gold farms that grow the [[gold-fruit|gold fruit]].

## Powers

- The Grung clans and their Gold caste hold Karath. The Gold caste sends fire-bearing expeditions towards Aruhe's Grove. Hinewai's army across the channel is a clock: if her beasts cross to Karath, they will kill every Grung on the island without distinction.

## Travel events

1. Grung watchers fire from the treeline.
2. A captive caster works a hatchery pen.
3. A compelled raiding party stands ready with fire pots.
4. A lower-caste Grung hides a seal.
5. A patrol moves captives.
6. Gold-caste agents erase evidence.

## Rumors

Free Grung avoid Aruhe. Compelled ones are sent there. The Gold caste orders the two graves destroyed.

## History

The Gold caste has used authority seals to compel lower-caste Grung and conceal its gold farms. Hinewai was captured and forced to work in the hatcheries before escaping to Aruhe.

The captive work runs on dosage. A toxin goes in at the base of each captive's skull at the same hour every morning, and a small antidote leaves their hands fit for the bench and their minds too dulled for plans. Behind the long huts, captive casters raise the pens' vermin to hound size, and the eastern path from the compound climbs to the ridge cliffs above the near channel.

## Hidden truths

Gold farms are secret even from lower castes. Raid trails, unusual poison or a captive's testimony connect Karath to the Midchain's losses.

Karath was identified as the Grung fleet's captive destination.

The remaining Calveno survivors are still held on Karath and remain to be found. This may prove harder than finding those on Aruhe.

## Threads

[[the-crown-inspection|The Crown Inspection]], [[take-on-aruhe|Take on Aruhe]], and [[perrin-and-nona|Perrin and Nona]].

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
