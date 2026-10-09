---
type: Creature
summary: "Talon Skarn's Creature stat block, as played: a CR 13 falcon monk who
  hunts the Fate Spinner, flees beaten, and comes back invisible."
sources:
  - "archive/talon-skarn.md"
  - "archive/session-12-full.md"
revealed: "Session 11"
title: "Talon Skarn (Creature)"
---

## At a glance

- **Role at the table.** The falcon monk who has come twice for Crissdalynn's Fate Spinner, under orders he says spare her life and nobody else's.
- **Threat.** CR 13 with AC 19, three attacks a turn, a damage-deflecting reaction and three legendary actions. He left the river-camp fight at 12 of his 314 hit points after taking 292.
- **Tell.** Chain links tick over his forearms before his sai flies, the first warning of his dive is a faint whistle, and stolen fruit hides him only from the eye, since falling water still traces the shimmer.
- **Weak to.** No damage resistances or immunities: poison and vines took their toll. Once his three Legendary Resistances are spent his saves are his own, and his hidden outline can still be shot, as half cover.
- **Used by.** [[talon-skarn|Talon Skarn]].

> [!narration] First sight
> You wake to steel sliding along a quarterstaff, and the steel belongs to a falcon-headed figure in a black robe. He has Crissdalynn chest to chest at the dead fire, katana driving against her weapon while chains click over his forearm. His stare is already past her face and on the necklace at her throat, and his wings stay half spread for the lift the moment he has what he came for.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Talon Skarn"
size: Medium
type: humanoid
subtype: aarakocra
alignment: lawful neutral
ac: 19
hp: 314
hit_dice: "37d8 + 148"
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

He opens on the job, not on a duel. He was inside Crissdalynn's guard before the Party woke at the river camp, and his dive drops him from about fifty feet, adding 3d8 and calling for a DC 18 Strength save. Stunning Strike rides a clean hit at DC 18 Constitution, and it landed twice this Session, stunning Crissdalynn through an inspiration reroll and Perrin on a rolled 3. The chained sickle drags its catch ten feet out of position. The sai leaves its target's next attack at disadvantage and reels back to his hand on its chain. The Tempest sweeps twenty feet at DC 19 Dexterity, pulling or flooring everyone it catches, 26 to Perrin and 13 to the rest. His reaction blunts the first solid hit, and legendary actions buy him distance or one more strike. Invisible, he is harder still. Attacks roll at disadvantage against him, but a spell that needs sight can take his visible outline. Shots at the outline count as half cover for +4 AC, and his eyes give him only the direction a thrown thing came from.

Both fights this Session, he came for the Spinner and left without it. At the river camp he pinned Matteo under one talon and took the fruit pack, then lost 292 hit points to blades, bolts and a 39-damage bomb. Delmar's trip-and-explosive saves cost him his last Legendary Resistance, and he flew inland at 12 of 314, unseen after eating the stolen fruit. At the night camp he came back the same way. His dive broke Crissdalynn's arm at the elbow and stunned her through two tied saves, and he throttled her while demanding the Spinner's location. Delmar's falling chair came down on his shimmer for 26, of which he deflected 18. He stunned Perrin with an unarmed strike, and the save he passed confirmed his Legendary Resistances were gone. The fight was still live when the recording stopped.

### Outside a fight

He roosts before he commits, hanging thirty feet up a branch to study a camp, and told Crissdalynn "I don't need to hide" while he did it. When his wounds opened, blood sprayed down from above and showed the pursuit he still flew. He keeps what he takes, too. Matteo's fruit pack and Matteo's hat went inland with him, the fruit eaten on the wing, and an arrow loosed blind into the dark still found blood.

## Depth

### Ecology

A peregrine aarakocra flown across the sea after the Fate Spinner and its carrier. He shadows a mark from high in the sun's glare before he cuts. He watched Matteo Scola eat a [[ghost-plum|ghost plum]] and vanish, then reached for the stolen fruit pack the first chance his talons found. Beaten, he breaks off toward open ground and flies inland until pursuit fails.

### Hidden truths

- Somebody unseen tips his fights. The DM ruled his river-camp advantage came from watchers feeding him through a device of their own, telling the table "You don't have the only one." Who holds the device is not established.
- His deflection is the open-wing parry [[master-kyzil|Master Kyzil]] teaches at the [[high-eyrie|High Eyrie]], and Crissdalynn, Kyzil's student, knows it on sight.

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
