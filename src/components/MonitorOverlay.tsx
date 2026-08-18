import { Link } from "react-router-dom";
import ProfilePortrait from "./ProfilePortrait";
import RoomMusic from "./RoomMusic";
import { useClickSound } from "./roomMusicContext";
import styles from "./MonitorOverlay.module.css";

type NavItem = {
  label: string;
  short: string;
  hint: string;
  to: string;
  aria: string;
};

const NAV: NavItem[] = [
  {
    label: "Projects",
    short: "Projects",
    hint: "Things I've built",
    to: "/projects",
    aria: "Projects — things I've built",
  },
  {
    // Routes to the existing internship content; only the label changed.
    label: "Experience",
    short: "Experience",
    hint: "What I learned at iFAST",
    to: "/internship",
    aria: "Experience — what I learned at iFAST",
  },
  {
    label: "About",
    short: "About",
    hint: "Hobbies and campus life",
    to: "/about",
    aria: "About — hobbies and campus life",
  },
  {
    label: "Contact",
    short: "Contact",
    hint: "Let's connect",
    to: "/contact",
    aria: "Contact — let's connect",
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" className={styles.arrow} aria-hidden="true">
      <path
        d="M3.5 8h9m0 0L9 4.5M12.5 8L9 11.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function MonitorOverlay() {
  const click = useClickSound();

  return (
    <div className={styles.monitor}>
      <div className={styles.screen}>
        {/* ---------------------------------------------- top bar ------- */}
        <header className={styles.topbar}>
          <Link
            to="/"
            className={styles.wordmark}
            onClick={click}
            aria-label="Yi Jie — back to the top"
          >
            Yi Jie
          </Link>

          <div className={styles.topbarEnd}>
            <nav className={styles.topnav} aria-label="Sections">
              <ul>
                {NAV.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className={styles.topnavLink} onClick={click}>
                      {item.short}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <RoomMusic />
          </div>
        </header>

        {/* ---------------------------------------------- main ---------- */}
        <div className={styles.body}>
          <div className={styles.heroContent}>
            <section className={styles.hero}>
            <h2 className={styles.headline}>
              Hi, I&rsquo;m <span className={styles.headlineName}>Yi Jie</span>
            </h2>

            <p className={styles.subtitle}>
              Penultimate-year Computer Science student at NUS
            </p>

            <p className={styles.blurb}>
              I enjoy turning ideas and requirements into working
              products&mdash;from shaping the user experience to building the
              systems behind it. After shipping production features across the
              full stack, I&rsquo;m now exploring how AI can make digital
              experiences safer and more useful.
            </p>

            <div className={styles.actions}>
              <Link
                to="/projects"
                className={`${styles.btn} ${styles.btnPrimary}`}
                onClick={click}
              >
                View Projects
                <ArrowIcon />
              </Link>
            </div>
          </section>

            <div className={styles.portrait}>
              <ProfilePortrait />
            </div>
          </div>
        </div>

        {/* Compact section links — mobile only; desktop uses the top nav. */}
        <nav className={styles.quickNav} aria-label="Portfolio sections">
          <ul>
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={styles.quickLink}
                  onClick={click}
                  aria-label={item.aria}
                >
                  <span className={styles.quickLabel}>{item.label}</span>
                  <span className={styles.quickHint}>{item.hint}</span>
                  <ArrowIcon />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

      </div>
    </div>
  );
}
