---
type: NPC
summary: "Korabl of the Flock, a healer whose blood-anchor survival trick feeds an undead ascension."
sources:
  - "archive/shepherd-grigori.md"
creature: "[[Shepherd Grigori]]"
---

## At a glance

- **Role.** Wandering healer and Korabl of the Khlysty Flock.
- **Wants.** To ascend beyond what a Hierarch can be, using healed noble houses as fuel.
- **Voice.** Warm, practical, and intimate. A glass of wine never leaves his hand.
- **Found at.** Noble courts across the Crown Islands and Tessarine Concordat.

> [!narration] First look
> A rugged man in rich red and gold coats carries wine through the room as though it exists for his conversation. His hands are cold. His eyes hold yours before the pointed question arrives.

## Play

- **Opens them up.** A person who answers his questions plainly and accepts help.
- **Shuts them down.** Suspicion that turns his kindness into an accusation.
- **Will share.** Miraculous healing and warnings about Crown politics.
- **Will not share.** What his magic anchors in a healed body.
- **If pressed.** He ends a fight without killing if possible. A cornered enemy meets domination and mass suggestion.

## Depth

### History

Grigori heals heirs of diseases and wounds past cure, then leaves without asking payment. His healing began binding patients as unwitting phylactery threads, making him a secret undead sorcerer and shepherd of the Khlysty. He travelled aboard the Surety and healed Jean-Claude.

### Hidden truths

- Necromancy binds a patient's blood to Grigori. A DC 22 Arcana check can detect the thread. Counterspell disrupts both healing and binding.
- He has warned the crew about Rupert Knighton and asked them to wound Corbin Knighton without killing him, so he can “rescue” him and bind the house.

### Threads

He drives the **Growing Flock** front and is linked to **Bring the Pearl of Souls to Umberlee**.

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
