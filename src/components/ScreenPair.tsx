import type { CSSProperties } from "react";
import type { ProjectMedia } from "../data/projects";
import styles from "../pages/Projects.module.css";

/**
 * The two-screen media composition used by the featured and selected project
 * previews. Real screenshots only — no device chrome, no cream card, no
 * border, no internal padding.
 *
 * Each item's width is derived from its OWN source ratio (width / height) so
 * the box matches the image exactly. Sizing the items by content instead would
 * let the captions dictate the track width and push the pair apart.
 */
export default function ScreenPair({
  items,
  onOpen,
  onClick,
}: {
  items: ProjectMedia[];
  onOpen: (index: number) => void;
  onClick: () => void;
}) {
  const usable = items.filter((m) => m.src);
  if (usable.length === 0) return null;

  return (
    <ul className={styles.phones}>
      {usable.map((m, i) => (
        <li
          key={m.src}
          className={`${styles.phone}${m.featured ? ` ${styles.phoneLead}` : ""}`}
          style={
            m.width && m.height
              ? ({ "--shot-ratio": m.width / m.height } as CSSProperties)
              : undefined
          }
        >
          <button
            type="button"
            className={styles.phoneButton}
            onClick={() => {
              onClick();
              onOpen(i);
            }}
            aria-label={`View full screenshot: ${m.alt}`}
          >
            <img
              className={styles.phoneImg}
              src={m.src as string}
              alt={m.alt}
              width={m.width}
              height={m.height}
              loading="lazy"
              decoding="async"
            />
          </button>
          {m.caption ? <p className={styles.phoneCaption}>{m.caption}</p> : null}
        </li>
      ))}
    </ul>
  );
}
