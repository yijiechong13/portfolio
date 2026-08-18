/* ===========================================================================
   Projects content.

   ALL copy, metrics, links and image paths live here — the page and case
   studies read from this file, so nothing needs editing in the JSX.

   ── ADDING ASSETS ─────────────────────────────────────────────────────────
   Put files in `public/projects/<slug>/`, then set `src` on the relevant
   media entry. A media entry with `src: null` renders NOTHING (no empty box).
   A link with `enabled: false` or an empty `url` renders NO button.

   Every claim here is either supplied or verified. Do not add team sizes,
   user counts, deployment status or outcomes that have not been confirmed.
   =========================================================================== */

export type MediaType = "image" | "video";

export type ProjectMedia = {
  /** e.g. "/projects/nuwa/cover.png". null → nothing renders. */
  src: string | null;
  alt: string;
  caption?: string;
  credit?: string;
  mediaType?: MediaType;
  /** Intrinsic size — set both to prevent layout shift while loading. */
  width?: number;
  height?: number;
  /** Marks the principal product visual (shown slightly larger). */
  featured?: boolean;
  /**
   * Hidden from the compact Projects-page preview but KEPT in the data — the
   * file stays on disk and the entry stays available to case studies.
   */
  previewHidden?: boolean;
  /** Poster frame for video. Never autoplays. */
  poster?: string | null;
  /** Label shown in the asset map below; not rendered. */
  slot?: string;
};

export type LinkType =
  | "case-study"
  | "demo"
  | "prototype"
  | "deck"
  | "repo"
  | "overview";

export type ProjectLink = {
  type: LinkType;
  label: string;
  /** Empty string → not rendered. */
  url: string;
  enabled: boolean;
  /** Opens in a new tab with rel="noopener noreferrer". */
  external?: boolean;
};

/** Drives whether a live-deployment button may appear at all. */
export type ProjectStatus = "live" | "video-only" | "archived" | "private";

export type Metric = {
  value: string;
  label: string;
  /** Qualification shown WITH the metric — never separated from it. */
  note?: string;
};

export type FeaturedLevel = "flagship" | "featured" | "selected" | "compact";

export type FeatureArea = { name: string; items: string[] };

export type Project = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  context: string;
  dates: string;
  teamLabel: string;
  role?: string;
  summary: string;
  /** Optional supporting paragraph shown under the summary. */
  description?: string;
  featuredLevel: FeaturedLevel;
  technologies: string[];
  verifiedMetrics?: Metric[];
  highlights?: string[];
  /** Short restrained line shown under the preview highlights. */
  previewNote?: string;
  /** Grouped feature areas — used instead of a flat list where set. */
  featureAreas?: FeatureArea[];
  /**
   * Compact highlights shown ONLY on the Projects-page preview. The complete
   * detail stays in `featureAreas` / the case study, which still render in
   * full — this list exists so the preview does not read like a case study.
   */
  previewHighlights?: string[];
  /**
   * Core technologies shown ONLY on the Projects-page preview. `technologies`
   * remains the complete verified list and is what the case study renders.
   */
  previewTechnologies?: string[];
  cover: ProjectMedia;
  media?: ProjectMedia[];
  links: ProjectLink[];
  status: ProjectStatus;
  hasCaseStudy: boolean;
};

/* --------------------------------------------------------------- hero --- */

export const hero = {
  eyebrow: "Selected work",
  heading: "Turning real problems into working products",
  intro:
    "From detecting subtle online harms to simplifying community workflows, these projects show how I move from research and requirements to product design, engineering and deployment.",
  themes: [
    "Applied AI and online safety",
    "Full-stack product development",
    "Community technology",
    "Mobile and conversational products",
  ],
};

/* ------------------------------------------------------------- projects --- */

