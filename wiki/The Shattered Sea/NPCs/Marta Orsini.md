---
type: NPC
summary: "Le Paludi's buyer of eggs and curiosities at Studio Orsini, who paid 225 gp for Jean-Claude's whip-shark eggs."
sources:
 - "archive/ssw-session-03.md"
creature: ""
---

## At a glance

- **Role.** Proprietor of [[Studio Orsini]] in [[Le Paludi]].
- **Wants.** The strange things the sea and the nests give up, bought at her price.
- **Voice.** A buyer's patience. The price comes before the questions.
- **Found at.** [[Studio Orsini]], during the festival preparations and after.

> [!narration] First look
> Marta Orsini hears what you carry before she hears who you are, and the price follows the appraisal rather than the story. Her studio pays for what other shops call curiosity.

## Play

- **Opens them up.** A curiosity worth pricing, brought with a story.
- **Shuts them down.** None are recorded.
- **Will share.** A price for what is brought to her counter.
- **Will not share.** None are recorded.
- **If pressed.** None are recorded.

## Depth

### History

The [[Casa Lupo]] shopkeeper sends egg inquiries on to her. [[Jean-Claude Tabarnack]] brought her three fertilised [[Whip-Shark (Creature)|whip-shark]] eggs during the festival preparations and told her he had fertilised the egg himself, "the infant will have multiple extra muscles". She bought all three at 75 gp each, 225 gp the set.

### Hidden truths

Whether she believed that he had fertilised the eggs himself, and what became of the eggs, is nowhere recorded.

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
