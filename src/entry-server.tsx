/**
 * @license MIT
 * ============================================================================
 * src/entry-server.tsx — Build-Time Node.js Static HTML Renderer for Preact
 * Property: https://jessica.raggiesoft.com (raggiesoft-jessica)
 * ============================================================================
 * PLAIN-ENGLISH OVERVIEW (100-LEVEL STATIC SITE GENERATION GUIDE):
 *   Why do we run Preact inside Node.js during `npm run build`?
 *     `preact-render-to-string` executes `<App initialPath={routePath} />` once
 *     at build time and returns pure HTML strings for every route (`/`,
 *     `/seed-story`, `/bear-and-bug`, `/directory`, `/reading-list`, `/404`).
 *     `scripts/prerender.mjs` writes those HTML strings into standalone `.html`
 *     files in `dist/` so Nginx serves finished pages straight from memory!
 * ============================================================================
 */

import { renderToString } from 'preact-render-to-string';
import { App } from './App';
import { SITE_ROUTES } from './data/jessicaData';

export { SITE_ROUTES };

/**
 * Renders `<App />` for `routePath` into a static HTML string during `npm run build`.
 */
export function renderRoute(routePath: string): { html: string } {
  const html = renderToString(<App initialPath={routePath} />);
  return { html };
}
