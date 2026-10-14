---
title: "Huahei"
type: Location
kind: Region
summary: "A marsh island in the northern Midchain where the Feywild leaks through, home to the Glutehorn and a coven of hags."
sources:
  - "archive/ssw-midchain.md"
  - "archive/collab-2026-10-14-glutehorn-and-huahei.md"
parent: "[[midchain|Midchain]]"
revealed: ""
aliases:
  - Huahei Island
---

![[huahei-banner.webp]]

> [!narration] Arrival
> From your boat, Huahei stretches low across the water, moss and marsh grass broken by dark channels. Mist hangs between the dead white trees, and a rocky knoll rises at one end. In the middle, the moss has worn away in circles, with spirals winding between them. You hear squeaking in the grass. Then it comes again, followed by an eye-watering smell, and somewhere among those trees a brass bell catches the light.

## Travel

The Party approaches from the northern [[midchain|Midchain]] by boat. Keep watch on any boat left at the shore: a [[noggle-ransacker|noggle]] can dismantle it plank by plank. Marsh footing and overgrowth slow the crossing inland, and fey strangeness makes it treacherous. The deeper the Party goes and the longer it stays, the greater the danger.

Feywild things sink into the bog on the island's far side, and enchanted flotsam resurfaces in the marsh. Huahei's magic items work as intended, with a fey prank attached to each.

Listen for the [[glutehorn|Glutehorns]] while ashore. When their tooting stops, island veterans run for their boats before the [[huahei-crossing|Wild Hunt]] arrives.

## Places

- [[huahei-crossing|Huahei Crossing]]. Follow the moss rings and spirals towards the centre to find the soft spot between the mortal world and the Feywild. The coven waits here for people seeking a bargain. The Hunt also enters through it.

## Powers

- [[huahei-coven|Huahei Coven]]. Its membership includes a [[green-hag|green hag]] and a [[sea-hag|sea hag]]. The hags wait for desperate visitors rather than pursuing them. Huahei has no ruler.

Fey pass through regularly. The [[glutehorn|Glutehorn]] is among the least troublesome, while a [[noggle-ransacker|noggle]] can cost visitors their boat. [[sprite|Sprites]] and [[pixie|pixies]] use charms and sleep magic, along with small transformations. The [[redcap|redcaps]] kill.

## Rumors

- *"Huahei: marsh, fey, the Glutehorn. You only go there when you already need it."* Harbour advice about the island's loot and the bargains available from its hags. The Party can test the saying by exploring the marsh or approaching the coven.
- *"A thin, reedy squeak out of the marsh means all is well."* The sound and smell tell experienced sailors that the island's least troublesome fey are nearby. It isn't a promise of safety: the Glutehorn's stench can poison someone too close. Listen ashore to test the saying. A sudden end to the squeaking warns of the Hunt.
- *"The Wild Hunt takes people off Huahei. Most never come back."* Sailors disagree about what the Hunt looks like. The disappearances are real, though occasional captives return years later without ageing and refuse to speak of it. Such a returnee could confirm the rumour.

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
