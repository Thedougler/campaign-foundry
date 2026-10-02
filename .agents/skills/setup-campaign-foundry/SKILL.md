---
name: setup-campaign-foundry
disable-model-invocation: true
description: Save your Wiki and Foundry directory locations to the project's .env file through a short interview.
---

# Setup Campaign Foundry

Interview the DM for three directory locations and save their answers in repo-root `.env`. Keep this setup limited to location configuration: preserve API-key settings and leave `.env.example`, `user-config.md`, the Wiki, and Foundry's runtime state unchanged. Never print secret values; keep them out of tool output and replies.

## Steps

### 1. Locate the configuration

Resolve the repository root from the current checkout and read its `.env.example` for the path-key descriptions. Check whether repo-root `.env` exists. Inspect existing assignments using file operations whose output is limited to the three path keys below or their presence; keep all other values private. Treat `.env.example` as reference, not a template to copy wholesale.

**Done when** the destination is the current repository's `.env`, its existence is known, and the existing state of `WIKI`, `FOUNDRY_DATA`, and `FOUNDRY_APP` is known without exposing secret values.

### 2. Ask for the locations

Use Ask or a conversational equivalent to collect an answer to each question:

- `WIKI`: Where is your Obsidian vault / Wiki folder?
- `FOUNDRY_DATA`: Where is your Foundry user data directory?
- `FOUNDRY_APP`: Where is your Foundry application resources directory?

Explain that an empty answer keeps that key's existing `.env` value, or leaves the key absent if it has none. Restrict the interview to these three locations. Use the DM's supplied paths rather than inferred paths or machine defaults; clarify an ambiguous answer with the DM. Wait for explicit answers, including intentional blanks, before writing.

**Done when** each key has either a DM-supplied path or an intentional empty answer, and any ambiguity in the supplied paths has been resolved.

### 3. Upsert the answers

Use the current `.env` contents as the basis for the edit, creating the file if missing. For each nonempty answer, replace that key's existing assignment or append it if absent. If a key has multiple assignments, update them consistently so an older value cannot override the answer. For each empty answer, leave existing assignments untouched and keep an absent key absent. If the file is missing and all answers are empty, create an empty `.env`.

Serialize supplied paths as literal dotenv values, preserving spaces and special characters when parsed. Preserve every other key and its value, along with unrelated comments and formatting. Limit writes to repo-root `.env`; use targeted edits for an existing file. Keep unrelated values out of edit output.

**Done when** `.env` exists, each nonempty answer is upserted, every empty answer follows the keep-or-omit rule, and all unrelated content is preserved.

### 4. Verify and report

Verify the saved file with the project's dotenv parser without executing it as shell code or launching Foundry. Check that each supplied path parses back to the DM's answer, that untouched assignments match their pre-edit state, and that no unrelated key was added, changed, or removed. Emit only verification statuses, not secret values.

Tell the DM that repo-root `.env` was saved and list each path key as updated, kept, or omitted. Keep the report to the destination and key statuses.

**Done when** the saved values pass the round-trip and preservation checks, and the DM has received the destination and a status for all three path keys.
