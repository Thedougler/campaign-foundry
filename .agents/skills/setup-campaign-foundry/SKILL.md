---
name: setup-campaign-foundry
disable-model-invocation: true
description: Save your Wiki and Foundry directory locations to the project's .env file through a short interview.
---

# Setup Campaign Foundry

Interview the DM for three directory locations and save their answers in repo-root `.env`. Keep this setup limited to location configuration: preserve API-key settings and leave `.env.example`, `user-config.md`, the Wiki, and Foundry's runtime state unchanged. Keep secret values out of tool output and replies.

## Steps

### 1. Locate the configuration

Resolve the repository root from the current checkout and read its `.env.example` for the path-key descriptions. Check whether repo-root `.env` exists, and inspect only the existing `WIKI`, `FOUNDRY_DATA` and `FOUNDRY_APP` assignments, with file operations whose output is limited to those keys or their presence. Treat `.env.example` as reference, not a template to copy wholesale.

### 2. Ask for the locations

Use Ask or a conversational equivalent to collect an answer to each question:

- `WIKI`: where is your Obsidian vault / Wiki folder?
- `FOUNDRY_DATA`: where is your Foundry user data directory?
- `FOUNDRY_APP`: where is your Foundry application resources directory?

Explain that an empty answer keeps that key's existing `.env` value, or leaves the key absent if it has none. Use the DM's supplied paths rather than inferred paths or machine defaults, and clarify an ambiguous answer with him. Wait for explicit answers, including intentional blanks, before writing.

### 3. Upsert the answers

Edit the current `.env`, creating the file if missing. For each nonempty answer, replace that key's existing assignment or append it if absent. If a key has multiple assignments, update them consistently so an older value cannot override the answer. For each empty answer, leave existing assignments untouched and keep an absent key absent. If the file is missing and all answers are empty, create an empty `.env`.

Serialize supplied paths as literal dotenv values, preserving spaces and special characters when parsed. Preserve every other key and its value, along with unrelated comments and formatting, using targeted edits on an existing file.

### 4. Verify and report

Verify the saved file with the project's dotenv parser without executing it as shell code or launching Foundry. Check that each supplied path parses back to the DM's answer and that untouched assignments match their pre-edit state. Also check that no unrelated key was added, changed, or removed. Emit only verification statuses, not secret values.

Tell the DM that repo-root `.env` was saved and list each path key as updated, kept, or omitted.
