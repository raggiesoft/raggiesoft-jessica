/**
 * @license MIT
 * ============================================================================
 * src/data/jessicaData.ts — Structured Content & Guided Tour Data for Jessica
 * Property: https://jessica.raggiesoft.com (raggiesoft-jessica)
 * ============================================================================
 * PLAIN-ENGLISH OVERVIEW (100-LEVEL TYPESCRIPT DATA GUIDE):
 *   What is this file?
 *     Instead of scattering paragraphs, links, and image URLs inside visual UI
 *     components, this TypeScript data module stores every page route, sibling
 *     role card, November 2006 seed-story milestone, Rachel's ("Bug's") quality
 *     testing checklist, and Jessica's plain-English tour of every RaggieSoft
 *     destination in one strongly typed place!
 *
 *   Why TypeScript interfaces (`export interface ...`) matter:
 *     Interfaces act like a blueprint. If we ever forget an `alt` description
 *     on an image or mistype a category name, TypeScript catches the mistake
 *     during `npm run typecheck` before a visitor ever sees a broken page.
 *
 *   Consumer-Friendly Language Commitment:
 *     Every title, badge, and explanation in this file is written in Jessica's
 *     warm, everyday older-sister voice for readers and music listeners—free of
 *     intimidating developer acronyms.
 * ============================================================================
 */

// Base CDN directory where our optimized 16:9 illustrations and shield icon live.
export const CDN_BASE = 'https://assets.raggiesoft.com/raggiesoft-jessica/images';

// Canonical image URLs used across pages and OpenGraph social preview cards.
export const IMAGES = {
  heroStudy: `${CDN_BASE}/jessica-sanctuary-hero.jpg`,
  ogCard: `${CDN_BASE}/og-jessica.jpg`,
  porchWatch: `${CDN_BASE}/jessica-porch-watch.jpg`,
  bearAndBug: `${CDN_BASE}/bear-and-bug-couch.jpg`,
  shieldIcon: `${CDN_BASE}/jessica-hearth-shield.svg`
} as const;

// Blueprint for each pre-rendered route on https://jessica.raggiesoft.com.
export interface SiteRouteMeta {
  path: string;
  navLabel: string;
  seoTitle: string;
  seoDescription: string;
  ogImage: string;
  inMainNav: boolean;
  noindex?: boolean;
}

// All 5 canonical routes + our genuine HTTP 404 fallback page.
// Every seoTitle is <= 60 characters and every seoDescription is <= 155 characters.
export const SITE_ROUTES: readonly SiteRouteMeta[] = [
  {
    path: '/',
    navLabel: 'Welcome Study',
    seoTitle: "Jessica — My Brother's Studio, Bear & Bug | RaggieSoft",
    seoDescription:
      "Meet Jessica Ragsdale: how Michael conceived RaggieSoft, the November 2006 rescue & seed money, and how Rachel ('Bug') tests every page beside him.",
    ogImage: IMAGES.ogCard,
    inMainNav: true
  },
  {
    path: '/seed-story',
    navLabel: 'The Seed Story',
    seoTitle: 'November 2006: The Rescue & Seed Story | Jessica',
    seoDescription:
      'How Jessica rescued her brother Michael in November 2006 and funded the seed studio desk so his stories, music, and worlds could grow freely.',
    ogImage: IMAGES.porchWatch,
    inMainNav: true
  },
  {
    path: '/bear-and-bug',
    navLabel: 'Bear & Bug',
    seoTitle: 'Bear & Bug — The Builder & His QA Tester | Jessica',
    seoDescription:
      "Inside the Moosewood Drive study: Michael ('Bear') builds every RaggieSoft story and song while his sister Rachel ('Bug') tests every page beside him.",
    ogImage: IMAGES.bearAndBug,
    inMainNav: true
  },
  {
    path: '/directory',
    navLabel: 'Project Stories',
    seoTitle: 'Stories Behind Every RaggieSoft Project | Jessica',
    seoDescription:
      'Jessica shares the personal story behind why Michael created every book library, band, interactive novel, and desktop app across RaggieSoft.',
    ogImage: IMAGES.ogCard,
    inMainNav: true
  },
  {
    path: '/reading-list',
    navLabel: 'Books & Songs',
    seoTitle: 'Where to Read Our Family Story & Songs | Jessica',
    seoDescription:
      'Start reading The Rachel Narrative and The Quantum Directive on RaggieSoft Book Reader alongside companion albums in The Listening Room.',
    ogImage: IMAGES.bearAndBug,
    inMainNav: true
  },
  {
    path: '/404',
    navLabel: '404',
    seoTitle: "404 — That Door Isn't Down This Hallway | Jessica",
    seoDescription:
      "Jessica couldn't find a room at this address—head back to the front study or visit The Uncharted Waystation to explore RaggieSoft.",
    ogImage: IMAGES.ogCard,
    inMainNav: false,
    noindex: true
  }
];