export const projects: Project[] = [
  {
    id: "nuwa",
    slug: "nuwa",
    title: "Nuwa",
    subtitle: "Real-Time Harm Detection Platform",
    context: "Huawei Tech4City Hackathon",
    dates: "May 2026 – July 2026",
    teamLabel: "Team project · Shared implementation",
    summary:
      "A real-time harm-detection system that analyses how code-mixed Singlish conversations evolve to identify scams, grooming and cyberbullying, then produces an explainable, auditable verdict.",
    featuredLevel: "flagship",
    technologies: [
      "React",
      "TypeScript",
      "FastAPI",
      "PyTorch Geometric",
      "GraphSAGE",
      "PostgreSQL",
      "Row-level security",
      "Docker",
      "Vercel",
      "Render",
    ],
    verifiedMetrics: [
      { value: "89.4%", label: "macro-F1", note: "Final held-out test set" },
      {
        value: "0.34–0.39 ms",
        label: "inference",
        // This qualification must stay attached to the number.
        note: "GraphSAGE only; excludes LLM latency",
      },
      {
        value: "~2,000",
        label: "Singlish conversations",
        note: "Generated and human-validated",
      },
      {
        value: "4",
        label: "controlled experiments",
        note: "Learning curve, GNN architecture, held-out testing and inference window",
      },
    ],
    cover: {
      src: "/projects/nuwa/nuwa-contextual-grooming-detection.png",
      alt: "Nuwa messaging interface showing a contextual grooming alert based on age probing, secrecy, moving to Telegram and requesting photos.",
      caption:
        "Nuwa connects age probing, secrecy, an attempt to move off-platform and a request for photos to identify risk across the conversation.",
      /* The conversation is fabricated for the demo — this must stay visible
         wherever the screenshot appears so it is never read as a real case. */
      credit: "Synthetic conversation created for demonstration.",
      width: 2576,
      height: 1470,
      mediaType: "image",
      slot: "Cover screenshot or demo poster",
    },
    media: [
      { src: null, alt: "", slot: "Normal conversation view", caption: "Normal conversation" },
      { src: null, alt: "", slot: "Flagged conversation", caption: "Flagged conversation" },
      { src: null, alt: "", slot: "Safety-alert panel", caption: "Safety alert" },
      { src: null, alt: "", slot: "Evidence / explanation view", caption: "Evidence view" },
      { src: null, alt: "", slot: "Feedback interaction", caption: "Feedback" },
    ],
    links: [
      { type: "case-study", label: "View case study", url: "/projects/nuwa", enabled: true },
      { type: "demo", label: "Watch demo", url: "", enabled: false },
      // Deployment may be discontinued — flip `enabled` off and the button
      // disappears. Never leave a dead link rendered.
      { type: "prototype", label: "Open prototype", url: "", enabled: false },
      { type: "deck", label: "View pitch deck", url: "", enabled: false },
      {
        type: "repo",
        label: "View GitHub",
        url: "https://github.com/YSTey0808/huaweitech4city",
        enabled: true,
        external: true,
      },
    ],
    status: "video-only",
    hasCaseStudy: true,
  },
  {
    id: "care4you",
    slug: "care4you",
    title: "Care4You",
    context: "Top 10 Finalist · Hack4Good @ NUS Developer Group",
    dates: "January 2026",
    teamLabel: "Team project · Shared implementation",
    summary:
      "A mobile event-management platform built for MINDS to replace fragmented workflows with one connected experience for participants, caregivers, volunteers and staff.",
    description:
      "Care4You brings event discovery, registration, capacity management, announcements and attendance into a shared mobile workflow, replacing processes previously spread across Canva, Google Forms and WhatsApp.",
    featuredLevel: "featured",
    /* Matches the repository stack — deliberately NOT Nuwa's. */
    technologies: [
      "React Native",
      "Expo",
      "Expo Router",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Supabase",
      "OpenAI API",
      "i18next",
      "AsyncStorage",
      "Google Cloud",
    ],
    verifiedMetrics: [
      {
        value: "Top 10",
        label: "Finalist",
        note: "Hack4Good @ NUS Developer Group",
      },
      {
        value: "8+ hours/week",
        label: "of administrative work addressed",
        // MINDS-reported figure about the EXISTING workflow. Never phrase
        // this as measured, proven or achieved savings.
        note: "Based on MINDS' reported existing workflow",
      },
    ],
    /* Preview-only. The complete grouped detail below stays untouched and is
       what the case study covers in full. */
    previewHighlights: [
      "Picture-led event discovery with calendar and list views",
      "Capacity-aware registration and automatic waitlist promotion",
      "Announcement channel for participants and caregivers",
      "QR-based attendance with expiry validation",
      "Staff event creation, participant tracking and CSV export",
      "English–Chinese translation for event content and forms",
    ],
    previewTechnologies: [
      "React Native",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Supabase",
      "OpenAI API",
    ],
    featureAreas: [
      {
        name: "Accessible event discovery",
        items: [
          "Picture-led event calendar",
          "Calendar and list views of upcoming activities",
          "Multiple-choice registration questions",
          "English–Chinese event translation",
        ],
      },
      {
        name: "Registration and capacity management",
        items: [
          "Capacity-aware registration",
          "Waitlist auto-promotion after withdrawal",
          "Live availability counts",
        ],
      },
      {
        name: "Staff operations and attendance",
        items: [
          "Staff event creation and management",
          "Targeted announcements",
          "Time-stamped QR attendance",
          "Structured registration-data export",
          "Server-side translation caching",
        ],
      },
    ],
    cover: { src: null, alt: "", slot: "Not used — the two screenshots carry this project" },
    /* Only real screenshots are listed. Future slots are documented in
       public/projects/README.txt and must not render until configured. */
    media: [
      {
        src: "/projects/care4you/event-calendar.png",
        alt: "Care4You mobile event calendar showing a Mahjong activity with its date, location and availability.",
        caption:
          "Browse upcoming activities through a picture-led calendar and event view.",
        width: 1206,
        height: 2469,
        mediaType: "image",
        featured: true,
      },
      {
        src: "/projects/care4you/role-selection.png",
        alt: "Care4You mobile role-selection screen with Participant, Volunteer and Staff options.",
        caption:
          "Choose a role-based path as a participant, volunteer or staff member.",
        width: 1206,
        height: 2469,
        mediaType: "image",
      },
      /* Product walkthrough. `previewHidden` keeps the compact Projects-page
         preview to the two lead screens; these carry the case study. */
      {
        src: "/projects/care4you/registration-chinese.png",
        alt: "Care4You event-registration form displayed in Chinese, with fields for name, contact number, emergency contact and special requirements.",
        caption:
          "Register for an event in Chinese, including accessibility and dietary requirements.",
        width: 540,
        height: 1072,
        mediaType: "image",
        previewHidden: true,
      },
      {
        src: "/projects/care4you/waitlist.png",
        alt: "Care4You My Events screen filtered to Waitlist, showing a waitlisted session with a withdraw option.",
        caption:
          "Full events place people on a waitlist, with withdrawal handled in the same view.",
        width: 609,
        height: 1246,
        mediaType: "image",
        previewHidden: true,
      },
      {
        src: "/projects/care4you/staff-create-event.png",
        alt: "Care4You staff event-creation form with title, location, start and end times, participant and volunteer capacity, wheelchair accessibility and category tag.",
        caption:
          "Staff create an event with capacity, accessibility and category details in one form.",
        width: 612,
        height: 1258,
        mediaType: "image",
        previewHidden: true,
      },
      {
        src: "/projects/care4you/registered-events.png",
        alt: "Care4You My Events screen listing two upcoming registered events, each with venue details and a QR attendance action.",
        caption:
          "Registered events stay in one place, each with its venue and QR attendance action.",
        width: 614,
        height: 1237,
        mediaType: "image",
        previewHidden: true,
      },
    ],
    links: [
      { type: "case-study", label: "View case study", url: "/projects/care4you", enabled: true },
      {
        type: "repo",
        label: "View GitHub",
        url: "https://github.com/Hack4Funnn/care4you",
        enabled: true,
        external: true,
      },
    ],
    status: "archived",
    hasCaseStudy: true,
  },
  {
    id: "bookliaobot",
    slug: "bookliaobot",
    title: "BookLiaoBot",
    context: "NUS Orbital",
    dates: "May 2025 – August 2025",
    teamLabel: "Team project · Shared implementation",
    summary:
      "A Telegram bot that helps NUS students discover, host and join casual sports games entirely within Telegram.",
    description:
      "Our team built guided host and join flows across nine sports. Students can filter games by sport, time, venue and skill level, view live player counts, resolve approximate venue names through fuzzy search, and join dynamically created Telegram groups.",
    featuredLevel: "selected",
    technologies: [
      "Python",
      "Telegram Bot API",
      "Telethon",
      "APScheduler",
      "Firebase Cloud Firestore",
      "spaCy",
      "rapidfuzz",
    ],
    /* Five concise highlights for the page. */
    previewHighlights: [
      "Guided host and join flows using inline keyboards",
      "Multi-filter game discovery across nine sports",
      "Fuzzy venue search and resolution",
      "Live player counts and dynamic group creation",
      "Scheduled reminders and automatic expired-game cleanup",
    ],
    previewNote:
      "Telegram inline keyboards guide users through each step, reducing free-text input and making the experience quicker and easier on mobile.",
    highlights: [
      "Guided host and join flows using inline keyboards",
      "Multi-filter game discovery across nine sports",
      "Fuzzy venue search and resolution",
      "Live player counts and dynamic group creation",
      "Scheduled reminders and automatic expired-game cleanup",
    ],
    cover: { src: null, alt: "", slot: "Not used — the walkthrough carries this project" },
    /* Three real Telegram screenshots. The announcement-channel image is a
       portfolio-safe copy: the invite token and usernames are painted out in
       the file itself. Unedited originals live OUTSIDE the repo at
       ~/Desktop/bookliaobot-originals/ and are never served. */
    media: [
      {
        src: "/projects/bookliaobot/role-selection.png",
        alt: "BookLiaoBot Telegram conversation showing Host a Game and Join a Game options.",
        caption: "Choose whether to host a new game or join an existing session.",
        width: 744,
        height: 1398,
        mediaType: "image",
        featured: true,
      },
      {
        src: "/projects/bookliaobot/announcement-channel.png",
        alt: "BookLiaoBot announcement channel displaying a volleyball session and request-to-join action.",
        caption: "Browse a published session and request to join its Telegram group.",
        width: 758,
        height: 1424,
        mediaType: "image",
      },
      {
        /* Kept in the data (and on disk) but not shown in the two-screen
           preview: it repeats the introductory copy already in the left
           column. Nothing else references it yet. */
        src: "/projects/bookliaobot/onboarding.png",
        alt: "BookLiaoBot Telegram onboarding screen introducing its sports game-matching functionality.",
        caption: "Start the Telegram-native sports-matching experience.",
        width: 766,
        height: 1292,
        mediaType: "image",
        previewHidden: true,
      },
    ],
    links: [
      {
        type: "repo",
        label: "View GitHub",
        url: "https://github.com/yijiechong13/bookliaobot",
        enabled: true,
        external: true,
      },
      /* Pitch deck DISABLED: the supplied canva.link short URL redirects to an
         /edit URL, which would expose editing. A view-only variant exists at
         .../view — enable this only after confirming it opens publicly while
         signed out. Do NOT use the /edit link. */
      {
        type: "deck",
        label: "View pitch deck",
        url: "https://www.canva.com/design/DAGpAIn-PPQ/NQehUtqz_S_aCYq0L_m-SQ/view",
        enabled: false,
        external: true,
      },
    ],
    status: "archived",
    hasCaseStudy: false,
  },
  {
    id: "etl-dashboard",
    slug: "etl-dashboard",
    title: "ETL Financial Dashboard",
    context: "NUS Fintech Society",
    dates: "August 2025 – May 2026",
    teamLabel: "Team project · Shared implementation",
    // Precise: frontend only. Do not imply ownership of the ETL pipeline.
    role: "Frontend Engineer",
    summary:
      "A financial analytics dashboard that transforms market data into interactive technical-indicator visualisations.",
    featuredLevel: "compact",
    technologies: [
      "Next.js",
      "TypeScript",
      "Recharts",
      "Tailwind CSS",
      "FastAPI",
      "PostgreSQL",
    ],
    highlights: [
      "Built a responsive, multi-page interface with Next.js and TypeScript",
      "Developed interactive close-price, MACD, RSI and Bollinger Band visualisations",
      "Implemented dynamic ticker and date-range selection",
      "Integrated REST APIs from a FastAPI and PostgreSQL backend",
      "Documented market-data endpoints for contributor onboarding",
    ],
    cover: { src: null, alt: "", slot: "Optional dashboard screenshot" },
    links: [{ type: "repo", label: "View repository", url: "", enabled: false }],
    status: "archived",
    hasCaseStudy: false,
  },
  {
    id: "tuto",
    slug: "tuto",
    title: "Tuto",
    subtitle: "Tutor Management Desktop Application",
    context: "NUS CS2103T Team Project",
    dates: "October 2025 – November 2025",
    teamLabel: "Five-person Agile team",
    summary:
      "A command-driven Java desktop application for managing students, attendance, performance records and tuition fees.",
    featuredLevel: "compact",
    technologies: ["Java", "Gradle", "GitHub Actions", "Checkstyle"],
    highlights: [
      "Extended and refactored AddressBook-Level3 into a domain-specific application",
      "Applied Command and Observer design patterns",
      "Collaborated through issue tracking, pull request reviews and a shared Git workflow",
      "Maintained code quality using Gradle, GitHub Actions and Checkstyle",
      "Delivered five versioned releases through iterative development",
    ],
    cover: { src: null, alt: "", slot: "Optional application screenshot" },
    links: [{ type: "repo", label: "View GitHub", url: "", enabled: false }],
    status: "archived",
    hasCaseStudy: false,
  },
];

export const cta = {
  heading: "Building things that are actually used",
  text: "I'm always happy to talk through any of these projects in more detail, or about opportunities to build something new.",
  buttonLabel: "Get in touch",
  to: "/contact",
};

export const findProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
