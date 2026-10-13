---
title: "Gold Caste Serene"
type: Creature
summary: "A CR 30 gold-caste Grung whose unlookable radiance, absolute wards and sovereign spellcasting embody Golden Presence at its ceiling."
sources:
  - "archive/the-gold-caste-serene.md"
cr: 30
creature_type: "Humanoid"
size: "Small"
habitat: []
sourcebooks: []
revealed: ""
---

> [!narration] First sight
> You see white-gold light stretched across the water in front of you, and its reflection trembles with a low hum. Just beyond it, something small hovers a few feet above the water. The glare hides its centre, with only the edges breaking into ripples. It hangs there without moving.

## Statblock

```statblock
layout: Basic 5e Layout
name: Gold Caste Serene
size: Small
type: humanoid
subtype: Grung
alignment: unaligned
ac: 22
ac_class: natural armor
hp: 667
hit_dice: "58d6 + 464"
speed: "0 ft., fly 40 ft. (hover)"
stats: [20, 22, 26, 28, 30, 30]
saves:
  - str: 14
  - dex: 15
  - con: 17
  - int: 18
  - wis: 19
  - cha: 19
skillsaves:
  - arcana: 18
  - history: 18
  - insight: 19
  - perception: 19
  - persuasion: 19
  - religion: 18
damage_vulnerabilities: ""
damage_resistances: ""
damage_immunities: "Poison, Psychic, Radiant"
condition_immunities: "Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned"
senses: "truesight 120 ft., passive Perception 29"
languages: "all languages"
cr: 30
traits:
  - name: Collective Reserve
    desc: "The Serene has a 10,000-point Golden Presence endowment. It shares the rite's finite reserve with the other beneficiaries. Every spell it casts consumes reserve points equal to the spell's level, in addition to any slot or innate use. Cantrips consume none. Wish consumes 1,000 points instead and can be cast only three times between dawns, through any casting method. Paid powers fail if the available reserve cannot pay. The endowment consumes 1,000 points at dawn and falls to 1,000 points if that upkeep cannot be paid. Losing sufficient structural belief also reduces its endowment under the rite's rules. Below 10,000 endowed points, this greatest form ends."
  - name: Certainty Ward
    desc: "The Serene's radiance prevents any attack, spell or other effect from selecting its body as a target. Harmful areas leave its space unaffected. This ward cannot be dispelled or suppressed while its greatest endowment stands. It does not protect the rite's separate heart."
  - name: Burning Radiance
    desc: "The Serene sheds Bright Light for 60 feet and Dim Light for another 60 feet. Constitution Saving Throw: DC 27, a creature that looks directly at the Serene, at most once per round. Failure: 42 (12d6) Fire damage and the Blinded condition until the start of the creature's next turn. Success: No effect. A second failed gaze save against this Serene causes permanent blindness; the failures need not be consecutive. Lesser Restoration, or a higher-level spell that ends the Blinded condition, cures even this lasting blindness. A creature can avert its eyes to avoid the save, treating the Serene as unseen."
  - name: Legendary Resistance (5/Day)
    desc: "After failing a saving throw, the Serene can expend one use and 100 reserve points to make that save succeed."
  - name: Magic Resistance
    desc: "Against spells and other magical effects, the Serene makes saving throws with Advantage."
  - name: Profound Immunity
    desc: "Spells of level 5 or lower cannot affect the Serene. It succeeds automatically on saving throws against higher-level spells, expending 100 reserve points per save."
  - name: Sustained Concentration
    desc: "The Serene can hold three Concentration spells at once. Beginning a second or third consumes 100 additional reserve points. It succeeds automatically on Constitution saves to maintain Concentration."
  - name: Loved by the Weave
    desc: "Once per turn when casting a spell, the Serene can expend 1,000 additional reserve points to make the spell's targets fail their saving throws and set its damage dice to their maximum values."
  - name: Amphibious
    desc: "The Serene breathes underwater and in air."
  - name: Poisonous Skin
    desc: "Wisdom Saving Throw: DC 27, any creature touching the Serene. Failure: The creature is controlled as by Dominate Person for 1 minute, without Concentration and regardless of creature type. It repeats this save at the end of each of its turns, ending the control on a success. Success: No control."
actions:
  - name: Multiattack
    desc: "The Serene casts two spells from its arcane or innate repertoire, in any combination. At most one spell uses a spell slot on its turn; the other uses an innate casting or the reserve without a slot. Each casting consumes its required reserve points."
  - name: Arcane Spellcasting (20th-Level Caster)
    desc: "The Serene casts a prepared Wizard spell without components, using Intelligence (spell save DC 27, +19 to hit with spell attacks). Every Wizard spell is prepared. Its slots are level 1 (4 slots), levels 2, 3, 4, 5 and 6 (3 slots each), and levels 7, 8 and 9 (2 slots each). It can instead use the reserve without a slot. Bonus Action and Reaction spells retain their normal timing."
  - name: Innate Spellcasting
    desc: "The Serene casts a spell from the following lists without components, using Charisma (spell save DC 27, +19 to hit with spell attacks). Its reserve pays for each casting, and the stated daily limits also apply. At Will: Banishment, Charm Person, Command, Compulsion, Control Water, Detect Magic, Detect Thoughts, Dispel Magic, Dominate Person, Entangle, Fly, Freedom of Movement, Greater Invisibility, Gust of Wind, Hold Monster, Hold Person, Mass Cure Wounds, Mass Suggestion, Plant Growth, Sending, Silence, Slow, Speak with Animals, Speak with Plants, Suggestion, Telekinesis, True Seeing, Wall of Force, Water Walk, Wind Wall. 3/Day Each: Antimagic Field, Control Weather, Divine Word, Dominate Monster, Earthquake, Flesh to Stone, Forcecage, Harm, Heal, Mass Polymorph, Maze, Power Word Stun, Regenerate, Reverse Gravity, Sunbeam, Symbol, Teleport, Time Stop, Wind Walk. 1/Day Each: Gate, Imprisonment, Meteor Swarm, Power Word Kill, True Polymorph. 3/Day: Wish, without its stress, permanent-loss risk or stress damage. Bonus Action and Reaction spells retain their normal timing."
bonus_actions: []
reactions:
  - name: Counterspell
    desc: "Trigger: A creature within 300 feet casts a spell. Response: The Serene expends 3 reserve points to counter it. A spell of level 8 or lower ends automatically. For a level 9 spell, it rolls 1d20 + 19 and counters the spell on a result of 19 or higher. This rite-granted reaction replaces Counterspell's normal saving throw."
  - name: Shield of the Weave
    desc: "Trigger: A harmful area effect would include the Serene, before its Certainty Ward excludes it. Response: The Serene expends 1 reserve point to cast Shield, increasing its AC by 5 until the start of its next turn and preventing damage from Magic Missile during that time."
legendary_description: "Legendary Action Uses: 3. After another creature's turn, the Serene can expend uses for one option below. It regains its uses at the start of its turn."
legendary_actions:
  - name: Move
    desc: "The Serene flies up to 40 feet without provoking Opportunity Attacks."
  - name: Decree (Costs 2 Uses)
    desc: "The Serene casts a spell of level 6 or lower from either repertoire without a slot. It expends the appropriate reserve points and any applicable innate daily use."
  - name: Wish (Costs 3 Uses)
    desc: "The Serene casts Wish, expending 1,000 reserve points and one of its three castings between dawns."
lair_actions:
  - name: Sovereign Ground
    desc: "On initiative count 20, losing ties, the Serene takes one Lair Action while within the Verdant Teeth. It cannot repeat an option on consecutive rounds."
  - name: Binding Roots
    desc: "The Serene expends 100 reserve points. Strength Saving Throw: DC 27, up to three creatures it chooses within 300 feet. Failure: Roots impose the Restrained condition until the next initiative count 20. Success: No restraint."
  - name: Closed Canopy
    desc: "The Serene expends 1,000 reserve points. Within 1 mile, magical teleportation and planar travel fail for all creatures until the next initiative count 20, including Dimension Door, Misty Step, Banishment and Plane Shift."
  - name: Radiant Proclamation
    desc: "The Serene expends 100 reserve points. Constitution Saving Throw: DC 27, every creature within 60 feet. Failure: The creature has the Blinded condition until the end of its next turn. Success: No blindness. This directed flash does not count as a failed gaze save for Burning Radiance."
```

