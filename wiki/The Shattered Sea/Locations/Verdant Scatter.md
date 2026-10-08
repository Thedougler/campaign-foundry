---
type: Location
kind: Region
summary: "The primary archipelago of the sea: two island arcs, the Crown Islands and the Midchain, with the inspected Central Strait running between them and the Maw waiting at the eastern convergence."
sources:
 - "archive/ssw-verdant-scatter.md"
parent: "[[The Shattered Sea]]"
---

## At a glance

- **Character.** Not one island chain but two, the [[Crown Islands]] north and the [[Midchain]] south, with the [[Central Strait]] running between them. Routes here punish bad charts.
- **Held by.** Contested. The [[Dravosi Crown]] holds its strongest regional authority along the northern arc. The southern arc rests with island councils, free ports, pilot families, market bosses and Grung trade boundaries that fit no colonial ledger.
- **Changing.** Both arcs narrow eastward toward [[The Tail]], where the water grows colder under the [[Drowned Maw]]'s influence.
- **Crossing.** The Strait road is fast and inspected. The local reef routes through the Midchain are slower and owe nothing to any ledger. The eastern approach belongs to the Maw.
- **Danger.** Reefs older than every chart, an inspection regime that prices every hull, piracy that scales with the water it works, and the eastern convergence.

> [!narration] Arrival
> Ahead of you lie two long lines of islands, with a road of blue-green water between them. Down the near line the land stands mountainous and green, canal towns and fort guns marking its deep harbours, while the far line breaks into dozens of small islands packed reef to reef. An orderly line of sails fills the shipping road, all of them bound for or away from the same inspection pier where the road meets the Gate. Follow the road's far end and the two lines close together, the water past the last islands going a shade too deep for the charts.

## Play

### Travel

The Scatter runs east from the [[Galewall]] to the [[Drowned Maw]]. The northern arc is five larger, mountainous islands with deep harbours, forested highlands and fortifications, and the Crown's regional foothold is strongest there. The southern arc is dozens of smaller islands packed close together, with free ports, reefs, local councils and pilot families, and routes that make more sense learned from grandparents than from charts. Between them nearly everything that moves funnels through the [[Central Strait]], and at the eastern end both arcs converge at [[The Tail]].

The ways through:

- **The Strait road.** From the Tidefall Gate to the Narrows on the current's back, fast eastbound, inspected and entered in the Crown's ledger at the western mouth. The cost is papers, fees and the Crown knowing your hull. Full routes and readings on the [[Central Strait]].
- **The local routes.** Through the Midchain's reefs and harbours under pilot guidance, days slower, invisible to the Crown's ledgers, and priced in trust and pilot fees instead of inspection fees. The same road the [[Passage]] and the smuggling trade work.
- **The eastern approach.** Where the arcs converge at [[The Tail]] the charts run thin, and beyond it the [[Drowned Maw]] sets the terms of the water.

### Places

- [[Crown Islands]], the northern arc.
- [[Midchain]], the southern arc.
- [[Central Strait]], the corridor between them.
- [[The Tail]], the eastern convergence.
- [[Galewall]], the western wall of weather.
- [[Drowned Maw]], the eastern deep.

### Encounters

| d6 | Sign | What happens |
| --- | --- | --- |
| 1 | A Crown boarding party comes over the rail at an anchorage, papers first. | Inspection law reaches every harbour the Crown can reach ([[Dravosi Crown]]). Clean papers pass, and dirty ones set the price of the conversation. Ignored, the boarding becomes an incident the patrols remember. |
| 2 | A pilot asks your route before naming a price. | Route information is the trade here. A route that sounds wrong gets a higher fee or no help, and a route that sounds profitable gets shared with whoever pays after you. Ignored, the ship pays for its pilot twice. |
| 3 | A passage the chart marks open ends in breaking water. | The charts punish trust. Work the lead and the birds instead of the paper. Ignored, a grounding calls the salvage traffic, and the salvage traffic sells your position. |
| 4 | A Grung trader watches a market landing and prices you by your cargo. | The trade boundaries cross the southern arc ([[Grung (Creature)]]). Trade straight, or note who else is watching the landing. Ignored, the cargo draws the boundary's keepers. |
| 5 | A hull with paperwork for every port holds clear of an inspection queue without leaving it. | The [[Bad Receipt]] works the slowed hulls. Keep distance and warn the next merchant in. Ignored, a hull that stopped for inspection does not finish it. |
| 6 | A sail you last heard reported taken closes under a friendly flag. | The [[Velvet Noose]] works this scale of water, and [[Glass Debt]] is the reason convoys close up. Run, fight or negotiate before the flag's distance runs out. Ignored, the boarding is on her terms. |

### Rumors

- "The Teeth are closed, and the clans hold them shut." Midchain pilot talk about the [[Verdant Teeth]]. True: the [[Grung Clans]] keep the Teeth closed. Investigate: ask a [[Kalowe]] pilot what passing the Teeth costs, and who has paid it lately.
- "Out here a chart is a rumour with lines drawn on it." Pilot-family talk. True: the routes make sense learned from grandparents, not from charts. Investigate: set a harbour chart against a pilot family's route and count what the chart omits.
- "Crown law ends where the deep water starts." Free-port talk. Mostly true: the Crown's authority is strongest on the northern arc. Island councils and free ports set the terms along the southern arc, and its routes belong to the pilot families. Investigate: watch whose flag a dispute settles under at a southern free port.

## Depth

### History

The Crown occupied the northern arc in 1195 DR and founded the inspection port at its western mouth. The Tessarine houses formed the Seven Houses of Calven and Calveno in 1210 DR, Passage broke from the Warren under colonial pressure in 1240 DR, and the Sentinels of the Eyrie began watching the Maw in 1295 DR. The Spellplague closed the northern crossings in 1385 DR, and the Scatter developed its own institutions. Second Sundering shipping resumed in 1487 DR, and the current charters began ([[Campaign Timeline]]).

### Hidden truths

- **The corridor is a funnel.** The Strait road concentrates nearly every hull past one inspection. The western gate exists for that funnel, and hulls still take the local routes, reefs and all.
- **The east rewrites the charts.** The Maw's water changes the routes faster than any chart house works, and the convergence at [[The Tail]] is where the charts give out first.
- **Ledgers that disagree.** The northern arc keeps the Crown's ledger. The southern arc runs on trust, pilot families and boundaries the ledger cannot record. A hull can be lawful in one ledger and smuggled in the other before the crossing ends.

### Threads

[[Drowned Maw Awakening]] covers the eastern water. [[The Crown Inspection]] keeps the Crown's pursuit on the corridor. [[Simone's Hunters]] run their captive route across the Midchain toward [[Karath]].

## Links

```base
filters:
 and:
  - file.hasLink(this.file)
views:
 - type: table
  name: Contains
  filters:
   and:
    - parent == this
  groupBy:
   property: note.kind
   direction: ASC
  order:
   - file.name
   - note.summary
 - type: table
  name: Linked from
  filters:
   and:
    - parent != this
  groupBy:
   property: note.type
   direction: ASC
  order:
   - file.name
   - note.summary
```
