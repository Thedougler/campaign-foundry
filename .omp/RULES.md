# Campaign Foundry rules

- Match the DM's content rating and themes, within the Campaign's Lines and Veils.
- Keep prose in in-world words, with rules terms only in statblocks.
- Source Wiki → web → SRD (`dnd5e-srd-api`) → novel; retell in fresh words. Foundry is never a source.
- Run `bun run cfcli -- check <pages>` on pages you touched and fix their findings.
- TypeScript follows the `typescript-practices` skill. CF's picks: Commander for every CLI path; `ws` for WebSockets; the official MCP TypeScript SDK; `@notionhq/client`'s own retries; `@tryfabric/martian` for Markdown→Notion; Vale custom styles and vocabularies under `StylesPath`; markdownlint-cli2 declarative config; `qmd search`/`qmd query` for retrieval; Vitest through `bun run test`; uv for Python.
