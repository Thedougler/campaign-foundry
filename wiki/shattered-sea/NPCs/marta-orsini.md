---
type: NPC
summary: "Le Paludi's buyer of eggs and curiosities at Studio Orsini, whom the
  Casa Lupo shopkeeper sends egg inquiries to."
sources:
  - "archive/ssw-session-03.md"
  - "archive/ssw-session-04-ingest-recap.md"
creature: ""
revealed: ""
title: "Marta Orsini"
---

## At a glance

- **Role.** Proprietor of [[studio-orsini|Studio Orsini]] in [[le-paludi|Le Paludi]].
- **Wants.** The strange things the sea and the nests give up, bought at her price.
- **Voice.** A buyer's patience. The price comes before the questions.
- **Found at.** [[studio-orsini|Studio Orsini]], during the festival preparations and after.

> [!narration] First look
> Marta Orsini hears the thing before she hears the person, and the price follows the appraisal rather than the story. Her studio pays for what other shops call curiosity.

## Play

- **Opens them up.** A curiosity she can price, brought with a story.
- **Shuts them down.** None are recorded.
- **Will share.** A price for what is brought to her counter.
- **Will not share.** None are recorded.
- **If pressed.** None are recorded.

## Depth

### History

The [[casa-lupo|Casa Lupo]] shopkeeper sends egg inquiries on to her. [[jean-claude-tabarnack|Jean-Claude Tabarnack]] brought three fertilised [[whip-shark|whip-shark]] eggs to [[le-paludi|Le Paludi]] during the festival preparations and told her he had fertilised the egg himself, "the infant will have multiple extra muscles". The eggs sold at the Le Paludi market instead, at 100 gp each and 300 gp the set, paid in platinum.

### Hidden truths

Whether she believed that he had fertilised the eggs himself, and where the market sale left her, is nowhere recorded.

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
