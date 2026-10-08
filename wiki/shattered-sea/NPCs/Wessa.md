---
type: NPC
summary: "Saltwright's cook; impossible standards, zero theatrics, the food just appears."
sources:
 - "archive/ssw-beaumonts-crew.md"
creature: ""
---

## At a glance

- **Role.** Cook of the [[Saltwright]], running her galley under [[Beaumont Sel]].
- **Wants.** The crew fed well, whatever the provisions say is possible.
- **Voice.** Short declarative sentences, none wasted.
- **Found at.** The [[Midchain]] run, aboard the [[Saltwright]], in the galley.

> [!narration] First look
> A stocky, grey-haired woman works the galley without hurry or waste, and the smell coming off her pots is better than anything this far from a port has a right to be. She speaks without turning. "Food's at the bell. Keep out of my way until then."

## Play

- **Opens them up.** Eat properly, say so plainly, and clear your own bowl. She notices who treats the food with respect.
- **Shuts them down.** Hovering in the galley, fussing, or offering advice on her own pots.
- **Will share.** The state of the stores, what the crew is eating, and whether the route ahead will thin the larder.
- **Will not share.** How she does it. Ask where the extra quality comes from on what the ship can provision, and she shrugs and changes the subject.
- **If pressed.** "Salt, heat, and time. There's no trick beyond that." She means it, and she is not going to expand on it.

## Depth

### History

Has kept the [[Saltwright]]'s galley with methodical competence and no theatrics, and the crew eats better than the provisions should allow. She works to impossible standards, and the food just appears.

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
