import { useEffect } from "react";
import { Link } from "react-router-dom";
import EditorialPhoto from "../components/EditorialPhoto";
import RoomMusic from "../components/RoomMusic";
import { useClickSound } from "../components/roomMusicContext";
import {
  type Media,
  caseStudies,
  contributions,
  cta,
  environment,
  hero,
  links,
  moments,
  process,
  reflection,
} from "../data/experience";
import styles from "./Internship.module.css";

/** Small tag pill, reused across the page. */
function Tags({ items }: { items: string[] }) {
  return (
    <ul className={styles.tags}>
      {items.map((t) => (
        <li key={t} className={styles.tag}>
          {t}
        </li>
      ))}
    </ul>
  );
}

/**
 * Figure with optional caption/credit. Renders nothing at all when no image
 * has been supplied, so the page never shows an empty placeholder box.
 * Crop position comes from `objectPosition` in src/data/experience.ts.
 */
function Figure({ media, className }: { media: Media; className?: string }) {
  if (!media.src) return null;
  return (
    <figure className={`${styles.figure}${className ? ` ${className}` : ""}`}>
      <EditorialPhoto media={media} mode="cover" ratio={media.ratio ?? "4 / 3"} />
      {media.caption || media.credit ? (
        <figcaption className={styles.caption}>
          {media.caption}
          {media.credit ? (
            <span className={styles.credit}> — {media.credit}</span>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );
}

export default function Internship() {
  const click = useClickSound();
  useEffect(() => {
    document.title = "Experience — Chong Yi Jie";
    return () => {
      document.title = "Chong Yi Jie — Portfolio";
    };
  }, []);

  const hasMoments = moments.images.length > 0;

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        {/* --------------------------------------------------- top bar --- */}
        <header className={styles.topbar}>
          <Link to={links.home} className={styles.back} onClick={click}>
            <span aria-hidden="true">←</span> Back to the room
          </Link>
          <RoomMusic />
        </header>

        {/* ------------------------------------------------------ hero --- */}
        <section className={styles.hero} aria-labelledby="exp-heading">
          <div className={styles.heroText}>
            <p className={styles.eyebrow}>{hero.eyebrow}</p>
            <h1 id="exp-heading" className={styles.h1}>
              {hero.title}
            </h1>
            <p className={styles.org}>{hero.organisation}</p>
            <p className={styles.meta}>{hero.meta}</p>
            <p className={styles.lead}>{hero.intro}</p>

            <Tags items={hero.tags} />

            <div className={styles.actions}>
              <Link
                to={links.projects}
                className={`${styles.btn} ${styles.btnPrimary}`}
                onClick={click}
              >
                View projects
              </Link>
            </div>
          </div>

          <Figure media={hero.photo} className={styles.heroPhoto} />
        </section>

        {/* ----------------------------------------------- case studies --- */}
        <section className={styles.section} aria-labelledby="work-heading">
          <h2 id="work-heading" className={styles.h2}>
            Selected contributions
          </h2>
          <p className={styles.sectionIntro}>
            Work that strengthened my understanding of building, shipping and
            supporting production systems.
          </p>

          <div className={styles.caseList}>
            {caseStudies.map((c) => (
              <article key={c.title} className={styles.case}>
                <div className={styles.caseBody}>
                  <div className={styles.caseHead}>
                    <h3 className={styles.h3}>{c.title}</h3>
                    {c.status ? (
                      <span className={styles.status}>
                        {/* Icon + text so status is never colour-only. */}
                        <svg
                          viewBox="0 0 16 16"
                          className={styles.statusIcon}
                          aria-hidden="true"
                        >
                          <path
                            d="M3.5 8.5l3 3 6-6.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {c.status}
                      </span>
                    ) : null}
                  </div>

                  <dl className={styles.caseFacts}>
                    <dt className={styles.factLabel}>Challenge</dt>
                    <dd className={styles.factText}>{c.challenge}</dd>
                    <dt className={styles.factLabel}>What I did</dt>
                    <dd className={styles.factText}>{c.contribution}</dd>
                    <dt className={styles.factLabel}>Outcome</dt>
                    <dd className={styles.factText}>{c.outcome}</dd>
                  </dl>

                  {c.technical ? (
                    <details className={styles.details}>
                      <summary className={styles.summary}>
                        {c.technical.summary}
                      </summary>
                      <div className={styles.detailsBody}>
                        <div className={styles.compare}>
                          <span className={styles.compareLabel}>Before</span>
                          <p className={styles.compareText}>
                            {c.technical.before}
                          </p>
                        </div>
                        <div className={styles.compare}>
                          <span className={styles.compareLabel}>After</span>
                          <p className={styles.compareText}>
                            {c.technical.after}
                          </p>
                        </div>
                      </div>
                    </details>
                  ) : null}

                  <Tags items={c.tags} />
                </div>

                {c.photo ? (
                  <Figure media={c.photo} className={styles.casePhoto} />
                ) : null}
              </article>
            ))}
          </div>
        </section>

        {/* ---------------------------------------- other contributions --- */}
        <section className={styles.section} aria-labelledby="more-heading">
          <h2 id="more-heading" className={styles.h2}>
            Additional contributions
          </h2>
          <ul className={styles.contribGrid}>
            {contributions.map((c) => (
              <li key={c.title} className={styles.contribCard}>
                <h3 className={styles.h4}>{c.title}</h3>
                <p className={styles.bodySm}>{c.description}</p>
                <Tags items={c.tags} />
              </li>
            ))}
          </ul>
        </section>

        {/* --------------------------------------------------- process --- */}
        <section className={styles.section} aria-labelledby="process-heading">
          <h2 id="process-heading" className={styles.h2}>
            {process.heading}
          </h2>
          <ol className={styles.process}>
            {process.stages.map((s, i) => (
              <li key={s.name} className={styles.stage}>
                <span className={styles.stageNum} aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className={styles.stageName}>{s.name}</h3>
                <p className={styles.stageText}>{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ----------------------------------------------- environment --- */}
        <section className={styles.section} aria-labelledby="env-heading">
          <h2 id="env-heading" className={styles.h2}>
            {environment.heading}
          </h2>
          <dl className={styles.envGrid}>
            {environment.groups.map((g) => (
              <div key={g.label} className={styles.envGroup}>
                <dt className={styles.envLabel}>{g.label}</dt>
                <dd className={styles.envItems}>
                  <Tags items={g.items} />
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* --------------------------------------------------- moments --- */}
        {hasMoments ? (
          <section className={styles.section} aria-labelledby="moments-heading">
            <h2 id="moments-heading" className={styles.h2}>
              {moments.heading}
            </h2>
            <div
              className={styles.moments}
              data-count={Math.min(moments.images.length, 3)}
            >
              {moments.images.map((m) => (
                <Figure key={m.placeholderLabel} media={m} />
              ))}
            </div>
          </section>
        ) : null}

        {/* ------------------------------------------------ reflection --- */}
        <section className={styles.section} aria-labelledby="reflect-heading">
          <h2 id="reflect-heading" className={styles.h2}>
            {reflection.heading}
          </h2>
          <p className={styles.reflectBody}>{reflection.body}</p>
          <ul className={styles.takeaways}>
            {reflection.takeaways.map((t) => (
              <li key={t.title} className={styles.takeaway}>
                <h3 className={styles.h4}>{t.title}</h3>
                <p className={styles.bodySm}>{t.text}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------- cta --- */}
        <section className={styles.cta} aria-labelledby="cta-heading">
          <h2 id="cta-heading" className={styles.h2}>
            {cta.heading}
          </h2>
          <p className={styles.sectionIntro}>{cta.text}</p>
          <div className={styles.actions}>
            <Link
              to={links.projects}
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={click}
            >
              View my projects
            </Link>
            <Link to={links.home} className={`${styles.btn} ${styles.btnQuiet}`} onClick={click}>
              Back to room
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
