---
type: NPC
summary: "A loose Hound of Tyr following the Party through the Midchain after
  escaping Calveno."
sources:
  - "archive/aleksander-malone.md"
  - "archive/collab-2026-10-04-authority-themes.md"
  - "archive/Episode-09-Transcript.md"
  - "archive/collab-2026-10-12-malone-massacres-and-kindled.md"
inspired_by: "Aleksander Anderson from the Hellsing anime"
revealed: "Session 9"
title: "Aleksander Malone"
---

![[aleksander-malone-portrait.webp]]

> [!narration] First look
> You meet a tall, spare high elf in a Crown-service coat that has been through worse than tailoring can hide. Salt and something older cling to the wool. His steady hands rest open at his sides, ready to move, and his fingers touch his lips in a gesture quick as a blessing before his eyes finish assessing you. “State your name and your allegiance.”

## Roleplaying

- **Wants.** To hunt confirmed Khlysty Flock infiltration and deliver judgement.
- **Torn between.** His certainty in Tyr and his reliance on Crown authority.
- **Voice.** In a soft lilt, his words rise to sermon. He wields confession. He blesses his blades before a hunt. After a kill, he says “God forgive me”.
- **Opening move.** Based at Blackrule in the southern Midchain, where the Crown deploys him. He has left Calveno and follows the Party, a couple of days behind by sail.
- **Leverage.** He can call on the Dravosi navy and acts as the Hound of Tyr against confirmed threats. He will pursue what he believes is heresy.
- **Combat profile.** AC 18, 195 HP, speed 30 ft. CR 14. Regeneration, Heretic's Bane, Sneak Attack, and 7th-level Wisdom spellcasting (DC 18) define him. Blessed longsword and bayonet attacks, Bayonet Barrage, Action Surge, Spiritual Weapon, Rebuke the Unclean, and Guided Judgment define his threat. If killed, he may return in a later form: [[malone-kindled|Malone, Kindled]].
- **Opens them up.** A confirmed heretic or a clear, lawful statement of allegiance.
- **Shuts them down.** Threats to a protected Heir-like asset or evasive negotiation. Interference with a confirmed judgement also closes him down.
- **Will share.** The Crown's confirmation and the target of his hunt.
- **Will not share.** A compromise to his orders or an unconfirmed accusation.
- **If pressed.** His calm turns cold. He says, “There is nothing to negotiate.”
- **If ignored.** He continues after Grigori without waiting for Crown direction.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Aleksander Malone"
size: Medium
type: humanoid
subtype: elf
alignment: "Lawful Neutral"
ac: 18
ac_class: "blessed half plate"
hp: 195
hit_dice: "26d8 + 78"
modifier: 2
speed: "30 ft."
stats: [20, 14, 16, 12, 20, 13]
saves:
  - con: 8
  - wis: 10
skillsaves:
  - insight: 10
  - perception: 10
  - religion: 6
  - stealth: 7
damage_vulnerabilities: ""
damage_resistances: ""
damage_immunities: ""
condition_immunities: "Charmed, Frightened"
senses: "passive Perception 20"
languages: "Common, Elvish"
cr: 14
traits:
  - name: Regeneration
    desc: "Malone regains 20 Hit Points at the start of his turn. If he takes Necrotic damage, this trait doesn't function at the start of his next turn. He dies only if he starts his turn with 0 Hit Points and doesn't regenerate."
  - name: Heretic's Bane
    desc: "Malone has Advantage on saving throws against spells and abilities used by Fiends and Undead. When he hits a Fiend or Undead with a weapon attack, the attack deals an extra 4 (1d8) Radiant damage."
  - name: Sneak Attack (1/Turn)
    desc: "Malone deals an extra 7 (2d6) damage when he hits a target with a weapon attack and has Advantage on the attack roll, or when another enemy of the target is within 5 feet of it, that enemy isn't Incapacitated, and Malone doesn't have Disadvantage on the attack roll."
  - name: Spellcasting
    desc: "Malone is a 7th-level spellcaster. His spellcasting ability is Wisdom (spell save DC 18, +10 to hit with spell attacks). At will: *Guidance*, *Sacred Flame* (3d8), *Thaumaturgy*. 2/Day Each: *Bless*, *Command*, *Hold Person*. 1/Day Each: *Dispel Magic*, *Banishment*."
