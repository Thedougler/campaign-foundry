---
type: NPC
summary: "Korabl of the Flock, a healer whose blood-anchor survival trick feeds an undead ascension."
sources:
 - "archive/shepherd-grigori.md"
 - "archive/ssw-shepherd-grigori.md"
 - "archive/ssw-session-02.md"
creature: "Shepherd Grigori (Creature)"
---

## At a glance

- **Role.** Wandering healer and Korabl of the [[Khlysty]] Flock.
- **Wants.** To ascend beyond what a Hierarch can be, using healed noble houses as fuel.
- **Voice.** Warm, practical, and intimate. A glass of wine never leaves his hand.
- **Found at.** Noble courts across the Crown Islands and Tessarine Concordat.

> [!narration] First look
> A rugged, imposing man with flowing dark hair and an untamed beard carries his wine through the room in a rich red and gold coat, as though the glass exists for his conversation. His gaze holds a moment past comfort, and his hands are cold. When his eyes settle on you, the pointed question arrives.

## Play

- **Opens them up.** A person who answers his questions plainly and accepts help.
- **Shuts them down.** Suspicion that turns his kindness into an accusation.
- **Will share.** Miraculous healing and warnings about Crown politics.
- **Will not share.** What his magic anchors in a healed body.
- **If pressed.** He ends a fight without killing if possible. A cornered enemy meets domination and mass suggestion.

## Depth

### History

Grigori heals heirs of diseases and wounds past cure, then leaves without asking payment. His healing began binding patients as unwitting phylactery threads, making him a secret undead sorcerer and shepherd of the [[Khlysty]]. Noble courts repeat that he cannot be killed, whether by poison, drowning, or worse, and have stopped asking how.

He travelled aboard the [[Uncertainty|Surety]]. In the galley he set the table for the crew, heard the Party out on what kind of pirates they were, and offered any crewman who wanted it free passage at the next port. He told them he would leave at [[Calven and Calveno|Calveno]] for the [[Il Gioco delle Beffe]], and it was his word about the unfed Moucheron below that sent the Party to [[Ket]]'s cage. When [[Barnaby Rook]]'s live-capture run at [[Murrat]] left four crew dying under [[Alys Kuiper]]'s care, he sat with them through the night. [[Old Faas]] credits their survival to him without knowing what that credit means. He named [[Rupert Knighton]] and the ships Knighton would send in answer to [[Cap'n Gorgeous]]'s death, and healed [[Jean-Claude Tabarnack]]'s wounds without a word or component. Red light ran from his wrist, and Arcana could not name it.

He left the Party at [[La Vasca]] and went ashore at [[Calven and Calveno|Calveno]], where an heir's physicians had given up, and where someone named [[Impuni]] had to be reached in time. The parting handshake was cold, and he gave his business in the city a week or two, with paths that might cross again.

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
