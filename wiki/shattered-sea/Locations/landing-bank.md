---
type: Location
kind: Site
summary: "The first river mouth after the terraces, where a used camp,
  northbound prints and fallen redheart berries mark the inland route."
sources:
  - "archive/landing-bank.md"
parent: "[[grasslands|Grasslands]]"
revealed: ""
title: "Landing Bank"
---

## At a glance

- **Draws the Party because.** It is the first readable inland river cut.
- **Entrance.** Terrace descent from [[old-gardens|Old Gardens]] or the riverbank.
- **Occupants.** Empty now. River Otters occupy water farther up the valley.
- **Danger.** Tall grass, current and the taking rule.
- **Prize.** Water, fallen berries, a crate and prints toward Torn Crossing.

> [!narration] Entering
> Turquoise current hugs a gold-green bank where crushed stems lead ahead. Cold ash, a closed crate and split fruit sit beside the water. Red berries bead the wet margin and terraces rise behind.

## Play

### Areas

The used stop, pale-stone shallows, eight-foot grass, terrace rim and print corridor.

### Hazards

Grass counts as Difficult Terrain and obscures beyond ten feet. Living fruit or carried flesh invokes [[taking-on-aruhe|Taking on Aruhe]].

### Occupants

No one currently. River Otters hold reaches farther up the River.

### Likely actions

Follow prints to [[torn-crossing|Torn Crossing]], skip via terraces, search the crate, wade the shallows or eat fallen [[redheart-berry|Redheart Berry]].

## Depth

### History

Travellers camped by the river and moved north, leaving ash, bowls, skins and a crate.

### Hidden truths

The crate's contents are unknown. The evidence reveals traffic and freshness, not who claimed the fruit.

### Threads

Fallen berries are safe here, living growth is a claim under [[taking-on-aruhe|Taking on Aruhe]], and what the Party reads from the camp goes into the report owed to [[perrin-and-nona|Perrin and Nona]].

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
