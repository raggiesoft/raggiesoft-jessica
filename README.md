# Jessica — Keeper of the House (`https://jessica.raggiesoft.com`)

Welcome to **`https://jessica.raggiesoft.com`** — Jessica Marie Ragsdale's first-person guided tour of everything her younger brother **Michael ("Bear")** conceived and built across **RaggieSoft**, how she rescued him in November 2006 and provided the seed money so his creative studio could stand on its own feet, and how their youngest sister **Rachel ("Bug")** tests every chapter, branching path, and song cue right beside him.

## Architecture & Build Pipeline
- **Framework Stack**: Preact 10 + `@preact/signals` + TypeScript + Vite Static Site Generation (SSG)
- **Zero-Database Static Output**: Pre-renders standalone HTML5 routes (`/`, `/seed-story`, `/bear-and-bug`, `/directory`, `/reading-list`, `/404.html`), `sitemap.xml`, `robots.txt`, and IndexNow verification into `dist/`.
- **Licenses**: Source code under **MIT**; narrative characters, prose, and artwork under **CC BY-SA 4.0**.

## Commands
```bash
npm install
npm run typecheck
npm run build
```

> **Fictitious Persons & Entities Notice**: All narrative characters (including Jessica, Michael, and Rachel Ragsdale in *The Rachel Narrative* and *The Quantum Directive*), fictional corporations (Quantum Corporation, OmniCorp), universities (NPU, VDU, CPI), and narrative events referenced on this site are works of fiction.
