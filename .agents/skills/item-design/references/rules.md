# Item rules (2024)

Check exact wording against the published item's page in `wiki/Items/`, or with the `dnd5e-srd-api` skill when the Wiki lacks it, and write the text in full (ADR 0005). The nearest published items show how each kind is usually built. When the concept suits a different build, write that build and price it against the ceilings below.

## Rarity is a ceiling

| Rarity | Highest spell effect | Highest static bonus | Typical price |
| --- | --- | --- | --- |
| Common | level 1 | none | 100 GP |
| Uncommon | level 3 | +1 | 400 GP |
| Rare | level 5 | +2 | 4,000 GP |
| Very Rare | level 8 | +3 | 40,000 GP |
| Legendary | level 9 | +4 | 200,000 GP |
| Artifact | beyond | beyond | priceless |

Consumables sell for about half. An Item near one ceiling stays well below the others: at its top spell level it takes a smaller bonus than the top one and only weak passives. Weigh offence, defence, action economy, spell access, exploration and social use, and say what pays for each.

## The text

Write it as `wiki/templates/item.md` § Properties sets out, in 2024 wording: `As a Magic action`, `As a Bonus Action`, `As a Reaction when …`, and charges as `The item has 7 charges and regains 1d6 + 1 expended charges daily at dawn`. Conditions and damage types are capitalised (`the Frightened condition`, `Necrotic damage`). A creature can attune to three Items at once, taking a Short Rest. Ask for attunement when an Item is broadly or repeatedly strong, and keep the text and its classification line in agreement. Write each trigger as something the table can see, and settle each edge case a property raises, such as losing, removing or handing over the Item.

- **Weapons and armour** start from the base item's 2024 statistics. A weapon gives its damage, its properties and its Mastery as a named property (`***Mastery: Topple.***` in `wiki/Items/staff-of-fire.md`), since every 2024 weapon has one. Armour gives its base AC as a bare line under the classification line (`AC 14 + Dex (max 2)` in `wiki/Items/stonebreakers-breastplate.md`), and a Strength requirement or Disadvantage on Stealth only where the base armour or a property imposes it.
- **Potions and scrolls:** drinking a potion or giving it to a creature within 5 feet takes a Bonus Action. A scroll contains one spell and is spent when cast.
- **Spells from Items:** state the spell and its level, and whether it is cast from the Item. Set a fixed DC and attack bonus, or use the user's own. Cover concentration, components (usually none), charges spent, and whether more charges cast it higher. An Item is never an unlimited pool of spell slots, and concentration stays unless the design pays for removing it.
- **Stacking:** a benefit on every hit multiplies with Extra Attack, reactions and summoned attacks. A bonus that grows with the bearer is broad too. Price either with a once-per-turn limit, attunement or rarity. A reaction or Bonus Action competes with the bearer's own. Count each in the audit.

## Branches

Each branch is a named property in the rules text.

- **Cursed:** a curse escapes most identification, including *Identify*. State what reveals it, what it does and whether it deepens. State whether attunement ends while cursed and what breaks the curse (*Remove Curse*, a quest or a sacrifice). When a Campaign hides it from the Party, give under Hidden truths how the Party can learn it.
- **Sentient:** give it scores for Intelligence, Wisdom and Charisma. It has an alignment and a special purpose, senses with a range, and a way to communicate (emotion, speech or telepathy). When the bearer acts against its purpose it makes a demand, resisted with a Charisma save against a stated DC (12 + its Charisma modifier). Write out each demand, from refusing to work to brief control.
- **Growing:** give each stage a trigger and a new property. Recheck rarity at every stage.
- **Artifact:** give it minor and major properties, both beneficial and harmful. Add a way to destroy it, its place in history and the people who seek it.
