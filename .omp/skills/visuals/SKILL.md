---
name: visuals
description: Visuals — decide, place, generate and verify the images and mermaid diagrams on Wiki pages (portraits, banners, Item renders, sigils, symbols, scene-setters, battle maps, recap illustrations, Handout reveal art, structure diagrams). Use when a run creates or expands a page whose Visual is missing, when Prep or Ingest needs Session art, when play changes a subject's look, when a `[!visual-aid]` callout waits, or when the DM asks for art, a diagram or a backfill.
---

# Visuals

A **Visual** (`CONTEXT.md`) is an image or mermaid diagram that shows a page's subject or structure to the DM. Art for the Players' eyes is a Handout's image, and Push is its only route to them. A run of this skill works out which Visuals each page in scope gets, then reuses or makes each one, views it and files it in its **slot**: the place on a page kind reserved for that Visual.

Scope is what the caller hands over. A design skill, Prep or Ingest hands over the pages its run touched. The DM hands over pages, or asks for a [Backfill](#backfill).

Read each reference at its step:

- [`references/placement.md`](references/placement.md), in step 1: the slot and filename of each page kind's Visuals, and what Prep and Ingest hand over.
- [`references/prompts.md`](references/prompts.md), in step 3: the kinds and prompt layers, plus the generation and finishing commands.
- [`references/diagrams.md`](references/diagrams.md): mermaid. Read it when a slot is a diagram.

## Steps

1. **List the slots.** Read `references/placement.md`. For each page in scope, list every empty slot its kind gets, plus each depiction whose subject's page now records a look the image lacks. A page with `revealed: ""` holds draft Canon. It gets Visuals only when the Prep being built links it, or once it is revealed. **Done when** every page in scope has its open slots listed, or "none".

2. **Reuse first.** For each open image slot, glob the Campaign folder's `attachments/` for the subject's slug (`wiki/<campaign>/attachments/<slug>-*`), and the shared attachments folder at the vault root once it exists, with the glob tool's `gitignore: false`, because `.gitignore` excludes `*.webp` and a default glob returns no image. A file of the slot's kind fills the slot: embed it at step 7 and generate nothing. A file of another kind for the same subject (a portrait, reference sheet or token) becomes the slot's **continuity input** at step 3, and so does the portrait of every character the Visual shows. Send each diagram slot through `references/diagrams.md`, then embed it at step 7. **Done when** every image slot is filled by reuse or queued with its target path `wiki/<campaign>/attachments/<slug>-<kind>.<ext>` and its continuity inputs.

3. **Build the prompt.** Read the **art guide**. It is `user-config.md` § Art style followed by `docs/art-style.md` in full, and the DM's own words quoted in § Art style win over every other line. A Campaign whose `campaign-config.md` has an `## Art style` section uses that section as its art guide in place of both. With no art guide, ask the DM for one and leave every queued slot to step 8. Read the slot's page and the page of each PC, NPC and Creature the Visual shows. Copy each character's look word for word from its page, from the sources in `references/prompts.md` § Looks. When a page gives too little to draw, choose the missing parts to fit Canon and write them onto that page where § Looks reads them, then copy them (root `AGENTS.md` **Flesh out thin pages**). Assemble the prompt in the order of `references/prompts.md` § Prompt layers, for the kind's row of § Kinds. **Done when** each queued Visual has a prompt whose every descriptive word traces to the art guide or to a Wiki page.

4. **Generate.** Images come from the harness's built-in image action, the `generate_image` device on the configured image model. Take the first route that fits:
   - **One Visual, in omp.** Write the prompt JSON to `xd://generate_image` yourself (`read xd://generate_image` for its schema). The result gives the temporary file it saved.
   - **Several Visuals, in omp.** Dispatch one native `task` call with one item per Visual, each `model: "openai-codex/gpt-6.1-sol"`, `effort: "med"`, and `task` the brief in `references/prompts.md` § Codex worker brief. Each Codex worker runs steps 4 to 6 for its Visual and returns the filed path, its dimensions and its viewing verdict.
   - **Without the device** (a harness other than omp): run Codex from the repo root, adding `-i "<path>"` for each continuity input:

     ```bash
     codex exec -s workspace-write -C "$PWD" "Use your built-in image_gen tool to generate one image, copy it to <temporary path> and print its pixel dimensions. <prompt>"
     ```

   **Done when** each queued Visual has an image file, or a recorded failure for step 8.

5. **View it.** `read` the image and judge it against its prompt. It passes when each detail the prompt took from a page shows and none contradicts the page, it is drawn in the rendering the art guide's § Categories sets for its category, the period and costume hold, its framing matches its § Kinds row, and it is free of letters, watermarks and logos. A miss gets a regeneration with one targeted change that states what was wrong. After two regenerations miss, leave the slot to step 8 with each miss stated. Leave the embed without alt text, because viewing the image is the check. **Done when** each Visual has passed after you viewed it, or waits in step 8's queue with its misses.

6. **Finish the file.** Fit the image to its kind's canvas and format with the command in `references/prompts.md` § Finishing, then print its dimensions with the command beside it. **Done when** the target file exists at its kind's exact canvas and format.

7. **Embed.** Write the embed as a bare `![[<slug>-<kind>.<ext>]]` on its own line, with a blank line above and below, in the slot `references/placement.md` gives. A `[!cast]` or Prep `[!tiles]` item opens on its embed instead, as `references/placement.md` § Embed rules sets out. Write a diagram as one mermaid block in its slot. A slot takes one Visual. A regenerated or edited image overwrites its file under the same name, so every page embedding it shows the new image. **Done when** every filled slot contains exactly one embed or diagram, and every embedded file exists.

8. **Fall back.** In each slot still empty because generation failed, viewing missed twice, the art guide is missing or the DM deferred it, write a `[!visual-aid]` callout in the format of `references/prompts.md` § Fallback callout. A later run that meets a `[!visual-aid]` callout queues its slot at step 3 and checks the callout's prompt against the pages as they read now. Once the image passes step 5, the embed replaces the callout. **Done when** every open slot from step 1 contains an embed, a diagram or a callout.

9. **Close.** Close per `skill://lint` § Commands, **Close**, over every page you touched. Run on your own, log with `--op create`. Run inside Prep or Ingest, return your touched paths to that operation. Reply with each Visual filed (file and page), each callout left and why, and each look you wrote onto a page. **Done when** the page gate reports `ok: 0 findings` and the reply accounts for every slot from step 1.

## Backfill

A backfill fills the depictions of fixed-Canon pages that have none, most prominent at the table first, a bounded batch per run:

1. **Candidates.** Run `bun run cfcli -- revealed --campaign "<Campaign>"` and keep the NPC, PC, Creature, Location, Item, Vehicle, Faction and Deity pages with a set `revealed` value whose depiction slot is empty after step 2's reuse check.
2. **Order** by table prominence. Count the Session pages (Recaps, Preps, Scenes) that link each candidate, with the `grep` tool for `\[\[<slug>[|#\]]` under `wiki/<campaign>/Sessions/`, and sort the most linked first. A tie goes to the later `revealed` Session.
3. **Batch.** Take the DM's count, else the first five, and run steps 3 to 9 over them.

**Done when** the batch is filed or has callouts in its slots, and the reply lists the next five candidates in order.
