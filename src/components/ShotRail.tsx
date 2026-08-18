import { useCallback, useEffect, useRef, useState } from "react";
import type { ProjectMedia } from "../data/projects";
import { useClickSound } from "./roomMusicContext";
import styles from "./ShotRail.module.css";

/**
 * Horizontal screenshot rail for product walkthroughs. Renders nothing when no
 * media has been supplied, so an unconfigured project shows no empty slots.
 * Never autoplays.
 */
export default function ShotRail({
  items,
  onOpen,
}: {
  items: ProjectMedia[];
  onOpen: (index: number) => void;
}) {
  const click = useClickSound();
  const railRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // Only media with a real source is shown.
  const usable = items.filter((m) => m.src);

  const sync = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    sync();
    const el = railRef.current;
    if (!el) return;
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync, usable.length]);

  if (usable.length === 0) return null;

  const scrollBy = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const target = el.scrollLeft + dir * el.clientWidth * 0.8;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    try {
      el.scrollTo({ left: target, behavior: reduce ? "auto" : "smooth" });
    } catch {
      el.scrollLeft = target;
    }
    requestAnimationFrame(() => {
      if (Math.abs(el.scrollLeft - target) > el.clientWidth * 0.7) {
        el.scrollLeft = target;
      }
    });
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.control}
          onClick={() => {
            click();
            scrollBy(-1);
          }}
          disabled={atStart}
          aria-label="Scroll screenshots left"
        >
          <svg viewBox="0 0 20 20" className={styles.icon} aria-hidden="true">
            <path d="M12.5 4.5L7 10l5.5 5.5" fill="none" stroke="currentColor"
              strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          className={styles.control}
          onClick={() => {
            click();
            scrollBy(1);
          }}
          disabled={atEnd}
          aria-label="Scroll screenshots right"
        >
          <svg viewBox="0 0 20 20" className={styles.icon} aria-hidden="true">
            <path d="M7.5 4.5L13 10l-5.5 5.5" fill="none" stroke="currentColor"
              strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <ul ref={railRef} className={styles.rail}>
        {usable.map((m, i) => (
          <li key={m.src} className={styles.slide}>
            <button
              type="button"
              className={styles.shot}
              onClick={() => {
                click();
                onOpen(i);
              }}
              aria-label={`View full screenshot: ${m.alt}`}
            >
              <img
                className={styles.img}
                src={m.src as string}
                alt={m.alt}
                loading="lazy"
                decoding="async"
              />
            </button>
            {m.caption ? (
              <p className={styles.caption}>{m.caption}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
