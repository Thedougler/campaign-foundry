---
type: Item
summary: "A warm fragment of Otar the Foul's hide that grants conditional regeneration to its attuned bearer."
sources:
  - "archive/a-sliver-of-the-unstable-form.md"
---

## At a glance

- **Kind.** Wondrous item.
- **Rarity.** Very rare.
- **Attunement.** Required.
- **Changes.** Grants 2d8 Hit Points per turn for 1 minute unless Fire or Acid suppresses it.
- **Held by.** [[Catarina Da'Virelli]] in her Calveno workshop.

> [!narration] First look
> A fist-sized fragment of red hide stays warm and damp-looking. Its edge seems to close a little further, so slowly that you cannot tell whether it moves or merely pauses.

## Play

### Properties

As a Bonus Action, invoke the sliver. For 1 minute, regain 2d8 Hit Points at the start of each turn. Fire or Acid damage taken since the end of the previous turn suppresses that turn's healing; it resumes next turn unless blocked again. Once invoked, it cannot be invoked again until a Long Rest. It works at 0 Hit Points and can end Unconscious.

### In use

The bearer can dismiss it without an action. Invoking it again before the first use ends has no additional effect; only the bearer gains the benefit. Fire and Acid are the clear tactical counter.

## Depth

### History

The sliver tore loose from [[Otar the Foul]] after the creature fell in [[Solange Barret]]'s summoning circle. Catarina holds it as possible raid-site loot.

### Hidden truths

Its persistence after separation is unexplained. The suppression types mirror the damage that stopped Otar, but whether that connection means more is unknown; Arcana or study of Otar can expose the question.

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
