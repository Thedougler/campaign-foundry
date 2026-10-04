---
type: NPC
summary: "Senior Calveno Waveservant who delivers Umberlee's command about the Pearl of Souls."
sources:
 - "archive/umberlee-branca.md"
 - "archive/ssw-umberlee.md"
 - "archive/ssw-umberlees-message.md"
creature: "[[Commoner]]"
---

## At a glance

- **Role.** Senior Calveno [[Waveservants|Waveservant]] and appointment-keeper.
- **Wants.** Delivery of the Pearl of Souls before any discussion of commissioners.
- **Voice.** Clipped, formal instructions that never soften Umberlee's demand.
- **Found at.** The [[Waveservant Shrine]] in Calveno.

> [!narration] First look
> A senior Calveno Waveservant keeps the appointment and delivers the message without softening it. The very Pearl of Souls must come to her first, before any other matter. Only then does she discuss the commissioners.

## Play

- **Opens them up.** The Pearl delivered and the appointment kept.
- **Shuts them down.** Demands to discuss commissioners first.
- **Will share.** Umberlee's instruction and the terms of the next conversation.
- **Will not share.** Any promise beyond the command she carries.
- **If pressed.** She repeats: “Bring me the pearl. We will talk then.”

## Depth

### History

Branca is [[Umberlee]]'s intermediary. She delivers the deity's command rather than explaining its motives. An older woman in blue-grey robes found Delmar in the Mercatura on his first day in Calveno, and she kept a shrine appointment open for him afterwards, not sleeping until he came. He gave her a lie about a prior divine errand, she believed it and wrote the deferral in her tide-table booklet, and she settled in to wait. At the night communion Umberlee possessed her over the pool at the [[Waveservant Shrine]] and snapped her neck. The sea-mist brought her back to life, and she reported every word of it to the church after.

### Hidden truths

- Her authority is delegated. She delivers Umberlee's command rather than explaining the deity's motives.
- The commissioners' fate remains contingent on the Pearl being brought first.
- She experienced her own death at the shrine as a privilege and said so: "I hope you understand my lady Umberlee's power. And her grace."

### Threads

She sits in **Bring the Pearl of Souls to Umberlee**.

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
