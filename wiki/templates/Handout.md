---
type: Handout
summary: ""
sources: []
---

## At a glance

%% Give the DM a ten-second read, one line per bullet. Kind is a letter, poster, player map, portrait and so on. Presented as gives the form the Players receive. Handed over in links the Scene. From links its author or source. %%

- **Kind.**
- **Presented as.**
- **Handed over in.**
- **From.**

> [!narration] Handout text
> %% The words as the Players see them, word for word, in the document's own voice. For an image, the caption. Push sends Players only this callout and the image. %%

%% Image, if any: embed the file from the Campaign folder's attachments directly under the callout. %%

## Play

%% DM only. Give when and how it is handed over and what the Players are likely to do with it. Mark which of its claims are true. %%

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
