/**
 * @license MIT
 * ============================================================================
 * src/entry-client.tsx — Browser Hydration Entrypoint for Preact 10 + Signals
 * Property: https://jessica.raggiesoft.com (raggiesoft-jessica)
 * ============================================================================
 * PLAIN-ENGLISH OVERVIEW (100-LEVEL PREACT HYDRATION GUIDE):
 *   What happens when a visitor opens `https://jessica.raggiesoft.com`?
 *     1. Nginx sends pre-rendered HTML immediately so Jessica's welcome, images,
 *        and links appear in milliseconds—even before JavaScript runs!
 *     2. Once this compact Preact + Signals script downloads, `hydrate()` wires
 *        interactive click/input listeners (category pills, room search, lamp
 *        switcher, and Bug's QA tabs) straight onto the existing HTML elements.
 *     3. During local `npm run dev` (when `#app` starts empty), `render()` mounts
 *        `<App />` fresh for instant live editing.
 * ============================================================================
 */

import { hydrate, render } from 'preact';
import { App } from './App';
import './styles/sanctuary.css';

// Locate the `#app` container inside `index.html`.
const mountEl = document.getElementById('app');

if (mountEl) {
  // Check whether `scripts/prerender.mjs` already stamped static HTML inside `#app`.
  const hasPrerenderedHtml = mountEl.firstElementChild !== null;
  if (hasPrerenderedHtml) {
    hydrate(<App initialPath={window.location.pathname} />, mountEl);
  } else {
    render(<App initialPath={window.location.pathname} />, mountEl);
  }
}
