/**
 * @license MIT
 * ============================================================================
 * src/App.tsx — Preact 10 + Signals Multi-Route UI for Jessica's Study
 * Property: https://jessica.raggiesoft.com (raggiesoft-jessica)
 * ============================================================================
 * PLAIN-ENGLISH OVERVIEW (100-LEVEL PREACT + SIGNALS GUIDE):
 *   What does this file render?
 *     It renders the complete interactive study of **Jessica Marie Ragsdale** on
 *     `https://jessica.raggiesoft.com`, explaining in her own warm older-sister
 *     voice:
 *       1. Every story, song, and world on RaggieSoft is **100% Michael's ("Bear's")**
 *          original idea and handiwork.
 *       2. **Jessica** rescued Michael in November 2006, put up the seed money
 *          and studio desk, and keeps the roof steady so nothing ever breaks.
 *       3. **Rachel ("Bug")** sits right beside her Bear as his inseparable
 *          quality tester—checking every chapter, lyric line, and Crossroads path.
 *
 *   How `@preact/signals` Works Under the Hood:
 *     - `const selectedCategory = signal<RoomCategory>('all')` creates a reactive
 *       value box that lives outside any single component.
 *     - When a visitor clicks a category button (`selectedCategory.value = 'music'`),
 *       Preact Signals automatically updates the filtered room grid immediately!
 *     - `computed(() => ...)` derives filtered lists automatically whenever
 *       either `selectedCategory.value` or `searchQuery.value` changes.
 * ============================================================================
 */

import { computed, signal } from '@preact/signals';
import { useEffect } from 'preact/hooks';
import {
  BUG_QA_DESKS,
  IMAGES,
  READING_RECOMMENDATIONS,
  SEED_TIMELINE,
  SIBLING_ROLES,
  SITE_ROUTES,
  STUDIO_ROOMS,
  type RoomCategory
} from './data/jessicaData';

// ----------------------------------------------------------------------------
// 1. MODULE-LEVEL REACTIVE SIGNALS (`@preact/signals`)
// ----------------------------------------------------------------------------
// Current page pathname (`/`, `/seed-story`, `/bear-and-bug`, `/directory`, `/reading-list`, or `/404`).
const currentPathSignal = signal<string>('/');

// Visitor's lighting preference: `'auto'` (follows device), `'light'` (Daylight), or `'dark'` (Evening Lamp).
type LampMode = 'auto' | 'light' | 'dark';
const lampModeSignal = signal<LampMode>('auto');

// Interactive room-tour filter pills and live search box signals.
const roomCategorySignal = signal<RoomCategory>('all');
const roomSearchSignal = signal<string>('');

// Selected milestone index on `/seed-story` and selected QA desk ID on `/bear-and-bug`.
const activeMilestoneIdSignal = signal<string>(SEED_TIMELINE[2].id);
const activeBugDeskIdSignal = signal<string>(BUG_QA_DESKS[0].id);

// Derived reactive list (`computed`): recalculates automatically whenever the
// visitor clicks a category pill or types into the room search box!
const filteredRoomsSignal = computed(() => {
  const category = roomCategorySignal.value;
  const query = roomSearchSignal.value.trim().toLowerCase();

  return STUDIO_ROOMS.filter((room) => {
    const matchesCategory = category === 'all' || room.category === category;
    if (!matchesCategory) return false;
    if (!query) return true;

    return (
      room.title.toLowerCase().includes(query) ||
      room.subtitle.toLowerCase().includes(query) ||
      room.jessicaExplanation.toLowerCase().includes(query) ||
      room.domainLabel.toLowerCase().includes(query)
    );
  });
});

/**
 * Normalizes URL pathnames so `/seed-story/` and `/seed-story.html` both resolve
 * cleanly to `/seed-story`, while unknown paths map to `/404`.
 */
