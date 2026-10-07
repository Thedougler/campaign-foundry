# One lint gate with warning and error severities

Amends [ADR 0010](0010-content-is-gated-deterministically.md). GitHub issue [#29](https://github.com/Thedougler/campaign-foundry/issues/29).

`bun run cf -- check` is the only Wiki lint/gate command. `cf lint` and `cf narration` are gone: mechanical layers, path filters and `--fix` already live on `bun run cf -- check`. `bun run cf -- eval extract` stays as grader tooling, not lint.

`Finding.severity` is `"error"` | `"warning"`. Errors fail the gate (exit 1). Warnings are reported and exit 0. There are no waivers. New language rules start as warnings and are promoted to error only when the live Wiki has zero findings for that rule. Severity decides only the exit code: lint fixes every warning as well as every error, heard Narration and played Session records included, keeping every fact.

Vale is first. Token and regex rules are `Narration.*` (and `ai-tells.*`). Structural rules that need sentences, sources or links are the `narration` layer over `analyze.ts`. The band check is not a gate rule: it depends on the slot, and the recipe dispatch already owns slot resolution.

Skills carry judgment. Vale and the narration layer carry rules. Neither replaces the other.

## Census 2026-10

Full `bun run cf -- check --json` over the live Wiki (359 pages), recorded 2026-10-06 while the lint slices were still cleaning the Wiki. Counts are that run's; severities are each rule's.

**Errors.** Every `ai-tells.*` rule fails the gate: 117 of its 137 rules are pinned to error in `.vale.ini`, and the other 19 run at `level: error` from the pinned v1.37.0 package; one more, `ai-tells.ShipOveruse`, is switched off in `.vale.ini` for ship names. Seventeen rules fire on the live Wiki, 121 findings: CataphoricForecasting 22, AnthropomorphicCognition 20, BareReaches 14, FigurativeCarries 14, BareHolds 11, FigurativeSits 9, MortalityMetaphors 5, FigurativeOwns 4, FigurativeStays 4, FigurativeSurfaces 4, FigurativeEarns 3, FigurativeLands 3, FigurativeLives 3, FigurativeWorth 2, EnforcementMetaphors 1, FigurativePays 1, MotionMetaphors 1. Every other rule in the package: error, 0 live findings. The five Narration punctuation rules are pinned to error in `.vale.ini` (`Narration.NoEmDash`, `Narration.NoSemicolon`, `Narration.NoColon`, `Narration.NoCompass`, `Narration.NoFootMileCounts`): 0 live findings each.

**Warnings, not yet promoted.**

| Rule | Layer | Live findings |
| --- | --- | --- |
| `Narration.JudgementWords` | style (Vale) | 0 |
| `Narration.MechanicalTerms` | style (Vale) | 0 |
| `Narration.PerceptionHedges` | style (Vale) | 0 |
| `Narration.FilterVerbs` | style (Vale) | 0 |
| `Narration.PcInterior` | style (Vale) | 0 |
| `Narration.StockTells` | style (Vale) | 0 |
| `narration/echo` | narration | 1 |
| `narration/fresh-starts` | narration | 0 |
| `narration/evaluative-stack` | narration | 0 |
| `narration/relative-chain` | narration | 0 |
| `narration/invented-names` | narration | 0 |
| `narration/spoken-word-trap` | narration | 0 |
| `narration/dialogue-attribution` | narration | 0 |

The zero-finding warnings are promotion-eligible under the promotion rule above; this census records, it does not promote. `narration/echo`'s one live finding keeps that rule a warning.
