---
type: Creature
summary: "Master Kyzil, a unique Creature stat block from the archived NPC record."
sources:
 - "archive/master-kyzil.md"
 - "archive/ssw-session-04-ingest-recap.md"
---

## At a glance

- **Role at the table.** Master Kyzil's unique NPC combat profile, built around flight and magical strikes.
- **Threat.** Kyzil is CR 14, following the archived record used for the stat block below.
- **Tell.** Kyzil's wing movements and preparation for Cutting Gale are visible before he commits.
- **Weak to.** The responses in Tactics use cover, positioning and focused fire against Kyzil.
- **Used by.** These statistics represent the NPC Master Kyzil.

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

Apply the archived tactics to Kyzil's daggers, palm strikes and flight. Telegraph his strongest move, such as Cutting Gale, with enough warning for the Party to change position, use cover or focus their attacks. Kyzil leaves the fight if his objective is lost or his advantage fails. In the Session 04 rooftop spar the Party fought this stat block for three rounds at full strength, which is the endurance it was built for.

### Outside a fight

Kyzil can be identified ahead of an encounter through his appearance, habits and traces. His behaviour belongs to the role and habitat established for his NPC, including his quiet flight on owl wings.

## Depth

### Ecology

Take Kyzil's habitat, food and identifying signs from his archived NPC record. Observant travellers working Wisdom (Survival) recognise those signs.

### Hidden truths

Kyzil's archived NPC history includes the motives he keeps hidden. Examination or relevant questions can reveal that history or those motives.

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
