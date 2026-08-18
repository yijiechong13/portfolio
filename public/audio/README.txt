Interface sound.

  ui-click.mp3   short click played on meaningful activations

BEHAVIOUR (src/components/RoomMusicProvider.tsx)
  - The site is SILENT on load. Nothing is fetched until the visitor presses
    the speaker control, so no autoplay policy is involved.
  - ONE control governs both background music and interface clicks.
  - Volume: music 0.30, click 0.11 (the click is deliberately quieter).
  - Throttle: 90ms, so rapid activation cannot stack into a loud overlap.
  - Preference is stored under `yj:sound-enabled`, but sound is NEVER
    auto-started from it — the visitor must press the control each session.
  - A missing or unplayable file can never break a button: every audio call
    is wrapped and failures are swallowed.

WHERE IT PLAYS
  landing nav + wordmark + hero CTAs, quick nav, subpage back links,
  project/case-study links, gallery + screenshot arrows, image open,
  lightbox close/prev/next, primary CTAs, the speaker control itself.

WHERE IT DOES NOT
  hover, scroll, focus movement, technology tags, decorative elements,
  plain body links, disabled controls.

To swap the sound, replace this file and keep the same name.
