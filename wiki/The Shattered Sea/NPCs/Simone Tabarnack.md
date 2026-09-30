---
type: NPC
summary: "Purple-caste Grung officer pursuing Jean-Claude while an unmaintained rite threatens her rise to Gold."
sources:
  - "archive/simone-tabarnack.md"
creature: "[[Commoner]]"
---

## At a glance

- **Role.** Sorn garrison officer and Grung toxin supplier to the Dravosi Crown.
- **Wants.** To become true Gold, capture Jean-Claude, and eventually rule the Grung with him.
- **Voice.** Disciplined, certain, and caste-bound: “The caste order is not a choice.”
- **Found at.** Sorn and the Grung scouting network around the Midchain.

> [!narration] First look
> A compact purple-caste Grung officer stands in undecorated armour, spear easy in hand. Her eyes map the room before she speaks, and black skin breaks into visible bands and dots of gold beneath the armour.

## Play

- **Opens them up.** Duty, proof that her people can out-plan Gold, and a useful path to Jean-Claude.
- **Shuts them down.** Questions about her partial gold colour, Ozzeth, or her betrayal of Jean-Claude and Pell.
- **Will share.** The caste order, her garrison's safety, and official reasons for the hunt.
- **Will not share.** The colour-sealing rite or the Crown's toxin bargain.
- **If pressed.** She uses scouts and official authority. If Jean-Claude refuses, she captures rather than kills him.

## Depth

### History

Simone stayed in Sorn when Jean-Claude fled and reported him and Pell, believing the caste order made the choice right. She became a garrison folk hero by refusing to spend her soldiers carelessly. She independently found the suppressed colour-sealing rite and cast it on herself. Ozzeth maintained it until his death.

### Hidden truths

- Her incomplete Ossketh is still running as arcane transmutation. It is unmaintained, and Detect Magic reveals a spell caught mid-execution.
- She supplied the Crown with Grung poison and built the Calveno raid as a public demonstration. Ozzeth's death now drives her against Karath's toxin monopoly.

### Threads

She drives **Simone's Hunters** and supplies the hidden poison trail in **The Crown Inspection**.

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
