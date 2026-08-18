import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { RoomMusicContext } from "./roomMusicContext";

/**
 * Owns all site audio, ABOVE the router so playback survives navigation.
 *
 *   Background music:  public/soft-desk-coding.mp3
 *   Interface click:   public/audio/ui-click.mp3
 *
 * Both are governed by ONE toggle — the existing speaker control. Nothing is
 * fetched and nothing plays until the visitor presses it, so the site is
 * silent on load and no autoplay policy is involved.
 */
const TRACK_SRC = "/soft-desk-coding.mp3";
const CLICK_SRC = "/audio/ui-click.mp3";

const MUSIC_VOLUME = 0.3;
/** Deliberately much quieter than the music. */
const CLICK_VOLUME = 0.11;
/** Stops rapid activation stacking into a loud overlap. */
const CLICK_THROTTLE_MS = 90;
/**
 * The source file is ~0.9s — far too long for interface feedback, and a
 * page navigation would cut it off mid-sound. Play only the initial blip.
 */
const CLICK_MAX_MS = 180;

const STORAGE_KEY = "yj:sound-enabled";

export default function RoomMusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const clickRef = useRef<HTMLAudioElement | null>(null);
  const lastClickRef = useRef(0);
  const [playing, setPlaying] = useState(false);
  /* Mirrors `playing` so playClick always sees the current state, even when a
     handler was created before the visitor muted. */
  const playingRef = useRef(false);

  /** Created on first press only — never before a user gesture. */
  const ensureClick = useCallback(() => {
    if (clickRef.current) return clickRef.current;
    try {
      const el = new Audio(CLICK_SRC);
      el.volume = CLICK_VOLUME;
      el.preload = "auto";
      clickRef.current = el;
      return el;
    } catch {
      // A missing or unsupported file must never break a button.
      return null;
    }
  }, []);

  const playClick = useCallback(() => {
    // Silent unless the visitor has enabled sound.
    if (!playingRef.current) return;

    const now = Date.now();
    if (now - lastClickRef.current < CLICK_THROTTLE_MS) return;
    lastClickRef.current = now;

    const el = ensureClick();
    if (!el) return;
    try {
      // Restart cleanly so separate clicks are distinct rather than overlapping.
      el.currentTime = 0;
      void el.play().catch(() => {});
      // Stop after the blip so the feedback is short and survives navigation.
      window.setTimeout(() => {
        try {
          el.pause();
          el.currentTime = 0;
        } catch {
          /* ignore */
        }
      }, CLICK_MAX_MS);
    } catch {
      /* never let audio failure surface to the UI */
    }
  }, [ensureClick]);

  const toggle = useCallback(() => {
    if (!audioRef.current) {
      const el = new Audio(TRACK_SRC);
      el.loop = true;
      el.volume = MUSIC_VOLUME;
      el.preload = "none";
      el.addEventListener("play", () => setPlaying(true));
      el.addEventListener("pause", () => setPlaying(false));
      audioRef.current = el;
    }

    const el = audioRef.current;
    if (el.paused) {
      // Enabling sound: the press itself should be audible, so warm the click
      // element up now and let the state change fire it.
      ensureClick();
      void el.play().catch(() => setPlaying(false));
    } else {
      el.pause();
    }
  }, [ensureClick]);

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  /** Remember the preference; never auto-start audio from it. */
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, playing ? "1" : "0");
    } catch {
      /* storage may be unavailable — not worth surfacing */
    }
  }, [playing]);

  /** Give the enabling press its own click feedback. */
  const wasPlaying = useRef(false);
  useEffect(() => {
    if (playing && !wasPlaying.current) {
      const el = ensureClick();
      if (el) {
        try {
          el.currentTime = 0;
          void el.play().catch(() => {});
        } catch {
          /* ignore */
        }
      }
    }
    wasPlaying.current = playing;
  }, [playing, ensureClick]);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
      clickRef.current?.pause();
      clickRef.current = null;
    };
  }, []);

  const value = useMemo(
    () => ({ playing, toggle, playClick }),
    [playing, toggle, playClick],
  );

  return (
    <RoomMusicContext.Provider value={value}>
      {children}
    </RoomMusicContext.Provider>
  );
}
