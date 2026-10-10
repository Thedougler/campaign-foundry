---
type: Location
kind: Site
summary: "Aruhe's heart: one golden-peach tree over two unmarked graves in a ring of
  black flowers, where the Death Bloom began."
sources:
  - "archive/memorial-grove.md"
  - "archive/agentic-co-dm-Aruhe-Hungry-Isle.md"
  - "archive/agentic-co-dm-arc-blight-of-aruhe.md"
  - "archive/agentic-co-dm-grung-and-the-making-of-aruhe.md"
  - "archive/session-12-full.md"
  - "archive/collab-2026-10-10-hinewai-gold-peaches.md"
parent: "[[aruhe|Aruhe]]"
revealed: "Session 12"
title: "Memorial Grove"
---

![[Memorial Grove - Handout Art.jpg]]

## At a glance

- **Draws the Party because.** It is the answer to Aruhe's law and the two graves the Gold caste's burning parties come to break, where the Death Bloom began.
- **Entrance.** Trails from Grasslands, Clear Lake, Marshes, Star Cut and the Burnt Road.
- **Occupants.** Hinewai. A Terror-Bird, Wolfrabbits and Deer-Stalker wait beyond the ring in stillness, watching like mourners.
- **Danger.** Touching tree, graves, flowers or soil ends Hinewai's welcome.
- **Prize.** Truth about the Death Bloom and a choice that changes the island.

> [!narration] Entering
> Black flowers ring a round clearing. One fruit tree stands over two unmarked mounds. Fallen fruit rests in grass greener than the dark soil, and nothing inside the ring moves when wind stirs outside.

## Play

### Areas

The flower ring, the fruit tree, the sapling ring at the clearing's edge, the two graves, bound soil, still grass and root descent into [[lava-tubes|Lava Tubes]].

### Hazards

Picking fruit, digging, uprooting, striking or carrying away part of the Bloom summons Hinewai to fight.

### Occupants

[[hinewai|Hinewai]], who speaks through the tree, the sapling ring and the figure at the grove's edge, and the still predators at the treeline.

### Likely actions

Enter as a guest, take fallen fruit, study roots and graves, talk to Hinewai, or choose whether to destroy the Bloom.

## Depth

### History

The tree grew from golden-peach seed Hinewai stole off the gold farms at [[karath|Karath]] on her way out. She carried her drowned [[the-unnamed-companion|companion]] up from the surf and buried him beneath it, a grave opened by hand through a day and most of a night. Her own grave anchors the mechanism. The second grave went in beside his over two days, after the grung sail traced the treeline. She lay down in it alive and spoke the vow from inside the soil. The Gold caste sends compelled Grung to destroy both. The capture and escape behind these graves are [[grung-and-the-making-of-aruhe|Grung and the Making of Aruhe]].

#### Session 12: the summons

[[hinewai|Hinewai]]'s voice left the Party with "Meet me in the grove" and the sense that the road the grung have been burning leads to her, and the Party set out along it. The spent seals along that road name this place in their orders, from "Find the grove" through "Find the graves at the grove" to "Destroy the grave", and the farthest, oldest seals speak of destroying two graves ([[two-grave-orders|Two-Grave Orders]]).

### Hidden truths

The Death Bloom was once the two graves alone, and [[hinewai|Hinewai]]'s pale roots have spread her across [[aruhe|Aruhe]] in the centuries since. No root crosses either grave.

### Threads

[[taking-on-aruhe|Taking on Aruhe]], [[the-crown-inspection|The Crown Inspection]], and [[perrin-and-nona|Perrin and Nona]].

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