// Blueprint for the three siblings who bring RaggieSoft to life inside the story world.
export interface SiblingRoleCard {
  id: string;
  moniker: string;
  fullName: string;
  roleBadge: string;
  summary: string;
  jessicaNote: string;
  storyHref: string;
  storyLabel: string;
}

// The exact three-person sibling dynamic at the heart of jessica.raggiesoft.com:
// 1. Michael ("Bear") = 100% the visionary & primary builder.
// 2. Jessica          = Rescued him, provided the seed money, & makes sure nothing breaks.
// 3. Rachel ("Bug")   = Bear's inseparable co-pilot & quality tester.
export const SIBLING_ROLES: readonly SiblingRoleCard[] = [
  {
    id: 'michael-bear',
    moniker: 'Bear',
    fullName: 'Michael Ragsdale',
    roleBadge: '100% His Vision • Primary Builder',
    summary:
      'Every novel, every song lyric, every melody, and every room across RaggieSoft started in Michael’s head and was built by his own two hands. Nobody ghostwrites for him, and nobody tells him shrink his imagination.',
    jessicaNote:
      '“People sometimes assume a big studio team dreamed all of this up. Nope—every single world under this roof is 100% my brother’s brainchild. I just made sure he finally had a quiet desk where nobody could take it away from him.”',
    storyHref: 'https://books.raggiesoft.com/rachel',
    storyLabel: 'Read Michael’s Story in The Rachel Narrative'
  },
  {
    id: 'jessica-host',
    moniker: 'Big Sister & Keeper of the House',
    fullName: 'Jessica Marie Ragsdale',
    roleBadge: 'November 2006 Rescue • Seed Backer • Keeps Everything Running',
    summary:
      'From my manual wheelchair in Seattle to our home base in Virginia Beach, my job has always been simple: get my brother out of harm’s way, put up the seed money so his studio stands independent, and keep the lights steady around the clock so nothing ever breaks.',
    jessicaNote:
      '“You are standing on my porch right now! Every page you open across RaggieSoft lives under my roof. While Michael dreams up new chapters and songs, I watch the storm doors so everything opens fast, clean, and safe.”',
    storyHref: 'https://books.raggiesoft.com/quantum-directive-1-jessica',
    storyLabel: 'Read The Quantum Directive: Jessica’s Cut'
  },
  {
    id: 'rachel-bug',
    moniker: 'Bug',
    fullName: 'Rachel Ragsdale',
    roleBadge: 'Bear’s Co-Pilot • Lead Quality Tester',
    summary:
      'Where you find Bear, you always find his Bug. Rachel pulls her chair right up beside Michael’s desk, reads every chapter out loud, clicks every branching story choice, checks every timed song lyric, and catches every tiny rough edge before you ever visit.',
    jessicaNote:
      '“Rachel has been fiercely guarding Michael’s heart since they were eight and ten years old. Nothing goes out our front door until Bug gives it her stamp of approval—and gives her brother one of their Bear-and-Bug hugs.”',
    storyHref: 'https://books.raggiesoft.com/rachel',
    storyLabel: 'Meet Bear & Bug on RaggieSoft Book Reader'
  }
];

// Category tabs for Jessica's interactive guided tour of RaggieSoft.com.
export type RoomCategory = 'all' | 'stories' | 'music' | 'guides';

// Blueprint for each destination across RaggieSoft.com explained in Jessica's voice.
export interface StudioRoomItem {
  id: string;
  title: string;
  subtitle: string;
  category: Exclude<RoomCategory, 'all'>;
  categoryLabel: string;
  icon: string;
  url: string;
  domainLabel: string;
  jessicaExplanation: string;
  bestFirstStep: string;
  bugQaNote: string;
}

