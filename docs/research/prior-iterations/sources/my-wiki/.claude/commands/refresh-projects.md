---
description: Refresh GitHub data (commits, PRs, issues) for all tracked project pages
---

Refresh GitHub data for all project pages in `wiki/projects/` that have a `repo` frontmatter field.

## Steps

1. Read every file in `wiki/projects/`. For each file that has a `repo` field in its frontmatter, collect the repo slug (e.g. `Thedougler/nextturn`) and the file path.

2. For each repo, run these `gh` CLI commands to gather data:
   - `gh api repos/{repo}/commits?per_page=10` — recent commits (extract sha short, date, message, author)
   - `gh api repos/{repo}/pulls?state=open&per_page=10` — open PRs (extract number, title, author, created date)
   - `gh api repos/{repo}/issues?state=open&per_page=10&filter=is:issue` — open issues (use `pull_request` field to exclude PRs; extract number, title, labels, created date)

3. For each project file, replace everything between `%%github-start%%` and `%%github-end%%` with a formatted `## GitHub` section containing:

   ```
   %%github-start%%
   ## GitHub
   [Repo](https://github.com/{repo}) | [Issues](https://github.com/{repo}/issues) | [PRs](https://github.com/{repo}/pulls)

   ### Recent commits
   | Date | Message | Author |
   |------|---------|--------|
   | 2026-06-06 | fix: thing | nick |

   ### Open PRs
   | # | Title | Author | Opened |
   |---|-------|--------|--------|
   (or "None" if empty)

   ### Open issues
   | # | Title | Labels | Opened |
   |---|-------|--------|--------|
   (or "None" if empty)

   *Last refreshed: YYYY-MM-DD HH:MM*
   %%github-end%%
   ```

4. Use the Edit tool to replace the content between markers in each file. Do not touch anything outside the markers.

5. After updating all files, commit the changes with message `wiki: refresh GitHub project data`.