actions:
  - name: Multiattack
    desc: "Malone makes three attacks in any combination of Blessed Longsword and Blessed Bayonet."
  - name: Blessed Longsword
    desc: "*Melee Attack Roll:* +10, reach 5 ft., one target. *Hit:* 9 (1d8 + 5) Slashing damage plus 9 (2d8) Radiant damage."
  - name: Blessed Bayonet
    desc: "*Ranged Attack Roll:* +10, range 20/60 ft., one target. *Hit:* 7 (1d4 + 5) Piercing damage plus 9 (2d8) Radiant damage."
  - name: Bayonet Barrage (Recharge 5–6)
    desc: "*Dexterity Saving Throw:* DC 18, each creature in a 30-foot Cone. *Failure:* 28 (8d6) Radiant damage. *Success:* Half damage."
bonus_actions:
  - name: Action Surge (1/Short Rest)
    desc: "Malone makes three additional attacks in any combination of Blessed Longsword and Blessed Bayonet."
  - name: Spiritual Weapon (2/Day)
    desc: "Malone conjures a spectral mace within 60 feet. For 1 minute, as a Bonus Action on each of his turns, he can move the weapon up to 20 feet and make a melee spell attack (+10 to hit) against a creature within 5 feet of it, dealing 14 (2d8 + 5) Force damage on a hit."
  - name: "Channel Divinity: Rebuke the Unclean (1/Short Rest)"
    desc: "*Wisdom Saving Throw:* DC 18, each Fiend and Undead within 30 feet. Failure: The creature is Turned for 1 minute. A Turned creature must use its turns to move as far away from Malone as possible and cannot take Reactions. It can take the Dash action or try to escape an effect that prevents it from moving. A Fiend or Undead of CR 2 or lower that fails is destroyed instead."
reactions:
  - name: Guided Judgment (2/Short Rest)
    desc: "Immediately after missing with an attack roll, Malone rerolls the die and must use the new roll."