// Complete, plain-English room-by-room explanation of everything on RaggieSoft.com!
export const STUDIO_ROOMS: readonly StudioRoomItem[] = [
  {
    id: 'hub',
    title: 'RaggieSoft Front Porch (Main Homepage)',
    subtitle: 'Why Michael wanted a calm, uncluttered front door instead of a noisy portal',
    category: 'guides',
    categoryLabel: 'Front Door & Guides',
    icon: '🌐',
    url: 'https://raggiesoft.com',
    domainLabel: 'raggiesoft.com',
    jessicaExplanation:
      'Think of raggiesoft.com as the front foyer of our house. Michael intentionally kept it focused on four welcoming pillars—reading, music, desktop apps, and open-culture sharing—so first-time visitors never feel overwhelmed before stepping into our Global Directory or story rooms.',
    bestFirstStep: 'Choose between Creative Works and Michael’s portfolio, or jump straight into reading and listening.',
    bugQaNote: 'Rachel checks every seasonal tribute banner and welcome card on both phone and desktop screens.'
  },
  {
    id: 'launcher',
    title: 'RaggieSoft Launcher (Desktop App Home)',
    subtitle: 'Why Michael built an account-free desktop home that respects your computer',
    category: 'guides',
    categoryLabel: 'Front Door & Guides',
    icon: '🚀',
    url: 'https://launcher.raggiesoft.com',
    domainLabel: 'launcher.raggiesoft.com',
    jessicaExplanation:
      'Modern app launchers drive all three of us crazy with forced accounts, pop-ups, and background bloat. So Michael built RaggieSoft Launcher to unite Book Reader, The Listening Room, Backstage, and StoreTrainer in one quiet window—opening only when you ask, offering Express or Custom setup, and never deleting your offline books, albums, or saved game profiles.',
    bestFirstStep: 'See all five desktop apps and how the built-in Software Update Wizard keeps them current in one click.',
    bugQaNote: 'Rachel tested Express Setup, Custom Setup, and every uninstaller checkbox to prove your offline files stay untouched!'
  },
  {
    id: 'books',
    title: 'RaggieSoft Book Reader (Ocean View Archives)',
    subtitle: 'Free, distraction-free full novels right in your browser',
    category: 'stories',
    categoryLabel: 'Books & Interactive Stories',
    icon: '📚',
    url: 'https://books.raggiesoft.com',
    domainLabel: 'books.raggiesoft.com',
    jessicaExplanation:
      'This is the heart of Michael’s library—full-length literary novels and series you can read comfortably at your own pace with adjustable text sizes, bookmarks, scene artwork, and downloadable eBooks, with zero paywalls or pop-ups.',
    bestFirstStep: 'Open The Rachel Narrative, Escape Velocity: Ad Astra, or The Stardust Engine.',
    bugQaNote: 'Rachel reads every chapter line-by-line for continuity, comfortable spacing, and chapter links.'
  },
  {
    id: 'music',
    title: 'The Listening Room',
    subtitle: 'Full albums, follow-along lyrics, and band discographies',
    category: 'music',
    categoryLabel: 'Music & Bands',
    icon: '🎧',
    url: 'https://music.raggiesoft.com',
    domainLabel: 'music.raggiesoft.com',
    jessicaExplanation:
      'Michael writes songs that live right inside his story worlds—from 1980s arena synth-rock to acoustic mountain folk and orchestral suites. The Listening Room lets you stream every album uninterrupted with synchronized, line-by-line lyrics.',
    bestFirstStep: 'Put on headphones, pick any album cover, and watch the lyrics highlight in time with the vocals.',
    bugQaNote: 'Rachel listens to every song with the lyric sheet open to verify every timestamp and word.'
  },
  {
    id: 'crossroads',
    title: 'RaggieSoft Story Crossroads',
    subtitle: 'Branching interactive novels where every choice stands equal',
    category: 'stories',
    categoryLabel: 'Books & Interactive Stories',
    icon: '🧭',
    url: 'https://crossroads.raggiesoft.com',
    domainLabel: 'crossroads.raggiesoft.com',
    jessicaExplanation:
      'Michael hated old branching books that punished curious readers with cheap “game over” traps. So he created Story Crossroads: interactive novels where every route you pick leads to a complete, deeply written story of its own.',
    bestFirstStep: 'Meet our in-universe Crossroads curators Rowan & Iris Hawthorne and pick your first branching book.',
    bugQaNote: 'Rachel walks every single route from start to finish to make sure no path ever bleeds into another.'
  },
  {
    id: 'cedarrun',
    title: 'Cedar Run Wilderness Guide',
    subtitle: 'Pacific Northwest forest survival, star skies, and 1975 folk songs',
    category: 'stories',
    categoryLabel: 'Books & Interactive Stories',
    icon: '🌲',
    url: 'https://cedarrun.raggiesoft.com',
    domainLabel: 'cedarrun.raggiesoft.com',
    jessicaExplanation:
      'A companion home for Michael’s Cedar Run Story Crossroads novel following triplets Luke, Tessa, and Sadie Bridger in the high timber of Washington State—complete with shelter stages, dark-sky stargazing notes, and campfire songs.',
    bestFirstStep: 'Explore how the triplets build their cedar camp, then jump straight into reading Cedar Run.',
    bugQaNote: 'Rachel tested the daylight forest and starlit night views so every trail card stays effortless to read.'
  },
  {
    id: 'waystation',
    title: 'The Uncharted Waystation',
    subtitle: '1980s fantasy crossroads & warm resting bench for lost travelers',
    category: 'stories',
    categoryLabel: 'Books & Interactive Stories',
    icon: '🔮',
    url: 'https://waystation.raggiesoft.com',
    domainLabel: 'waystation.raggiesoft.com',
    jessicaExplanation:
      'Home to siblings Nolan and Gwen Lennox at the end of their fantasy adventure—and also our friendly safety net! Whenever anyone types a mistyped web address on RaggieSoft, Nolan and Gwen welcome them in and point them to the right world.',
    bestFirstStep: 'Use the interactive Waystation compass to find a story mood that fits your evening.',
    bugQaNote: 'Rachel intentionally typed dozens of goofy wrong links just to make sure Nolan and Gwen caught every one.'
  },
  {
    id: 'stardust',
    title: 'The Stardust Engine Official Band Portal',
    subtitle: 'Five decades of arena synth-rock, family loyalty, and tour history',
    category: 'music',
    categoryLabel: 'Music & Bands',
    icon: '🚀',
    url: 'https://stardust.raggiesoft.com',
    domainLabel: 'stardust.raggiesoft.com',
    jessicaExplanation:
      'Meet Blacksburg siblings Ryan, Cassidy, and Holly O’Connell alongside twin cousins Evan and Tyler Wright—Michael’s flagship fictional rock band whose albums, concerts, and novels span from 1985 all the way to today.',
    bestFirstStep: 'Browse the band’s album timeline and see how each record connects to a book in the series.',
    bugQaNote: 'Rachel cross-checked every tour date, album year, and sibling detail against the novels.'
  },
  {
    id: 'engineroom',
    title: 'Engine Room Records',
    subtitle: 'The independent label home for all seven RaggieSoft musical acts',
    category: 'music',
    categoryLabel: 'Music & Bands',
    icon: '⚙️',
    url: 'https://engineroom.raggiesoft.com',
    domainLabel: 'engineroom.raggiesoft.com',
    jessicaExplanation:
      'Beyond The Stardust Engine, Michael produces music across six more distinct acts—Crimson Node, Firelight, Fractured Prisms, Mana Canvas, The Arctic Symphony Project, and The Paper Wall. Engine Room Records introduces the whole roster.',
    bestFirstStep: 'Explore the seven artist profiles to discover which musical style matches your favorite genre.',
    bugQaNote: 'Rachel verified every band bio, accessibility commitment, and direct link into The Listening Room.'
  },
  {
    id: 'lore',
    title: 'RaggieSoft Lore Encyclopedia',
    subtitle: 'Searchable character profiles, timelines, places, and connections',
    category: 'guides',
    categoryLabel: 'Front Door & Guides',
    icon: '🗺️',
    url: 'https://lore.raggiesoft.com',
    domainLabel: 'lore.raggiesoft.com',
    jessicaExplanation:
      'Ever wonder how two characters across different books know each other, or want to look up a town, transit route, or timeline without losing your bookmark? Michael built the Lore Encyclopedia as your spoiler-aware companion atlas.',
    bestFirstStep: 'Type any character, band, or landmark into the search bar to see how the universe connects.',
    bugQaNote: 'Rachel tests character family trees and cross-links whenever a new chapter is published.'
  },
  {
    id: 'backstage',
    title: 'RaggieSoft Backstage',
    subtitle: 'Director’s commentary, bonus essays, and behind-the-scenes stories',
    category: 'guides',
    categoryLabel: 'Front Door & Guides',
    icon: '🎬',
    url: 'https://backstage.raggiesoft.com',
    domainLabel: 'backstage.raggiesoft.com',
    jessicaExplanation:
      'Think of Backstage like the bonus-features disc inside a favorite movie box set: deep-dive essays on why a scene was written a certain way, alternate “what-if” explorations, and song production notes.',
    bestFirstStep: 'Visit after finishing an episode or album when you want the deeper story behind the curtain.',
    bugQaNote: 'Rachel loves checking the reading-mode drawers and chapter links on Backstage dossiers.'
  },
  {
    id: 'nebulae',
    title: 'RaggieSoft Nebulae (Cosmic Visualizer)',
    subtitle: 'Relaxing deep-space starfield & Caelum-IV interactive observatory',
    category: 'guides',
    categoryLabel: 'Front Door & Guides',
    icon: '🌌',
    url: 'https://nebulae.raggiesoft.com',
    domainLabel: 'nebulae.raggiesoft.com',
    jessicaExplanation:
      'A calm, meditative corner of the studio where you can drift across glowing starfields inspired by Escape Velocity: Ad Astra—perfect as a quiet visual backdrop while streaming instrumental tracks from The Listening Room.',
    bestFirstStep: 'Put on Starfield Calibration or Sanctuary in Zero-G and let the nebula drift.',
    bugQaNote: 'Rachel makes sure motion stays gentle and pauseable for sensitive eyes.'
  },
  {
    id: 'storetrainer',
    title: 'RaggieSoft StoreTrainer (From Childhood PC Utility to 2.0)',
    subtitle: 'The story behind Michael’s earliest surviving desktop program and its modern rebirth',
    category: 'guides',
    categoryLabel: 'Front Door & Guides',
    icon: '💾',
    url: 'https://storetrainer.raggiesoft.com',
    domainLabel: 'storetrainer.raggiesoft.com',
    jessicaExplanation:
      'Long before today’s novels and albums, Michael built StoreTrainer on classic desktop Windows to launch favorite PC games alongside their companion trainers without juggling folders. Rather than letting that history collect dust, he preserved the original retro edition for vintage PCs AND built StoreTrainer 2.0 with a gentle upgrade wizard that carries old game profiles forward.',
    bestFirstStep: 'Explore the nostalgic retro desktop showcase and see how StoreTrainer evolved across generations.',
    bugQaNote: 'Rachel grew up watching Michael tinker on those childhood machines—and now tests the floating Cheat Card beside him!'
  },
  {
    id: 'a11y-studio',
    title: 'RaggieSoft Accessibility Studio (From University Batch Tool to Full Studio)',
    subtitle: 'How a self-started Old Dominion University helper grew into a full desktop studio',
    category: 'guides',
    categoryLabel: 'Front Door & Guides',
    icon: '♿',
    url: 'https://a11y.raggiesoft.com',
    domainLabel: 'a11y.raggiesoft.com',
    jessicaExplanation:
      'When Michael worked at Old Dominion University helping move hundreds of online classes from ODU’s custom Personal Learning Environment (PLE) into Canvas, nobody asked him to write desktop software—he just saw teammates spending hours checking course pages one by one and quietly built a polite batch-scanning utility on his own initiative. Years later at our Virginia Beach desk, watching me navigate from my wheelchair and watching Rachel test every page by keyboard inspired him to turn that seed idea into RaggieSoft Accessibility Studio: a full Windows workstation studio where builders can see issues side-by-side and fix them cleanly.',
    bestFirstStep: 'Visit the Accessibility Studio showcase to see how side-by-side guided fixes and readable reports work.',
    bugQaNote: 'Rachel unplugs the mouse and tests every single keyboard shortcut and high-contrast preview right beside her Bear!'
  },
  {
    id: 'corporate',
    title: 'RaggieSoft Media & Licensing',
    subtitle: 'Open-culture sharing rules, commercial licensing, and imprint info',
    category: 'guides',
    categoryLabel: 'Front Door & Guides',
    icon: '🏢',
    url: 'https://corporate.raggiesoft.com',
    domainLabel: 'corporate.raggiesoft.com',
    jessicaExplanation:
      'Explains how Michael shares his stories and music openly with everyday fans under Creative Commons while handling commercial film, podcast, or broadcast music licensing cleanly.',
    bestFirstStep: 'Check here if you are a creator or filmmaker wondering how you can share or license a track.',
    bugQaNote: 'Rachel checks that every plain-English summary stays clear and easy to understand.'
  }
];

