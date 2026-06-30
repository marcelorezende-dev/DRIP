# Water harvesting — source PDFs

Drop the ~38 conference slide PDFs in **this folder**. Claude reads them from
here, extracts a structured record per technique, and generates:

- one styled 1-pager per technique (built on `drip-manual.css`, like the
  Caatinga / Miombo SLM pages), with a link back to the source PDF, and
- a card block + new group in `Library.html`, wired into the `pillarOf` map.

## Filename convention (helps, not required)

Lowercase, hyphenated, one technique per file. A leading number keeps order:

```
01-half-moon-bunds.pdf
02-zai-planting-pits.pdf
03-stone-contour-bunds.pdf
04-negarim-microcatchments.pdf
...
```

If a single PDF covers several techniques, that's fine — note it and Claude
will split it into multiple cards/pages during extraction.

## What Claude will NOT do

Invent figures or claims not on the slides. Anything thin or ambiguous gets
flagged for your review rather than filled in.