export function normalizeRoutePath(rawPath: string): string {
  if (!rawPath || rawPath === '/' || rawPath === '/index.html') return '/';
  const cleaned = rawPath.replace(/\.html$/i, '').replace(/\/+$/, '');
  const known = SITE_ROUTES.some((r) => r.path === cleaned);
  return known ? cleaned : '/404';
}

/**
 * Updates both the reactive `lampModeSignal` and the `<html>` attribute so CSS
 * switches immediately between Daylight Study and Evening Lamp palettes.
 */
function applyLampMode(nextMode: LampMode): void {
  lampModeSignal.value = nextMode;
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-lamp-mode', nextMode);
    try {
      if (nextMode === 'auto') {
        localStorage.removeItem('jessica_lamp_mode');
      } else {
        localStorage.setItem('jessica_lamp_mode', nextMode);
      }
    } catch {
      // Ignore storage restrictions in private browsing windows.
    }
  }
}

// ----------------------------------------------------------------------------
// 2. REUSABLE INTERACTIVE TOUR GRID (SHARED ON HOME & FULL DIRECTORY)
// ----------------------------------------------------------------------------
function GuidedRoomsExplorer({ showDetailedNotes }: { showDetailedNotes: boolean }) {
  const rooms = filteredRoomsSignal.value;
  const activeCat = roomCategorySignal.value;

  const categories: { id: RoomCategory; label: string }[] = [
    { id: 'all', label: `All Rooms (${STUDIO_ROOMS.length})` },
    { id: 'stories', label: 'Books & Interactive Stories' },
    { id: 'music', label: 'Music & Bands' },
    { id: 'guides', label: 'Front Door, Lore & Classics' }
  ];

  return (
    <div>
      {/* Accessible Filter Bar: Category toggle buttons + live text filter */}
      <div class="js-filter-bar" role="region" aria-label="Filter RaggieSoft destinations">
        <div class="js-pill-group" role="group" aria-label="Filter rooms by category">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              class="js-pill-btn"
              aria-pressed={activeCat === cat.id}
              onClick={() => {
                roomCategorySignal.value = cat.id;
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div class="js-search-wrap">
          <label for="jessica-room-search" class="js-skip-link">
            Search RaggieSoft rooms
          </label>
          <input
            id="jessica-room-search"
            type="search"
            class="js-search-input"
            placeholder="Find books, music, lore, bands..."
            aria-label="Search RaggieSoft rooms"
            value={roomSearchSignal.value}
            onInput={(e) => {
              roomSearchSignal.value = (e.currentTarget as HTMLInputElement).value;
            }}
          />
        </div>
      </div>

      {/* Filtered Room Cards */}
      {rooms.length === 0 ? (
        <div class="js-card">
          <div>
            <h3>No rooms matched that search</h3>
            <p>
              Try clearing the search box to see all {STUDIO_ROOMS.length} corners of Michael’s studio.
            </p>
          </div>
          <div>
            <button
              type="button"
              class="js-btn-secondary"
              onClick={() => {
                roomCategorySignal.value = 'all';
                roomSearchSignal.value = '';
              }}
            >
              Show All {STUDIO_ROOMS.length} Rooms
            </button>
          </div>
        </div>
      ) : (
        <div class="js-grid-2">
          {rooms.map((room) => (
            <article key={room.id} class="js-card">
              <div>
                <div class="js-room-meta">
                  <span class="js-badge">{room.categoryLabel}</span>
                  <span class="js-room-domain">{room.domainLabel}</span>
                </div>
                <h3>
                  <span aria-hidden="true">{room.icon} </span>
                  {room.title}
                </h3>
                <p>
                  <strong>{room.subtitle}.</strong> {room.jessicaExplanation}
                </p>
                {showDetailedNotes && (
                  <p class="js-card-note">
                    <strong>Where to start:</strong> {room.bestFirstStep}
                  </p>
                )}
                <div class="js-bug-stamp">
                  <strong>🐞 Rachel’s (“Bug’s”) QA Note:</strong> {room.bugQaNote}
                </div>
              </div>
              <div class="js-cta-row">
                <a href={room.url} class="js-btn-primary">
                  Visit {room.domainLabel} →
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------------------------------
// 3. INDIVIDUAL ROUTE VIEWS (`/`, `/seed-story`, `/bear-and-bug`, `/directory`, `/reading-list`, `/404`)
// ----------------------------------------------------------------------------

/**
 * Route 1 (`/`): Jessica's Front Study Welcome, The Three Siblings, & Room Tour.
 */
function HomeStudyView({ onNavigate }: { onNavigate: (path: string, e: MouseEvent) => void }) {
  return (
    <>
      <section class="js-hero" aria-labelledby="hero-heading">
        <div>
          <span class="js-eyebrow">🛡️ Moosewood Drive Sanctuary • Virginia Beach</span>
          <h1 id="hero-heading">Hi, I’m Jessica—Welcome Under Our Roof.</h1>
          <p class="js-lead">
            Every novel, every song, every branching adventure, and every room across{' '}
            <strong>RaggieSoft</strong> is <strong>100% my younger brother Michael’s idea</strong>{' '}
            and handiwork. Back in November 2006, I helped get him out from under an abuser’s roof,
            put a real creative desk in front of him, and provided the seed money so nobody could
            ever stand in his way again.
          </p>
          <blockquote class="js-quote-callout">
            “Michael (‘Bear’) is our primary builder. I’m the big sister keeping the house steady so
            nothing ever breaks—and our little sister Rachel (‘Bug’) sits right beside him as his
            quality tester.”
          </blockquote>
          <div class="js-cta-row">
            <a
              href="/directory"
              class="js-btn-primary"
              onClick={(e) => onNavigate('/directory', e as unknown as MouseEvent)}
            >
              Take Jessica’s Tour of RaggieSoft
            </a>
            <a
              href="/seed-story"
              class="js-btn-secondary"
              onClick={(e) => onNavigate('/seed-story', e as unknown as MouseEvent)}
            >
              Read the November 2006 Seed Story
            </a>
            <a
              href="/bear-and-bug"
              class="js-btn-secondary"
              onClick={(e) => onNavigate('/bear-and-bug', e as unknown as MouseEvent)}
            >
              Meet Bear &amp; His QA Bug
            </a>
          </div>
        </div>

        <figure class="js-hero-figure">
          <img
            src={IMAGES.heroStudy}
            alt="Jessica Ragsdale smiling warmly from her manual wheelchair in the Moosewood Drive study while her brother Michael in a sky-blue shirt and sister Rachel in a burgundy shirt laugh together at twin oak desks behind her"
            width="1200"
            height="675"
            class="js-hero-img"
          />
          <figcaption class="js-figcaption">
            Evening in the Moosewood Drive study: Jessica at the front of the room while Bear
            (Michael) builds and Bug (Rachel) tests right beside him.
          </figcaption>
        </figure>
      </section>

      {/* Three-Sibling Studio Dynamic */}
      <section class="js-section" aria-labelledby="trio-heading">
        <div class="js-section-header">
          <h2 id="trio-heading">One Dreamer, One Big Sister, and One Eagle-Eyed Bug</h2>
          <p>
            Here is how the three of us from{' '}
            <a href="https://books.raggiesoft.com/rachel">The Rachel Narrative</a> divide the house
            so Michael’s stories and music reach you without a single corporate middleman.
          </p>
        </div>

        <div class="js-grid-3">
          {SIBLING_ROLES.map((sib) => (
            <article key={sib.id} class="js-card">
              <div>
                <span class="js-badge">{sib.roleBadge}</span>
                <h3>
                  {sib.fullName} — “{sib.moniker}”
                </h3>
                <p>{sib.summary}</p>
                <div class="js-card-note">{sib.jessicaNote}</div>
              </div>
              <div class="js-cta-row">
                <a href={sib.storyHref} class="js-btn-secondary">
                  {sib.storyLabel}
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Interactive Stories Behind Every RaggieSoft Project */}
      <section class="js-section" aria-labelledby="tour-heading">
        <div class="js-section-header">
          <h2 id="tour-heading">The Personal Story Behind Every RaggieSoft Project</h2>
          <p>
            Want to know <em>why</em> my brother dreamed up each book imprint, band, interactive
            world, and desktop app? Read the story behind every project below—or visit{' '}
            <a href="https://waystation.raggiesoft.com/realms">
              The Uncharted Waystation (Global Directory)
            </a>{' '}
            anytime you just want our quick A–Z portal map!
          </p>
        </div>
        <GuidedRoomsExplorer showDetailedNotes={false} />
      </section>
    </>
  );
}

/**
 * Route 2 (`/seed-story`): November 2006 Rescue, Seed Workstation & Keeping the Roof Steady.
 */
function SeedStoryView({ onNavigate }: { onNavigate: (path: string, e: MouseEvent) => void }) {
  const selectedId = activeMilestoneIdSignal.value;
  const activeMilestone =
    SEED_TIMELINE.find((m) => m.id === selectedId) ?? SEED_TIMELINE[2];

  return (
    <>
      <section class="js-hero" aria-labelledby="seed-heading">
        <div>
          <span class="js-eyebrow">🌱 November 17, 2006 • The Seed That Started It All</span>
          <h1 id="seed-heading">Why I Funded the Desk—and Stepped Out of His Way.</h1>
          <p class="js-lead">
            When someone you love spends years being told their voice doesn’t matter, a pep talk
            isn’t enough. You get them out of that house, you hand them real tools with no strings
            attached, and you guard the perimeter while they remember who they are.
          </p>
          <blockquote class="js-quote-callout">
            “I didn’t write a single chapter or melody on RaggieSoft—that’s 100% Michael. My pride
            is knowing the roof over his studio will never cave in.”
          </blockquote>
          <div class="js-cta-row">
            <a href="https://books.raggiesoft.com/rachel" class="js-btn-primary">
              Read November 2006 in The Rachel Narrative
            </a>
            <a
              href="/bear-and-bug"
              class="js-btn-secondary"
              onClick={(e) => onNavigate('/bear-and-bug', e as unknown as MouseEvent)}
            >
              Next: Meet Bear &amp; Bug →
            </a>
          </div>
        </div>

        <figure class="js-hero-figure">
          <img
            src={IMAGES.porchWatch}
            alt="Jessica Ragsdale in an emerald cardigan seated in her manual wheelchair holding a warm ceramic mug beside a twilight bay window with a glowing porch lantern outside"
            width="1200"
            height="675"
            class="js-hero-img"
          />
          <figcaption class="js-figcaption">
            Twilight porch watch: keeping the household calm, steady, and independent so nothing
            interrupts the work inside.
          </figcaption>
        </figure>
      </section>

      <section class="js-section" aria-labelledby="timeline-heading">
        <div class="js-section-header">
          <h2 id="timeline-heading">Four Chapters from Delaney Street to Moosewood Drive</h2>
          <p>Select any era below to see how our three-sibling studio came together.</p>
        </div>

        <div class="js-Interactive-panel">
          <div class="js-pill-group" role="group" aria-label="Select family milestone">
            {SEED_TIMELINE.map((m) => (
              <button
                key={m.id}
                type="button"
                class="js-pill-btn"
                aria-pressed={activeMilestone.id === m.id}
                onClick={() => {
                  activeMilestoneIdSignal.value = m.id;
                }}
              >
                {m.era}
              </button>
            ))}
          </div>

          <div style={{ marginTop: '1.35rem' }}>
            <span class="js-badge">{activeMilestone.location}</span>
            <h3>{activeMilestone.headline}</h3>
            <p>{activeMilestone.narrative}</p>
            <div class="js-card-note">
              <strong>Jessica’s Takeaway:</strong> {activeMilestone.takeaway}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/**
 * Route 3 (`/bear-and-bug`): Michael ("Bear") & Rachel ("Bug") — Builder & QA Tester.
 */
function BearAndBugView({ onNavigate }: { onNavigate: (path: string, e: MouseEvent) => void }) {
  const activeDesk =
    BUG_QA_DESKS.find((d) => d.id === activeBugDeskIdSignal.value) ?? BUG_QA_DESKS[0];

  return (
    <>
      <section class="js-hero" aria-labelledby="bb-heading">
        <div>
          <span class="js-eyebrow">🐻🐞 Bear &amp; Bug • Always Side by Side</span>
          <h1 id="bb-heading">If We Have Bear, He Must Have His Bug.</h1>
          <p class="js-lead">
            When Michael was ten and Rachel was eight, someone cruel tried to make Michael ashamed
            of his size. Eight-year-old Rachel stepped right in front of him and rewrote the rules:
            he wasn’t soft—he was big, warm, and strong, and he protected her. She crowned him her{' '}
            <strong>Bear</strong>, and he named her his fierce little <strong>Bug</strong> because
            she never let go of him.
          </p>
          <blockquote class="js-quote-callout">
            “Rachel waited years to get her driver’s license just so she and Michael could walk into
            the DMV together. Did anyone really think she’d let him build RaggieSoft without pulling
            up a second chair as his quality tester?”
          </blockquote>
          <div class="js-cta-row">
            <a href="https://books.raggiesoft.com/rachel" class="js-btn-primary">
              Read Bear &amp; Bug in The Rachel Narrative
            </a>
            <a
              href="/directory"
              class="js-btn-secondary"
              onClick={(e) => onNavigate('/directory', e as unknown as MouseEvent)}
            >
              Explore Every Room Bug Tested →
            </a>
          </div>
        </div>

        <figure class="js-hero-figure">
          <img
            src={IMAGES.bearAndBug}
            alt="Michael in a sky-blue shirt and black glasses smiling beside his younger sister Rachel in a burgundy shirt leaning warmly against his shoulder on their Moosewood Drive sofa"
            width="1200"
            height="675"
            class="js-hero-img"
          />
          <figcaption class="js-figcaption">
            Michael (“Bear”) and Rachel (“Bug”) taking a breather on the Moosewood Drive sofa
            between late-evening chapter and song checks.
          </figcaption>
        </figure>
      </section>

      <section class="js-section" aria-labelledby="bug-qa-heading">
        <div class="js-section-header">
          <h2 id="bug-qa-heading">Inside Rachel’s (“Bug’s”) Quality-Testing Desk</h2>
          <p>
            Pick a desk tab below to see what Rachel checks right beside Michael before any book,
            song, or interactive Crossroads path goes out the door.
          </p>
        </div>

        <div class="js-Interactive-panel">
          <div class="js-pill-group" role="group" aria-label="Select Rachel's QA checklist area">
            {BUG_QA_DESKS.map((desk) => (
              <button
                key={desk.id}
                type="button"
                class="js-pill-btn"
                aria-pressed={activeDesk.id === desk.id}
                onClick={() => {
                  activeBugDeskIdSignal.value = desk.id;
                }}
              >
                <span aria-hidden="true">{desk.icon} </span>
                {desk.tabLabel}
              </button>
            ))}
          </div>

          <div style={{ marginTop: '1.35rem' }}>
            <h3>
              <span aria-hidden="true">{activeDesk.icon} </span>
              {activeDesk.headline}
            </h3>
            <p>{activeDesk.description}</p>
            <ul class="js-check-list">
              {activeDesk.checks.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

/**
 * Route 4 (`/directory`): Complete Annotated Guide to Everything on RaggieSoft.com.
 */
function DirectoryView() {
  return (
    <section class="js-section" aria-labelledby="dir-heading">
      <div class="js-section-header">
        <span class="js-eyebrow">💬 Behind the Curtain • Why Each Project Exists</span>
        <h1 id="dir-heading">The Story Behind Every Project on RaggieSoft</h1>
        <p>
          Every single project below started as a spark in Michael’s head, was tested side-by-side
          with Rachel (“Bug”), and lives safely under my roof. Here is the personal and creative
          story behind why each one exists—and if you ever want the fast A–Z portal map across the
          whole network, Nolan and Gwen keep our single{' '}
          <a href="https://waystation.raggiesoft.com/realms">Global Directory at The Waystation</a>.
        </p>
      </div>

      <GuidedRoomsExplorer showDetailedNotes={true} />

      <div class="js-card" style={{ marginTop: '1.5rem' }}>
        <div>
          <span class="js-badge">Real-World Creator Behind the Curtain</span>
          <h3>Looking for Michael P. Ragsdale’s Professional Portfolio?</h3>
          <p>
            Curious about the real-world creator who writes, composes, and builds the entire
            RaggieSoft universe? Visit Michael P. Ragsdale’s professional portfolio and background
            dossier on his personal site.
          </p>
        </div>
        <div class="js-cta-row">
          <a href="https://michaelpragsdale.com" class="js-btn-secondary">
            Visit michaelpragsdale.com →
          </a>
        </div>
      </div>
    </section>
  );
}

/**
 * Route 5 (`/reading-list`): Curated Starting Chapters & Companion Music.
 */
function ReadingListView() {
  return (
    <section class="js-section" aria-labelledby="read-heading">
      <div class="js-section-header">
        <span class="js-eyebrow">📚🎧 Essential Chapters &amp; Companion Albums</span>
        <h1 id="read-heading">Where to Read Our Story &amp; Hear the Music</h1>
        <p>
          Want to read the actual novels where Jessica, Michael (“Bear”), and Rachel (“Bug”) come
          from—or stream the songs playing over our study speakers? Start with any of these four
          doors.
        </p>
      </div>

      <div class="js-grid-2">
        {READING_RECOMMENDATIONS.map((rec) => (
          <article key={rec.id} class="js-card">
            <div>
              <span class="js-badge">{rec.badge}</span>
              <h3>{rec.title}</h3>
              <p>{rec.description}</p>
            </div>
            <div class="js-cta-row">
              <a href={rec.primaryHref} class="js-btn-primary">
                {rec.primaryLabel}
              </a>
              <a href={rec.secondaryHref} class="js-btn-secondary">
                {rec.secondaryLabel}
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/**
 * Genuine HTTP 404 Fallback View (`/404.html`).
 */
function NotFoundView({ onNavigate }: { onNavigate: (path: string, e: MouseEvent) => void }) {
  return (
    <section class="js-Interactive-panel" aria-labelledby="nf-heading">
      <span class="js-eyebrow">404 • Hallway Check</span>
      <h1 id="nf-heading">That Door Isn’t Down This Hallway.</h1>
      <p class="js-lead">
        Rachel and I just checked the floor plan, and there isn’t a page at this address on{' '}
        <strong>jessica.raggiesoft.com</strong>. You can head right back into my front study—or
        visit Nolan and Gwen Lennox over at The Uncharted Waystation for a full compass to every
        RaggieSoft world.
      </p>
      <div class="js-cta-row">
        <a
          href="/"
          class="js-btn-primary"
          onClick={(e) => onNavigate('/', e as unknown as MouseEvent)}
        >
          Return to Jessica’s Front Study
        </a>
        <a href="https://waystation.raggiesoft.com" class="js-btn-secondary">
          Visit The Uncharted Waystation
        </a>
        <a href="https://books.raggiesoft.com" class="js-btn-secondary">
          Open RaggieSoft Book Reader
        </a>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------------
// 4. ROOT APPLICATION SHELL (`<App />`)
// ----------------------------------------------------------------------------
export function App({ initialPath = '/' }: { initialPath?: string }) {
  // Synchronize initial route during build-time SSR (`entry-server.tsx`) before rendering!
  if (typeof window === 'undefined') {
    currentPathSignal.value = normalizeRoutePath(initialPath);
  }

  // On browser mount, sync URL pathname, saved lamp preference, and Back/Forward buttons.
  useEffect(() => {
    currentPathSignal.value = normalizeRoutePath(window.location.pathname);

    try {
      const saved = localStorage.getItem('jessica_lamp_mode');
      if (saved === 'light' || saved === 'dark') {
        lampModeSignal.value = saved;
      }
    } catch {
      // Ignore restricted storage environments.
    }

    const handlePopState = () => {
      currentPathSignal.value = normalizeRoutePath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  /**
   * Client-side instant navigation for internal links (while keeping real `<a href="...">`
   * URLs for Cmd+Click, middle-click, and search crawlers!).
   */
  const handleInternalNavigate = (targetPath: string, event: MouseEvent) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    event.preventDefault();
    const normalized = normalizeRoutePath(targetPath);
    if (window.location.pathname !== normalized) {
      window.history.pushState({}, '', normalized);
    }
    currentPathSignal.value = normalized;
    const routeMeta = SITE_ROUTES.find((r) => r.path === normalized);
    if (routeMeta) {
      document.title = routeMeta.seoTitle;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activePath = typeof window === 'undefined'
    ? normalizeRoutePath(initialPath)
    : currentPathSignal.value;

  const lampMode = lampModeSignal.value;

  return (
    <div class="js-shell">
      {/* Sticky Study Header: Brand + Internal Routes + Daylight/Lamp Switcher */}
      <header class="js-header">
        <div class="js-header-inner">
          <a
            href="/"
            class="js-brand-link"
            onClick={(e) => handleInternalNavigate('/', e as unknown as MouseEvent)}
          >
            <img
              src={IMAGES.shieldIcon}
              alt=""
              width="38"
              height="38"
              class="js-brand-icon"
              aria-hidden="true"
            />
            <span>
              <span class="js-brand-title">Jessica • Keeper of the House</span>
              <span class="js-brand-subtitle">
                Michael’s Vision • Big Sister’s Foundation • Bug’s QA
              </span>
            </span>
          </a>

          <button
            type="button"
            class="rs-mobile-header-toggle"
            data-rs-mobile-toggle
            data-open-label="Open menu"
            data-close-label="Close menu"
            aria-expanded="false"
            aria-controls="header-navigation-panel"
            aria-label="Open menu"
          >
            <svg class="rs-icon-bars" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" aria-hidden="true" focusable="false">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            <svg class="rs-icon-close" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" aria-hidden="true" focusable="false">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div id="header-navigation-panel" class="js-nav-row" data-rs-collapsible="true">
            <nav aria-label="Jessica's Study Pages">
              <ul class="js-nav-list">
                {SITE_ROUTES.filter((r) => r.inMainNav).map((route) => {
                  const isActive = activePath === route.path;
                  return (
                    <li key={route.path}>
                      <a
                        href={route.path}
                        class={`js-nav-link${isActive ? ' is-active' : ''}`}
                        aria-current={isActive ? 'page' : undefined}
                        onClick={(e) =>
                          handleInternalNavigate(route.path, e as unknown as MouseEvent)
                        }
                      >
                        {route.navLabel}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div class="js-lamp-switcher" role="group" aria-label="Reading light preference">
              <button
                type="button"
                class="js-lamp-btn"
                aria-pressed={lampMode === 'auto'}
                onClick={() => applyLampMode('auto')}
              >
                Auto
              </button>
              <button
                type="button"
                class="js-lamp-btn"
                aria-pressed={lampMode === 'light'}
                onClick={() => applyLampMode('light')}
              >
                ☀️ Daylight
              </button>
              <button
                type="button"
                class="js-lamp-btn"
                aria-pressed={lampMode === 'dark'}
                onClick={() => applyLampMode('dark')}
              >
                🕯️ Lamp
              </button>
            </div>

            <div
              class="rs-vdom-slot"
              ref={(el) => {
                if (el && !el.hasChildNodes() && typeof window !== 'undefined') {
                  (window as unknown as { initRaggieSoftNetworkMenu?: () => void }).initRaggieSoftNetworkMenu?.();
                }
              }}
            />
          </div>
        </div>
      </header>

      {/* Main Content Landmark (`id="main-content"` targeted by Skip Link) */}
      <main id="main-content" class="js-main" tabIndex={-1}>
        {activePath === '/' && <HomeStudyView onNavigate={handleInternalNavigate} />}
        {activePath === '/seed-story' && <SeedStoryView onNavigate={handleInternalNavigate} />}
        {activePath === '/bear-and-bug' && <BearAndBugView onNavigate={handleInternalNavigate} />}
        {activePath === '/directory' && <DirectoryView />}
        {activePath === '/reading-list' && <ReadingListView />}
        {activePath === '/404' && <NotFoundView onNavigate={handleInternalNavigate} />}
      </main>

      {/* Global Footer with Cross-Ecosystem Links, Licensing & Mandatory Fictitious Disclaimer */}
      <footer class="js-footer">
        <div class="js-footer-inner">
          <ul class="js-footer-links" aria-label="RaggieSoft Destinations">
            <li>
              <a href="https://raggiesoft.com">RaggieSoft Hub</a>
            </li>
            <li>
              <a href="https://books.raggiesoft.com">RaggieSoft Book Reader</a>
            </li>
            <li>
              <a href="https://music.raggiesoft.com">The Listening Room</a>
            </li>
            <li>
              <a href="https://crossroads.raggiesoft.com">Story Crossroads</a>
            </li>
            <li>
              <a href="https://cedarrun.raggiesoft.com">Cedar Run</a>
            </li>
            <li>
              <a href="https://waystation.raggiesoft.com">The Uncharted Waystation</a>
            </li>
            <li>
              <a href="https://lore.raggiesoft.com">Lore Encyclopedia</a>
            </li>
            <li>
              <a href="https://corporate.raggiesoft.com">Licensing &amp; Media</a>
            </li>
            <li>
              <a href="https://raggiesoft.com/about/privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="https://raggiesoft.com/about/terms">Terms of Service</a>
            </li>
            <li>
              <a href="https://raggiesoft.com/about/ai-disclaimer">
                AI &amp; Creative Process | RaggieSoft Governance
              </a>
            </li>
          </ul>

          <div class="js-disclaimer">
            <strong>Fictitious Persons &amp; Entities Disclaimer:</strong> All narrative characters
            (including Jessica, Michael, and Rachel Ragsdale in <em>The Rachel Narrative</em> and{' '}
            <em>The Quantum Directive</em>, as well as bands, biographies, and family histories),
            universities (CPI, VDU, NPU, The Forgers, The Crucible), corporations (Quantum
            Corporation, OmniCorp, Apex Records, Prairie Coachworks, Sainte-Claire), transit
            agencies (BRT, CVTA), in-universe legal filings, and narrative events across RaggieSoft
            are works of fiction. In real life, RaggieSoft, RaggieSoft Media, Engine Room Records,
            Ocean View Archives, and RaggieSoft Story Crossroads are unincorporated creative
            imprints of Michael P. Ragsdale.
          </div>

          <p class="js-copyright">
            © 2026 Michael P. Ragsdale (RaggieSoft). Creative stories, artwork, and guides shared
            under{' '}
            <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a> (commercial
            music licensing at{' '}
            <a href="https://raggiesoft.com/raggiesoft-media/licensing/commercial">
              RaggieSoft Media
            </a>
            ); site code licensed under MIT.
          </p>
        </div>
      </footer>
    </div>
  );
}
