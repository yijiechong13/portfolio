/* ===========================================================================
   Case-study copy for Nuwa and Care4You.

   Kept separate from projects.ts so the index page stays light. All wording
   here is deliberately careful about what has and has not been verified.
   =========================================================================== */

export type Step = { name: string; text?: string };

export const nuwa = {
  problem: {
    heading: "The harm is not always obvious",
    body: "Youths can encounter scams, grooming and cyberbullying through conversations that appear harmless when individual messages are viewed in isolation. The challenge becomes harder when those conversations use informal, code-mixed Singlish.",
  },
  solution: {
    heading: "Context before judgement",
    body: "Nuwa analyses the evolving pattern of a conversation, identifies the messages contributing most strongly to the model’s decision and passes that evidence to an LLM adjudicator. The adjudicator produces a contextual, explainable verdict and may override the classifier when the supplied evidence indicates that it is confidently wrong.",
  },
  flow: {
    heading: "How a conversation is assessed",
    /* Six steps, not nine: the finer-grained version repeated itself against
       the explanatory text below. */
    steps: [
      { name: "Preprocess and embed each message" },
      { name: "Add messages to the evolving conversation graph" },
      { name: "Apply GraphSAGE message passing" },
      { name: "Score message-level and conversation-level risk" },
      { name: "Send the strongest supporting evidence to the LLM adjudicator" },
      { name: "Present an explainable alert and collect feedback" },
    ] as Step[],
    body: "Each message becomes a graph node and is connected using the selected conversation-edge strategy. GraphSAGE enriches its representation with surrounding context. The classifiers then produce message-level and conversation-level harm scores, while the highest-evidence messages ground the LLM’s final explanation.",
  },
  dataset: {
    heading: "Building for the language people actually use",
    body: "The project addressed the lack of suitable training data by generating approximately 2,000 code-mixed Singlish conversations based on documented harm patterns and local scenarios, followed by human review and validation.",
    steps: [
      { name: "Evidence collection" },
      { name: "Behaviour-pattern library" },
      { name: "Prompted conversation generation" },
      { name: "Human review and labelling" },
    ] as Step[],
    note: "These conversations were generated for training, not collected from real users.",
  },
  /* The architecture-selection work. Without this the case study reads as
     though GraphSAGE was simply assumed and wired to an LLM. */
  research: {
    heading: "From questions to architecture",
    body: "The final architecture was measured into place through four controlled experiments, with one variable changed at a time.",
    experiments: [
      {
        name: "Learning curve",
        text: "Tested whether performance was limited by model capacity or available training data.",
      },
      {
        name: "GraphSAGE versus GAT",
        text: "Compared mean and attention-based neighbour aggregation across three seeds using layer-matched architectures.",
      },
      {
        name: "Held-out testing",
        text: "Confirmed the final architecture on a test set kept separate from model selection.",
      },
      {
        name: "Inference window",
        text: "Compared three-message, ten-message and full-conversation context to select a practical runtime window.",
      },
    ],
    body2: "GraphSAGE outperformed GAT on both validation and held-out test data. A ten-message inference window retained most of the full-context performance while keeping inference latency between 0.34 and 0.39 ms.",
  },

  evaluation: {
    heading: "Model evaluation",
    results: [
      {
        value: "89.4%",
        label: "macro-F1",
        note: "Final held-out test set",
      },
      {
        value: "0.34–0.39 ms",
        label: "inference",
        // Must stay attached: this is NOT end-to-end system latency.
        note: "GraphSAGE only; excludes LLM and API latency",
      },
      {
        value: "~2,000",
        label: "conversations",
        note: "Synthetic Singlish conversations, then human-reviewed",
      },
      {
        value: "4",
        label: "controlled experiments",
        note: "Learning curve, GNN architecture, held-out testing and inference window",
      },
    ],
  },
  delivery: {
    heading: "From model experiment to deployed product",
    body: "Our team carried the project beyond model evaluation by building a reference messaging application that demonstrated how a platform could integrate real-time harm detection and explainable safety alerts.",
    items: [
      "React and TypeScript frontend",
      "FastAPI service",
      "GraphSAGE inference pipeline",
      "LLM adjudication",
      "PostgreSQL with row-level security",
      "Dockerised services",
      "Vercel and Render deployment",
    ],
  },
  /* Scope and limitations. Nuwa is a prototype; this section keeps that
     explicit rather than implying a deployable moderation system. */
  responsible: {
    heading: "Designing for responsible integration",
    body: "Nuwa is a research prototype, not a production moderation system. A real deployment should operate within the messaging platform’s controlled environment rather than expose raw conversations through a public per-message API. It would require data minimisation, encryption, retention controls, access restrictions and human review before high-impact actions are taken.",
    body2: "Synthetic training data also cannot fully represent real-world language, emerging tactics or adversarial behaviour, making continued evaluation with appropriately governed data essential.",
  },

  reflection: {
    heading: "What I took from it",
    body: "Working on Nuwa pushed me to think about nuance: the same sentence can be harmless or alarming depending on what came before it. The most interesting engineering problem was not raising an alarm, but making the reasoning behind it auditable — surfacing the evidence a decision rested on instead of returning an opaque score. It also meant carrying an experiment all the way to a deployed product.",
  },
};

