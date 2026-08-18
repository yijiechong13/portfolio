# Chong Yi Jie — Personal Portfolio

Personal portfolio site for **Chong Yi Jie**, a penultimate-year NUS Computer
Science student. Built with Vite + React + TypeScript and plain CSS Modules.

## The core idea

The landing page is a full-screen looping video of a cozy white desk setup.
**The monitor in that video is the navigation surface.** The portfolio UI is
positioned on top of the monitor's screen so it reads as though the site is
being displayed on the monitor inside the scene.

This is the single most important thing about this project. Preserve it.

## Design direction

Premium, clean, soft, cozy, Apple-like, recruiter-friendly.
Warm white / cream / soft beige. Minimal but personal.

**Do not:**
- Turn this into a generic dark developer portfolio.
- Use neon colours, harsh black UI, or heavy glassmorphism.
- Make it childish, or over-animate it.
- Put big text outside the monitor on desktop.
- Add floating cards that don't align with the monitor.
- Add heavy animation libraries. Plain CSS transitions are enough.

Prioritise **recruiter readability** over cleverness. Someone should land on
the page and immediately know who she is, what she studies, and what to click.

## Architecture

```
public/cozy_portfolio_tulip_loop_cool_8s.mp4    the background video (16:9, 1920x1080)
src/
  components/
    VideoStage.tsx           computes the painted video rect (object-fit: cover)
    MonitorOverlay.tsx       the UI that sits on the monitor screen
    ProfilePortrait.tsx      the photo feature + skill tags
    PlaceholderPage.tsx      shared shell for not-yet-built pages
  pages/                     Landing, Projects, Internship, Hobbies, Contact, NotFound
  styles/theme.css           design tokens + monitor calibration variables
```

### VideoStage

`object-fit: cover` crops the video differently at every viewport size, so the
monitor is *not* at a fixed position on screen. `VideoStage` measures the
container, computes the rectangle the video actually paints, and exposes it as
`--stage-left/top/width/height`. Overlays position against **that rect**, not
the viewport — which is why the UI stays glued to the monitor as the window
resizes.

Do not replace this with viewport-percentage positioning. It will drift.

### The monitor dashboard

`MonitorOverlay` is a **portfolio home screen**, structured like a confident
hero layout (top nav / strong left hero / right-side cards):

- top bar: "YJ" mark + subtle text nav
- left: eyebrow, headline, subtitle, blurb, primary + ghost buttons
- right: `ProfilePortrait` — one large vertical photo card

That is deliberately all of it. Earlier versions had skill tags, a hexagon
badge, and a "now playing / current focus" status bar; they were removed to let
the portrait and the intro breathe. **Do not add them back** without being
asked — the brief is explicit that this should read as a clean portfolio page,
not a dashboard.

Navigation lives in the top bar and the two CTAs on desktop. A compact
`quickNav` list appears on small screens only.

Headline uses `--font-sans`, not the display serif. Keep it that way.

#### Typography

Inter first, then SF Pro Display — both are present on this machine, so there
is **no webfont request** and no flash of fallback text. Do not add a Google
Fonts link for these; it would add a network dependency for no visual gain.

The warm text ramp lives in `theme.css`: `--ink-900` #3f342d (headline),
`--ink-700` #5d5048 (subtitle), `--ink-500` #7b6b60 (body), `--ink-400`
#6f6259 (nav). Headline is weight 700 at -0.02em; anything heavier reads
blocky against the cozy background.

