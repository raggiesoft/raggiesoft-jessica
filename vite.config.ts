/**
 * @license MIT
 * ============================================================================
 * vite.config.ts — Vite + Preact 10 + Signals Static Site Generation (SSG)
 * Property: https://jessica.raggiesoft.com (raggiesoft-jessica)
 * ============================================================================
 * PLAIN-ENGLISH OVERVIEW (100-LEVEL INTRO FOR NEW DEVELOPERS):
 *   What is this file, and what makes Preact + Signals special?
 *     - **Preact 10** (`preact`) provides the exact same component model as React
 *       (`function Component() { return <section>...</section>; }`) inside a tiny
 *       `~3 KB` runtime instead of a `45+ KB` bundle.
 *     - **Preact Signals** (`@preact/signals`) adds reactive state containers
 *       (`signal('all')`) that update only the exact DOM nodes reading `.value`
 *       whenever a visitor clicks a filter tab, lighting switch, or checklist!
 *     - **Zero-Babel Native esbuild JSX**: Vite's built-in Go compiler (`esbuild`)
 *       natively transforms `.tsx` files into Preact virtual-DOM calls simply by
 *       setting `jsx: 'automatic'` and `jsxImportSource: 'preact'`—zero Babel
 *       plugins or extra config overhead required!
 *
 *   How our two-pass Static Site Generation (`npm run build`) works:
 *     1. Pass 1 (`vite build`): Bundles client-side CSS (`dist/assets/*.css`)
 *        and Preact + Signals hydration JavaScript (`dist/assets/*.js`).
 *     2. Pass 2 (`vite build --ssr src/entry-server.tsx --outDir .ssr-temp` +
 *        `node scripts/prerender.mjs`): Runs the exact same Preact components in
 *        Node.js via `preact-render-to-string`, injects OpenGraph & Schema.org
 *        metadata, writes standalone `.html` files + `sitemap.xml` into `dist/`,
 *        and deletes `.ssr-temp/` so Nginx serves 100% static files!
 * ============================================================================
 */

// Import Vite's typed configuration helper for editor autocomplete and validation.
import { defineConfig } from 'vite';

// Export a function configuration receiving `{ isSsrBuild }` so Vite knows whether
// it is running Pass 1 (browser bundle) or Pass 2 (Node.js prerender bundle).
export default defineConfig(({ isSsrBuild }) => ({
  // Configure Vite's fast built-in `esbuild` compiler to turn JSX (`<div>...</div>`)
  // into Preact's automatic JSX runtime (`preact/jsx-runtime`) automatically.
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'preact'
  },
  build: {
    // Target modern evergreen browsers (`ES2022`) for compact, readable output.
    target: 'es2022',
    // Output static assets into `dist/`, only wiping `dist/` on Pass 1 (`!isSsrBuild`).
    outDir: 'dist',
    emptyOutDir: !isSsrBuild
  },
  ssr: {
    // Inline Preact and Signals directly into `.ssr-temp/entry-server.js` during
    // build-time pre-rendering so Node.js imports a single self-contained module.
    noExternal: ['preact', '@preact/signals', '@preact/signals-core', 'preact-render-to-string']
  }
}));
