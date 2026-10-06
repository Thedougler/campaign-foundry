---
type: Location
kind: Site
summary: "A mid-strait sandbank south of Aldenmere where the bottom rises fast, the Blue Lane kinks south, and giant octopuses prey on the wrecks in its limestone."
sources:
 - "archive/ssw-central-strait.md"
parent: "[[Central Strait]]"
---

## At a glance

- **Draws the Party because.** The Blue Lane kinks south around the sand, and the bottom rises from two hundred feet to less than forty in two miles. Read the kink late and you scrape a keel.
- **Entrance.** Open water on the lane, the shoal showing as pale water on either side of the deep road.
- **Occupants.** Salvage crews who work the groundings from their hulls, and giant octopuses in the wrecked limestone.
- **Danger.** The rising bottom under a keel, and the octopuses around the wrecks.
- **Prize.** Early word of the kink, and a view of which hulls the salvage boats attend.

> [!narration] Entering
> The sand shows first as a long pale streak in the blue, then as water too shallow for what the chart promises. Swing the lead and put the helm over early, because the lane bends away around the lifted ground, and a hull that keeps the straight line will scrape. Wreck timbers show dark through the clear water, and something with too many arms for a fish slides back into the stone.

## Play

### Hazards

- The bottom rises from two hundred feet to less than forty in two miles, and the kink in the lane is the only visible warning.
- Giant octopuses in the wrecked limestone, and they come up for a hull that drifts to a stop over the sand.

### Likely actions

- The Party reads the kink by lead and by [[Aldenmere]], and keeps to the lane south of the sand.
- A grounding brings the salvage crews alongside to price the claim.

## Depth

### Hidden truths

The salvage contract for groundings here belongs to a [[Kalowe]] operator, and the [[Harwick]] Admiralty counts the arrangement an embarrassment it would rather not have to explain. An embarrassment that size is leverage for anyone who can move it. You see the arrangement work: a grounding brings the operator's boats, and the landings on [[Aldenmere]] watch each one.

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
