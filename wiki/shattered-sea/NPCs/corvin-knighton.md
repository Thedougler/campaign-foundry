---
type: NPC
summary: "Rupert Knighton's nephew and heir, a Tessarine-trained bladesong
  duellist seeking recognition through personal skill."
sources:
  - "archive/corbin-knighton.md"
  - "archive/Episode-09-Transcript.md"
creature: ""
revealed: ""
title: "Corvin Knighton"
---

## At a glance

- **Role.** Nephew and heir to [[rupert-knighton|Rupert Knighton]], distinct from the Crown boarder [[corbin-knighton|Corbin Knighton]].
- **Wants.** Recognition as House Knighton's successor through his own swordsmanship and duelling reputation.
- **Voice.** Precise court diction, measured questions and little naval jargon.
- **Found at.** His present location is unknown. He belongs to House Knighton.

> [!narration] First look
> A young Dravosi duellist faces you, his skin darkened by the sun. Scars from challenges mark his skin. His hand slides his blade a little way out of its sheath, and leather whispers as he pushes it back. He says, “My uncle wins wars. I intend to win duels. A smaller thing, cleaner. Mine alone.”

## Play

- **Opens them up.** Skill demonstrated through action or a personal challenge.
- **Shuts them down.** Inherited rank invoked as an argument, and abstract loyalty.
- **Will share.** His preference for settling disputes through formal duels.
- **Will not share.** His fear of becoming a ceremonial heir whose training counts for nothing.
- **If pressed.** He issues a challenge. His habitual partial draw and sheathing quicken under pressure.

## Depth

### History

Rupert's nephew studied bladesong at a Tessarine court on a diplomatic exchange. He returned skilled in swordsmanship and casting spells, along with continental manners that divided House Knighton's officers. He has never commanded a ship. The officer who boarded the [[uncertainty|Uncertainty]] in Session 9 was Corbin, not Corvin.

### Hidden truths

His claim to authority depends on his personal reputation. His training has yet to win him a faction within the house he expects to inherit. He fears his uncle will value only naval doctrine and dismiss him as a ceremonial successor. His repeated drawing and sheathing of the blade betrays the need to demonstrate mastery.

### Threads

House Knighton's succession connects him to Rupert's naval command. [[corbin-knighton|Corbin Knighton]] is the family's working boarder, while Corvin seeks prestige through duels.

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
