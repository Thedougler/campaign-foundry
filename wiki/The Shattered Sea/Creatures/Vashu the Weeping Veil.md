---
type: Creature
summary: "Vashu the Weeping Veil, a unique Creature stat block from the archived NPC record."
sources:
 - "archive/vashu-the-weeping-veil.md"
---

## At a glance

- **Role at the table.** A one-of-a-kind opponent, faced as the blind grung this block describes.
- **Threat.** CR 8, the rating her archived record carries.
- **Tell.** The crack of a shattered bone vial comes a breath before her bitter mist fills the air.
- **Weak to.** Attacks from beyond her forty-foot echo sense, and Party members spread wider than the ten feet her Deflection guards.
- **Used by.** The NPC who bears her name carries this stat block.

> [!narration] First sight
> The Creature's distinctive silhouette and signature tell are apparent before it attacks.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Vashu, the Weeping Veil"
size: Small
type: humanoid
subtype: grung
alignment: lawful evil
ac: "20 (unarmored, perfected Still-Water Discipline)"
hp: 165
hit_dice: "22d6 + 88"
speed: "30 ft., climb 30 ft."
stats: [14, 20, 18, 11, 20, 13]
saves:
  - Dex: +8
  - Con: +7
  - Wis: +8
skillsaves:
  - Acrobatics: +8
  - Athletics: +5
  - Insight: +8
  - Perception: +8
  - Stealth: +8
damage_immunities: "poison"
condition_immunities: "blinded, poisoned"
senses: "blindsight 40 ft. (blind beyond this radius), passive Perception 18"
languages: "Grung"
cr: 8
traits:
  - name: Blind Discipline
    desc: "Vashu can't use sight and is unaffected by anything that relies on seeing her or on obscured vision. A constant, rapid tongue-click lets her perceive everything within 40 feet by echo, vibration, and scent, ignoring darkness, fog, invisibility, and her own Weeping Veil. An attacker Vashu can perceive gains no benefit from being unseen."
  - name: Standing Leap
    desc: "Vashu's long jump is 30 feet and her high jump is 20 feet, with or without a running start."
  - name: Evasion
    desc: "When Vashu is subjected to an effect that allows a Dexterity saving throw for half damage, she instead takes no damage on a success and half on a failure."
  - name: "Slippery Grip (3/Day)"
    desc: "Vashu has advantage on ability checks and saving throws to avoid or escape being grappled or restrained. In addition, if she fails a saving throw, or a creature attempts to grapple or restrain her, she can choose to succeed on the save instead, or cause the grapple/restrain attempt to automatically fail , she must decide before knowing whether the roll would have succeeded."
  - name: Venom-Wet Strikes
    desc: "A creature that hits Vashu with a melee attack while within 5 feet of her, or that grapples her, must succeed on a DC 16 Constitution saving throw or be poisoned until the start of its next turn."
actions:
  - name: Multiattack
    desc: "Vashu makes three Still-Water Strike attacks."
  - name: Still-Water Strike
    desc: "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) bludgeoning damage. If the target is poisoned, it also takes 9 (2d8) poison damage."
bonus_actions:
  - name: Tongue Lash
    desc: "Vashu lashes her tongue at one creature she can perceive within 20 feet. Ranged Weapon Attack: +8 to hit. Hit: 5 (1d4 + 3) bludgeoning damage, and Vashu pulls the target up to 15 feet toward her, to an unoccupied space, ending the pull early if it would put the target in danger (e.g. A fall, hazard, or lava). No effect on a target two or more size categories larger than Vashu."
  - name: "Weeping Veil (Recharge 5–6)"
    desc: "Vashu shatters a bone vial, releasing a bitter mist in a 25-foot-radius sphere centered on herself. The area is heavily obscured until the start of her next turn. Each creature that starts its turn in the area, or enters it for the first time on a turn, must succeed on a DC 16 Constitution saving throw or be blinded and poisoned until the end of that turn. Vashu is unaffected. She carries 4 vials."
  - name: Step of the Tide
    desc: "Vashu takes the Dash or Disengage action."
reactions:
  - name: Still-Water Deflection
    desc: "When Vashu or an ally within 10 feet of her is hit by a ranged attack Vashu can perceive, she reduces the damage to that target by 15 (2d10 + 4). If this reduces the damage taken by Vashu herself to 0, she can redirect the missile at a creature she can perceive within 30 feet: +8 to hit, 12 (2d10 + 1) damage of the triggering attack's type."
legendary_actions:
  - name: "Legendary Actions"
    desc: "Vashu can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. Vashu regains spent legendary actions at the start of her turn."
  - name: Reposition
    desc: "Vashu moves up to half her speed without provoking opportunity attacks."
  - name: Still-Water Strike (Costs 1 Action)
    desc: "Vashu makes one Still-Water Strike attack."
  - name: "Pressure Point (Costs 2 Actions, Recharge 5–6)"
    desc: "Vashu strikes a nerve cluster on one creature she can perceive within 5 feet. The target must make a DC 16 Constitution saving throw. On a failure, it is stunned until the end of Vashu's next turn. On a success, its speed is halved and it is poisoned until the end of its next turn."
```

## Play

### Tactics

Lead with the bone vial. Its shatter is the telegraph, and the mist that follows blinds every eye but hers while she moves freely within it. Her tongue drags one victim fifteen feet to her waiting hands, and her nerve strike drops the hardest hitter. Cover and concentrated fire answer both, and she withdraws once her purpose is spent or the fight turns against her.

### Outside a fight

Her constant tongue-click and the bitter tang of her mist mark her passage before an encounter. Away from a fight she keeps to the role and haunts her archived record assigns her.

## Depth

### Ecology

Her haunts, food, and trail signs rest in the archived NPC record. A traveller reading her signs rolls Wisdom (Survival).

### Hidden truths

Her past and her hidden purposes lie in the archived record. Close examination or the right questions bring them into the open.

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
