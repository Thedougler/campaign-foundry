---
name: item-design
description: Makes or retunes an Item page (a magic item, artifact, consumable, notable mundane object, plot object, or a hazard that can be carried) with full 2024 rules text, sourced from existing items before new design. Use when a Scene, NPC, treasure hoard or Quest needs an Item, when the DM names one, or when an Item needs balancing.
---

# Item design

An Item matters through its rules or its story. Aim for an Item that fills a niche the Party lacks and leaves each PC's own niche intact. Its look shows what it does, and the bearer chooses when to use it. The page contains the full rules text (ADR 0005). The DM runs the Item from its page alone.

## Steps

1. **Read the Canon and the bearer.** With qmd, find the Item's page if it exists, every page that links to it, and where it lies, who made it, who owns or wants it, and its Lore. When it's meant for a PC, read their Sheet and the Party's other gear, and note the bearer's class, level, attunement slots in use, and the niche the Item should fill.
2. **Kind and branches.** Classify it as a consumable, magic item, artifact, plot object or mundane gear with a story or rules use. A hazard nobody can pick up belongs to its Site instead. Note any branch: cursed, sentient, growing. A Creature passing for an object (a mimic) gets an Item page for what it appears to be, with its truth under Hidden truths linking the Creature.
3. **Source it** in the order `AGENTS.md` sets. Search the Wiki, then the SRD (`dnd5e-srd-api`), then official and reputable homebrew items on the web, by effect and by fantasy ("a compass that finds wrecks"). List three to five candidates with links, rarity and what each does. Then choose one path.
   - **Reuse** a candidate whole.
   - **Reskin** it when only the fiction changes.
   - **Adjust** one property.
   - **Trade** one power for another of equal weight.
   - **Combine** two and reassess rarity.
   - **Build new** only when no candidate fits the design.

   Write one line stating the chosen candidate, or why none fits.
4. **Make it this Item and no other.** Write the stock version ("a +1 longsword"). Tie its making, material or history to Canon: a blade forged from a wreck's anchor chain that pulls toward drowned iron. Show each property on the object (a water-breathing charm has gills cut in its rim) and its history in visible marks (a maker's mark, a scratched-out name, wear where hands held it). Pitch it: "a [item] for a [bearer] that lets them [experience] by paying [cost]". Run the swap test with a published item's name.
5. **Mechanics** with [references/rules.md](references/rules.md). Compare it with a rules anchor and two peers. Set its power by axis so rarity is a ceiling reached on one axis only. Write the full item text in 2024 wording, and state the decision it creates (the tell, the choice, the cost, the payoff, the counterplay). Audit the bearer's three best turns with it for stacking. Done when every field the text needs is present and the audit finds nothing that multiplies unpriced.
6. **Branches** that apply, from the same reference. Give a curse its tell, trigger, effect, deepening and way out. Give a sentient Item its mind (scores, alignment, communication, senses, purpose, the demands it makes) and take its personality from `npc-design`. Give a growing Item its stages, and an artifact its properties, destruction and hunters.
7. **Narration.** Hand `theatre-of-the-mind` the First look slot with its plain noun, size against a hand, material, wear and marks, one sense beyond sight, and a visible sign of each hidden property.
8. **File** to `wiki/templates/Item.md` in `<World>/Items/`:
   - **At a glance:** kind, rarity, attunement, the one choice it changes at the table, and who holds it.
   - **Play:** the Properties section (the full rules text) and the In use section (how it looks and plays when used, the rulings the table will need).
   - **Depth:** maker, past holders, contested claims, and hidden properties or curses, each with how the Party can learn it.

   Wikilink every page involved. New facts the Canon lacked are decided as Canon (ADR 0003) and listed in your reply. Run `bun run cf -- check --fix`, then `bun run cf -- check`, given the page path, until that page gate reports `ok: 0 findings`, and list it in the operation's `bun run cf -- log` entry (`--op create` when this skill runs on its own).

## Done

- The candidates are listed, and the reply states the chosen candidate and path, or why none fits.
- Its twist, visible function and pitch pass the swap test.
- The text is complete in 2024 wording, rarity is a ceiling reached on one axis, and nothing multiplies unpriced.
- Each branch that applies has its tell, its truth and a way out or through.
- The page gate over the Item's page reports `ok: 0 findings`, and the reply lists every new fact decided as Canon.
