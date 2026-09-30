---
type: NPC
summary: "Enormous orc master gunner whose uncanny powder sense keeps the Uncertainty's guns working."
sources:
  - "archive/thunk.md"
creature: "[[Thunk]]"
---

## At a glance

- **Role.** Master gunner of the Uncertainty.
- **Wants.** Every gun firing on command and a crew able to serve them without him.
- **Voice.** Slow, cheerful, and certain, with a heavy Port Tidefall docklands accent.
- **Found at.** The Uncertainty's gun deck.

> [!narration] First look
> An enormous middle-aged orc stands at the stern gun as though the deck was built around him. Burn-scarred hands turn a charge over and read it by smell. He grins. “Good fight. I heard it from here.”

## Play

- **Opens them up.** A gun to repair, a charge to read, or a watch to teach.
- **Shuts them down.** Rudeness about the ship's guns or an order to fire without inspection.
- **Will share.** Every practical fact about casting, fitting, loading, and repairing cannon.
- **Will not share.** How he reads powder or the chemistry degree he cannot explain.
- **If pressed.** He says a charge smells wrong and orders everyone not to touch it.

## Depth

### History

Thunk is a dockyard metallurgist and trained chemist who cast and fitted cannon in Port Tidefall for eleven years. He put a thousand gold of cannon on the Uncertainty's credit and later won silver at Tallow Row's card table, while Thassos tested and folded.

### Hidden truths

- Thunk counts as two crew when manning a ship's weapon. This gives a short-handed gun watch enough hands.
- His personal numbers have not been filed. The crew rules, not a bespoke stat block, are the established combat basis.

### Threads

He is a practical crew contact aboard the Uncertainty and a link to **The Crown Inspection**.

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
