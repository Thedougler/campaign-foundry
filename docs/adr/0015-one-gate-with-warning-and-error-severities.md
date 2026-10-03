# One lint gate with warning and error severities

Amends [ADR 0010](0010-content-is-gated-deterministically.md). GitHub issue [#29](https://github.com/Thedougler/campaign-foundry/issues/29).

`cf check` is the only Wiki lint/gate command. `cf lint` and `cf narration` are gone: mechanical layers, path filters and `--fix` already live on `cf check`. `cf eval extract` stays as grader tooling, not lint.

`Finding.severity` is `"error"` | `"warning"`. Errors fail the gate (exit 1). Warnings are reported and exit 0. There are no waivers. New language rules start as warnings and are promoted to error only when the live Wiki has zero findings for that rule. Narration already heard at the table stays word for word, so a rule that would flag heard text stays a warning.

Vale is first. Token and regex rules are `Narration.*` (and `ai-tells.*`). Structural rules that need sentences, sources or links are the `narration` layer over `analyze.ts`. The band check is not a gate rule: it depends on the slot, and the recipe dispatch already owns slot resolution.

Skills carry judgment. Vale and the narration layer carry rules. Neither replaces the other.
