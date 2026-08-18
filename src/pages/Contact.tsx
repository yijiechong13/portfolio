import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import RoomMusic from "../components/RoomMusic";
import { useClickSound } from "../components/roomMusicContext";
import styles from "./Contact.module.css";

/* Only these channels are published. No phone number, no Telegram handle, no
   résumé download — the PDF is not served publicly at all. */
const EMAIL = "chongyijie13@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/yijiechong13/";
const GITHUB = "https://github.com/yijiechong13";

export default function Contact() {
  const click = useClickSound();
  const [copied, setCopied] = useState(false);
  const resetRef = useRef<number | undefined>(undefined);

  /* Clipboard API needs a secure context; fall back to selecting the text so
     the address is still obtainable either way. */
  const copyEmail = async () => {
    click();
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      const node = document.getElementById("contact-email");
      if (node) {
        const range = document.createRange();
        range.selectNodeContents(node);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
      return;
    }
    setCopied(true);
    window.clearTimeout(resetRef.current);
    resetRef.current = window.setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => () => window.clearTimeout(resetRef.current), []);

  useEffect(() => {
    document.title = "Contact — Chong Yi Jie";
    return () => {
      document.title = "Chong Yi Jie — Portfolio";
    };
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.topbar}>
          <Link to="/" className={styles.back} onClick={click}>
            <span aria-hidden="true">←</span> Back to the room
          </Link>
          <RoomMusic />
        </header>

        <section className={styles.hero} aria-labelledby="contact-heading">
          <h1 id="contact-heading" className={styles.h1}>
            Let&rsquo;s connect
          </h1>
          <p className={styles.lead}>
            I&rsquo;m open to internship opportunities where I can contribute
            across software engineering, product development and applied AI.
            I&rsquo;m also always happy to connect with people building useful
            technology, exchange ideas and learn from different experiences in
            the industry.
          </p>

          {/* One centred panel of stacked rows. The two link rows are anchors
              so the whole row is clickable and keyboard-reachable; Location is
              a plain div because it is not actionable. */}
          <ul className={styles.panel}>
            <li className={styles.row}>
              <a
                href={`mailto:${EMAIL}`}
                className={styles.rowLink}
                onClick={click}
                aria-label={`Send an email to ${EMAIL}`}
              >
                <span className={styles.iconCircle} aria-hidden="true">
                  <MailIcon />
                </span>
                <span className={styles.rowText}>
                  <span className={styles.rowLabel}>Email</span>
                  <span id="contact-email" className={styles.rowValue}>
                    {EMAIL}
                  </span>
                </span>
              </a>
              {/* Secondary control, kept inside the row but outside the link
                  so it is its own tab stop and does not trigger the mailto. */}
              <button
                type="button"
                className={styles.copy}
                onClick={copyEmail}
                aria-label={`Copy email address ${EMAIL}`}
              >
                {copied ? "Copied" : "Copy"}
              </button>
              <span role="status" aria-live="polite" className="visually-hidden">
                {copied ? "Email address copied to clipboard" : ""}
              </span>
            </li>

            <li className={styles.row}>
              <a
                href={LINKEDIN}
                className={styles.rowLink}
                onClick={click}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Yi Jie Chong on LinkedIn"
              >
                <span className={styles.iconCircle} aria-hidden="true">
                  <LinkedInIcon />
                </span>
                <span className={styles.rowText}>
                  <span className={styles.rowLabel}>LinkedIn</span>
                  <span className={styles.rowValue}>Yi Jie Chong</span>
                </span>
                <ExternalIcon />
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </li>

            <li className={styles.row}>
              <a
                href={GITHUB}
                className={styles.rowLink}
                onClick={click}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="yijiechong13 on GitHub"
              >
                <span className={styles.iconCircle} aria-hidden="true">
                  <GitHubIcon />
                </span>
                <span className={styles.rowText}>
                  <span className={styles.rowLabel}>GitHub</span>
                  <span className={styles.rowValue}>yijiechong13</span>
                </span>
                <ExternalIcon />
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </li>

            <li className={styles.row}>
              <div className={styles.rowStatic}>
                <span className={styles.iconCircle} aria-hidden="true">
                  <PinIcon />
                </span>
                <span className={styles.rowText}>
                  <span className={styles.rowLabel}>Location</span>
                  <span className={styles.rowValue}>Singapore</span>
                </span>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}

/* ---------------------------------------------------------------- icons ---
   Inline so there is no icon dependency. Each is decorative — the row itself
   carries the accessible name — so they are aria-hidden via the circle. */

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className={styles.glyph} focusable="false">
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M4 7.5l8 5.5 8-5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Official LinkedIn "in" mark, drawn as a path so it inherits currentColor. */
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className={styles.glyph} focusable="false">
      <path
        fill="currentColor"
        d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9.5 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.76-1.95 4.02 0 4.76 2.5 4.76 5.76V21h-4v-5.6c0-1.34-.02-3.06-1.9-3.06-1.9 0-2.19 1.45-2.19 2.96V21h-4z"
      />
    </svg>
  );
}

/** Official GitHub Octocat mark. */
function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className={styles.glyph} focusable="false">
      <path
        fill="currentColor"
        d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className={styles.glyph} focusable="false">
      <path
        d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="10"
        r="2.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 16 16" className={styles.external} aria-hidden="true">
      <path
        d="M6 3.5h6.5V10M12.5 3.5L4 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
