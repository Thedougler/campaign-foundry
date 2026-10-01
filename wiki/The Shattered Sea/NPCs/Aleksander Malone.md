---
type: NPC
summary: "A reserved Hound of Tyr whom the Dravosi Crown releases only for confirmed Flock infiltration and righteous judgement."
sources:
 - "archive/aleksander-malone.md"
creature: ""
---

## At a glance

- **Role.** Rival and Crown hunter, Hound of Tyr, running the [[Grigori and the Crown hunt]].
- **Wants.** To hunt confirmed Khlysty Flock infiltration and deliver judgement.
- **Voice.** Clipped, formal sentences with the finality of a verdict.
- **Found at.** Blackrule, a chapter house cut into volcanic terrace-rock in the southern Midchain. The Dravosi Crown deploys him from there.

> [!narration] First look
> You meet a tall, spare high elf in a Crown-service coat that has been through worse than tailoring can hide. Salt and something older cling to the wool. His steady hands rest open at his sides, ready to move, and his fingers touch his lips in a gesture quick as a blessing before his eyes finish assessing you. “State your name and your allegiance.”

## Play

- **Opens them up.** A confirmed heretic or a clear, lawful statement of allegiance.
- **Shuts them down.** Threats to a protected Heir-like asset or evasive negotiation. Interference with a confirmed judgement also closes him down.
- **Will share.** The Crown's confirmation and the target of his hunt.
- **Will not share.** A compromise to his orders or an unconfirmed accusation.
- **If pressed.** His calm turns cold. He says, “There is nothing to negotiate.”
- **Combat profile.** AC 18, 195 HP, speed 30 ft. CR 14. Regeneration, Heretic's Bane, Sneak Attack, and 7th-level Wisdom spellcasting (DC 17) define him. Blessed longsword and bayonet attacks, Bayonet Barrage, Action Surge, Spiritual Weapon, Rebuke the Unclean, Guided Judgement, and Withdraw by Judgement define his threat.

## Depth

### History

Malone trains at Blackrule and leaves only when formal confirmation reaches him. He hunted Shepherd Grigori aboard the HCS Ordinance under merchant cover. After he was released in public at Sarns Landing, the result was so violent that the Crown made confirmation a requirement before releasing him again. A former handler did not survive contact.

### Hidden truths

- The Crown's confirmation rule is both his authorisation and his leash. The Party can interfere by challenging whether a target is formally confirmed.
- His grim joy appears only when someone gives him a true heretic to judge. Otherwise, he remains patient and almost still.

### Threads

- [[The Crown Inspection]], where Malone embodies the Crown's law and its willingness to turn inspection into judgement.
- [[Drowned Maw Awakening]], where his hunt for Grigori and the Flock connects Crown policy to the Sentinel split.

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
