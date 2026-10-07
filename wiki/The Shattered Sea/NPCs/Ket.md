---
type: NPC
summary: "Freed Moucheron prisoner who traded blood and information for a flight home."
sources:
 - "archive/ket.md"
 - "archive/ssw-session-02.md"
creature: "[[Moucheron]]"
---

## At a glance

- **Role.** Freed prisoner of the Uncertainty.
- **Wants.** Warm blood and the shortest way back to Murrat.
- **Voice.** Careful, warm, and transactional. Every courtesy is bait.
- **Found at.** Murrat, after escaping the Surety's brig.

> [!narration] First look
> A pigeon-sized Moucheron stands too near you, thin after weeks in a cage. His Common is clear and careful, but his needle-long mouth stays aimed at the warm thing in front of him.

## Play

- **Opens them up.** Food, an open cage, and direct questions about his state.
- **Shuts them down.** Being reminded that he is small or caged.
- **Will share.** What Rook wanted and the Crown's interest in the Five Blades, for blood.
- **Will not share.** Why Rook took him unless asked directly.
- **If pressed.** Food and an open cage make him cooperative. He becomes polite and still when reminded of the cage.

## Depth

### History

Rook took Ket from Murrat as a specimen and held him three weeks in a brass cage aboard the Surety. Jean-Claude offered him blood from a wineglass, which reddened his abdomen and left him calmer, and when Crissdalynn stepped past safe distance, Ket fed from her arm. Crissdalynn shielded him from Perrin's blade, and the crew used the dead ensign's body as a lure to open the cage from across the room. Ket fed and flew home to Murrat.

### Hidden truths

- A Moucheron asked directly about its own state gives the true answer before it lies.
- Ket knows what Rook wanted with him and what the Crown sought to learn about the Five Blades, but not the wider supply chain.

### Threads

He is a freed witness to **The Crown Inspection**.

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
