---
type: NPC
summary: "Crown ensign and navigator of the HCS Surety, shot through a gun port by Delmar Fisk; the Party fed his body to Ket."
sources:
 - "archive/Session 02 - Recap.md"
 - "archive/session-02-recap.md"
 - "archive/ket.md"
 - "archive/ssw-session-02.md"
creature: ""
---

## At a glance

- **Role.** Ensign and navigator of the HCS Surety under the Dravosi Crown.
- **Wants.** None now. He died in the fight for the cutter.
- **Found at.** Nowhere living. He fell aboard the HCS Surety, and his body went to Ket.

> [!narration] First look
> The musket ball crosses the cutter through the far gun port and an ensign drops across the gun behind it. The Surety's guns had been ready to answer. They never do. His name reached you later, ensign Wouters, the Surety's navigator. By then the crew had given his body to the starving thing in the brass cage below.

## Play

He is dead. His death stopped the Surety's guns, and his body fed Ket before Ket flew home to Murrat.

## Depth

### History

Wouters sailed as the HCS Surety's navigator under Barnaby Rook. In the fight for the cutter, Beaumont Sel sent Bisou through one gun port to foul its powder, and Delmar Fisk put a musket ball through the other port, killing him. With the guns silenced, Rook fell to the Party. Below deck, the crew gave Wouters's body to Ket, the Moucheron Rook had kept caged, and Ket fed and flew towards Murrat.

### Threads

His death moved [[The Crown Inspection]]: the Party took the Crown cutter, and Crown ships still trace the renamed prize.

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
