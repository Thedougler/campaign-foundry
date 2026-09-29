---
type: NPC
summary: "The old goblin who counts the boats at Reedholt and keeps a tame heron."
sources: []
creature: "[[Goblin Warrior]]"
---

## At a glance

- **Role.** Counts the boats that pass [[Reedholt]] and notches each one on a stick.
- **Wants.** Quiet, and his heron fed.
- **Voice.** Soft. Says a number before he says anything else.
- **Found at.** The tally house steps in [[Reedholt]].

> [!narration] First look
> An old goblin sits on the tally house steps with a heron standing beside him like a second shadow. He notches a stick without looking at it. "Thirty-nine," he says, and the heron turns its head toward you.

## Play

- **Opens them up.** Fish for the heron.
- **Shuts them down.** Shouting near the bird.
- **Will share.** How many boats passed today.
- **Will not share.** Anything about the chapel.
- **If pressed.** He walks inside with the heron.

## Depth

### History

He has kept a tame heron named Quill for eleven years. It follows him from the tally house to the landing and back.

### Hidden truths

- Quill was hatched in the drowned chapel's bell loft, which is how Old Nib knows the loft is dry above the tideline.

### Threads

- [[The Silent Bell]]

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
