---
type: Location
kind: Site
summary: "A Crown island whose position off Sandtable Shoal makes it the pilot's
  mark on the mid-strait lane."
sources:
  - "archive/ssw-central-strait.md"
  - "archive/collab-2026-10-12-malone-massacres-and-kindled.md"
parent: "[[crown-islands|Crown Islands]]"
revealed: ""
title: "Aldenmere"
---

## Areas

The island is the pilot's mark for finding the mid-strait lane around Sandtable Shoal. ==The shoal's shallow water begins beyond the island's shore.== Open anchorage lies off the island. The bottom rises from two hundred feet to less than forty in two miles, and the Blue Lane bends south around it. The wreck-feeding giant octopuses hold the shoal's limestone.

> [!narration] Entering
> The island stands low off the bow with the shoal's water showing beyond it, the blue of the deep going sandy and pale along the shoal's whole length. A salvage hull works the shallows with her boats out, and the lead-man at your bow calls the bottom earlier than he has all voyage.

## Likely actions

- The Party fixes the lane by the island and works the shoal's kink under the lead.
- The salvage crew hails approaching hulls and prices a grounding claim.
- The bottom comes up fast, and the watch trades depth calls with the chart.

## History

Sailors recount that the children from that village went with Malone to his temple. The grown men and women describe his taking them there as their salvation. Some wear Crown coats now and still profess love for him.

## Hidden truths

The shoal's salvage business runs on a Crown contract worked by a [[kalowe|Kalowe]] operator, and the island's landings watch every grounding. Traffic at the landings is a clue to which hulls the strait has hurt lately.

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
