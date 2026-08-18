import { useCallback, useId, useRef, useState } from "react";
import type { GalleryItem } from "../data/about";
import MediaFrame from "./MediaFrame";
import styles from "./PhotoGallery.module.css";

type Props = { items: GalleryItem[] };

function Chevron({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg viewBox="0 0 20 20" className={styles.chevron} aria-hidden="true">
      <path
        d={dir === "prev" ? "M12.5 4.5L7 10l5.5 5.5" : "M7.5 4.5L13 10l-5.5 5.5"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Compact photo gallery: one featured image, thumbnail strip, arrows and a
 * counter. Never autoplays or rotates on its own.
 */
export default function PhotoGallery({ items }: Props) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const headingId = useId();

  const count = items.length;
  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  );

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartX.current;
    if (start === null) return;
    const dx = e.changedTouches[0].clientX - start;
    // Only treat decisive horizontal movement as a swipe.
    if (Math.abs(dx) > 40) go(dx < 0 ? index + 1 : index - 1);
    touchStartX.current = null;
  };

  const active = items[index];

  return (
    <div className={styles.gallery}>
      <div
        className={styles.stage}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <MediaFrame media={active} ratio="5 / 4" fit="contain" />

        <button
          type="button"
          className={`${styles.arrow} ${styles.prev}`}
          onClick={() => go(index - 1)}
          aria-label="Previous photograph"
        >
          <Chevron dir="prev" />
        </button>
        <button
          type="button"
          className={`${styles.arrow} ${styles.next}`}
          onClick={() => go(index + 1)}
          aria-label="Next photograph"
        >
          <Chevron dir="next" />
        </button>
      </div>

      {/* Announce the change without moving focus. */}
      <p className={styles.counter} id={headingId}>
        <span aria-hidden="true">
          <span className={styles.counterNum}>{index + 1}</span> / {count}
        </span>
        <span className="visually-hidden" aria-live="polite">
          {`Photograph ${index + 1} of ${count}`}
        </span>
      </p>

      <ul className={styles.thumbs}>
        {items.map((item, i) => (
          <li key={item.placeholderLabel}>
            <button
              type="button"
              className={styles.thumb}
              onClick={() => go(i)}
              aria-label={`Show ${item.placeholderLabel}`}
              aria-current={i === index ? "true" : undefined}
              data-active={i === index ? "true" : undefined}
            >
              <MediaFrame media={item} ratio="1 / 1" fit="contain" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
