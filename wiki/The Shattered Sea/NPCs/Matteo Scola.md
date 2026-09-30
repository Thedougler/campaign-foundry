---
type: NPC
summary: "Wreck survivor who lives by Aruhe's fallen-fruit rule and will not approach Hinewai."
sources:
  - "archive/matteo-scola.md"
creature: "[[Commoner]]"
---

## At a glance

- **Role.** Calveno wreck survivor and guide to Aruhe's survival rule.
- **Wants.** To get off Aruhe and aboard the Uncertainty. He will not go inland.
- **Voice.** Short, wet bursts repeated when frightened.
- **Found at.** The river slack basin, travelling with the party after Session 11.

> [!narration] First look
> A thin man in a torn, salt-stiff shirt watches the treeline more than faces. One hand rests on a knotted sling of fallen ghost-plums at his hip.

## Play

- **Opens them up.** Food, questions about fruit, and a promise of the ship.
- **Will share.** Fallen fruit is yours, and living trees are untouched.
- **Will not share.** The woman's name or why he thinks the other survivors are mad.
- **If pressed.** He clutches the sling and asks for the ship. He stays out of fights.

## Depth

### History

The party pulled Matteo from three river otters' game at the Slack Basin. He taught them Aruhe's rule, ate a ghost plum, vanished, and returned. He splits from Renzo's camp when Renzo begins listening to Hinewai's voice.

### Hidden truths

- Talon Skarn watched Matteo vanish and learned what the ghost plum does, but Matteo does not know he was seen.
- Matteo once travelled with the Ferrante family and Renzo. He stayed by the river because he thought the inland survivors were mad.

### Threads

He is a witness in **Taking on Aruhe** and the first sign of Skarn's surveillance.

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
