import { Link } from "react-router-dom";
import type { ProjectLink } from "../data/projects";
import { useClickSound } from "./roomMusicContext";
import styles from "./ProjectLinks.module.css";

/** Renders ONLY links that are enabled and have a URL — never a dead button. */
export default function ProjectLinks({
  links,
  size = "default",
}: {
  links: ProjectLink[];
  size?: "default" | "small";
}) {
  const click = useClickSound();
  const usable = links.filter((l) => l.enabled && l.url.trim() !== "");
  if (usable.length === 0) return null;

  return (
    <div className={`${styles.row}${size === "small" ? ` ${styles.small}` : ""}`}>
      {usable.map((l, i) => {
        const internal = l.url.startsWith("/");
        const cls = `${styles.btn} ${i === 0 ? styles.primary : styles.ghost}`;

        if (internal) {
          return (
            <Link key={l.type + l.url} to={l.url} className={cls} onClick={click}>
              {l.label}
            </Link>
          );
        }

        return (
          <a
            key={l.type + l.url}
            href={l.url}
            className={cls}
            onClick={click}
            target="_blank"
            rel="noopener noreferrer"
          >
            {l.label}
            <svg viewBox="0 0 16 16" className={styles.icon} aria-hidden="true">
              <path
                d="M6 3.5h6.5V10M12.5 3.5L4 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="visually-hidden"> (opens in a new tab)</span>
          </a>
        );
      })}
    </div>
  );
}
