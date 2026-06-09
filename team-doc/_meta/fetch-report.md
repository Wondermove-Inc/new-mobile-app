# Fetch Report

Generated at: 2026-06-09T03:41:15.000Z

## Result

- Descendant tree metadata was preserved from the successful Atlassian MCP descendant fetch.
- Full page-body sync completed on 2026-06-09 via Atlassian MCP (`getConfluencePage`, markdown format).
- All 71 source pages now contain the exact current Confluence markdown body below their frontmatter (`syncStatus: "synced"`).
- The 32 structured docs under `10-structured/` were re-derived from the freshly synced source sections.

## Layout

- Source pages are stored as flat `<page-slug>-<id>.md` files (no per-page `page.md`/`readme.md` wrapper folders).
- A page that has child pages keeps a sibling directory `<page-slug>-<id>/` holding those children as their own `<child-slug>-<id>.md` files.

## Follow-up

- No body refresh outstanding. Re-run a targeted `getConfluencePage` sync only when upstream Confluence pages change.
- `scripts/generate-team-doc.mjs` still emits the legacy `page.md`/`readme.md` scaffold with placeholder bodies; do not re-run it against this synced corpus (it would overwrite real content). Update it to the flat layout before any future regeneration.
