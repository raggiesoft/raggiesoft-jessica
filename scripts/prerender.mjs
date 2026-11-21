#!/usr/bin/env node
/**
 * @license MIT
 * ============================================================================
 * scripts/prerender.mjs — Static Site Generator, OpenGraph & Sitemap Compiler
 * Property: https://jessica.raggiesoft.com (raggiesoft-jessica)
 * ============================================================================
 * PLAIN-ENGLISH OVERVIEW (100-LEVEL NODE.JS BUILD SCRIPT GUIDE):
 *   What does this script do at the end of `npm run build`?
 *     1. Reads `dist/index.html` (which Vite already stamped with hashed CSS &
 *        Preact + Signals JS bundle links).
 *     2. Imports `.ssr-temp/entry-server.js` (`renderRoute` + `SITE_ROUTES`).
 *     3. Pre-renders all 5 canonical routes (`/`, `/seed-story`, `/bear-and-bug`,
 *        `/directory`, `/reading-list`) PLUS `/404.html`:
 *          - Enforces `<= 60` char `<title>` and `<= 155` char `<meta description>`.
 *          - Injects canonical tags, complete OpenGraph + Twitter Cards, and
 *            clean Schema.org JSON-LD (`WebSite` + `AboutPage`).
 *          - Writes both `dist/<slug>.html` AND `dist/<slug>/index.html` so Nginx
 *            serves clean extensionless URLs (`https://jessica.raggiesoft.com/bear-and-bug`).
 *     4. Generates `dist/sitemap.xml`, `dist/robots.txt`, and our IndexNow key
 *        file (`dist/726167676965736f6674696e6465786e.txt`), then removes `.ssr-temp/`!
 * ============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Resolve absolute directory paths from ES Module `import.meta.url`.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const ssrDir = path.join(projectRoot, '.ssr-temp');

const SITE_ORIGIN = 'https://jessica.raggiesoft.com';
const INDEXNOW_KEY = '726167676965736f6674696e6465786e';

/**
 * Escapes `<`, `>`, `&`, and `"` inside HTML attributes so special characters
 * always produce valid HTML5 markup.
 */
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Builds each route's `<head>` SEO, OpenGraph, Twitter Card, Favicon, and JSON-LD
 * block while strictly validating RaggieSoft's 60/155 character limits.
 */
