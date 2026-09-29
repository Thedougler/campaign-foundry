# Setting the numbers

Start from the closest official peer (step 3). With no peer, these community first-pass estimates hold through CR 16; above that, compare with official peers directly.

| Figure | First pass |
| --- | --- |
| AC or save DC | 12 + half CR |
| HP | 15 + 15 × CR |
| Attack bonus | 4 + half CR |
| Damage per round | 5 + 7 × CR, split across attacks; add an attack around CR 2, 7, 11 and 15 |

## Tuning to the Party

Where these disagree with the first pass, the Party read wins.

- **Hit chance** = (attack bonus − AC + 21) ÷ 20. For about 65% against the Party's average AC, attack bonus ≈ average AC − 8; keep at least 50% against the highest AC (bonus ≥ highest AC − 11).
- **Save pressure.** Failure chance = (DC − 1 − save bonus) ÷ 20. Aim one feature at a weak save at about 60% (DC ≈ that save bonus + 13) and the rest at about 40% (DC ≈ save bonus + 9).
- **Durability.** Rounds it lasts = effective HP ÷ (the Party's sustained damage × their hit chance against its AC). Targets: Standard 2, Hard 3, Deadly 4, Terrifying 5 or more across its forms. It must also survive the nova plus one round, so it acts twice even if the Party wins initiative.
- **Threat.** Its expected damage per round against the most exposed PC's HP. Hard drops that PC in about three rounds of focus; Deadly in about two with a second PC in danger; Terrifying drops one with its signature plus a follow-up after a visible tell.
- **Control.** A boss needs enough Legendary Resistance, extra bodies or phase changes to shrug off the Party's hard control for its first two rounds.
- **Honest CR.** Find the CR its defence matches (HP, then AC) and the CR its offence matches (damage per round with every attack hitting and every save failing, off-turn actions included, then attack bonus or DC). `cr` is their average. When they sit more than two CR apart, move the weaker side toward the role's trade.
- **Trade, don't stack.** Higher AC than peers costs HP, damage or control. Broad resistance becomes narrow, temporary or bypassable. Elite HP, Legendary Resistance, high saves, broad immunity, regeneration and escape never all come together.

## Three rounds

Script rounds one to three: the opening tell and setup, the best repeat and its reaction use, then the payoff, recharge or escalation. Count expected damage after hit and save chances, realistic targets for areas (start at two), and recharge odds (5–6 recharges one round in three).

## Stat block format

The `statblock` fields are in the Creature template. The gate recomputes every derived number, so write each one out:

- `stats` in Str, Dex, Con, Int, Wis, Cha order. The proficiency bonus follows `cr`.
- `saves` and `skillsaves` are one-key maps (`- dex: 5`, `- stealth: 7`), each ability mod + PB, or + twice PB for expertise.
- `senses` ends with `passive Perception N`: 10 + Perception bonus.
- `hp` is the floor of `hit_dice`'s average, and the flat term is the number of dice × Con mod. The die follows size: Tiny d4, Small d6, Medium d8, Large d10, Huge d12, Gargantuan d20.
- Attacks use the 2024 phrasing: `*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 7 (1d8 + 3) Slashing damage.` The bonus is PB + Str or Dex (+ the spellcasting ability for spell attacks), and every `N (XdY + Z)` has N as the floor of its average.
- Saving throw effects read `*Dexterity Saving Throw:* DC 13, each creature in a 15-foot Cone. *Failure:* … *Success:* …`, with DC = 8 + PB + the ability behind it.
