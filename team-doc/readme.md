# Team Docs

Local documentation corpus for the WonderMove mobile-app-dev-team Confluence space.

## Index

- [Original Confluence tree](./00-source/readme.md)
- [Structured docs](./10-structured/readme.md)
- [Metadata](./_meta/readme.md)

## Sync Status

Body-synced. All 71 source pages mirror the exact current Confluence markdown (fetched 2026-06-09 via Atlassian MCP), and the 32 structured docs are re-derived from them. See [_meta/fetch-report.md](./_meta/fetch-report.md).

## Source Layout

Each Confluence page is a flat `<page-slug>-<id>.md` file. Pages that have children keep a sibling `<page-slug>-<id>/` directory holding those child pages (recursively), so the Confluence parent/child tree is preserved without redundant `page.md` wrapper folders.
