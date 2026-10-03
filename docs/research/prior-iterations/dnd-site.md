# dnd-site

https://github.com/Thedougler/dnd-site · Player-facing Shattered Sea wiki published from Obsidian-style notes · last activity 2026-05-23 · stack Quartz v5, TypeScript/Preact, Node.js, YAML, GitHub Pages

## Summary

This iteration published campaign introductions, setting references, ship rules, and illustrated Session recaps as a navigable public website. Quartz rendered the Markdown; a separate script offered text/JSON pages and portable LLM context. Its main value is authored content rather than agent workflows: the only skill found was frontend design, and the inspected history chiefly records Quartz Syncer publication. No explicit explanation of supersession was found.

## Worth salvaging

1. **Objects that start investigations** (`content/items/Ringmakers-Regret.md`, `content/items/The-Uncharted-Coast.md`, `content/places/calveno/Cabinet-of-Morsani.md`) — The ring repeatedly returns to its seller after its wearers become suspiciously easy to find; a professionally surveyed chart depicts 200 miles of an unrecognised coast. Shop dialogue makes each object's provenance an invitation rather than background exposition. Retell these through `item-design`, `npc-design`, and `location-design`, linking discoverable evidence to Threads. Campaign Foundry already covers provenance and has Morsani's shop, but these two Items were not found in the current Wiki. Settle their actual workings for the DM rather than retaining undefined mechanics.

2. **Rules delivered in an institution's voice** (`content/ships/HCS-Surety-Owners-Manual.md`) — Crown Admiralty standing orders teach ship operation while revealing bureaucracy, priorities, and contempt for incompetent officers. Deck features create immediate choices: a swingable boom, an accessible boarding locker, and a dangerous powder magazine. Co-opt the document form into `vehicle-design` and Prep Handouts, with `theatre-of-the-mind` handling player-facing prose. The current Vehicle skill already requires stations and boarding affordances, but Uncertainty's page leaves speed, minimum crew, weapons, and procedures unestablished. Use the manual as historical evidence to reconcile those gaps, not automatic replacement: it gives 120 hull points, whereas the current page records 130.

3. **A civic custom with a playable public memory** (`content/lore/Il-Gioco-delle-Beffe.md`) — Registration, willing marks, a three-day execution window, team symbols, recoverable deception, and named past winners make the festival generate player plans instead of delivering a scripted event. Campaign Foundry already has its schedule, stakes, scoring, and symbol theft. Salvage the ten-year winners table and the unidentified Six-Hour Wake team as social evidence, rival techniques, and Handout material in `lore-design` and `development-scene`; do not rebuild the festival system. Reconcile its historical scoring scales before reuse.

4. **Local knowledge made visible** (`content/beastiary/sea-life/Sawek.md`, `content/factions/Passage.md`) — Divers mark a predator's occupied blue hole with cord on a reef stake. Passage routes depend on tide-open tunnels, reliable clerks, warning marks, and knowledge outsiders cannot buy wholesale. These details let Players notice, interpret, and exploit a World without exposition. Feed examples into `creature-design`, `location-design`, and `faction-design`. Passage already exists with its One Law, Holds, and couriers; preserve only missing operational detail. Sawek was not found among current Creatures.

5. **Player onboarding and portable public context** (`content/player-primer.md`, `content/faq.md`, `scripts/build-llm-artifacts.mjs`) — The primer connects geography and institutions to concrete character questions: why aboard, what desire justifies danger, what trouble follows, and why stay with the crew. The FAQ supplies a reusable chatbot instruction forbidding invention about unavailable pages. Adopt the questions into `new-campaign` and a player Handout; current campaign creation already gathers much of this intent. If Players need external chatbot access, borrow the generator's retrieval order—small index, individual pages, broad bundle last—inside the existing Push boundary. QMD already serves local Agents; do not add another local search system.

## Lore to retell

- **Ringmaker's Regret / For Lisca** (`content/items/Ringmakers-Regret.md`): three owners independently reported being found; Morsani has sold it three times and received it back twice.
- **The Uncharted Coast** (`content/items/The-Uncharted-Coast.md`): multilingual soundings and anchorages suggest an actual surveyed destination; Morsani discreetly seeks its provenance.
- **Sawek / Blue Devil** (`content/beastiary/sea-life/Sawek.md`): shark-fronted, octopus-backed cave predator; marked blue holes offer a learnable warning.
- **Festival memory** (`content/lore/Il-Gioco-delle-Beffe.md`): the Quiet Tide replaced stock while preserving audit totals; the Six-Hour Wake's authors remain unidentified. The festival itself is already canon.

## Skip

- Quartz's UI, plugin manager, inherited documentation, and `.claude/frontend-design/SKILL.md`: publishing infrastructure, not better campaign writing.
- Exported Svelte statblock HTML in `content/beastiary/sea-life/Sawek.md`: brittle presentation and older attack wording; reconstruct readable 2024 rules.
- Blindly porting `scripts/build-llm-artifacts.mjs`: regex redaction is not a security boundary; Quartz's explicit-publish filter is disabled, and the inspected Pages workflow does not invoke the generator.
- Wholesale old canon: the current Campaign has advanced; historical introductions, ownership, statistics, and unresolved hooks require reconciliation.
