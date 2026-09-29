# LLM wiki special files: index.md, log.md, hot.md

Researched 2026-09-28 via Tavily. Karpathy's gist (2026-04-04) is the primary source; the rest is community practice.

## 1. index.md

- **Purpose.** Karpathy: a content catalog of the whole wiki. Each page gets a link, a one-line summary, and optionally metadata such as date or source count, organized by category (entities, concepts, sources, etc.). On a query the LLM reads the index first, then drills into pages. He says this works "surprisingly well" at about 100 sources and hundreds of pages, with no embedding RAG needed.
- **Kept current.** The LLM updates it on every ingest. Lint should check completeness (every page appears in the index), per the Hermes skill.
- **Single file or several.** Karpathy describes one file. Larger setups add structure:
  - Hermes Agent's llm-wiki skill uses one sectioned index. Sections split by first letter or sub-domain past 50 entries, and a `_meta/topic-map.md` groups pages by theme past about 200 entries in total.
  - claude-obsidian: sub-indexes per domain, read after `index.md`.

## 2. log.md

- **Purpose.** A chronological, append-only record of what happened and when: ingests, queries, lint passes. It tells the LLM what was done recently.
- **Format.** Karpathy's example is `## [2026-04-02] ingest | Article Title`. A fixed prefix makes it parseable with `grep "^## \[" log.md | tail -5`. The Hermes template uses `## [YYYY-MM-DD] action | subject` with actions `ingest, update, query, lint, create, archive, delete`, followed by short bullets.
- **Append-only.** Yes, by Karpathy. Growth handling varies. Hermes rotates at 500 entries to `log-YYYY.md`. Pratiyush/llm-wiki auto-archives at 50KB.

## 3. hot.md

- **Origin.** Not in Karpathy's gist. The earliest attribution I found is claude-obsidian (AgriciDaniel). Its README credits "Hot cache and cross-project patterns demonstrated by Nate Herk" (YouTube). AgriciDaniel announced `wiki/hot.md` in a comment on Karpathy's gist on 2026-04-10. It then spread through blogs and other tools. Could not confirm who coined the term or find the Herk video.
- **Purpose.** A short rolling cache of recent context, read first so the agent skips the "where were we?" recap and a full-wiki crawl.
- **Size.** Consensus is about 500 words (MindStudio, Plain English and pyshine write-ups). One blog (inovabeing.com) says 500 characters, probably an error. Pratiyush/llm-wiki instead keeps the last 10 session summaries.
- **Contents.** claude-obsidian's template has `Last Updated`, `Key Recent Facts`, `Recent Changes` and `Active Threads`. MindStudio describes it as work in progress, decisions in flight, and what changed this week.
- **Rewrite.** It is a rolling summary, overwritten rather than appended. Sources say it is refreshed on every ingest, at session end via a Stop hook (claude-obsidian's older README), or by a manual `/close-day` command (dev.to). The current claude-obsidian says never to update it merely because a session ended, and to refresh it inside an explicit save or ingest operation. Its query skill treats `hot.md` as orientation, "not as evidence by itself".

## 4. Core operations and read order

- **Ingest.** Read the source, discuss takeaways, write a summary page, update the index and entity/concept pages (10-15 pages per source), append to the log. Karpathy prefers one source at a time, human in the loop.
- **Query.** Search or read the index, read pages, and answer with citations. Good answers can be filed back as new wiki pages so explorations compound. Hermes files them under `queries/`.
- **Lint.**
  - Contradictions, stale claims, orphans, missing pages or cross-references, and data gaps (Karpathy). Hermes adds index completeness and broken links.
- **Read order at session start.**
  - Hermes: schema, then `index.md`, then the last 20-30 `log.md` entries.
  - claude-obsidian: `hot.md`, then `index.md`, then a sub-index, then pages.
  - Karpathy does not specify one.

## 5. Pitfalls reported

- **Index outgrows one read.** Fix: sections, sub-indexes, a topic map, or search (Karpathy suggests qmd; Cozypet says one index fails past about 200 pages).
- **Log growth.** Fix: rotate by year or size; read only the tail.
- **Stale hot cache.** Fix: overwrite it at defined operations. Dev.to's author found automatic background updates never fired and switched to one manual command.
- **Hot cache treated as evidence.** Fix: verify against real pages.

## Recommended conventions for this repo (my synthesis, not the sources')

- **Layout.** `wiki/index.md`, `wiki/log.md` and `wiki/hot.md`, with `AGENTS.md` naming them as the schema. Add per-section sub-indexes past about 50 entries.
- **index.md.** One line per page: `[[Page]] - summary`, grouped by type (NPC, place, faction, session, and so on). Update it in the same change as any page create or delete; a deterministic check flags missing or dead entries.
- **log.md.** Append-only, with headers `## [YYYY-MM-DD] ingest|query|lint|session|update | Title`, then 1-3 bullets naming the pages touched. Read only the tail. Rotate to `log-YYYY.md` at about 500 entries.
- **hot.md.** Cap at about 300-500 words; overwrite, never append. Sections: Last Updated, Active Threads, Current State (party, location, date in the campaign), Recent Changes and Next Session. Refresh it at end of session or ingest, and treat it as orientation only.
- **Read order.** `AGENTS.md`, then `hot.md`, then `index.md`, then the last 5-10 log entries, then the relevant pages. For query answers worth keeping, file them into the wiki with a log entry.

## Sources

- Karpathy gist: https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
- AgriciDaniel comment on the gist (hot.md): https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f?permalink_comment_id=6091186
- claude-obsidian: https://github.com/AgriciDaniel/claude-obsidian (skills/wiki-query, skills/wiki-ingest, templates/vault/wiki/hot.md)
- claude-obsidian older README (Nate Herk credit): https://github.com/AgriciDaniel/claude-obsidian/blob/a006c179411dc9e728569d1f2b9c864780b708bd/README.md
- Hermes Agent llm-wiki skill: https://hermes-agent.nousresearch.com/docs/user-guide/skills/bundled/research/research-llm-wiki
- Pratiyush/llm-wiki AGENTS.md: https://github.com/Pratiyush/llm-wiki/blob/master/AGENTS.md
- Cozypet, "The Schema Is the Product": https://cozypet.github.io/llm-wiki-schema
- Dev.to (awrshift): https://dev.to/awrshift/i-over-engineered-karpathys-agent-memory-heres-what-actually-works-4imk
