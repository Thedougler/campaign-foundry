---
type: Location
kind: Site
summary: "Calveno's canal district of taverns, goods, alchemy and discreet
  routes below the city toward Warren."
sources:
  - "archive/le-paludi.md"
  - "archive/ssw-silent-shortbow.md"
  - "archive/ssw-le-paludi.md"
  - "archive/ssw-session-04-ingest-recap.md"
  - "archive/collab-2026-10-04-authority-themes.md"
parent: "[[Calven and Calveno]]"
revealed: "Session 3"
title: ""
---

## At a glance

- **Draws the Party because.** Separate owners control goods, information and access below.
- **Entrance.** Calveno's canals and named shopfronts.
- **Occupants.** Bice and Aldo Riva, Ettore Lupo, Marta Orsini and Fen.
- **Danger.** Trust differs at every threshold. No district authority guarantees a route.
- **Prize.** Taverns, specialized goods, alchemy and Passage access.

> [!narration] Entering
> Traffic runs along canals past taverns and general-goods shops. Alchemy work hides behind an unmarked door, while older water routes pass below the district.

## Play

### Areas

Al Fondale, [[Casa Lupo]], Studio Orsini and [[La Vasca]], each with its own threshold and owner.

### Hazards

Do not assume one shop opens every canal or underground route. Discreet access costs trust.

### Occupants

Bice Riva, Aldo Riva, Ettore Lupo, Marta Orsini and Fen.

### Likely actions

Ask for a contact, buy goods, seek alchemy, negotiate a cellar route or descend through a vouched entrance.

## Depth

### History

The older Season 2 description called Le Paludi a fence town. Current canon keeps it as a district and leaves that label behind.

### Hidden truths

The Warren lies below, but each owner controls a different access route rather than one district-wide passage.

A storm drain on the district's secluded side runs about five hundred metres under the streets and opens into the sea. Grung moved stores along it in the days before the festival, and their fresh road-sign markers, direction arrows and a distance count, stayed scratched on the walls.

### Threads

The Warren below is Nona's, and [[Perrin and Nona]] run its network, while [[Simone's Hunters]] hunt any threshold that shelters a fugitive. [[Nona Black-Jaw]] is the heart of Le Paludi as much as of the Warren, and common knowledge here holds that if the Dravosi pick up your loved one, you go to Nona, and she does what she can.

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
