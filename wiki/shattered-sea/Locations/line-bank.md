---
type: Location
kind: Site
summary: "A used fruiting margin on the Aruhe River where a fishing line, fresh
  prints and three fruit piles mark the route upriver."
sources:
  - "archive/line-bank.md"
parent: "[[grasslands|Grasslands]]"
revealed: ""
title: "Line Bank"
---

![[Line Bank - Handout Art.jpg]]

## At a glance

- **Draws the Party because.** Fallen food, a working line and the trail ahead offer clues.
- **Entrance.** The Grasslands bank up valley of [[torn-crossing|Torn Crossing]].
- **Occupants.** Empty now. Otters hold the basin farther upriver.
- **Danger.** Tall grass, current and living plants.
- **Prize.** Fallen restorative fruit and evidence of travellers.

> [!narration] Entering
> Turquoise water runs past wet sand and gold-green grass. Three fruit bushes grow along the bank. A thin fishing line hangs from a rough pole over the current, and silver scales lie scattered beneath it among fish bones.

## Play

### Areas

Fruit stops, fishing frame, muddy track, river shallows and jungle wall.

### Hazards

Grass obscures beyond ten feet. Fishing, trapping, killing or plucking living fruit is covered by [[taking-on-aruhe|Taking on Aruhe]].

### Occupants

No one currently. River Otters own [[slack-basin|Slack Basin]] farther upriver.

### Likely actions

Follow prints upriver, search the frame, take fallen fruit, fish, or return downstream.

## Depth

### History

Travellers ate and fished here before leaving toward Slack Basin.

### Hidden truths

The clean soil beneath fallen fruit distinguishes receiving from the red mud around snapped living stems.

### Threads

[[taking-on-aruhe|Taking on Aruhe]].

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
