# Wiki search

How to search the Wiki's Notion Backup and its local QMD index. `.omp/AGENTS.md` § Wiki access decides which one a read goes to, and this file gives each one's query grammar.

## Notion Backup

Write each search to `xd://mcp__notion_search` with `page_url` set to the Backup root (`3f20216635ec815c9ba6dacbda0f6f1b`), which keeps the rest of the Second Brain and connected Slack, Mail and Calendar out of the results. The workspace's Notion Business plan gives these search modes:

- **Question** (AI search, the default): a bare `query` of keywords or one plain question under 50 words, on one topic. It answers across many pages at once and returns `type: ai_search`.
- **Title lookup:** `"filters": {"title_only": true}` with the page's name returns the page by its title.
- **Recent changes:** an empty `query` with `"sort": "last_edited"` lists the pages the last pushes synced. `"filters": {"last_edited_date_range": {…}}` limits the list to a date range.
- **Folder:** `page_url` set to a folder page from a hit's `path` searches that folder alone.
- **Keyword search** (`type: workspace_search`) answers any call with a filter or a sort other than relevance. Ask questions with a bare `query`, and keep filters for lookups.
- **Whole page:** a hit gives a title, a folder path and a short highlight. When the highlight is not enough, write the hit's `id` to `xd://mcp__notion_fetch`.

Ask a question:

```json
{"query": "Who leads the Black-Jaw Run and where does she operate?", "page_url": "3f20216635ec815c9ba6dacbda0f6f1b", "page_size": 5, "max_highlight_length": 150}
```

Look up a page by title:

```json
{"query": "Nona Black-Jaw", "page_url": "3f20216635ec815c9ba6dacbda0f6f1b", "filters": {"title_only": true}, "page_size": 3}
```

List recent changes:

```json
{"query": "", "page_url": "3f20216635ec815c9ba6dacbda0f6f1b", "sort": "last_edited", "page_size": 10}
```

Browse one folder, here NPCs:

```json
{"query": "Dravosi naval officers", "page_url": "3f20216635ec81e28fd1d7f82bc7f305", "page_size": 10}
```

Read one Backup page whole (`write` to `xd://mcp__notion_fetch`):

```json
{"id": "3f20216635ec81a59bb4df08d56bbaf3"}
```

**Cite the repo path.** A fetched Backup page is a citable source. Its grey header gives the page's repo path, which a citation uses, and the commit it was synced at. A hit's `title` is the page's `title` property, and its `path` ends at the folder. Title `Nona Black-Jaw` under `… / campaign-foundry backup / wiki / shattered-sea / NPCs` maps to `wiki/shattered-sea/NPCs/nona-black-jaw.md`, the title's slug. A title ending "(deleted from repo)" is a removed file.

## QMD

QMD is the live local index of `wiki/`, `raw/` and `archive/`, re-indexed by the `qmd-refresh` post hook after each `write` or `edit` under them. Search it through the mounted MCP devices:

- **Query.** Write JSON to `xd://mcp__qmd_query` (`read` the device once for its schema). Give each query an explicit `intent`. Lead with a `lex` sub-query on names and aliases, then add a `vec` or `hyde` sub-query on what the text says of the subject. Write a hyphenated name bare (`Nona Black-Jaw`), because a quoted phrase holding a hyphen skips the document.
- **Collections.** A query without `collections` searches `wiki`. Put `raw`, `archive` or `agentic-co-dm` in `collections` to search those.
- **Retrieve.** Read each hit whole by its path or docid through `xd://mcp__qmd_get`, several at once through `xd://mcp__qmd_multi_get`, or with `read`, and answer from the retrieved text. A snippet only says where to read.

A shell reaches `wiki`, `raw` and `archive` through the CLI, run from this project without `--index`:

```bash
env -u QMD_CONFIG_DIR qmd query $'intent: Find active Shattered Sea Campaign context, not unrelated Campaigns.\nlex: "Shattered Sea" hot' -c wiki --format json --no-rerank -n 3
env -u QMD_CONFIG_DIR qmd get '<docid>'
```