```

## Quotes

> "Ask of me, and I shall give thee the heathen for thine inheritance, And the uttermost parts of the earth for thy possession. Thou shalt break them with a rod of iron; Thou shalt dash them in pieces like a potter's vessel. Be wise now therefore, O ye kings: Be instructed, ye judges of the earth. Serve Tyr with fear, And rejoice with trembling. Worship Tyr, lest he be angry, and ye perish from the way, When his wrath is kindled but a little. Blessed are all they that put their trust in him."

Recited inside the church he had just emptied, over a congregation he slaughtered during service (see History).

## History

Early in his Crown service, Malone was sent against a church at Sarns Landing whose Dravosi congregation was suspected of sheltering enemies of the Crown and of keeping pagan rites. The rites were real and harmless. The sheltering was false. Malone killed the whole congregation during service and reported back for duty at once, seeing nothing wrong in it. To the Dravosi it was a horrific slaughter of innocents, and it showed even them that he was a zealot and a loose cannon.

The Crown kept these accounts from official records. Sailors tell them as rumours, and none has been revealed at the table:

- **The *Kittiwake*, off Harwick.** Sailors say Malone boarded the Crown supply brig after his sense for fiends reacted to a nineteen-year-old tiefling deckhand who had never cast a spell. He did not isolate her. He holed the brig below the waterline, held the hatches and prayed on the quarterdeck as she and all hands drowned. The Harwick yard recorded the brig as lost in weather. The rumour says his sense reads infernal blood, not deeds.
- **The orphans of Aldenmere.** Sailors say Malone judged every adult in a pilot village that kept a shrine to the sea goddess beside its chapel to Tyr, sparing every child. He carried the children to his temple and raised them in the faith. The grown orphans call that night their salvation in complete sincerity, with their parents' deaths at its centre. Some now serve the Crown and love him. The rumour says his fatherly care and the slaughter were one act.
- **The Stenmark tower.** Sailors say the tower garrison sent Malone after heresy that proved to be smuggling, to protect its share of the proceeds. He returned up the cliff that night and judged the garrison to the last man for lying in Tyr's name. Crown records called the deaths a signal-fire accident. In dealings with Malone afterwards, the Crown took care not to lie to him. The rumour says the garrison's lie cost every man his life, and that the Party are now the liars he follows.

The Crown kept him anyway. His record of service is peerless, and he does things that defy mortal explanation, as if Tyr truly sent him. Before his escape from Calveno, he spent most of his time at Blackrule. The Crown controlled what information reached him and used him sparingly, against especially dangerous threats, by letting him learn of the threat and offering him transport and the resources of the Dravosi navy. Aboard the HCS Ordinance, under merchant cover, he pursued Shepherd Grigori. A former handler did not survive contact.

After stepping ashore in Calveno, Malone left almost immediately, commandeered the Dravosi ship he arrived on and broke the arms of several guardsmen who tried to stop him. They reported him cursing “lying heathens”. During the escape he broke the limbs of men who resisted him and threw some overboard. The remaining Dravosi sailors quickly complied with his demand to make sail at once, and the ship left under his command. His innate divine sense for fiends and undead told him Shepherd Grigori was not within range, so he knew he had been lied to. He has slipped the Crown's leash and is now loose in the Midchain.

### Session 9: the Uncertainty boarding

Malone boarded the [[uncertainty|Uncertainty]] from the [[hcs-ordinance|HCS Ordinance]] with [[corbin-knighton|Corbin Knighton]]. He was a tall, gaunt high elf with grey hair, a cold smile and about six swords concealed beneath his long coat. Delmar recognised the Hound of Tyr as a Dravosi Inquisitor sent to deal with religious problems within the Crown.

He said the Crown had dispatched him after the Calveno incident to find [[shepherd-grigori|Shepherd Grigori]], whom he called an aberration and a demon in human skin. He threatened anyone harbouring heretics or enemies of the Crown. His account blamed Grigori for destroying the [[uncertainty|HCS Surety]] and killing [[barnaby-rook|Barnaby Rook]], and placed the healer somewhere in [[calven-and-calveno|Calveno]]. The Party had taken the Surety themselves.

Malone scrutinised Delmar with an Insight bonus of +9. He refused Delmar's tribute coin for [[umberlee|Umberlee]], calling her a heathen god and declaring his devotion to the one real god. He threw the second coin back. He said he sensed neither evil nor deception in Delmar and insisted on searching the ship.

He cast Command on Delmar with the order “Confess”, requiring a DC 17 Wisdom save. Delmar failed, and a personality trigger brought out a cold admiral persona. Nobody attempted Counterspell. Malone accepted the resulting confession. He then slapped Crissdalynn, who caught his hand with Deflect Attacks and stared at him in silence. His next command, “Confess now”, failed when she saved on a natural 20, but he believed the spell had worked and accepted her false confession.

Catarina unsettled him by imitating Umberlee's laughter and whispers with her umbrella. Corbin drew a flintlock on Malone and ordered him off the ship, saying he believed the Party. The Ordinance departed for Calveno after warnings that Grigori was dangerous. This boarding became part of [[the-hound-of-god|The Hound of God]].

At that time, Malone was one of the Crown's top hunters, a self-directed zealot of Tyr working from his temple as his own contractor. His targets were “perfects”, meaning anyone against Dravosi law. The Crown still sets his course only through what it lets him hear.

## Hidden truths

- Malone's divine sense detects fiends and undead. It told him Shepherd Grigori was out of range in Calveno, exposing the lie; now off the Crown's leash, he follows the Party, a couple of days behind by sail. His trail takes him through Passage kitchens and the free ports the Party used. Anyone he decides sheltered heretics risks another Sarns Landing.
- He is a literal avatar of Tyr, a mortal divine weapon who has drawn only a fraction of his god's power and does not know his own limits. His regeneration, divine sense and deeds that defy mortal explanation are the small part he has used so far.
- Tyr is far more wrathful than the Crown's blindfolded god of oaths, courts martial and warrants. Malone alone in the Crown carries Tyr as he truly is: jealous, fond of hellfire, and demanding confession, penance and fear.
- Malone is a zealot and maniacal hunter of heretics, fiends and the undead. His grim joy appears only when someone gives him a true heretic to judge. With the faithful and the young he is patient and almost fatherly; otherwise he remains still.
- The Party may be his next prey as "lying heathens": they lied to send him to Calveno. Several of his other targets are the Party's enemies, including the Gold Caste and the fiends crewing the [[the-dead-lady|Dead Lady]]. He could stand beside the Party against them, while meaning to judge the Party afterwards.
- On Aruhe, his divine sense reads the island as one enormous demon because [[hinewai|Hinewai]]'s phylactery reaches as far as her pale roots. He also follows the trail towards Karath, where the Gold Caste claims to be gods.
- A possible end, not settled: Malone may give up his humanity to kill Shepherd Grigori. He may burn away and let the god come through him in full.
- A possibility the DM floated, not yet settled: Malone may see the Dead Lady on the Party's wake and survive. The fiends would set his divine sense screaming.

## Threads

- [[the-crown-inspection|The Crown Inspection]], where Malone embodies the Crown's law and its willingness to turn inspection into judgement.
- [[drowned-maw-awakening|Drowned Maw Awakening]], where his hunt for Grigori and the Flock connects Crown policy to the Sentinel split.

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
