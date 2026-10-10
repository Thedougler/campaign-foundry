---
name: qmd
description: QMD search over this project's markdown. Use for `raw/` and `archive/` files, Wiki aliases, Wiki work not yet pushed, or any Wiki read in a session without the Notion MCP.
license: MIT
compatibility: Requires the qmd CLI or its MCP server.
allowed-tools: Bash(qmd:*), mcp__qmd__*
---

# QMD - Query Markdown Documents

QMD indexes `wiki/`, `raw/` and `archive/` in this project.

Search it the way `.omp/AGENTS.md` § Wiki access sets out: the mounted MCP devices (`xd://mcp__qmd_query`, `xd://mcp__qmd_get`, `xd://mcp__qmd_multi_get`), or, where the shell is the only route, the CLI with the same grammar:

```bash
env -u QMD_CONFIG_DIR qmd query $'intent: <what the search is for>\nlex: <names and key terms>' -c <collection> --format json --no-rerank -n 5
env -u QMD_CONFIG_DIR qmd get '<docid>'
```

In short: search first, and retrieve each hit whole rather than answering from snippets. Give each query an explicit `intent`, and name `raw`, `archive` or `agentic-co-dm` in `collections` to search those. The CLI reaches `wiki`, `raw` and `archive` only.

Server setup: [references/mcp-setup.md](references/mcp-setup.md).
