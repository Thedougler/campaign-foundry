---
type: Creature
summary: "Solange Barret, a unique Creature stat block from the archived NPC record."
sources:
 - "archive/solange-barret.md"
---

## At a glance

- **Role at the table.** Unique named Creature represented by the NPC.
- **Threat.** See the stat block (CR as listed in the archived record).
- **Tell.** Its signature movement or attack is visible before it commits.
- **Weak to.** The counter play described in Tactics.
- **Used by.** The NPC of the same name.

> [!narration] First sight
> The Creature's distinctive silhouette and signature tell are apparent before it attacks.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Solange Barret"
size: Small
type: humanoid
subtype: grung
alignment: Lawful Evil
ac: 13
hp: 66
hit_dice: 12d6 + 24
speed: "25 ft., Climb 25 ft."
stats: [7, 16, 14, 14, 12, 16]
saves:
  - wisdom: 3
  - charisma: 5
skillsaves:
  - arcana: 4
  - deception: 5
  - stealth: 5
damage_immunities: "poison"
condition_immunities: "poisoned"
senses: "Darkvision 60 ft., Passive Perception 11"
languages: "Grung, Common, Deep Speech"
cr: "3"
traits:
  - name: "Amphibious"
    desc: "Solange can breathe air and water."
  - name: "Poisonous Skin"
    desc: "Any creature that grapples Solange or comes into direct contact with her skin must succeed on a DC 12 Constitution saving throw or become poisoned for 1 minute. A poisoned creature can repeat the saving throw at the end of each of its turns, ending the effect on a success."
  - name: "Standing Leap"
    desc: "Solange's long jump is up to 25 feet and her high jump is up to 15 feet, with or without a running start."
  - name: "Circle Ward"
    desc: "While within 10 feet of the summoning circle, Solange has advantage on Constitution saving throws to maintain concentration and her AC increases by 2 (to AC 15). The active circle sheds bright light in a 10-foot radius and dim light for an additional 10 feet."
  - name: "Pact Magic"
    desc: "Solange is a 5th-level warlock. Her spellcasting ability is Charisma (spell save DC 13, +5 to hit with spell attacks). She has the following spells:\n\nCantrips (at will): Eldritch Blast (2 beams), Minor Illusion, Poison Spray\n3rd level (2 slots): Hex, Hold Person, Misty Step\n1/day each: Dimension Door, Mirror Image"
actions:
  - name: "Eldritch Blast"
    desc: "Ranged Spell Attack: +5 to hit, range 120 ft., two beams. Hit: 8 (1d10 + 3) force damage per beam."
  - name: "Dagger"
    desc: "Melee or Ranged Weapon Attack: +5 to hit, reach 5 ft. Or range 20/60 ft., one target. Hit: 5 (1d4 + 3) piercing damage plus 5 (2d4) poison damage."
reactions:
  - name: "Counterspell (Pact Magic Slot)"
    desc: "When Solange sees a creature within 60 feet casting a spell, she can expend a Pact Magic slot to attempt to interrupt it. The spell fails if it is 3rd level or lower. For higher-level spells, she must succeed on a DC 13 + spell level Charisma check (+5)."
```

## Play

### Tactics

Use the archived tactics and signature abilities. Telegraph the strongest option and let the Party answer with positioning, cover, or focused fire. It withdraws when its objective is lost or its advantage is gone.

### Outside a fight

Its appearance, habits, and traces identify it before an encounter. It acts according to the NPC's established role and habitat.

## Depth

### Ecology

This unique Creature's habitat, diet, and signs follow the archived NPC record. Observant travellers can identify its signs with Wisdom (Survival).

### Hidden truths

The archived NPC record contains the Creature's history and concealed motives. Examination or relevant questioning can reveal them.

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
