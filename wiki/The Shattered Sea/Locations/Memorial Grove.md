---
type: Location
kind: Site
summary: "Aruhe's heart: one fruit tree over two unmarked graves in a ring of black flowers, the Death Bloom that is Hinewai's body."
sources:
 - "archive/memorial-grove.md"
 - "archive/agentic-co-dm-Aruhe-Hungry-Isle.md"
 - "archive/agentic-co-dm-arc-blight-of-aruhe.md"
 - "archive/agentic-co-dm-grung-and-the-making-of-aruhe.md"
parent: "[[Aruhe]]"
---

![[Memorial Grove - Handout Art.jpg]]

## At a glance

- **Draws the Party because.** It is the answer to Aruhe's law and the place where Hinewai can end.
- **Entrance.** Trails from Grasslands, Clear Lake, Marshes, Star Cut and the Burnt Road.
- **Occupants.** Hinewai. A Terror-Bird, Wolfrabbits and Deer-Stalker wait beyond the ring in stillness, watching like mourners.
- **Danger.** Touching tree, graves, flowers or soil ends Hinewai's welcome.
- **Prize.** Truth about the Death Bloom and a choice that changes the island.

> [!narration] Entering
> Black flowers ring a round clearing. One fruit tree stands over two unmarked mounds. Fallen fruit rests in grass greener than the dark soil, and nothing inside the ring moves when wind stirs outside.

## Play

### Areas

The flower ring, fruit tree, two graves, bound soil, still grass and root descent into [[Lava Tubes]].

### Hazards

Picking fruit, digging, uprooting, striking or carrying away part of the Bloom summons Hinewai to fight.

### Occupants

[[Hinewai]] and the still predators at the treeline.

### Likely actions

Enter as a guest, take fallen fruit, study roots and graves, talk to Hinewai, or choose whether to destroy the Bloom.

## Depth

### History

Hinewai carried her drowned [[The Unnamed Companion|companion]] up from the surf and buried him beneath the tree, a grave opened by hand through a day and most of a night. Her own grave anchors the mechanism. The second grave went in beside his over two days, after the grung sail traced the treeline. She lay down in it alive and spoke the vow from inside the soil. The Gold caste sends compelled Grung to destroy both. The capture and escape behind these graves are [[Grung and the Making of Aruhe]].

### Hidden truths

The Death Bloom is not portable: tree, graves, flowers and bound soil form one body and phylactery. No root crosses either grave.

### Threads

[[Taking on Aruhe]], [[The Crown Inspection]], and [[Perrin and Nona]].

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
