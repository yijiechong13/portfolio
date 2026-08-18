import type { Media } from "../data/about";
import styles from "./EditorialPhoto.module.css";

type Props = {
  media: Media;
  /**
   * "natural" — keeps the original ratio, never cropped. Used by the gallery,
   *             where a shared height lets each width follow its own ratio.
   * "cover"   — a controlled editorial crop at a fixed ratio.
   */
  mode?: "natural" | "cover";
  /** Ratio for `cover` mode, e.g. "3 / 2". Ignored by `natural`. */
  ratio?: string;
  /** Opens the full uncropped image. Renders a <button> when supplied. */
  onOpen?: () => void;
  /** Draws a restrained play triangle (video thumbnails). */
  play?: boolean;
  className?: string;
};

/**
 * The About page's single image treatment: the photograph sits directly on the
 * page — no mat, no frame, no padding, no shadow. Scoped to About so project
 * screenshots, logos and other pages keep their own treatment.
 *
 * Crop position comes from `media.objectPosition` in src/data/about.ts.
 */
export default function EditorialPhoto({
  media,
  mode = "cover",
  ratio = "3 / 2",
  onOpen,
  play = false,
  className,
}: Props) {
  // Nothing to show and nothing to fall back to — render no empty box.
  if (!media.src) return null;

  const img = (
    <img
      className={mode === "natural" ? styles.natural : styles.cover}
      src={media.src}
      alt={media.alt}
      loading="lazy"
      decoding="async"
      style={
        mode === "cover"
          ? {
              aspectRatio: ratio,
              objectPosition: media.objectPosition ?? "center",
            }
          : undefined
      }
    />
  );

  const body = (
    <>
      {img}
      {play ? (
        <span className={styles.play} aria-hidden="true">
          <svg viewBox="0 0 24 24" className={styles.playIcon}>
            <path d="M9 7.5v9l7.5-4.5z" fill="currentColor" />
          </svg>
        </span>
      ) : null}
    </>
  );

  const cls = [styles.media, className].filter(Boolean).join(" ");

  if (onOpen) {
    return (
      <button
        type="button"
        className={`${cls} ${styles.button}`}
        onClick={onOpen}
        aria-label={`View full photograph: ${media.alt}`}
      >
        {body}
      </button>
    );
  }

  return <span className={cls}>{body}</span>;
}
