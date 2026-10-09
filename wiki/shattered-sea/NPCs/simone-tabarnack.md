---
type: NPC
summary: "Purple-caste Grung officer pursuing Jean-Claude while an unmaintained
  rite threatens her rise to Gold."
sources:
  - "archive/simone-tabarnack.md"
  - "archive/ssw-midchain.md"
  - "archive/ssw-session-01.md"
  - "archive/ssw-the-canister.md"
  - "archive/collab-2026-10-04-calveno-and-rattkin-bounty.md"
  - "archive/agentic-co-dm-simone-tabarnack-narration.md"
creature: "[[commoner|Commoner]]"
revealed: "Backstory"
title: "Simone Tabarnack"
---

## At a glance

- **Role.** Jean-Claude Tabarnack's younger sister, Sorn garrison officer and Grung toxin supplier to the Dravosi Crown.
- **Wants.** To become true Gold, capture Jean-Claude, and eventually rule the Grung with him.
- **Voice.** Disciplined, certain, and caste-bound: “The caste order is not a choice.”
- **Found at.** Sorn and the Grung scouting network around the Midchain.

> [!narration] First look
> A compact grung officer of the purple caste steps in, spear easy in one hand, her fitted armour worn smooth and unadorned. Her eyes go first. They take doors and corners, and she is moving again before they finish. A chemical sharpness comes off the oil on her armour as she passes, and bands and dots of gold show in her black skin at the gaps. She speaks before any greeting and gives an order once. The spear stays in her hand when she sits.

## Play

- **Opens them up.** Duty, proof that her people can out-plan Gold, and a useful path to Jean-Claude.
- **Shuts them down.** Questions about her partial gold colour, Ozzeth, or her betrayal of Jean-Claude and [[pell|Pell]].
- **Will share.** The caste order, her garrison's safety, and official reasons for the hunt.
- **Will not share.** The colour-sealing rite or the Crown's toxin bargain.
- **If pressed.** She uses scouts and official authority. If Jean-Claude refuses, she captures rather than kills him.

## Depth

### History

She stayed in Sorn when Jean-Claude fled and reported him and [[pell|Pell]], believing the caste order made the choice right. She became a garrison folk hero by refusing to spend her soldiers carelessly. She independently found the suppressed colour-sealing rite and cast it on herself, too early: the [[gold-fruit|gold fruit]] she needed grew on [[karath|Karath]]'s secret farms, and the small quantity she bought from outside Karath's control left the colour unfinished. Ozzeth maintained her rite until his death.

### Hidden truths

- Her incomplete Ossketh is still running as arcane transmutation. It is unmaintained, and Detect Magic reveals a spell caught mid-execution.
- She sealed it too early because she lacked access to the gold fruit, and the small quantity she obtained from outside Karath's control was not enough to finish the colour.
- The Gold caste could not deny her gold without exposing what the diet does, so they go along with her and treat her as showing signs of divinity.
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
