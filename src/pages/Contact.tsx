import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import RoomMusic from "../components/RoomMusic";
import { useClickSound } from "../components/roomMusicContext";
import styles from "./Contact.module.css";

/* Only these three channels are published. No phone number, no Telegram
   handle, no résumé download — the PDF is not served publicly at all. */
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

          <ul className={styles.channels}>
            <li>
              <a
                href={`mailto:${EMAIL}`}
                className={`${styles.btn} ${styles.btnPrimary}`}
                onClick={click}
              >
                Send me an email
              </a>
            </li>
            <li>
              <a
                href={LINKEDIN}
                className={`${styles.btn} ${styles.btnGhost}`}
                onClick={click}
                target="_blank"
                rel="noopener noreferrer"
              >
                Connect on LinkedIn
                <ExternalIcon />
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a
                href={GITHUB}
                className={`${styles.btn} ${styles.btnGhost}`}
                onClick={click}
                target="_blank"
                rel="noopener noreferrer"
              >
                View GitHub
                <ExternalIcon />
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>

          {/* The address in plain text for anyone without a mail client wired
              up, with a copy control beside it. */}
          <p className={styles.emailRow}>
            <span className={styles.emailLabel}>Email</span>
            <span id="contact-email" className={styles.emailValue}>
              {EMAIL}
            </span>
            <button
              type="button"
              className={styles.copy}
              onClick={copyEmail}
              aria-label={`Copy email address ${EMAIL}`}
            >
              {copied ? "Copied" : "Copy"}
            </button>
            {/* Announced to screen readers without moving focus. */}
            <span role="status" aria-live="polite" className="visually-hidden">
              {copied ? "Email address copied to clipboard" : ""}
            </span>
          </p>
        </section>
      </div>
    </main>
  );
}

function ExternalIcon() {
  return (
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
  );
}
