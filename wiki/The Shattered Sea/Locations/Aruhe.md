---
type: Location
kind: Region
summary: "A vast untamed volcanic island where excessive life distinguishes receiving from taking."
sources:
 - "archive/aruhe.md"
 - "archive/Aruhe - Hungry Isle.md"
 - "archive/hungry-isle.md"
parent: "[[Midchain]]"
---

![[Aruhe - Handout Art.jpg]]

## At a glance

- **Character.** An untamed volcanic island about 500 miles long and 150 miles across.
- **Held by.** No settlement or state. Hinewai's grief binds the island's living systems.
- **Changing.** Calveno survivors move inland while Karath's Gold caste seeks the two graves.
- **Crossing.** Land at [[Western Landing]]. Use the River or slow forest and terrace routes.
- **Danger.** Taking living things wakes hostile local life. Growth, healing and rot run beyond normal limits.

> [!narration] Arrival
> From offshore, a vast green volcano rises around a dark crater lake, gold-tan bands mark its slopes and white water foams on the reef. No road, field or smoke breaks the island's crowded life.

## Play

### Travel

[[Western Landing]] is the reliable sea approach. The River is the nearest thing to a road, but current, shelves and otter families make it unsafe infrastructure. A straight crossing takes many days, whereas a lengthwise crossing takes weeks.

### Places worth reaching

[[Old Gardens]], [[The Quiet]], [[Grasslands]], [[The River]], [[Memorial Grove]], [[Lava Tubes]], [[The Pantry]], [[The Burnt Road]], Clear Lake, The Marshes, and The Mangroves.

### Encounters

1. River Otters play with gear in occupied water.
2. Terror-Birds hunt open grass.
3. Snakewood coils strike from low canopy.
4. Razer-grass cuts careless crossings.
5. A survivor follows fallen fruit.
6. A Grung expedition burns toward the Grove.

### Rumors

Fallen fruit is receiving. Fruit picked from living growth is a claim. The island is not one monster but many living systems made excessive.

## Depth

### History

Hinewai preserved a drowned companion at [[Memorial Grove]]. The Death Bloom is the tree, two graves, black flowers and bound soil together.

### Hidden truths

Pale luminous roots run from Clear Lake through the Marshes into the graves. Destroying the Bloom ends the blight over weeks, months and years, but leaves the memorial's cost.

The Party learned that fallen fruit is safe while living fruit is dangerous. Matteo Scola wants passage off the island, and an unseen watcher remains in the garden.

### Threads

[[Taking on Aruhe]], [[Perrin and Nona]], [[Drowned Maw Awakening]].

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
