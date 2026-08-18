import type { Media } from "../data/about";
import styles from "./MediaFrame.module.css";

type Props = {
  media: Media;
  /** Container aspect ratio, e.g. "16 / 10". Keeps layout stable. */
  ratio?: string;
  /** Adds a gentle zoom on hover (desktop pointers only). */
  zoom?: boolean;
  /**
   * "cover" fills the box and crops (good when the source matches the box).
   * "contain" shows the WHOLE image on a warm mat — use it where the source
   * orientation varies, e.g. a gallery mixing portrait and landscape.
   */
  fit?: "cover" | "contain";
  className?: string;
};

/**
 * Renders a real image when `media.src` is set, otherwise a labelled cream
 * placeholder tile. The container owns the aspect ratio, so swapping a
 * placeholder for a portrait or landscape photo causes no layout shift.
 */
export default function MediaFrame({
  media,
  ratio = "16 / 10",
  zoom = false,
  fit = "cover",
  className,
}: Props) {
  const cls = [
    styles.frame,
    fit === "contain" ? styles.contain : "",
    zoom ? styles.zoom : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cls} style={{ aspectRatio: ratio }}>
      {media.src ? (
        <img
          className={styles.img}
          src={media.src}
          alt={media.alt}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className={styles.placeholder} role="img" aria-label={media.placeholderLabel}>
          <span className={styles.placeholderLabel}>{media.placeholderLabel}</span>
        </div>
      )}
    </div>
  );
}
