---
type: Location
kind: Site
summary: "A mature magic-feeding bloom in Aruhe that clamps shut, drains spell slots and can yield a Black Lotus Heart."
sources:
  - "archive/black-lotus.md"
parent: "[[Old Gardens]]"
---

## At a glance

- **Draws the Party because.** Its heart is valuable magical material.
- **Entrance.** Wet growth among the Old Gardens and other Aruhe bands.
- **Occupants.** The bloom, old bones and scorched neighbouring plants.
- **Danger.** Within ten feet it clamps shut. Magic within thirty feet feeds it.
- **Prize.** A harvested Black Lotus Heart.

> [!narration] Entering
> Black petals cup over moss like a low table. Violet threads glow toward a dark knot, rain beads on the bloom and old ribs show beneath its lowest flaps. When magic stirs, the flower leans toward it.

## Play

### Areas

The ten-foot clamp radius, surrounding scorched growth and the crown where the Heart forms.

### Hazards

Movement within ten feet or magic within thirty feet triggers the lotus. A trapped creature loses its highest spell slot each turn, then suffers necrotic damage.

### Occupants

The mature [[Black Lotus]] itself.

### Likely actions

Stay beyond ten feet, bait it from outside, force petals with Athletics DC 16, or deal 20 slashing or fire damage and harvest after ten minutes with Arcana or Survival DC 16.

## Depth

### History

Grung legend names mature Black Lotuses among the Hungry Isle's killers. They feed on ambient magic as plants take light.

### Hidden truths

The mature bloom is the source of a Heart, but a failed harvest deals force damage and destroys it.

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
