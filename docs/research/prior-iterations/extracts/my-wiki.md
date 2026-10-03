# my-wiki salvage extract

## Review prompts (weekly/monthly/quarterly templates)
- source: `wiki/templates/weekly.md`, `wiki/templates/monthly.md`, `wiki/templates/quarterly.md` (found)
- destination: `plan-session` — one grounded adjustment when the DM volunteers feedback; never mandatory bookkeeping, never infer Player enjoyment from fictional success.
- load-bearing — the questions only (skip Templater frontmatter, dataview blocks, priority lists):
  - Weekly: What went well? What didn't go well? What do I want to change?
  - Monthly: Wins / Struggles / Patterns I noticed; 1–5 quick rating per area; Next month's focus.
  - Quarterly: Goals I set → what actually happened; Biggest lesson; What I'm avoiding (be honest).
- skip-from-this-file: Templater date interpolation, dataview task/project queries, life-area dashboards.

## Research brief recipe
- source: `.claude/agents/gemini-research-expert.md` (found)
- destination: research handoffs in `lore-design`, `location-design` and other design skills.
- load-bearing — the briefing recipe, not Gemini routing:
  - Identify the real information need, not the literal ask.
  - Scope by domain/context so results don't range too far.
  - Choose output format for the caller: summary, comparison, bullets, structured data.
  - Ask for citations when factual accuracy is critical.
  - Split complex questions into 2–3 targeted queries; one broad search rarely wins.
  - Synthesize, don't relay: key findings, gaps, caveats/recency, established vs emerging.
  - If results are shallow, refine and re-run rather than reporting incomplete findings.
  - Output: key findings, limitations/caveats, sources if accuracy matters, suggested follow-ups.
- skip-from-this-file: `gemini -p` CLI, model pin, availability/error handling for that CLI.

## Marker-bounded replacement + ownership table
- source: `CLAUDE.md` (Ownership Rules), `.claude/commands/refresh-projects.md` (found)
- destination: documentation idea only — name exactly which generated maintenance output a tool owns and which authored/historical text it must preserve. Apply marker-bounded replacement (`%%github-start%%` / `%%github-end%%`) only if a future generated metadata block genuinely needs it.
- load-bearing:
  - Ownership table: AI-maintained spine (index/hot/log/concepts/entities/sources/raw) vs human-owned (inbox/daily/periodic/projects/areas/people/resources/archive/dashboards/templates); AI may suggest, never write human-owned files without explicit instruction — prevents Obsidian Sync vs git conflicts.
  - Replace command touches only content between markers; "Do not touch anything outside the markers."
- skip-from-this-file: dataview dashboards, GitHub feed tables, commit/push-after-every-op policy, frontmatter schema, wiki-load conventions.
