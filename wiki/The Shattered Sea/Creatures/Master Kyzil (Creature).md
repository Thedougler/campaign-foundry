---
type: Creature
summary: "Master Kyzil, a unique Creature stat block from the archived NPC record."
sources:
 - "archive/master-kyzil.md"
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
name: "Master Kyzil"
size: Medium
type: humanoid
subtype: aarakocra
alignment: lawful neutral
ac: "21 (unarmored defense)"
hp: 190
hit_dice: "20d8 + 100"
speed: "55 ft., fly 90 ft."
stats: [12, 22, 20, 14, 20, 14]
saves:
  - Dex: +11
  - Con: +10
  - Wis: +10
skillsaves:
  - Acrobatics: +16
  - Insight: +10
  - Perception: +15
  - Stealth: +16
damage_resistances: "bludgeoning, piercing, and slashing from nonmagical attacks"
condition_immunities: "charmed, frightened"
senses: "passive Perception 25"
languages: "Common, Aarakocra, Auran"
cr: 14
traits:
  - name: Silent Owl Wings
    desc: "Kyzil has advantage on Dexterity (Stealth) checks made while flying."
  - name: Ki-Empowered Strikes
    desc: "Kyzil's unarmed strikes and weapon attacks are magical."
  - name: Evasion
    desc: "When Kyzil is subjected to an effect that allows a Dexterity saving throw for half damage, he takes no damage on a success and half damage on a failure."
  - name: Legendary Resistance (3/Day)
    desc: "If Kyzil fails a saving throw, he can choose to succeed instead."
actions:
  - name: Multiattack
    desc: "Kyzil makes four Wind-Edge Dagger attacks. He can replace up to two attacks with Open Palm strikes."
  - name: Wind-Edge Dagger
    desc: "Melee or Ranged Weapon Attack: +11 to hit, reach 5 ft. Or range 60/180 ft., one target. Hit: 8 (1d4 + 6) piercing damage plus 7 (2d6) force damage. The dagger returns to Kyzil's hand immediately after a ranged attack."
  - name: Open Palm
    desc: "Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) bludgeoning damage, and the target must succeed on a DC 19 Strength saving throw or be pushed 15 feet and knocked prone."
  - name: Cutting Gale (Recharge 5-6)
    desc: "Kyzil exhales a razor-thin line of compressed air in a 60-foot line that is 5 feet wide. Each creature in that area must make a DC 19 Dexterity saving throw. On a failed save, a creature takes 36 (8d8) slashing damage, is pushed 20 feet, and is knocked prone. On a successful save, a creature takes half as much damage."
bonus_actions:
  - name: Patient Defense
    desc: "Kyzil takes the Dodge action."
  - name: Updraft Step
    desc: "Kyzil flies up to half his flying speed without provoking opportunity attacks."
reactions:
  - name: Empty Wing Parry
    desc: "When a creature Kyzil can see hits him with an attack, Kyzil adds 5 to his AC against that attack, potentially causing it to miss. If the attack misses, Kyzil can move up to 15 feet without provoking opportunity attacks."
legendary_actions:
  - name: ""
    desc: "Kyzil can take 3 legendary actions, choosing from the options below. Only one legendary action can be used at a time and only at the end of another creature's turn. Kyzil regains spent legendary actions at the start of his turn."
  - name: Silent Step
    desc: "Kyzil moves up to half his speed without provoking opportunity attacks."
  - name: Dagger Flash
    desc: "Kyzil makes one Wind-Edge Dagger attack."
  - name: Downburst (Costs 2 Actions)
    desc: "Each creature of Kyzil's choice within 10 feet must succeed on a DC 19 Strength saving throw or take 9 (2d8) bludgeoning damage, be pushed 10 feet, and be knocked prone."
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
