---
type: Location
kind: Region
summary: "Aruhe's silent inland rainforest, where silence moths ate small singers and the Calveno trail runs to the Pantry."
sources:
 - "archive/the-quiet.md"
parent: "[[Aruhe]]"
---

![[The Quiet - Handout Art.jpg]]

## At a glance

- **Character.** Dense rainforest with sight failing beyond ten feet.
- **Held by.** Hinewai's grief, local predators and the survivors who follow fallen fruit.
- **Changing.** The Calveno survivors gather at [[The Pantry]] while Karath's next expedition threatens the Grove.
- **Crossing.** Follow the Calveno trail, fruit piles or Star Cut. Off-trail navigation costs hours.
- **Danger.** Silence moths, Stillbloom, Snakewood and hidden hunters.

> [!narration] Arrival
> Trunks broader than doorways roof a trail where water drips and leaves drag softly. No insects hum or birds call. A little pile of fallen fruit waits on a broad leaf beside the mud.

## Play

### Travel

The Calveno trail runs from [[Slack Basin]] through [[Cutoff Lip]], [[Print Braid]], [[Spoke Ring]] and [[Star Cut]]. The fruit-pile trail reaches [[The Long Meadow]], [[The Burnt Road]] and [[The Pantry]].

### Places worth reaching

[[Cutoff Lip]], [[Print Braid]], [[Spoke Ring]], [[Star Cut]], [[The Long Meadow]], [[Lava Tubes]], [[The Burnt Road]], [[The Pantry]], and [[Memorial Grove]].

### Encounters

Silence moths swarm at dawn and dusk. Deer-Stalkers drag kills. Terror-Birds patrol openings. Bear-Elk hold scored-tree routes. Snakewood and Stillbloom answer movement.

### Rumors

The woman in the woods speaks at night. Follow fruit piles and you find the rest of the survivors.

## Depth

### History

Silence moths ate the insects and small birds. Hinewai drew Calveno survivors inward after they ate fallen fruit.

### Hidden truths

Her welcome follows the fruit law across Aruhe, not only inside the Pantry. Karath's Gold caste will send another burning party.

### Threads

[[Taking on Aruhe]], [[Perrin and Nona]], and [[The Crown Inspection]].

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
