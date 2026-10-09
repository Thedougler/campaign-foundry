---
type: Creature
summary: "Barnaby Rook, a unique Creature stat block from the archived NPC record."
sources:
  - "archive/barnaby-rook.md"
revealed: "Backstory"
title: ""
---

## At a glance

- **Role at the table.** Combat profile for the unique NPC Captain Barnaby Rook.
- **Threat.** CR 3 in Rook's archived stat block, reproduced below.
- **Tell.** Rook's cutlass work and commands to the HCS Surety's crew give warning before his signature attacks.
- **Weak to.** Positioning, cover and concentrated attacks provide answers to Rook's options, as detailed in Tactics.
- **Used by.** Barnaby Rook uses this Creature profile.

> [!narration] First sight
> A broad officer in a salt-stiff coat steps onto the Surety's deck with his cutlass already drawn. He barks two orders without looking back, and his crew spread to either side of him. The blade comes up level with your chest.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Captain Barnaby Rook"
size: Medium
type: humanoid
subtype: "human"
alignment: "lawful neutral"
ac: 17
hp: 90
hit_dice: "12d8 + 36"
speed: "30 ft."
stats: [14, 16, 16, 13, 12, 14]
saves:
  - dexterity: 5
  - constitution: 5
skillsaves:
  - athletics: 4
  - intimidation: 4
  - perception: 3
senses: "passive Perception 13"
languages: "Common"
cr: 3
traits:
  - name: Officer's Advantage
    desc: "While at least two allies are within 30 ft. Of Rook and can hear him, he has advantage on initiative rolls and cannot be surprised."
  - name: Cornered Wolf
    desc: "When Rook has no living allies within 30 ft., his Parry reaction reduces damage by 1d10 + 6 instead of 1d10 + 4, and it applies to ranged attacks as well as melee. Additionally, he has advantage on saving throws."
  - name: Naval Footwork
    desc: "Rook can Disengage as a bonus action."
bonus_actions:
  - name: Disengage (Naval Footwork)
    desc: "Rook disengages without provoking opportunity attacks and moves up to his speed."
actions:
  - name: Multiattack
    desc: "Rook makes two attacks: each is either a Cutlass attack or a Flintlock Pistol attack. He cannot make more than one Flintlock attack per turn unless he takes an action to reload."
  - name: Cutlass
    desc: "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 9 (1d10 + 4) slashing damage. On a hit, Rook can forgo the damage to shove the target up to 5 ft. In any direction (no save)."
  - name: Flintlock Pistol
    desc: "Ranged Weapon Attack: +5 to hit, range 30/90 ft., one target. Hit: 12 (2d8 + 3) piercing damage. Once fired, requires an action to reload. Rook carries a brace: two pistols, each loaded once."
reactions:
  - name: Parry
    desc: "When an attack hits Rook, he reduces the damage by 1d10 + 4 (or 1d10 + 6 if Cornered Wolf is active). He must be holding a melee weapon and be aware of the attacker. Applies to melee only unless Cornered Wolf is active."
legendary_description: "Rook can take 3 legendary actions per round, choosing from the options below. Only one legendary action option can be used at a time, and only at the end of another creature's turn. Rook regains spent legendary actions at the start of his turn."
legendary_actions:
  - name: Reposition (Costs 1 Action)
    desc: "Rook moves up to half his speed without provoking opportunity attacks."
  - name: Cutlass Strike (Costs 2 Actions)
    desc: "Rook makes one Cutlass attack. He can use the shove option on a hit."
  - name: Pistol Reload (Costs 2 Actions)
    desc: "Rook reloads one expended flintlock pistol. He does not fire it; this sets up his next turn or a future legendary action."
lair_actions:
  - desc: "On initiative count 20 (losing initiative ties), Barnaby Rook issues a command to the crew of the HCS Surety, choosing one of the following lair actions. He cannot use the same lair action two rounds in a row."
  - desc: "Arm the Guns. Rook orders the gun crew to uncover the hatches of the Surety's two deck-level cannons and ready them for firing. No immediate effect; the guns are primed. This enables Fire the Guns on the following round."
  - desc: "Fire the Guns. If the Surety's cannons were Armed last round, Rook commands both gun crews to fire. Each cannon discharges in a 30-foot cone extending from its gun port along the deck. Each creature or object in either cone must make a DC 14 Dexterity saving throw, taking 4d10 bludgeoning damage on a failed save, or half on a success. Structures and objects in either cone automatically take the full damage."
  - desc: "Call to Arms. If Rook has been reduced below half his hit point maximum (60 hp), he calls out to all remaining crew aboard the Surety. Up to 1d4+1 Dravosi Deckhands appear at the start of Rook's next turn in unoccupied spaces aboard the Surety."
```

## Play

### Tactics

Run Rook with the tactics in his archived record and the naval abilities below. Give warning of his strongest option, including orders to ready the Surety's cannons, before resolving it. Allow the Party to respond through cover, positioning or focused fire. Rook retreats once his objective is lost or his advantage has ended.

### Outside a fight

Rook's appearance, habits and the traces he leaves can establish his identity before the meeting. His conduct follows his NPC role and habitat, with the HCS Surety's crew serving under his command.

## Depth

### Ecology

The archived Barnaby Rook record supplies his habitat, diet and identifying signs. Travellers who attend to those signs can recognise them through Wisdom (Survival).

### Hidden truths

For Rook's history and the motives he conceals, consult his archived NPC record. Examination can uncover that material, as can questions relevant to it.

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
