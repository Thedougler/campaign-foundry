---
type: Location
kind: Site
summary: "A clearing deep in the Quiet roofed by one fruit-heavy vine, where seven Calveno survivors live on what falls."
sources:
  - "archive/the-pantry.md"
parent: "[[The Quiet]]"
---

## At a glance

- **Draws the Party because.** Survivors, fruit and the route back to the ship meet here.
- **Entrance.** Fallen-fruit trail from [[The Burnt Road]] or Quiet routes.
- **Occupants.** Renzo Canale and six other Calveno survivors.
- **Danger.** Three Vine-Lashes answer picked fruit. An invisible hunter may come for the Fate-Spinner.
- **Prize.** Survivors, fallen Giant's Guava and Stonepear, and a raft.

> [!narration] Entering
> A vine as thick as a ship's mast roofs a threshing-floor clearing. Guavas and stone-plated pears hang above mats and a small fire. A deep channel slides past a lashed raft while pale pollen glows at the treeline.

## Play

### Areas

Great vine, bare cords, sleeping ground, fire, channel, raft and pollen drift.

### Hazards

Picking or cutting fruit wakes up to three Vine-Lashes. The channel can sweep a crosser. Pollen reveals an Invisible creature.

### Occupants

[[Renzo Canale]], Carlo Ferrante, Tommaso Brasca, Sandrino Vale, Ilario Pozzo, Beppe Sarti and Marco Lenzi.

### Likely actions

Talk to survivors, bring Luca and Ettore home, take fallen fruit, cross by raft or expose an invisible intruder.

## Depth

### History

Seven survivors followed Hinewai's law into this clearing. Four want the ship. Three believe protection ends here and stay.

### Hidden truths

Beppe is wrong that Hinewai's protection ends at the clearing. It covers those she counts anywhere on Aruhe.

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
