/* ===========================================================================
   Experience page content.

   ALL copy, figures and image references live here — not in the JSX — so the
   page can be updated without touching layout code.

   ── WHERE TO ADD PHOTOGRAPHS ──────────────────────────────────────────────
   1. Put the file in `public/experience/` (create the folder).
   2. Set `src` to the public path, e.g. "/experience/office.jpg".
   3. Write `alt` describing what the photo shows (do NOT repeat the caption).

   Three image slots exist:
     • hero.photo          — one portrait/landscape shot beside the intro
     • caseStudies[0].photo — OPTIONAL public product screenshot
     • moments.images[]     — 1-3 photos; the whole section hides when empty

   Photographs must not show confidential screens, customer data, internal
   systems, documents, access cards, or people who have not agreed to appear.
   =========================================================================== */

export type Media = {
  /** Public path, e.g. "/experience/office.jpg". null → placeholder tile. */
  src: string | null;
  /** Describe what the image shows. Required once `src` is set. */
  alt: string;
  /** Shown inside the placeholder until a real image is supplied. */
  placeholderLabel: string;
  /** Optional line printed under the image. */
  caption?: string;
  /** Optional photographer / source credit. */
  credit?: string;
  /** Container ratio, e.g. "4 / 3". Prevents layout shift. */
  ratio?: string;
  /** Where the crop centres, e.g. "center 38%". Keeps faces visible. */
  objectPosition?: string;
};

/* ---------------------------------------------------------------- hero --- */

export const hero = {
  eyebrow: "Professional experience",
  title: "Full-Stack Developer Intern",
  organisation: "iFAST Global Hub AI",
  meta: "May–Jul 2026 · 12-week internship",
  intro:
    "Shipped production features across Angular and Spring Boot, reduced a batch job’s benchmarked runtime by approximately 60%, and contributed across requirements analysis, development, testing, monthly releases and production support.",
  tags: [
    "Angular",
    "Spring Boot",
    "Spring Batch",
    "Oracle",
    "REST APIs",
    "Microservices",
    "OMS integration",
  ],
  photo: {
    src: "/experience/office-portrait.jpg",
    alt: "Standing in front of the iFAST office signage",
    placeholderLabel: "Internship photo",
    ratio: "4 / 3",
    /** CROP CONTROL — tune to keep the subject framed. */
    objectPosition: "center 38%",
  } as Media,
};

/* --------------------------------------------------------- case studies --- */

export type CaseStudy = {
  title: string;
  challenge: string;
  contribution: string;
  outcome: string;
  tags: string[];
  /** Rendered as a badge; paired with an icon so status is not colour-only. */
  status?: string;
  photo?: Media;
  /** Optional expandable detail — keep conceptual, never proprietary. */
  technical?: { summary: string; before: string; after: string };
};

export const caseStudies: CaseStudy[] = [
  {
    title: "Expanding HKEX order capabilities",
    challenge:
      "FSMOne Malaysia supported Enhanced Limit Orders for HKEX, but not Market Orders or Good-Till-Date validity.",
    contribution:
      "Owned the end-to-end delivery of Market Order execution and extended Enhanced Limit Orders with Good-Till-Date validity. Implemented changes across the Angular frontend, Spring Boot backend, OMS integration, testing and corresponding B2B interface.",
    outcome: "Released both capabilities to production.",
    status: "Live in production",
    tags: [
      "Angular",
      "Spring Boot",
      "REST API",
      "OMS integration",
      "End-to-end testing",
    ],
  },
  {
    title: "Reducing batch-processing runtime",
    challenge:
      "A Spring Batch job processed 500+ reference numbers, with each one triggering a repeated five-table join. This created an N+1 query pattern and unnecessary database work.",
    contribution:
      "Traced the bottleneck and replaced the individual lookups with chunked bulk queries, batching requests within Oracle’s IN-clause limit.",
    outcome: "Reduced the job’s benchmarked runtime by approximately 60%.",
    tags: [
      "Spring Batch",
      "Oracle",
      "Query optimisation",
      "Performance benchmarking",
    ],
    technical: {
      summary: "View technical approach",
      before: "Repeated query per reference → repeated joins → longer runtime",
      after: "Chunk references → bulk query → reuse results",
    },
  },
];

/* ------------------------------------------------ additional contributions */

