---
type: NPC
summary: "The youngest hand aboard the Uncertainty, a fifteen-year-old cook who
  knows every sailing manual and almost none of the sea."
sources:
  - "archive/agentic-co-dm-noor.md"
  - "archive/ssw-session-02.md"
creature: "[[Commoner]]"
revealed: "Session 2"
title: ""
---

## At a glance

- **Role.** Ship's cook (learning) aboard the [[Uncertainty]], the youngest of the crew, on the books at four gold a week, the cook rate. Served under [[Barnaby Rook]] before the capture.
- **Wants.** To sail the manuals into real experience, on a ship bound somewhere new.
- **Voice.** Questions before opinions, each one checked against the manual. When the book has no answer, the gap is proof the book needs updating.
- **Found at.** The [[Uncertainty]]'s galley, manual within reach.

> [!narration] First look
> Down the deck from you, the galley hatch breathes out the smell of stew, and a youth steps through it with a sailing manual in oilcloth under one arm. They are fifteen, maybe. A new face gets a question before it gets their name, because they learned more under way than Port Tidefall ever gave them. The book comes out for every problem, from a foul wind to a new course, and pages turn to see whether the sea has been there before. When the pages have no answer, they nod, sure the book is what needs the work. "Where are we bound? If it's not in the book, good."

## Play

- **Opens them up.** A destination they have not sailed, or a problem the manual answers.
- **Shuts them down.** Talk of putting them ashore at Port Tidefall to stay. Any other course keeps them aboard.
- **Will share.** The galley, the ship's provisions, and every sailing manual by heart.
- **Will not share.** That they hid below through the fight that cost Rook the Surety.
- **If pressed.** They go back to the book. Where the pages come up empty, they set the gap down as the book's failure and carry on.

## Depth

### History

Noor served under Barnaby Rook aboard the HCS Surety as cook, learning, at the cook rate. When Rook boarded the Saltwright and the crew took the cutter, Noor hid below and came up from it with the manual already in hand. They were named to the prize crew that keeps the renamed [[Uncertainty]] moving, its youngest member. They know every sailing manual by heart and have sailed on almost none of them. [[Shepherd Grigori]] credited them, obliquely, with being useful in the galley. Watching is how they learn.

## Links

```base
filters:
  and:
    - file.hasLink(this.file)
views:
  - type: table
    name: Linked from
    groupBy:
      property: note.type
      direction: ASC
    order:
      - file.name
      - note.summary
```