function buildSeoHeadBlock({ seoTitle, seoDescription, canonicalUrl, ogImage, noindex = false }) {
  if (seoTitle.length > 60) {
    throw new Error(`SEO Title exceeds 60 characters (${seoTitle.length}): "${seoTitle}"`);
  }
  if (seoDescription.length > 155) {
    throw new Error(
      `SEO Description exceeds 155 characters (${seoDescription.length}): "${seoDescription}"`
    );
  }

  const robotsContent = noindex ? 'noindex,follow' : 'index,follow';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_ORIGIN}/#website`,
        url: `${SITE_ORIGIN}/`,
        name: 'Jessica — Keeper of the House (RaggieSoft Guide)',
        description:
          "Jessica Marie Ragsdale's guided tour of everything her brother Michael conceived and built across RaggieSoft, the November 2006 seed story, and Rachel's ('Bug') quality-testing desk.",
        inLanguage: 'en-US',
        creator: {
          '@type': 'Person',
          name: 'Michael P. Ragsdale',
          url: 'https://michaelpragsdale.com'
        },
        publisher: {
          '@type': 'Organization',
          name: 'RaggieSoft',
          url: 'https://raggiesoft.com'
        }
      },
      {
        '@type': 'AboutPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: seoTitle,
        description: seoDescription,
        isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
        inLanguage: 'en-US',
        license: 'https://creativecommons.org/licenses/by-sa/4.0/'
      }
    ]
  };

  const lines = [
    `<title>${escapeHtml(seoTitle)}</title>`,
    `<meta name="description" content="${escapeHtml(seoDescription)}" />`,
    `<meta name="robots" content="${robotsContent}" />`,
    ...(noindex ? [] : [`<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`]),
    `<link rel="icon" type="image/svg+xml" href="https://assets.raggiesoft.com/raggiesoft-jessica/images/jessica-hearth-shield.svg" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Jessica — Keeper of the House (RaggieSoft)" />`,
    `<meta property="og:title" content="${escapeHtml(seoTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(seoDescription)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`,
    `<meta property="og:image" content="${escapeHtml(ogImage)}" />`,
    `<meta property="og:image:alt" content="Jessica Ragsdale in her manual wheelchair in the Moosewood Drive study with her brother Michael ('Bear') and sister Rachel ('Bug') behind her" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(seoTitle)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seoDescription)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(ogImage)}" />`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`
  ];

  return lines.join('\n    ');
}

async function runPrerender() {
  const templatePath = path.join(distDir, 'index.html');
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Missing client build template at ${templatePath}`);
  }
  const templateHtml = fs.readFileSync(templatePath, 'utf-8');

  // Import compiled server entry module produced by `vite build --ssr`.
  const serverEntryPath = path.join(ssrDir, 'entry-server.js');
  const serverMod = await import(pathToFileURL(serverEntryPath).href);
  const { renderRoute, SITE_ROUTES } = serverMod;

  const sitemapUrls = [];

  for (const route of SITE_ROUTES) {
    const is404 = route.path === '/404';
    const canonicalUrl =
      route.path === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${route.path}`;

    const { html: appHtml } = renderRoute(route.path);
    const headHtml = buildSeoHeadBlock({
      seoTitle: route.seoTitle,
      seoDescription: route.seoDescription,
      canonicalUrl,
      ogImage: route.ogImage,
      noindex: Boolean(route.noindex)
    });

    const pageHtml = templateHtml
      .replace('<!--SSR_HEAD-->', headHtml)
      .replace('<!--SSR_OUTLET-->', appHtml);

    if (route.path === '/') {
      fs.writeFileSync(path.join(distDir, 'index.html'), pageHtml, 'utf-8');
      sitemapUrls.push(`${SITE_ORIGIN}/`);
    } else if (is404) {
      fs.writeFileSync(path.join(distDir, '404.html'), pageHtml, 'utf-8');
    } else {
      const slug = route.path.replace(/^\/+/, '');
      const subDir = path.join(distDir, slug);
      fs.mkdirSync(subDir, { recursive: true });
      fs.writeFileSync(path.join(distDir, `${slug}.html`), pageHtml, 'utf-8');
      fs.writeFileSync(path.join(subDir, 'index.html'), pageHtml, 'utf-8');
      sitemapUrls.push(canonicalUrl);
    }
  }

  // Write XML Sitemap (`dist/sitemap.xml`)
  const todayIso = new Date().toISOString().slice(0, 10);
  const sitemapXml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...sitemapUrls.map(
      (u) =>
        `  <url>\n    <loc>${escapeHtml(u)}</loc>\n    <lastmod>${todayIso}</lastmod>\n  </url>`
    ),
    '</urlset>',
    ''
  ].join('\n');
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');

  // Write `dist/robots.txt` and IndexNow key verification file
  const robotsTxt = [
    '# Jessica — Keeper of the House (https://jessica.raggiesoft.com)',
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${SITE_ORIGIN}/sitemap.xml`,
    ''
  ].join('\n');
  fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt, 'utf-8');
  fs.writeFileSync(path.join(distDir, `${INDEXNOW_KEY}.txt`), INDEXNOW_KEY, 'utf-8');

  // Clean temporary SSR build directory so `dist/` contains 100% pure static assets.
  fs.rmSync(ssrDir, { recursive: true, force: true });
  console.log(
    `✓ [jessica] Pre-rendered ${sitemapUrls.length} canonical routes + 404.html + sitemap.xml into dist/`
  );
}

runPrerender().catch((err) => {
  console.error('✗ [jessica] Static prerender failed:', err);
  process.exit(1);
});