export type Contribution = { title: string; description: string; tags: string[] };

export const contributions: Contribution[] = [
  {
    title: "Market-data provider migration",
    description:
      "Analysed and integrated more than 10 market-data APIs for the Malaysia platform, studying endpoint calls, required parameters and response structures while preserving existing behaviour on the new source.",
    tags: ["REST APIs", "Response mapping", "Integration testing"],
  },
  {
    title: "Designing watchlist-integrated price alerts",
    description:
      "Designed a watchlist-integrated price-alert flow for stocks and ETFs across two systems with separate databases and APIs. Conducted impact analysis and presented three implementation approaches with trade-offs and effort estimates to support business decision-making.",
    tags: [
      "Impact analysis",
      "System design",
      "Technical proposals",
      "Stakeholder communication",
    ],
  },
  {
    /* Replaced the old "live production environment" card: it repeated the
       intro, the delivery cycle, the technical environment and the
       reflection. Production support is still covered by all of those. */
    title: "Evaluating regional microfrontend reuse",
    description:
      "Integrated an existing microfrontend widget into the Malaysia platform as a proof of concept and demonstrated it to regional stakeholders evaluating frontend standardisation across Singapore, Hong Kong and Malaysia.",
    tags: [
      "Microfrontend integration",
      "Proof of concept",
      "Cross-platform analysis",
      "Regional stakeholder demonstration",
    ],
  },
];

/* ------------------------------------------------------------- process --- */

export const process = {
  heading: "Working across the delivery cycle",
  stages: [
    {
      name: "Understand requirements",
      text: "Clarified the user and business need before proposing a solution.",
    },
    {
      name: "Analyse impact",
      text: "Traced affected components, services and operational flows.",
    },
    {
      name: "Develop",
      text: "Implemented changes across frontend, backend and integrations.",
    },
    {
      name: "Test",
      text: "Validated expected behaviour and affected scenarios.",
    },
    {
      name: "Release",
      text: "Participated in the monthly production deployment cycle.",
    },
    {
      name: "Support production",
      text: "Investigated live issues and helped verify fixes.",
    },
  ],
};

/* --------------------------------------------------------- environment --- */

export const environment = {
  heading: "Technical environment",
  groups: [
    { label: "Frontend", items: ["Angular"] },
    { label: "Backend", items: ["Spring Boot", "Spring Batch"] },
    {
      label: "Data and integration",
      items: ["Oracle", "RESTful APIs", "OMS API integration", "Market-data APIs"],
    },
    {
      label: "Architecture and delivery",
      items: [
        "Microservices",
        "Unit and integration testing",
        "Monthly production releases",
        "Production debugging",
      ],
    },
  ],
};

/* ------------------------------------------------------------- moments --- */

/** The whole "Moments" section hides automatically when this array is empty. */
export const moments = {
  heading: "A moment from the internship",
  images: [
    {
      src: "/experience/team.jpg",
      alt: "Four interns standing together in front of the iFAST office signage",
      placeholderLabel: "Team photo",
      caption: "With my team at iFAST.",
      ratio: "4 / 3",
    },
    // Add up to two more here; the layout adapts to 1, 2 or 3 images and the
    // whole section disappears if this array is emptied.
  ] as Media[],
};

/* ---------------------------------------------------------- reflection --- */

export const reflection = {
  heading: "What I took away",
  body: "I started the internship feeling overwhelmed by the size of a production codebase. Over 12 weeks, I became more comfortable tracing unfamiliar systems, asking better questions and taking features from requirements to deployment. I left with real production contributions—and far fewer things that intimidate me.",
  takeaways: [
    {
      title: "Think beyond the code",
      text: "Understand how a change affects users, connected services and operational teams.",
    },
    {
      title: "Reliability matters",
      text: "A feature is not finished when it works locally; it must behave reliably in production.",
    },
    {
      title: "Communicate trade-offs",
      text: "Good engineering also means explaining options clearly enough for others to make informed decisions.",
    },
  ],
};

/* ---------------------------------------------------------------- cta ---- */

export const cta = {
  heading: "From requirements to production",
  text: "This internship strengthened my confidence in working across unfamiliar systems and turning business needs into reliable, production-ready features.",
};

/** Reused across the page — same targets as the rest of the site. */
export const links = {
  projects: "/projects",
  home: "/",
};
