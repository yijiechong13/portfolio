import { useCallback, useEffect, useRef, useState } from "react";
import type { Media } from "../data/about";
import EditorialPhoto from "./EditorialPhoto";
import { useClickSound } from "./roomMusicContext";
import styles from "./GalleryRail.module.css";

type Props = {
  items: Media[];
  onOpen: (index: number) => void;
};

function Chevron({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg viewBox="0 0 20 20" className={styles.icon} aria-hidden="true">
      <path
        d={dir === "prev" ? "M12.5 4.5L7 10l5.5 5.5" : "M7.5 4.5L13 10l-5.5 5.5"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Borderless horizontal photo rail. Every photograph keeps its own aspect
 * ratio at a shared height, so portrait images read narrow and landscape wide.
 * Never autoplays or loops.
 */
export default function GalleryRail({ items, onOpen }: Props) {
  const click = useClickSound();
  const railRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

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
  }, [sync]);

  const scrollBy = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const target = el.scrollLeft + dir * el.clientWidth * 0.8;
    // Smoothness is requested per-call rather than via CSS `scroll-behavior`,
    // which suppressed scrolling entirely on this scroll-snap container.
    // Falls back to a direct jump if smooth scrolling is unavailable.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    try {
      el.scrollTo({ left: target, behavior: reduce ? "auto" : "smooth" });
    } catch {
      el.scrollLeft = target;
    }
    // Guarantee movement even if the smooth request is ignored.
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
          aria-label="Scroll photographs left"
        >
          <Chevron dir="prev" />
        </button>
        <button
          type="button"
          className={styles.control}
          onClick={() => {
            click();
            scrollBy(1);
          }}
          disabled={atEnd}
          aria-label="Scroll photographs right"
        >
          <Chevron dir="next" />
        </button>
      </div>

      <ul ref={railRef} className={styles.rail}>
        {items.map((item, i) => (
          <li key={item.src ?? item.placeholderLabel} className={styles.slide}>
            <EditorialPhoto
              media={item}
              mode="natural"
              onOpen={() => {
                click();
                onOpen(i);
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
