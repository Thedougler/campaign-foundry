---
type: Location
kind: Site
summary: "A pale glass-edged stand that cuts movement and bursts into slashing
  shards and choking dust when shattered."
sources:
  - "archive/razer-grass.md"
parent: "[[Grasslands]]"
revealed: "Session 11"
title: ""
---

![[Razer-Grass - Handout Art.jpg]]

## At a glance

- **Draws the Party because.** It constrains crossings and can stop predators.
- **Entrance.** Flood-scoured hollows, river bends, Old Gardens and the Long Meadow.
- **Occupants.** Fixed blades and glittering dust.
- **Danger.** Movement cuts. Violent disturbance shatters the stand.
- **Prize.** A safe route if read and crossed carefully.

> [!narration] Entering
> White blades as broad as knives stand clear as thin glass among gold meadow grass. Fixed points glitter along them, and the stalks tick together while old red smears mark the bend.

## Play

### Areas

The intact stand, bent paths around it and the ten-foot shatter radius.

### Hazards

Intact grass is Difficult Terrain and deals 1d4 slashing per 5 feet. Shattering calls for Dexterity DC 14 and Constitution DC 14 saves. The crash draws predators.

### Occupants

[[Razer-Grass]].

### Likely actions

Perception or Survival DC 14 reads the fixed glitter, spend an Action to move 5 feet safely, part stalks, cover mouth and nose, or go around.

## Depth

### History

Razer-Grass grows where floods tear open Aruhe's crossings and predators learn to bend around it.

### Hidden truths

Terror-Birds will not run through a stand. The sound of shattering means to hurt prey for nearby hunters.

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
