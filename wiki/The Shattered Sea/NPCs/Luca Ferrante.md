---
type: NPC
summary: "Sixteen-year-old wreck survivor who counts everything and knows which way his uncle walked."
sources:
 - "archive/luca-ferrante.md"
creature: "[[Commoner]]"
---

## At a glance

- **Role.** Wreck survivor and guide to the fruit-pile trail.
- **Wants.** To carry his father out, then find his uncle Carlo.
- **Voice.** Short sentences with numbers first. Counting keeps him calm.
- **Found at.** The lava-tube ledge beneath the smoking skylight.

> [!narration] First look
> A lanky boy's lips move over a count he has not finished, and he gives you the numbers, “Four of us. Three can walk. How many can you carry?”

## Play

- **Opens them up.** A promise to carry Ettore.
- **Shuts them down.** Calling Carlo dead.
- **Will share.** The voice at Spoke Ring, the route north-east, and every fruit pile.
- **Will not share.** His fear that the tally is running out.
- **If pressed.** He follows the party while light remains, then walks on alone after twenty minutes stopped.

## Depth

### History

Luca led Ettore, Piero, and Gianni after Carlo followed Hinewai's voice. A terror-bird drove them over the smoking skylight into the lava tube. He has scratched nineteen days into the wall and arrives at the twentieth ready to find Carlo.

### Hidden truths

- The tally is a promise. Luca decided he would go after Carlo on the twentieth day, alone if he had to.

### Threads

He is a guide and survivor in **Taking on Aruhe**.

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