// Four-stage interactive timeline for `/seed-story` (November 2006 Rescue & Seed Money).
export interface SeedMilestone {
  id: string;
  era: string;
  headline: string;
  location: string;
  narrative: string;
  takeaway: string;
}

export const SEED_TIMELINE: readonly SeedMilestone[] = [
  {
    id: 'delaney-pack',
    era: '1995 • Delaney Street',
    headline: 'Three Kids Keeping Each Other Safe',
    location: 'Virginia Beach, Virginia',
    narrative:
      'Long before any of us had an office or a studio desk, Michael, Rachel, and I learned as kids that we were each other’s safety net. While I was already taking apart our childhood home computer to see how every window worked, ten-year-old Michael and eight-year-old Rachel forged their unbreakable “Bear and Bug” bond.',
    takeaway: 'Rule #1 of our family was set early: nobody gets left behind, and nobody faces a storm alone.'
  },
  {
    id: 'seattle-warchest',
    era: '2000 – 2006 • Seattle',
    headline: 'Building the Sibling War Chest',
    location: 'Pacific Northwest',
    narrative:
      'After winning a university scholarship and working my way up from an intern to leading major security overhauls from my manual wheelchair, I saved every bonus and stock vest with one quiet goal in mind: making sure I had the financial firepower to get my brother and sister out of trouble the instant they needed me.',
    takeaway: 'Every framed photo on my corner-office desk was of Michael and Rachel—my pack.'
  },
  {
    id: 'november-2006-rescue',
    era: 'November 17, 2006 • The Rescue & Seed Desk',
    headline: 'Moving Christmas Up When Everything Was on the Line',
    location: 'Virginia Beach, Virginia',
    narrative:
      'I had secretly put together a dream portable studio workstation, music production suite, and design toolkit—double-boxed in plain cardboard—planning to surprise Michael at Christmas so he would see a future beyond his abuser’s roof. When Delores threw him out in mid-November, Christmas moved up that very night. We got him safe, unboxed the workstation, and backed him with the seed money to build on his own terms.',
    takeaway: 'I provided the rescue and the seed money; every creative spark that followed was 100% Michael’s.'
  },
  {
    id: 'moosewood-today',
    era: 'Today • Moosewood Drive',
    headline: 'One Roof, Zero Gatekeepers, Three Siblings',
    location: 'Virginia Beach, Virginia',
    narrative:
      'Look around RaggieSoft today and you are looking at what happens when a builder is finally free to create without walking on eggshells. Michael dreams up and builds every story, song, and world; I keep our home base rock-solid so nothing breaks; and Rachel sits right beside her Bear testing every single page.',
    takeaway: 'Michael builds it. Jessica guards the roof. Bug tests every corner.'
  }
];

