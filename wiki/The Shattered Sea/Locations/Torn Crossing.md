---
type: Location
kind: Site
summary: "A flood-scoured Grasslands crossing where prints, slick stone, Razer-Grass, deep water and a Spiguar hunting lane constrain movement."
sources:
 - "archive/torn-crossing.md"
parent: "[[Grasslands]]"
---

## At a glance

- **Draws the Party because.** Fresh prints and river water continue inland.
- **Entrance.** Upstream from [[Landing Bank]].
- **Occupants.** A Spiguar hunts Wolfrabbit packs in the cut.
- **Danger.** Pale stands cut and choke. Grass hides the hunter.
- **Prize.** Fallen Redheart Berries and the trail to [[Line Bank]].

> [!narration] Entering
> Turquoise water breaks around pale stone and black rock. Mud, crushed stems and hoof like prints braid between fixed-glitter white stands that tick when wind reaches them.

## Play

### Areas

Flood cut, muddy print corridor, deep water, Razer-Grass islands, tall grass and bank woods.

### Hazards

Razer-Grass deals slashing damage and releases Glass-Choked dust when disturbed. The Spiguar will not rush deep water, wide bare ground or the stands.

### Occupants

[[Spiguar]] and Wolfrabbit packs.

### Likely actions

Follow prints north. Keep to a ridge or use water as a bypass. Reading the grass reveals the motionless hunter.

## Depth

### History

Floods tore this river lane open. The Spiguar now uses it to hunt packs.

### Hidden truths

Wolfrabbits jump Razer-Grass rather than land in it, revealing a route through the predator's pressure.

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
