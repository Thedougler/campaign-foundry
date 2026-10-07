# Notion backup

`bun run cf -- backup` copies the Shattered Sea Wiki (`wiki/The Shattered Sea/`), the agent skills (`.agents/skills/`) and every image in those trees to Notion. `.github/workflows/notion-backup.yml` runs it on each push to `main` that touches those paths. GitHub stays the working copy: an edit made in Notion is overwritten the next time its file changes. The decision record is [ADR 0021](adr/0021-notion-backs-up-main.md).

## Set up (once)

1. In Notion, open **Settings → Connections → Develop or manage integrations** and create an **internal** integration for the Second Brain workspace. Give it Read, Update and Insert content. Copy its token.
2. Open the Second Brain page **Shattered Sea (campaign)** (`3f10216635ec8117af9cd05f042eea59`). Under **⋯ → Connections**, add the integration. The Backup root is created as a child of this page, and the integration can only write where it is shared.
3. Add the token as a repository secret: `gh secret set NOTION_TOKEN -R Thedougler/campaign-foundry`. To put the Backup under a different page, set the `NOTION_BACKUP_PARENT` repository variable to that page's id or URL.
4. Run the first full sync: `gh workflow run notion-backup.yml -R Thedougler/campaign-foundry`, or **Actions → Notion backup → Run workflow**. It creates "campaign-foundry backup" under the parent and commits `.notion/backup-map.json`. A first run takes about 10 minutes. Without the secret, the workflow skips with a warning.

To preview a run without Notion, use `bun run cf -- backup --dry-run`, which prints the counts and a block and request estimate. Add `--tree` for the planned page tree. To run it locally against Notion, put `NOTION_TOKEN=` in `.env`, then commit the map it updates.

## What a run does

- **Tree.** Each directory becomes a page and each file a page under it, keyed by repo path in `.notion/backup-map.json`, starting at `wiki/` and `.agents/`. Markdown pages take their Obsidian name (no `.md`); other files keep their extension.
- **Included.** Markdown files, images (png, jpg, jpeg, webp, gif, svg) and other text files in skills (YAML, JSON, scripts, licences). Symlinks are followed once. `.claude/skills/` is never walked, because its entries link into `.agents/skills/`. `.agents/skills/run-evals` links to `.omp/skills/run-evals` and is backed up under its `.agents` path.
- **Excluded.** `.obsidian/`, `node_modules/`, `src/`, lockfiles and binaries that are not images, such as PDFs.
- **Scope.** The first run, and any run with `--all`, checks every file against the map by content hash. A push diffs the map's `syncedCommit` to HEAD and writes only those files. If that commit is not in HEAD's history (after a squash or rebase merge, a force push or in a shallow clone), the run falls back to `--all`. That compares every file with the content hash the map stored for it, so it still writes only the files that changed, and then records the new synced commit.
- **Updates.** A changed file's page is emptied and rewritten at the same URL. A new file gets a new page. A deleted file's page is retitled "(deleted from repo)" with a red note at the top, and stays in Notion. A restored file revives its old page.
- **Limits.** Requests start at most every 350 ms (about 3 a second). 429 and 529 responses are retried with back-off, honouring Retry-After. Appends are chunked to 100 blocks, 1,000 nested blocks and 450 KB per request, and text to 2,000 characters per rich text object.

## Markdown in Notion

| Obsidian | In Notion |
| --- | --- |
| `[[Page]]`, `[[Page\|alias]]`, `[[Page#Heading]]` | A link to the backed-up page when the target is in the Backup (alias shown; a heading becomes `Page > Heading` and links to the page). Otherwise plain text. A link to a page created in a later push stays plain text until the linking page next changes, or until a `--rewrite` run. |
| `![[image.png]]`, `![](path)` | An image block on the uploaded file. |
| `> [!narration] Title` callouts | A Notion callout with the title in bold and the body as its children. Fold markers (`+`/`-`) are dropped. |
| ` ```statblock ` (Fantasy Statblocks) | A YAML code block captioned as Obsidian-only. The stat block does not render in Notion. |
| ` ```base `, ` ```dataview ` | A YAML (or plain) code block. The live query does not run in Notion. |
| Frontmatter | A YAML code block at the top of the page. |
| Tables | Notion tables. One with more than 98 body rows is split, repeating the header. |
| Lists nested three or more deep | Lifted to the second level, in order. One append request carries a block and its children only. |
| `%% comments %%`, `==highlights==`, footnotes | Kept as literal text. |

Images over the workspace's per-file upload limit (5 MiB on a free Notion plan) or over 20 MiB get a note linking to the file in GitHub instead. The next `--all` run retries them. Multi-part upload is not implemented.
