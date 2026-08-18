import { useCallback, useEffect, useRef } from "react";
import { useClickSound } from "./roomMusicContext";
import styles from "./Lightbox.module.css";

/** Minimal shape the viewer needs — satisfied by both About and Projects media. */
export type LightboxItem = {
  src: string | null;
  alt: string;
  caption?: string;
  /** Qualifier shown with the caption (e.g. "Synthetic conversation"). */
  credit?: string;
  placeholderLabel?: string;
};

type Props = {
  items: LightboxItem[];
  index: number;
  onClose: () => void;
  onIndexChange: (next: number) => void;
};

/**
 * Full-screen image viewer. Shows the COMPLETE uncropped photograph on a dark
 * neutral backdrop — no frame, no mat. The dark backdrop exists only while
 * open; it never appears in the page layout.
 */
export default function Lightbox({ items, index, onClose, onIndexChange }: Props) {
  const click = useClickSound();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const count = items.length;
  const item = items[index];

  const go = useCallback(
    (next: number) => onIndexChange(((next % count) + count) % count),
    [count, onIndexChange],
  );

  // Escape to close, arrows to navigate, Tab trapped inside the dialog.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(index + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(index - 1);
      } else if (e.key === "Tab") {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          "button:not([disabled])",
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [go, index, onClose]);

  // Lock background scroll while open, move focus into the dialog, and return
  // focus to the thumbnail that opened it so keyboard users are not dumped at
  // the top of the document on close.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      if (opener && document.contains(opener)) opener.focus();
    };
  }, []);

  return (
    <div
      className={styles.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-label={item.alt || item.placeholderLabel || "Photograph"}
      >
        <button
          ref={closeRef}
          type="button"
          className={styles.close}
          onClick={() => {
            click();
            onClose();
          }}
          aria-label="Close image viewer"
        >
          <svg viewBox="0 0 20 20" className={styles.icon} aria-hidden="true">
            <path
              d="M5 5l10 10M15 5L5 15"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {count > 1 ? (
          <button
            type="button"
            className={`${styles.nav} ${styles.prev}`}
            onClick={() => {
              click();
              go(index - 1);
            }}
            aria-label="Previous photograph"
          >
            <svg viewBox="0 0 20 20" className={styles.icon} aria-hidden="true">
              <path
                d="M12.5 4.5L7 10l5.5 5.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ) : null}

        <figure className={styles.figure}>
          {item.src ? (
            <img className={styles.image} src={item.src} alt={item.alt} />
          ) : null}
          {item.caption || item.credit || count > 1 ? (
            <figcaption className={styles.caption}>
              {item.caption}
              {count > 1 ? (
                <span className={styles.counter}>
                  {" "}
                  {index + 1} / {count}
                </span>
              ) : null}
              {/* Travels with the image so the qualification is never lost
                  when the screenshot is viewed on its own. */}
              {item.credit ? (
                <span className={styles.credit}>{item.credit}</span>
              ) : null}
            </figcaption>
          ) : null}
        </figure>

        {count > 1 ? (
          <button
            type="button"
            className={`${styles.nav} ${styles.next}`}
            onClick={() => {
              click();
              go(index + 1);
            }}
            aria-label="Next photograph"
          >
            <svg viewBox="0 0 20 20" className={styles.icon} aria-hidden="true">
              <path
                d="M7.5 4.5L13 10l-5.5 5.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ) : null}
      </div>
    </div>
  );
}