## Tactics

The Serene controls movement and obedience while its ward excludes direct violence. It combines two spells with a decree between turns, reserving its Reaction to stop an opponent's spell or raise Shield. Direct inspection of its light is itself dangerous.

Before a gaze save: ==The centre of that light is white, and the glare stings at the edge of your sight.== Give the choice to avert eyes before requiring the save. Looking away prevents the gaze hazard, but the ward still protects the body.

Two attacks on its authority remain usable. Reach the separate heart of [[golden-presence|Golden Presence]] and dispel the working there. Or expose the whole theft to the [[grung-clans|Grung Clans]], publicly, with evidence that its divinity fails. These routes work without aiming a weapon at the light. An ordinary runaway still believes enough to feed it, so flight alone does not weaken its endowment.

The Serene spends Wishes to conceal the heart and reinforce the public's dependence. Its greatest form ends when the endowment fails. Its ward protects the body alone, and every extraordinary defence competes for the same available reserve.

## Ecology

The Serene belongs to the [[gold-caste|Gold Caste]] in the [[verdant-teeth|Verdant Teeth]]. Its accumulated endowment requires the faith of the clans. The concealed heart at [[karath|Karath]] and the [[gold-fruit|Gold Fruit]] farms sustain the caste's power and control access to it.

Before a meeting, bowed heads conceal faces from the glare as well as express devotion. Red sages describe their own spellcasting as a gift from the gold. Spells that cannot touch a sovereign, roots that close a path and teleportation stopped at the canopy make the same authority visible in different ways.

## Hidden truths

The complete mechanism is [[golden-presence|Golden Presence]]. Only the gold understand the transfer. Their sages pass the religion on in honest devotion, unaware of its theft. Proof about the fruit and Ossketh, the drain's aura and a failed divine act can undermine the structure that supplies the Serene's power.

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
