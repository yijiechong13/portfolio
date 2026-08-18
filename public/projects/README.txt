Project images and media.

HOW IT WORKS
  All paths, links and captions live in:  src/data/projects.ts
  A media entry with `src: null`      → renders NOTHING (no empty box)
  A link with `enabled: false` or ""  → renders NO button (no dead link)

So you can add assets one at a time; nothing breaks in the meantime.

────────────────────────────────────────────────────────────────────────────
NUWA          public/projects/nuwa/
  nuwa-contextual-grooming-detection.png   → projects[0].cover.src
                          INSTALLED. 2576x1470. Above the fold, so NOT
                          lazy-loaded. Shows the contextual grooming alert
                          (age probing + secrecy + off-platform + photo
                          request). The conversation is SYNTHETIC — the
                          "Synthetic conversation created for demonstration."
                          note renders under the caption on both the Projects
                          page and the case study, and inside the lightbox.
                          Keep that note with the image wherever it appears.
  chat.png              → media[0]  "Normal conversation view"
  flagged.png           → media[1]  "Flagged conversation"
  alert.png             → media[2]  "Safety-alert panel"
  evidence.png          → media[3]  "Evidence / explanation view"
  feedback.png          → media[4]  "Feedback interaction"
  demo-poster.png       → cover.poster (video poster; never autoplays)

  LINKS — set `url` and flip `enabled: true` in projects[0].links:
    demo       Watch demo         (video URL)
    prototype  Open prototype     (Vercel URL — leave disabled if taken down)
    deck       View pitch deck
    repo       View repository

  `status` is currently "video-only". Change to "live" only while the
  deployment is actually up.

────────────────────────────────────────────────────────────────────────────
CARE4YOU      public/projects/care4you/            ← INSTALLED
  event-calendar.png    media[0]  1206x2622  featured: true  (primary visual)
  role-selection.png    media[1]  1206x2622

  Both were taken from the public repository at full resolution and saved
  locally — the page never hotlinks GitHub.

  FUTURE SCREENSHOTS — append to `media` in src/data/projects.ts as they
  become available. Nothing renders until `src` is set, so there are no
  empty placeholders in the meantime:
      registration.png    event registration flow
      capacity.png        capacity and waitlist state
      staff-create.png    staff event creation
      qr-attendance.png   QR attendance
      translation.png     translation interaction
      announcements.png   targeted announcements
  Each entry needs: src, alt, caption, width, height, mediaType.

  LINKS
    repo — ENABLED: https://github.com/Hack4Funnn/care4you (verified public)

  WALKTHROUGH (case study only — `previewHidden: true` keeps the compact
  Projects-page preview to the two lead screens):
    registration-chinese.png   540x1072   Chinese registration form
    waitlist.png               609x1246   Waitlist + withdraw
    staff-create-event.png     612x1258   Staff event creation
    registered-events.png      614x1237   Registered events + QR attendance

  These four were exported WITH a rounded phone-body frame, so each was
  cropped individually (frame inset differs per file) plus ~60px of iOS
  status bar. In registration-chinese.png the contact-number value was
  painted out with OPAQUE pixels baked into the file — not a CSS overlay —
  because it read as a real Singapore number. Unedited originals with the
  number intact live in ~/Desktop/care4you-originals/*-original.png.

  NOTE: the two lead screenshots were cropped 153px off the top to remove the
  iOS status bar (clock / notch / wifi / battery). 1206x2622 -> 1206x2469.
  No app content was removed; the "Hello, Guest" header is intact.
  Unedited originals: ~/Desktop/care4you-originals/ (outside this repo).
  If either is re-exported, re-crop and update width/height in projects.ts.
    deck — not configured; add a public URL and set `enabled: true` to show it.

  No APK download is offered, and the prototype is not presented as a
  deployed production service.

────────────────────────────────────────────────────────────────────────────
BOOKLIAOBOT   public/projects/bookliaobot/          ← INSTALLED
  role-selection.png        media[0]  744x1398
  announcement-channel.png  media[1]  758x1424   ** REDACTED COPY **
  onboarding.png            media[2]  766x1292

  PRIVACY — announcement-channel.png is a portfolio-safe copy. The Telegram
  invite token and both @username occurrences are painted out with opaque
  pixels baked into the PNG (not a CSS overlay, so dev tools cannot reveal
  them). The lightbox serves this same redacted file.

  The unedited originals are stored OUTSIDE this repository at:
      ~/Desktop/bookliaobot-originals/
  Do not copy them back into public/.

  LINKS
    repo  — ENABLED: https://github.com/yijiechong13/bookliaobot
            (verified public, HTTP 200, opens in a new tab).
    deck  — DISABLED. The supplied canva.link short URL redirects to an
            /edit URL, which would expose editing access. A view-only URL
            is already in the data:
              .../design/DAGpAIn-PPQ/NQehUtqz_S_aCYq0L_m-SQ/view
            Open that in a signed-out / incognito window. If it loads
            view-only without an access request, set `enabled: true`.

────────────────────────────────────────────────────────────────────────────
TUTO          public/projects/tuto/
  app.png               → cover.src  (optional; only a REAL screenshot —
                          do not create a mock terminal)
  LINKS: repo (optional GitHub)

────────────────────────────────────────────────────────────────────────────
ETL DASHBOARD public/projects/etl-dashboard/
  dashboard.png         → cover.src  (optional real screenshot)
  LINKS: repo (optional)

────────────────────────────────────────────────────────────────────────────
NOTES
  - Set `alt` on every image you add — it is required for accessibility.
  - Keep product branding as-is; screenshots are not recoloured.
  - Compress to ~1600px wide; WebP/AVIF are fine.
  - Strip EXIF from anything camera-originated.
  - Do not substitute stock or AI-generated product screenshots.
