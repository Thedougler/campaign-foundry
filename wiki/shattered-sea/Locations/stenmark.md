---
type: Location
kind: Site
summary: "The Crown island whose eastern cliffs and signal tower are the last
  charted landmark before the Narrows close."
sources:
  - "archive/ssw-central-strait.md"
  - "archive/collab-2026-10-12-malone-massacres-and-kindled.md"
parent: "[[crown-islands|Crown Islands]]"
revealed: ""
title: "Stenmark"
---

## Areas

The eastern cliffs and signal tower are the last charted mark before the [[central-strait|Central Strait]] narrows. ==The current drives hard along the cliff base below the tower.== The Crown signal station stands above the water, its crew watching the strait. A missed ship can be set north onto the cliffs.

> [!narration] Entering
> The cliffs rise grey and sheer from water that runs fast along their base, and the tower stands on the edge above you, a squat crown of stone with its signal yard bare. The hoist lines hang ready at the yard. Whatever the tower has to say, it says to the whole strait at once.

## Likely actions

- The Party reads the tower's yard for a hoisted flag before committing to the Narrows.
- The signal crew trades the strait's news for news of the west.
- The current sets on the cliffs, and the helmsman works to hold off.

## History

Sailors whisper that the garrison sent Malone after heresy that proved to be smuggling, so it could keep its share of the proceeds. Malone returned up the cliff path that night and judged the garrison to the last man for lying in Tyr's name. The Crown's paperwork blamed an accidental signal fire. Since the killings, the Crown has avoided deceiving Malone. This story has not been revealed at the table.

## Hidden truths

A flag on the tower means the [[drowned-maw|Drowned Maw]] is behaving unusually. The hoisted signal is the clue: the signal crew checks the Maw hoist twice before it flies, and reading it before entering the Narrows is free.

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
