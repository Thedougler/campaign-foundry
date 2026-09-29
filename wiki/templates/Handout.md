---
type: Handout
summary: ""
sources: []
---

## At a glance

%% 3-5 facts. Kind is a letter, poster, player map, portrait and so on. Handed over in links the Scene. %%

- **Kind.**
- **Presented as.**
- **Handed over in.**
- **From.**

> [!narration] Handout text
> %% The words as the Players see them, verbatim, in the document's own voice. For an image, the caption. Only this callout and the image reach Players on Push. %%

%% Image, if any: embed the file from the World's attachments directly under the callout. %%

## Play

%% DM only. When and how it is handed over, and what the Players are likely to do with it. %%

## Links

```base
filters:
  and:
    - file.hasLink(this.file)
views:
  - type: table
    name: Linked from
    groupBy:
      property: note.type
      direction: ASC
    order:
      - file.name
      - note.summary
```
