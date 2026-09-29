---
name: item-design
description: Makes or retunes an Item page (a magic item, artifact, consumable, notable mundane object, plot object, or a hazard that can be carried) with full 2024 rules text, sourced from existing items before new design. Use when a Scene, NPC, treasure hoard or Quest needs an Item, when the DM names one, or when an Item needs balancing.
---

# Item design

An Item matters by its rules or its story. A good one fits a niche the Party lacks instead of taking one, shows its function on its surface, and asks its bearer to decide when to use it. The page carries its full rules text (ADR 0005), so the DM never looks elsewhere.

## Steps

1. **Read the Canon and the bearer.** With qmd, find the Item's page if it exists, every page that links to it, and where it lies, who made it, who owns or wants it, and its Lore. When it's meant for a PC, read their Sheet and the Party's other gear, and note the bearer's class, level, attunement slots in use, and the niche the Item should fill.
2. **Kind and branches.** Consumable, magic item, artifact, plot object or notable mundane gear; a hazard that can't be carried belongs to its Site instead. Note any branch: cursed, sentient, evolving. A Creature passing for an object (a mimic) gets an Item page for what it appears to be, with its truth under Hidden truths linking the Creature.
3. **Source it** in the order `AGENTS.md` sets. Search the Wiki, then the SRD (`dnd5e-srd-api`), then official and reputable homebrew items on the web, by effect and by fantasy ("a compass that finds wrecks"). List three to five candidates with links, rarity and what each does. Then choose: **reuse** a candidate whole; **reskin** it when only the fiction changes; **adjust** one property; **trade** one power for another of equal weight; **combine** two and reassess rarity; or build new only when no candidate reaches the design. Write one line naming the candidate, or why none fits.
4. **Make it this Item and no other.** Write the stock version ("a +1 longsword"). Tie its making, material or history to Canon: a blade forged from a wreck's anchor chain that pulls toward drowned iron. Show each property on the object (a water-breathing charm has gills cut in its rim) and its history on the surface (a maker's mark, a scratched-out name, wear where hands held it). Pitch it: "a [item] for a [bearer] that lets them [experience] by paying [cost]". Run the swap test with a published item's name.
5. **Mechanics** with [references/rules.md](references/rules.md): compare it with a rules anchor and two peers, set its power by axis so rarity is a ceiling reached on one axis only, write the full item text in 2024 wording, and name the decision it creates (the tell, the choice, the cost, the payoff, the counterplay). Audit the bearer's three best turns with it for stacking. Done when every field the text needs is present and the audit finds nothing that multiplies unpriced.
6. **Branches** that apply, from the same reference: a curse's tell, trigger, effect, deepening and way out; a sentient Item's mind (scores, alignment, communication, senses, purpose, the demands it makes), its personality from `npc-design`; an evolving Item's stages; an artifact's properties, destruction and hunters.
7. **Narration.** Hand `theatre-of-the-mind` the First look slot with its plain noun, size against a hand, material, wear and marks, one sense beyond sight, and a visible sign of each hidden property.
8. **File** to `wiki/templates/Item.md` in `<World>/Items/`:
   - **At a glance:** kind, rarity, attunement, the one choice it changes at the table, and who holds it.
   - **Play:** Properties (the full rules text) and In use (how it looks and plays when used, the rulings the table will need).
   - **Depth:** maker, past holders, contested claims, and hidden properties or curses, each with how the Party can learn it.

   Wikilink every page involved. New facts the Canon lacked are decided as Canon (ADR 0003) and listed in your reply. Run `pnpm check <page>` until it passes, and list it in the operation's `cf log` entry.

## Done

- The candidates are listed and the path names one, or the reason none fits.
- Its twist, visible function and pitch pass the swap test.
- The text is complete in 2024 wording, rarity is a ceiling reached on one axis, and nothing multiplies unpriced.
- Every branch has its tell, its truth and a way out or through.
- `pnpm check` passes, and the reply lists every new fact decided as Canon.
