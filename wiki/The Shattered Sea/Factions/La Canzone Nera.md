---
type: Faction
summary: "Four human musicians from the interior who play the Palio with flawless technique and keep a crowd only as long as the Council quarter is watching."
sources:
 - "archive/ssw-il-palio-delle-voci.md"
aliases:
 - "The Black Song"
---

## At a glance

- **Goal.** The Palio, taken on execution.
- **Next move.** Win La Prova at the [[Il Palio delle Voci Contese|Palio]], then hold an immaculate set while Calveno decides.
- **Led by.** No named leader among the four human musicians.
- **Base.** The interior. They come to Calveno for the contest.
- **Strength.** Technique no local band matches, an immaculate stage, and the Council families' favour.

> [!narration] Public face
> Four players in brushed coats take the stage, music stands squared, and open the set with each entry on time. Applause comes first from the Council quarter and lasts longest there. Word crosses the second bridge before the set ends, and it carries only one name, La Canzone Nera.

## Play

- **When met.** On a Palio stage mid-set, running to the minute.
- **When opposed.** The execution does not waver. The crowd does the leaving.

## Depth

### History

They came to Calveno from the interior for the contest, favoured by the Council families. They win La Prova on execution and then watch their crowd erode across the two nights that follow.

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
