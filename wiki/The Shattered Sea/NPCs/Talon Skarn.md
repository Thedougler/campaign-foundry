---
type: NPC
summary: "Peregrine the faction apprentice hunting Crissdalynn's Fate Spinner under the Rule of Two."
sources:
 - "archive/talon-skarn.md"
creature: "[[Talon Skarn (Creature)]]"
---

## At a glance

- **Role.** Vantyrus's apprentice and flying skirmisher.
- **Wants.** The Fate Spinner for his master, then his master's death when he is ready.
- **Voice.** Level, clipped, and patient. He names people by what they carry.
- **Found at.** The Midchain and Aruhe's high air, currently hunting the party.

> [!narration] First look
> A peregrine aarakocra drops from the glare, brown wings half open and chains ticking over a black robe. His amber stare fixes on the carrier's straps before he says, “Set the toy on the stone.”

## Play

- **Opens them up.** A clean defeat or talk that treats Vantyrus as beatable.
- **Shuts them down.** Questions about his master's name, threats, or pity.
- **Will share.** Who sent him and what he wants: “My master” and “the toy.”
- **Will not share.** Vantyrus's name, routes, or the reason for the Spinner.
- **If pressed.** He cuts gear before throats. Below half health he abandons the job and returns empty-handed.

## Depth

### History

Skarn serves Vantyrus and studies every encounter as practice for killing him. Vantyrus once opened Skarn's throat and stopped. Skarn later watched Matteo vanish after eating a ghost plum, then attacked Crissdalynn at the River Slack Basin for the Fate Spinner. He spent one Legendary Resistance during that attack.

### Hidden truths

- The Rule of Two makes Skarn Vantyrus's eventual executioner. The contest ends only when one kills the other.
- Skarn does not know the Spinner's purpose. If he learns it reaches the Soul Incarnate technique, he will keep it from Vantyrus and come for it himself.

### Threads

He drives the **Rule of Two**, **Drowned Maw Awakening**, and the hunt for Crissdalynn's Fate Spinner.

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
