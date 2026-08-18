import { useState } from "react";
import styles from "./ProfilePortrait.module.css";

/**
 * Hero portrait — one clean rounded-rectangle image card.
 *
 * Deliberately plain: a single soft border and one shadow. Earlier versions
 * had a peach panel, a concentric inlay ring and a caption; they read as
 * fussy. Do not add rings, captions or tags back.
 *
 * ---------------------------------------------------------------------------
 * THE PHOTO:  public/profile.jpg  — swap that file to change the picture.
 *
 * FRAMING: `--portrait-focus` in the CSS module. The photo is a tall 9:16
 * full-body shot, cropped at `38% 66%` so the dress, bouquet and legs
 * read, not just the head and shoulders.
 * ---------------------------------------------------------------------------
 */
const PHOTO_SRC = "/profile.jpg";

export default function ProfilePortrait() {
  const [hasPhoto, setHasPhoto] = useState(true);

  return (
    <figure className={styles.card}>
      {hasPhoto ? (
        <img
          className={styles.photo}
          src={PHOTO_SRC}
          alt="Chong Yi Jie"
          loading="eager"
          decoding="async"
          onError={() => setHasPhoto(false)}
        />
      ) : (
        <div className={styles.fallback} aria-hidden="true" />
      )}
    </figure>
  );
}
