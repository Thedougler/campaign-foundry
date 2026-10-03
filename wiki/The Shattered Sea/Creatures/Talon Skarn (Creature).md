---
type: Creature
summary: "Talon Skarn (Creature), a unique Creature stat block from the archived NPC record."
sources:
 - "archive/talon-skarn.md"
---

## At a glance

- **Role at the table.** The unique NPC Talon Skarn's Creature profile, with weapons and flight for aerial combat.
- **Threat.** Skarn's statistics below retain CR 13 from his archived record.
- **Tell.** Skarn's dive and the motion of his chained sickles warn of his signature attacks before he commits.
- **Weak to.** Tactics supplies responses to Skarn through cover, focused fire and positioning.
- **Used by.** This profile is used for the NPC Talon Skarn.

> [!narration] First sight
> The Creature's distinctive silhouette and signature tell are apparent before it attacks.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Talon Skarn"
size: Medium
type: humanoid
subtype: aarakocra
alignment: lawful neutral
ac: 19
hp: 195
hit_dice: "23d8 + 92"
speed: "50 ft., fly 90 ft."
stats: [14, 22, 18, 12, 20, 14]
saves:
  - dexterity: 11
  - constitution: 9
  - wisdom: 10
skillsaves:
  - acrobatics: 16
  - insight: 10
  - perception: 10
  - stealth: 11
senses: "Passive Perception 20"
languages: "Auran, Common"
cr: 13
traits:
  - name: Evasion
    desc: "When Talon is subjected to an effect that allows him to make a Dexterity saving throw to take only half damage, he instead takes no damage on a successful save and half damage on a failed save. He can't use this trait while Incapacitated."
  - name: Legendary Resistance (3/Day)
    desc: "If Talon fails a saving throw, he can choose to succeed instead."
  - name: Skyhunter
    desc: "Opportunity Attacks against Talon have Disadvantage while he is flying."
  - name: Peregrine Dive
    desc: "If Talon flies at least 30 feet downward in a straight line immediately before hitting a creature with his Katana, the attack deals an extra 13 (3d8) Slashing damage, and the target must succeed on a DC 18 Strength saving throw or have the Prone condition. Talon can deal this extra damage only once per turn."
  - name: Stunning Strike (1/Turn)
    desc: "Immediately after Talon hits a creature with a melee attack during his turn, he can force it to make a DC 18 Constitution saving throw. On a failed save, the creature has the Stunned condition until the start of Talon's next turn. On a successful save, its Speed is halved until then, and the next attack roll made against it before then has Advantage."
actions:
  - name: Multiattack
    desc: "Talon makes three attacks, using Katana, Kusarigama, or Sai in any combination."
  - name: Katana
    desc: "Melee Attack Roll: +11, reach 5 ft. Hit: 17 (2d10 + 6) Slashing damage."
  - name: Kusarigama
    desc: "Melee Attack Roll: +11, reach 20 ft. Hit: 15 (2d8 + 6) Slashing damage. If the target is Large or smaller, Talon can pull it up to 10 feet toward himself."
  - name: Sai
    desc: "Melee Attack Roll: +11, reach 5 ft. Hit: 13 (2d6 + 6) Piercing damage, and the target has Disadvantage on the next attack roll it makes before the start of Talon's next turn."
  - name: Kusarigama Tempest (Recharge 5–6)
    desc: "Talon whirls both chained sickles around himself. Each creature of his choice in a 20-foot Emanation must make a DC 19 Dexterity saving throw. Failure: 27 (6d8) Slashing damage, and Talon either pulls the creature up to 15 feet toward himself or gives it the Prone condition. Success: Half damage only."
bonus_actions:
  - name: Step of the Falcon
    desc: "Talon takes the Dash or Disengage action."
reactions:
  - name: Deflect Attack
    desc: "Trigger: Talon is hit by an attack roll. Response: Talon reduces the attack's damage to himself by 18 (2d10 + 7). If this reduces the damage to 0, Talon can immediately move up to 10 feet without provoking Opportunity Attacks."
legendary_actions:
  - name: ""
    desc: "Legendary Action Uses: 3. Immediately after another creature's turn, Talon can expend one use to take one of the following actions. He regains all expended uses at the start of his turn."
  - name: Chain Snap
    desc: "Talon makes one Kusarigama attack. He can't use Chain Snap again until the start of his next turn."
  - name: Crossing Sai
    desc: "Talon makes one Sai attack. He can't use Crossing Sai again until the start of his next turn."
  - name: Wingbeat Step
    desc: "Talon moves up to half his Speed without provoking Opportunity Attacks. He can't use Wingbeat Step again until the start of his next turn."
```

## Play

### Tactics

Follow Skarn's archived tactics when using his weapons and aerial movement. Telegraph his most powerful option, whether a dive or a sweep of his chained sickles, and let the Party answer by repositioning, finding cover or concentrating fire. Skarn withdraws when he loses his objective or his advantage.

Talon attacked Crissdalynn at the River Slack Basin. One Legendary Resistance is spent.

### Outside a fight

Skarn's appearance, habits and traces distinguish him before an encounter. His flight and chained sickles are part of that identity. His actions follow the habitat and role established for the NPC.

## Depth

### Ecology

Skarn's archived NPC record is the source for his habitat, diet and signs. Travellers with an eye for those signs can identify them through Wisdom (Survival).

### Hidden truths

For Skarn's past and his concealed motives, turn to his archived NPC account. Both can be uncovered through examination or relevant questioning.

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