// Interactive QA Tabs for `/bear-and-bug` showing how Rachel ("Bug") tests Michael's work.
export interface BugChecklistDesk {
  id: string;
  tabLabel: string;
  icon: string;
  headline: string;
  description: string;
  checks: readonly string[];
}

export const BUG_QA_DESKS: readonly BugChecklistDesk[] = [
  {
    id: 'chapter-flow',
    tabLabel: 'Books & Chapters',
    icon: '📖',
    headline: 'Reading Every Scene Out Loud Beside Bear',
    description:
      'Before a new chapter goes live on RaggieSoft Book Reader, Rachel pulls her chair over to Michael’s desk and reads it straight through like a first-time reader.',
    checks: [
      'Making sure every scene opens right inside the moment instead of feeling like a dry summary.',
      'Checking that character ages, bus routes, seasons, and family memories line up across episodes.',
      'Confirming scene illustrations match who is in the room and what they are wearing.',
      'Testing Next Chapter and Table of Contents buttons so readers never hit a dead end.'
    ]
  },
  {
    id: 'lyrics-and-music',
    tabLabel: 'Songs & Lyrics',
    icon: '🎵',
    headline: 'Listening With Headphones & Lyric Sheets Open',
    description:
      'Whenever Michael masters a new album for The Listening Room, Bug puts on her headphones and watches every line of lyrics scroll alongside the singer.',
    checks: [
      'Verifying that every sung line highlights right when the vocalist actually sings it.',
      'Catching homophones or misheard chorus words that an automated tool would miss.',
      'Checking volume balance from track to track so listeners never have to lunge for the volume knob.',
      'Testing album downloads and liner-note links back to the companion chapters.'
    ]
  },
  {
    id: 'crossroads-paths',
    tabLabel: 'Interactive Crossroads',
    icon: '🧭',
    headline: 'Walking Every Single Branching Route',
    description:
      'Interactive Story Crossroads novels have three full, coequal paths—which means Bug happily plays detective down all three roads!',
    checks: [
      'Walking Route A, Route B, and Route C separately from start to finish.',
      'Ensuring details from one chosen path never accidentally slip into a different path.',
      'Checking that the Crossroads route switcher remembers where you were without losing your spot.',
      'Confirming every choice feels rewarding—never a trick trap door.'
    ]
  },
  {
    id: 'comfort-and-calm',
    tabLabel: 'Everyday Comfort',
    icon: '☕',
    headline: 'Making Sure Every Room Feels Calm & Easy to Use',
    description:
      'Because all three of us know what sensory overload feels like, Rachel tests every page for calm, readable comfort on phones, tablets, and laptops.',
    checks: [
      'Checking both bright Daylight mode and warm Evening Lamp mode for clear, gentle contrast.',
      'Making sure music and animations never blast automatically without your say-so.',
      'Testing keyboard Tab navigation and readable button labels across every menu.',
      'Typing silly wrong addresses on purpose to confirm Nolan & Gwen catch lost visitors warmly.'
    ]
  }
];

