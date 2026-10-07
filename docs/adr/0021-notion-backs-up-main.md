# Notion backs up main; a committed map keys each page by repo path

GitHub issue [#48](https://github.com/Thedougler/campaign-foundry/issues/48).

GitHub stays the working copy and Notion holds a Backup of it: the Shattered Sea Wiki, the agent skills under `.agents/skills/` and every image in those trees. `.github/workflows/notion-backup.yml` runs `bun run cf -- backup` on each push to `main` that touches those paths, and on `workflow_dispatch` for the first full run. The Backup root is a new child of the Second Brain's "Shattered Sea (campaign)" page, so that page stays a short pointer. Each directory becomes a page and each file a page beneath it. A Backup copies, and it never feeds play: Push is still the only way material leaves the Wiki for the table, and nothing in Notion flows back into the repo.

Decisions:

- **A script in this repo, not nogisync.** nogisync finds pages by title through Notion search, which is eventually consistent and duplicates pages under same-named folders. It uploads no images and has no excludes, symlink handling or deletion. `cf backup` is about 1,400 lines of TypeScript on the official `@notionhq/client` (retries and Retry-After) and the remark stack the repo already uses.
- **A committed map, not `notion_page` frontmatter.** `.notion/backup-map.json` maps every repo path to its page id and URL, content hash and image upload id. Writing frontmatter would make the workflow edit 400 Canon and skill files on its first run, put Notion URLs into pages the DM edits and the gate checks, and change skill frontmatter that harnesses parse. The workflow commits the map back to `main` with `[skip ci]`, and `.notion/` is outside the trigger paths.
- **Two stages, one engine.** The first run creates every page empty, then writes content, so every `[[wikilink]]` already has a page to link to. Later pushes diff the map's `syncedCommit` to HEAD and touch only the files that changed. That base is the last commit fully in Notion, `HEAD^` on an ordinary push. A multi-commit push, a cancelled run or a failed run still reaches every change. A file with a recorded URL has its page content replaced in place. A new file gets a page. A deleted file's page is retitled "(deleted from repo)" and kept, never trashed, because Notion empties its trash after 30 days.
- **Safe to cancel.** The job runs in one `concurrency` group with `cancel-in-progress`. The map is saved after every Notion write, and an `always()` step commits it, so a cancelled run never forgets a page it made. `syncedCommit` advances only when a run ends with no failures.
- **Images through the File Upload API.** Each image is uploaded once. It is shown on its own page and reused by id wherever a page embeds it. The workflow checks out without LFS, and `cf backup` pulls only the LFS objects it uploads, keyed by the LFS object id (the content's sha256), to spare the LFS bandwidth quota.

The conversion's limits are listed in `docs/notion-backup.md`.