export const care4you = {
  problem: {
    heading: "One event, too many disconnected tools",
    body: "Event information, registration and communication were spread across Canva, Google Forms and WhatsApp. This created repeated administrative work for staff and a fragmented experience for caregivers and participants.",
    // MINDS-reported. Never phrase this as an audited or measured result,
    // and never imply the prototype was operationally deployed.
    metricNote:
      "MINDS reported that the existing workflow required more than eight hours of staff administration each week.",
  },
  users: {
    heading: "Four roles, one connected workflow",
    /* Caregivers are a first-class role here. Note the sign-up screen shows
       three buttons — caregivers use the participant path to register the
       people they support — so do not describe this as four buttons. */
    items: [
      {
        name: "Participants",
        text: "Discover and join activities through a picture-led calendar or list view.",
      },
      {
        name: "Caregivers",
        text: "Register the people they support and manage multiple participants through one account.",
      },
      {
        name: "Volunteers",
        text: "Find activities that need support, register and track their commitments.",
      },
      {
        name: "Staff",
        text: "Create events, communicate updates, manage registration and monitor attendance.",
      },
    ],
  },

  /* Two labelled paths through the product. Plain data — rendered as simple
     text sequences with CSS arrows, no diagram library. */
  workflows: {
    heading: "How the workflow fits together",
    paths: [
      {
        label: "Caregiver or participant",
        steps: [
          "Browse activities in calendar or list view",
          "View event details and register",
          "Join the waitlist automatically when capacity is reached",
          "Receive updates through the announcement channel",
          "Check in using a time-limited QR code",
        ],
      },
      {
        label: "Staff",
        steps: [
          "Create an event and define its capacity",
          "Upload images and add registration questions",
          "Publish content in English and Chinese",
          "Monitor registrations, waitlists and attendance",
          "Export structured event data as CSV",
        ],
      },
    ],
  },

  translation: {
    heading: "Create once, communicate in two languages",
    body: "Staff can create event information once and publish it in English and Chinese. Dynamic event content is translated through the OpenAI API, while static interface text is handled through i18next. Translated responses are cached server-side to avoid repeated API calls and keep the experience responsive.",
  },

  architecture: {
    heading: "Technical architecture",
    steps: [
      { name: "Mobile client", text: "React Native, Expo and Expo Router" },
      { name: "Backend API", text: "Node.js and Express" },
      { name: "Database", text: "PostgreSQL through Supabase" },
      { name: "Translation service", text: "OpenAI API with server-side caching" },
      { name: "Cloud deployment", text: "Google Cloud" },
      { name: "Device persistence", text: "AsyncStorage" },
    ] as Step[],
  },
  /* Replaces the old "Reducing friction" and "Less manual consolidation"
     lists, which repeated each other and the workflow steps. This says why
     each decision matters instead of listing the features again. */
  decisions: {
    heading: "Decisions that shaped the workflow",
    items: [
      {
        name: "Capacity-aware registration",
        text: "Live capacity checks prevent events from being overbooked while preserving a clear registration experience.",
      },
      {
        name: "Automatic waitlist promotion",
        text: "When someone withdraws, the next eligible registration is promoted automatically without staff intervention.",
      },
      {
        name: "Targeted announcements",
        text: "Staff can publish updates to everyone or only to people registered for a particular event.",
      },
      {
        name: "Expiring QR validation",
        text: "Time-limited attendance codes reduce repeated or fraudulent check-ins while separating participant and volunteer attendance.",
      },
      {
        name: "Structured reporting",
        text: "Registration and attendance data remain consistent across events and can be exported as CSV for further reporting.",
      },
    ],
  },
  outcome: {
    heading: "Outcome",
    /* The 8+ hours describe the EXISTING MINDS workflow, not measured savings
       after deployment. The closing sentence keeps that distinction explicit. */
    results: [
      {
        value: "Top 10 Finalist",
        note: "Hack4Good @ NUS Developer Group",
      },
      {
        value: "8+ staff hours/week addressed",
        note: "Existing administrative workload reported by MINDS",
      },
    ],
    body: "The working prototype connected event discovery, registration, waitlisting, announcements, attendance and reporting through one role-aware workflow. A production pilot would be required to measure the actual administrative time saved.",
  },
  reflection: {
    heading: "What I took from it",
    body: "Care4You reinforced that making an experience feel simple often requires more deliberate structure behind it. Capacity limits, waitlist state, user roles, translation, attendance and reporting all needed to remain consistent while presenting a clear experience to participants and caregivers. The project taught me to think about the complete operational workflow, not only the interface through which users access it.",
  },
};
