---
type: Location
kind: Site
summary: "Ancient stone terraces rising from Western Landing, crowded with fruit, water channels and things that hunt among them."
sources:
 - "archive/old-gardens.md"
parent: "[[Aruhe]]"
---

![[Old Gardens - Portrait.jpg]]

![[Old Gardens - Handout Art.jpg]]

## At a glance

- **Draws the Party because.** It is the first inland route and the terrace road to Grasslands.
- **Entrance.** Inland from [[Western Landing]].
- **Occupants.** Grinning Apes, Wolfrabbits, Vine-Lash, Young Snakewood, Grubnades and Black Lotuses.
- **Danger.** Collapsed steps, living hazards and tempting fruit.
- **Prize.** Fallen Redheart Berries, Giant's Guavas and routes to Grasslands or Quiet.

> [!narration] Entering
> Moss-dark terraces stack up the forest slope. Water runs through old ditches. Red berries hang at the lips and ribbed guavas bow over lower steps while split fruit sweetens the wet stone.

## Play

### Areas

Terrace route, green route, hanging vines, low-canopy lanes, irrigation ditches and collapsed steps.

### Hazards

Vine-Lash, Young Snakewood, Grubnades and Black Lotuses occupy the route. Living fruit is covered by [[Taking on Aruhe]].

### Occupants

Grinning Apes patrol canopy. Wolfrabbits work collapsed terraces at dawn and dusk.

### Likely actions

Follow terrace edges to skip hazards, take fallen fruit, climb toward [[Grasslands]], or enter the green route to [[The Quiet]].

## Depth

### History

The terraces are older than Hinewai's law and once carried water through planted steps.

### Hidden truths

Following the edge preserves a safer route while the tempting centre tests whether travellers understand receiving and taking.

An unseen watcher remains in the garden after lantern light drove it from a dead porcupine.

### Threads

[[Taking on Aruhe]].

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
