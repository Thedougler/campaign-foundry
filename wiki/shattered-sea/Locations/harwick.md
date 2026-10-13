---
type: Location
kind: Site
summary: "The Crown island whose naval yard and deep-water anchorage face the
  Central Strait, and from which the Reach patrols stage."
sources:
  - "archive/ssw-central-strait.md"
  - "archive/collab-2026-10-12-malone-massacres-and-kindled.md"
parent: "[[crown-islands|Crown Islands]]"
revealed: ""
title: "Harwick"
---

## Areas

The Admiralty's yard and the strait's northern deep-water anchorage draw visitors seeking repairs or official papers. ==A picket boat heads for the anchorage, its speaking trumpet still lowered.== Harwick Reach is the deep water south of the island. The Crown Admiralty, yard workers and patrol squadrons occupy the harbour. The Crown watches this northern strait closely. Papers decide everything. Clean records qualify a hull for yard repair or official papers.

> [!narration] Entering
> The masts show first, a stand of grey poles above the flat shore before the island resolves, and launch cranes lean among them. A frigate works the anchorage with her boards out while a picket boat puts off toward you, an ensign at her staff and a speaking trumpet in a hand that is not yet raised.

## Likely actions

- A patrol closes and asks for papers, cargo and answers.
- The yard offers repair at Crown prices to a hull with clean paperwork.
- A squadron stages out across the strait while the Party watches.

## History

The yard built the [[hcs-ordinance|HCS Ordinance]], the biggest Crown ship in the Shattered Sea, and turned its force into visible court authority.

The Crown kept the *Kittiwake*'s loss from official records. Sailors whisper that Malone sank the Crown supply brig in Harwick roads after his sense for fiends reacted to a nineteen-year-old tiefling deckhand who had never cast a spell. He did not pick her out. The brig went down with all hands, and the yard recorded it as lost in weather. The story says his sense reads infernal blood, not deeds. This remains rumour, not revealed at the table.

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
