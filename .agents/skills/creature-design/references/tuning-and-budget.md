# Party tuning and budget

## Party dossier

Read every PC in the active Campaign, not a representative sample. Include the current Sheet, House Rules that affect play, and recent Recaps or other records that show the Party's actual choices. For each PC record level, HP, AC, saving throws, attacks and actions, spell slots and other relevant resources, healing, control, mobility, escape options, and best round-1 and sustained damage. Mark unknowns as assumptions and say how they affect the estimate.

Summarise the Party's combined nova, sustained damage, healing, hard control, movement or flight, defensive concentration points, and resources likely to be spent in this Encounter. Read the terrain and encounter count: one Creature alone, allies, civilians, objectives, cover, water, elevation, hazards, and whether the Party can rest or retreat. A Creature that shares a statblock with NPCs is tuned once for its shared consumers, never per person.

## 2024 encounter budget

Run `bun run cf encounter-budget --help`, then print the actual Party's Low, Moderate and High totals (`--levels` of every participating PC, sheet levels, not pre-offset). The CLI adds +1 combat level by default. Pass `--creature "Name,CR,XP,count"` for the requested count using XP from the retrieved statblock. If the caller says **Hard**, map it to **High** in the notes; that is a 2024 High budget, not a 2014 category. Keep the budget label separate from the Creature's CR estimate. The printout classifies Creature XP; it does not choose the Creature, rewrite Canon, or measure terrain, hazards or objectives — account for those in the three-round model.

## Three-round model

Write a legal three-round script before choosing the final numbers. State assumptions: initiative, starting distance and cover, terrain, target selection, active resources, concentration, allies, recharge rolls, and whether PCs choose their strongest reasonable turns. Include the Creature's opening tell, round-1 action, sustained repeat, reaction or off-turn action, healing or control, and escalation or payoff. Model the Party's best plausible response rather than a helpless target.

Report separately:

- **Round-1 damage:** the Creature's first-round output after actual hit/save chances and legal action timing.
- **Sustained damage:** later-round output, including repeat attacks, recharge odds and off-turn actions only when available.
- **Survival:** estimated rounds until the Party drops it, using effective HP and the Party's damage against its actual defences.
- **Time to drop:** estimated rounds for the Creature to drop the most exposed PC, including healing, control, mobility and target changes that affect the estimate.
- **Resource and action economy:** what each side spends, what control removes from the model, and which PC strengths remain useful.

These are estimates, not promises of a fixed number of rounds. Do not nullify a PC's signature strength merely to hit a target.

## Probability discipline

For an attack roll, compute the d20 threshold once, then clamp the chance to 5%–95% for the natural 1 and natural 20. Expected damage is base damage multiplied by that chance once; never bake accuracy into DPR and multiply by it again. For saving throws, use the actual 2024 save rule and show failure and success branches; do not add an automatic natural-1 rule unless the retrieved rule says it applies.

Use realistic area targets and list the assumed count. Apply advantage, disadvantage, cover, resistance, vulnerability, temporary hit points, healing and conditions explicitly. A recharge on 5–6 is available on the starting turn and has a one-in-three chance to return on each later round; use the actual recharge rule when different.

## CR and tradeoffs

Find a close published 2024 peer and cite it in the body or working record. Label defensive CR and offensive CR as **estimates** grounded in that peer and the observed output. Do not invent a 2024 CR formula and do not force the two estimates into an average. The statblock's `cr` is the deliberate label for the chosen peer or design; explain any divergence from the Party tuning.

Trade durability, damage, control, mobility and action economy. Do not stack high AC, large HP, broad resistances, immunities, regeneration, escape and control without a fiction-backed reason and a player answer. Every lethal or hard-control signature has a visible tell, at least two mechanically usable answers, and a payoff or opening when answered. Bosses and solo Creatures need a concrete escalation; every Creature needs a morale or ending condition.
