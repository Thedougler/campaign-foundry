---
type: Location
kind: Site
summary: "Aruhe's heart: a golden-peach tree over two unmarked graves, where a changing procession of island fauna bows in silence."
sources:
  - "archive/memorial-grove.md"
  - "archive/agentic-co-dm-Aruhe-Hungry-Isle.md"
  - "archive/agentic-co-dm-arc-blight-of-aruhe.md"
  - "archive/agentic-co-dm-grung-and-the-making-of-aruhe.md"
  - "archive/session-12-full.md"
  - "archive/collab-2026-10-10-hinewai-gold-peaches.md"
  - "archive/collab-2026-10-12-hinewai-army.md"
parent: "[[aruhe|Aruhe]]"
revealed: "Session 12"
title: "Memorial Grove"
---

![[memorial-grove-banner.webp]]

![[memorial-grove-handout-art.webp]]

> [!narration] Entering
> Black flowers ring a round clearing. One fruit tree stands over two unmarked mounds. Fallen fruit rests in grass greener than the dark soil, and nothing inside the ring moves when wind stirs outside.

## Areas

The black-flower ring encloses the fruit tree, two graves, bound soil and still grass. Beneath the tree lie a couple of fallen golden peaches, free for any guest to pick up from the moment the Party arrives. Saplings ring the clearing's edge, and pale roots descend towards [[lava-tubes|Lava Tubes]]. The Site draws the Party with the answer to Aruhe's law, the Gold caste's attempts to break the graves and a choice that could change the island. Trails approach from Grasslands, Clear Lake, Marshes, Star Cut and the Burnt Road.

## Hazards

Picking fruit, digging, uprooting flowers, striking the tree or removing any part of the Bloom ends Hinewai's welcome and brings her to fight.

## Occupants

[[hinewai|Hinewai]] speaks through the tree, the sapling ring and a figure at the Grove's edge. Terror-Birds, Wolfrabbits and Deer-Stalker wait beyond the black-flower ring, still as mourners.

An uncounted, ever-changing group of fauna from across Aruhe arrives, bows its heads for ten to twenty minutes, then leaves in silence. After they leave, their wildness and ferocity return. Numbers vary as animals move and migrate over weeks or months. This is the island's natural order after generations of Hinewai shaping it. She does not summon the animals.

## Likely actions

Enter as a guest, take fallen fruit, study the roots and graves, speak with Hinewai or choose whether to destroy the Bloom. The Party may also watch the fauna's visits and departures.

## History

The tree grew from golden-peach seed Hinewai stole from Karath's gold farms on her way out. She carried her drowned [[the-unnamed-companion|companion]] from the surf and buried him beneath it, opening the grave by hand through a day and most of a night. Her own grave anchors the mechanism. After the Grung sail traced the treeline, she put in the second grave beside his over two days, lay in it alive and spoke the vow from inside the soil. The Gold caste sends compelled Grung to destroy both graves. The capture and escape behind them are recorded in [[grung-and-the-making-of-aruhe|Grung and the Making of Aruhe]].

During Session 12, Hinewai told the Party, \"Meet me in the grove.\" The road the Grung had burned led towards her, and the Party set out along it. The orders on the spent seals referred to the Grove, from \"Find the grove\" through \"Find the graves at the grove\" to \"Destroy the grave\". The farthest, oldest seals ordered the destruction of two graves ([[two-grave-orders|Two-Grave Orders]]).

## Hidden truths

The Death Bloom began as the two graves. [[hinewai|Hinewai]]'s pale roots have since spread her across [[aruhe|Aruhe]], but no root crosses either grave. The phylactery reaches as far as those pale glowing roots do.

## Threads

[[take-on-aruhe|Take on Aruhe]], [[the-crown-inspection|The Crown Inspection]] and [[perrin-and-nona|Perrin and Nona]].

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