"Yi Jie" takes `--peach-deeper` (#b9785e), not `--peach-deep` (#c98263) —
the lighter tone measures 2.96:1 on the cream screen, just under the 3.0
large-text contrast floor. Colour only: no italic, no second typeface.

### The portrait

One clean rounded-rectangle image card: a single 1px warm border, one soft
shadow, 4:5 ratio, filling its grid cell's height.

It has been through several iterations — hexagon badge, peach panel with a
concentric ring and a "SINGAPORE" caption — and all of them read as fussy or
sticker-like. The current plain card is the deliberate end state. **Do not add
rings, panels, captions, skill tags or widgets around the photo.**

**Stacking-context trap, hit twice in development:** `.monitor` needs
`z-index: 1` + `isolation: isolate`. Without it a descendant's z-index can push
the entire panel behind the video on small screens — the overlay vanishes
completely. Also, `.portrait` uses `container-type: size` on desktop but must
reset to `normal` in the mobile card, where an auto-height row collapses it to
zero.

### Hero composition

The hero should read as ONE page, not a left text block beside a right image
block. Two things keep it integrated:

- the paragraph and subtitle run wide (`max-width` ~640px, not a narrow
  measure) so the text breathes across the page under the headline
- the columns are ~59/35 with a modest 48-64px gap, and the photo is
  `justify-content: flex-start` in its cell so it sits toward the text rather
  than pinned to the far edge

Do not narrow the paragraph back into a small column — that was the "hard
split" problem.

### The ultrawide problem

The monitor is very wide relative to its height. Without a max-width the two
hero columns drift to the far edges and the middle reads as empty. `.body` is
therefore a flex centring wrapper (`justify-content: center`, never
`space-between`) and `.heroContent` caps at ~1080px and centres inside it. On a
1483px-wide monitor that yields a 1145px band with ~169px margins each side.

**To swap the photo: replace `public/profile.jpg`.** Nothing else to edit; a
missing file falls back to a warm gradient via `onError` (silent, no console
error).

The current photo is a tall 9:16 full-body shot, cropped at
`--portrait-focus: 38% 66%` — minimal headroom, showing the dress, bouquet and
legs rather than just head and shoulders. Raise the second number to show more
of the lower body, lower it to favour the face. Retune for a different picture.

The screen is a **wide, short rectangle (~2.5:1)**, so vertical space is the
scarce resource. Every row must earn its height.

#### Degradation ladder

The intro paragraph is the only elastic block in the hero. As the monitor gets
shorter it is clamped one line at a time (5 → 4 → 3 → 2 → hidden) so the CTA
buttons are never pushed past the bezel. Thresholds in
`MonitorOverlay.module.css` were measured against the real layout — if you
change the body font size or line-height, re-measure them, because they are
tightly coupled.

Keep `-webkit-line-clamp` and `line-clamp` in step; they have silently
disagreed here before.

#### Sizing model — read before editing

Text must never go microscopic when the window narrows. The rules:

- `--ui` is a single clamped scale factor derived from monitor width. It is
  built as `tan(atan2(<length>, 1px))` because CSS cannot divide a length into
  a unitless number directly, and `clamp()` needs a length to resolve.
- Every text size is `max(<floor>px, calc(<target>px * var(--ui)))`. The floor
  is what stops the collapse. **Never drop the floor.**
- Do NOT use raw `cqi`/`vw` font sizes here. That was the original bug.
- `.monitor` uses `container-type: size` (not `inline-size`) so the
  `@container (max-height: …)` guards actually match.

**Degradation order matters.** The screen is short, so content is shed by
priority rather than scaled down:

- shorter → eyebrow, then photo caption, then blurb + status strip
- narrower → portrait shrinks; only below 560px of monitor width is it dropped
  entirely and the hero given the full screen

The buttons and the top nav never disappear — they are the navigation. The
portrait is the point of this design, so it is the last thing to go.

Keep it spacious. Use most of the screen, but do not fill every corner.

### Monitor calibration

Four variables in `src/styles/theme.css` position the overlay, as percentages
of the video frame:

```css
--monitor-left: 28.1%;
--monitor-top: 33.3%;
--monitor-width: 45.9%;
--monitor-height: 34%;
```

These were measured by detecting the dark bezel in a frame of the current
video: the screen interior spans x 529–1432, y 354–733 of 1920x1080 (903x379).
The values above inset ~1.2% horizontally and ~1.5% vertically, because the
monitor is curved and the outer pixels bend away. Verified at 1920x1080: the
overlay lands 11px inside the bezel left/right and 6px top/bottom. If the video is re-rendered with a different composition,
re-measure and update only these four values.

### Responsive strategy

Three tiers, in order:

1. **901px and up** — full monitor hero: centred `.heroContent`, text left,
   portrait right.
2. **641-900px, landscape-ish** — compact monitor layout. Still aligned inside
   the monitor: tighter padding and gap, eyebrow hidden, blurb clamped to two
   lines. **The floating card must not appear here** — the monitor is clearly
   visible behind it and the card looks wrong.
3. **640px and below, OR narrower than 4:5** — floating card over the video.

The 4:5 aspect guard matters: a narrow-but-tall window (e.g. 700x900) crops the
16:9 video so hard that the monitor runs off both edges and content gets cut
off, even though the width alone looks fine. An earlier version used 1/1, which
fired far too eagerly and turned ordinary desktop windows into mobile cards.

## Room music

`public/soft-desk-coding.mp3`, wired through `RoomMusicProvider` +
`RoomMusic` + `roomMusicContext.ts`.

**It must never autoplay.** The `Audio` element is created lazily on the first
user press, so the 3.2 MB file is not fetched — and no autoplay policy is
involved — until someone clicks. Volume defaults to 0.3 and it loops.

The provider sits **above the router** in `App.tsx` on purpose: an earlier
version kept the audio inside the monitor overlay, so navigating to any
subpage unmounted it and killed the music with no way to restart it. The
toggle appears in the monitor header and on every placeholder page, and shares
one audio element across all of them.

The context lives in its own file (`roomMusicContext.ts`) so the provider file
only exports a component — otherwise React Fast Refresh breaks.

## The video

`public/cozy_portfolio_tulip_loop_cool_8s.mp4` — autoplay, loop, muted,
playsInline, `object-fit: cover`, `object-position: center center`. 16:9,
1920x1080, 8s.

### Colour grading

This clip is cooler and higher-contrast than the earlier `room_safe` video,
whose softer/creamier tone is the one we want. Two layers correct it, both in
`VideoStage.module.css`:

- `.video` — `filter: brightness(1.06) contrast(0.92) saturate(1.1)`
- `.tint` — a flat `rgba(255, 232, 205, 0.08)` cream wash

The values were **derived by measuring both frames**, not guessed. Saturation
goes UP because the cream wash desaturates on its own; the net lands on target.
`sepia()` was tried and rejected — it greys the tulips while warming.

Measured against the room_safe target (luminance 171.2, contrast-sd 41.6,
saturation 0.330, R-B +61.1), the live render gives 174.2 / 41.7 / 0.318 /
+59.3 — within ~3% on every axis.

**The grade must stay on the video only.** `.video`, `.tint` and `.stage` are
siblings, so the overlay UI never inherits the filter — verified `filter: none`
on the screen, headline, buttons and photo. Do not move the filter onto a
shared parent. If it is ever re-rendered, keep the same filename and
composition; if the composition changes, re-measure the four calibration
values. Never hardcode anything tied to the current motion.

## Working style

- Build **page by page**. Don't scaffold all content at once.
- Keep code clean and scoped — CSS Modules per component, no global leakage.
- Keep components small and readable.
- Every interactive element: semantic `<a>`/`<button>`, visible `:focus-visible`,
  and an `aria-label` where the visible text isn't self-explanatory.
- Respect `prefers-reduced-motion`.

## Status

Milestone 1 complete: landing experience + monitor navigation + placeholder
routes.

Milestone 2 complete: the monitor overlay is a full portfolio dashboard.

Milestone 3 complete: swapped to the 16:9 video, rebuilt the overlay as a
hero-style home screen, and fixed the text-shrinking problem with the clamped
`--ui` model.

Milestone 4 complete: added `ProfilePortrait` (photo + skill tags) on the
right, removed the 2x2 tile grid, and enlarged the hero type.

Milestone 5 complete: reworked the portrait into a rounded-hexagon badge with
a broken terracotta outline, and installed the real photo.

Milestone 6 complete: removed the skill tags and status bar, switched the
headline to a clean sans.

Milestone 7 complete: scaled the hero up to fill the screen confidently.

Milestone 8 complete: added the centred `.heroContent` max-width band to fix
ultrawide spread, swapped the hexagon back to a vertical rounded-rectangle
card, and rebuilt the breakpoints so the floating card only appears at true
mobile widths (<=640px or portrait-er than 4:5).

Milestone 10 complete: swapped in the enlarged-monitor video
(`cozy_portfolio_tulip_loop_cool_8s.mp4`) and recalibrated the four overlay
variables. The screen grew from 827x333 to 903x379 source px, so the UI now
fits with the full intro paragraph visible instead of truncating.

Milestone 9 complete: removed the peach panel, inner ring and "Singapore"
caption in favour of one clean photo card; widened the paragraph to ~617px and
softened the column split so the hero reads as a single integrated page.

Content pages are still placeholders. Build them page by page, starting with
Projects.