// Curated reading & listening list for `/reading-list`.
export interface StoryRecommendation {
  id: string;
  badge: string;
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
}

export const READING_RECOMMENDATIONS: readonly StoryRecommendation[] = [
  {
    id: 'rachel-narrative',
    badge: 'Flagship Contemporary Series • Bear, Bug & Jessica',
    title: 'The Rachel Narrative',
    description:
      'Our family’s core novel series—from childhood survival on Delaney Street and forging “Bear and Bug” to November 2006’s rescue workstation and our adult sanctuary on Moosewood Drive in Virginia Beach.',
    primaryHref: 'https://books.raggiesoft.com/rachel',
    primaryLabel: 'Read The Rachel Narrative',
    secondaryHref: 'https://lore.raggiesoft.com',
    secondaryLabel: 'Explore Family Lore'
  },
  {
    id: 'quantum-directive',
    badge: 'Jessica’s Origin Novel • Seattle & Building 35',
    title: 'The Quantum Directive: Jessica’s Cut',
    description:
      'Follow my years in the Pacific Northwest—winning a scholarship to Seattle, taking on arrogant boardrooms from my manual wheelchair, earning my nickname in the trenches, and building the financial shield for my brother and sister.',
    primaryHref: 'https://books.raggiesoft.com/quantum-directive-1-jessica',
    primaryLabel: 'Read Jessica’s Cut',
    secondaryHref: 'https://backstage.raggiesoft.com',
    secondaryLabel: 'Read Backstage Notes'
  },
  {
    id: 'crimson-node-listening',
    badge: 'Companion Music • Engine Room Records',
    title: 'Crimson Node & The Stardust Engine in The Listening Room',
    description:
      'Hear the exact songs playing on our desk speakers across the chapters—stream full albums with follow-along lyrics right inside The Listening Room.',
    primaryHref: 'https://music.raggiesoft.com',
    primaryLabel: 'Open The Listening Room',
    secondaryHref: 'https://stardust.raggiesoft.com',
    secondaryLabel: 'Visit The Stardust Engine'
  },
  {
    id: 'story-crossroads-worlds',
    badge: 'Interactive Fiction • Choose Your Path',
    title: 'Cedar Run & The Uncharted Waystation',
    description:
      'Want to step into a branching novel where Bug has already tested every single trail? Try Cedar Run in the high Washington timber or The Uncharted Waystation in a 1980s twilight realm.',
    primaryHref: 'https://crossroads.raggiesoft.com',
    primaryLabel: 'Browse Story Crossroads',
    secondaryHref: 'https://books.raggiesoft.com/waystation',
    secondaryLabel: 'Read The Uncharted Waystation'
  }
];
