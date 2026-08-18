import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Lightbox, { type LightboxItem } from "../components/Lightbox";
import ProjectLinks from "../components/ProjectLinks";
import RoomMusic from "../components/RoomMusic";
import ScreenPair from "../components/ScreenPair";
import { useClickSound } from "../components/roomMusicContext";
import ShotRail from "../components/ShotRail";
import {
  type Metric,
  type Project,
  cta,
  hero,
  projects,
} from "../data/projects";
import styles from "./Projects.module.css";

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

/** Metric with its qualification kept visibly attached. */
function Metrics({ items, compact }: { items: Metric[]; compact?: boolean }) {
  return (
    <ul
      className={`${styles.metrics}${compact ? ` ${styles.metricsCompact}` : ""}`}
    >
      {items.map((m) => (
        <li key={m.label} className={styles.metric}>
          <span className={styles.metricValue}>{m.value}</span>
          <span className={styles.metricLabel}>{m.label}</span>
          {m.note ? <span className={styles.metricNote}>{m.note}</span> : null}
        </li>
      ))}
    </ul>
  );
}

/** Credential line — the competition or programme the project comes from.
    Replaces the old "Flagship / Featured / Selected project" tier labels:
    the real credential is what a recruiter should read first. */
function Credential({ p }: { p: Project }) {
  return <p className={styles.credential}>{p.context}</p>;
}

/** `withContext` keeps the programme name inline for the compact tier, which
    has no separate credential line above it. */
function Meta({ p, withContext }: { p: Project; withContext?: boolean }) {
  return (
    <p className={styles.meta}>
      {withContext ? (
        <>
          {p.context}
          <span className={styles.dot} aria-hidden="true"> · </span>
        </>
      ) : null}
      {p.dates}
      <span className={styles.dot} aria-hidden="true"> · </span>
      <span className={styles.team}>{p.teamLabel}</span>
      {p.role ? (
        <>
          <span className={styles.dot} aria-hidden="true"> · </span>
          <span className={styles.role}>{p.role}</span>
        </>
      ) : null}
    </p>
  );
}

export default function Projects() {
  const click = useClickSound();
  const [viewer, setViewer] = useState<{
    items: LightboxItem[];
    index: number;
  } | null>(null);

  useEffect(() => {
    document.title = "Projects — Chong Yi Jie";
    return () => {
      document.title = "Chong Yi Jie — Portfolio";
    };
  }, []);

  const flagship = projects.find((p) => p.featuredLevel === "flagship");
  const featured = projects.find((p) => p.featuredLevel === "featured");
  const selected = projects.find((p) => p.featuredLevel === "selected");
  const compact = projects.filter((p) => p.featuredLevel === "compact");

  /* What the compact preview shows: real screenshots, minus any marked
     preview-only-hidden. The lightbox is opened from THIS same list so an
     index can never point at a different image than the one clicked. */
  const previewMedia = (p: Project) =>
    (p.media ?? []).filter((m) => m.src && !m.previewHidden);

  const openShots = (p: Project, index: number) => {
    const usable = previewMedia(p);
    if (usable.length) setViewer({ items: usable, index });
  };

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.topbar}>
          <Link to="/" className={styles.back} onClick={click}>
            <span aria-hidden="true">←</span> Back to the room
          </Link>
          <RoomMusic />
        </header>

        {/* ------------------------------------------------------ hero --- */}
        <section className={styles.hero} aria-labelledby="projects-heading">
          <p className={styles.eyebrow}>{hero.eyebrow}</p>
          <h1 id="projects-heading" className={styles.h1}>
            {hero.heading}
          </h1>
          <p className={styles.lead}>{hero.intro}</p>
          <ul className={styles.themes}>
            {hero.themes.map((t) => (
              <li key={t} className={styles.theme}>
                {t}
              </li>
            ))}
          </ul>
        </section>

        <hr className={styles.divider} />

        {/* -------------------------------------------------- flagship --- */}
        {flagship ? (
          /* Same left-content / right-media split as the other previews, with
             a wider media column and a larger screenshot so the flagship
             still reads as the most prominent project on the page. */
          <section
            className={`${styles.featured} ${styles.flagshipTier}`}
            aria-labelledby="nuwa-heading"
          >
            <div className={styles.featuredText}>
              <Credential p={flagship} />
              <h2 id="nuwa-heading" className={styles.h2}>
                {flagship.title}
              </h2>
              {flagship.subtitle ? (
                <p className={styles.subtitle}>{flagship.subtitle}</p>
              ) : null}
              <Meta p={flagship} />
              <p className={styles.summary}>{flagship.summary}</p>

              {flagship.verifiedMetrics ? (
                <Metrics items={flagship.verifiedMetrics} compact />
              ) : null}

              {/* Walkthrough slots are still unconfigured, so this renders
                  nothing today; it stays wired for when they are added. */}
              <ShotRail
                items={flagship.media ?? []}
                onOpen={(i) => openShots(flagship, i)}
              />

              <Tags items={flagship.technologies} />
              <ProjectLinks links={flagship.links} />
            </div>

            {/* Primary media is NOT lazy-loaded — it is above the fold.
                The cover is not part of `media`, so it opens as its own
                single-item viewer rather than the first walkthrough shot. */}
            {flagship.cover.src ? (
              <figure className={styles.coverFigure}>
                <button
                  type="button"
                  className={styles.coverButton}
                  onClick={() => {
                    click();
                    setViewer({ items: [flagship.cover], index: 0 });
                  }}
                  aria-label={`View full image: ${flagship.cover.alt}`}
                >
                  <img
                    className={styles.cover}
                    src={flagship.cover.src}
                    alt={flagship.cover.alt}
                    /* Intrinsic size reserves the box before load. */
                    width={flagship.cover.width}
                    height={flagship.cover.height}
                    decoding="async"
                  />
                </button>
                {flagship.cover.caption ? (
                  <figcaption className={styles.coverCaption}>
                    {flagship.cover.caption}
                    {flagship.cover.credit ? (
                      <span className={styles.coverNote}>
                        {flagship.cover.credit}
                      </span>
                    ) : null}
                  </figcaption>
                ) : null}
              </figure>
            ) : null}
          </section>
        ) : null}

        <hr className={styles.divider} />

        {/* -------------------------------------------------- featured --- */}
        {featured ? (
          <section className={styles.featured} aria-labelledby="care4you-heading">
            {/* Text first in the DOM so the reading order stays logical; CSS
                places the screenshots alongside on wide screens. */}
            <div className={styles.featuredText}>
              <Credential p={featured} />
              <h2 id="care4you-heading" className={styles.h2}>
                {featured.title}
              </h2>
              <Meta p={featured} />
              {/* Preview shows the summary only. The supporting paragraph and
                  the full grouped feature areas live on the case study. */}
              <p className={styles.summary}>{featured.summary}</p>

              {featured.verifiedMetrics ? (
                <Metrics items={featured.verifiedMetrics} />
              ) : null}

              {featured.previewHighlights ? (
                <ul className={styles.previewFeatures}>
                  {featured.previewHighlights.map((h) => (
                    <li key={h} className={styles.previewFeature}>
                      {h}
                    </li>
                  ))}
                </ul>
              ) : null}

              {/* Six core technologies; the case study lists all of them. */}
              <Tags
                items={featured.previewTechnologies ?? featured.technologies}
              />
              <ProjectLinks links={featured.links} />
            </div>

            {/* Two real screens, no fake phone frame. */}
            <ScreenPair
              items={previewMedia(featured)}
              onOpen={(i) => openShots(featured, i)}
              onClick={click}
            />
          </section>
        ) : null}

        <hr className={styles.divider} />

        {/* -------------------------------------------------- selected --- */}
        {selected ? (
          /* Same split layout as the featured project — one shared set of
             styles and one shared media component. The tier is expressed by
             the rank label and heading size, not by a different layout. */
          <section
            className={`${styles.featured} ${styles.selectedTier}`}
            aria-labelledby="blb-heading"
          >
            <div className={styles.featuredText}>
              <Credential p={selected} />
              <h2 id="blb-heading" className={styles.h2}>
                {selected.title}
              </h2>
              <Meta p={selected} />
              <p className={styles.summary}>{selected.summary}</p>
              {selected.description ? (
                <p className={styles.description}>{selected.description}</p>
              ) : null}

              {selected.previewHighlights ? (
                <ul className={styles.previewFeatures}>
                  {selected.previewHighlights.map((h) => (
                    <li key={h} className={styles.previewFeature}>
                      {h}
                    </li>
                  ))}
                </ul>
              ) : null}

              {selected.previewNote ? (
                <p className={styles.previewNote}>{selected.previewNote}</p>
              ) : null}

              <Tags items={selected.technologies} />
              <ProjectLinks links={selected.links} />
            </div>

            {/* The onboarding screenshot is excluded here — it repeats the
                introductory copy in the left column. It stays in the data. */}
            <ScreenPair
              items={previewMedia(selected)}
              onOpen={(i) => openShots(selected, i)}
              onClick={click}
            />
          </section>
        ) : null}

        <hr className={styles.divider} />

        {/* --------------------------------------------------- compact --- */}
        <section className={styles.section} aria-labelledby="more-heading">
          <h2 id="more-heading" className={styles.h2}>
            Additional engineering work
          </h2>
          <p className={styles.sectionIntro}>
            Additional projects that strengthened my foundations in frontend
            engineering, software design and collaborative delivery.
          </p>

          <ul className={styles.compactGrid}>
            {compact.map((p) => (
              <li key={p.id} className={styles.compactItem}>
                <h3 className={styles.h3}>{p.title}</h3>
                {p.subtitle ? (
                  <p className={styles.compactSub}>{p.subtitle}</p>
                ) : null}
                <Meta p={p} withContext />
                <p className={styles.bodySm}>{p.summary}</p>
                {p.highlights ? (
                  <ul className={styles.compactList}>
                    {p.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                ) : null}
                <Tags items={p.technologies} />
                <ProjectLinks links={p.links} size="small" />
              </li>
            ))}
          </ul>
        </section>

        <hr className={styles.divider} />

        {/* ------------------------------------------------------- cta --- */}
        <section className={styles.cta} aria-labelledby="cta-heading">
          <h2 id="cta-heading" className={styles.h2}>
            {cta.heading}
          </h2>
          <p className={styles.sectionIntro}>{cta.text}</p>
          <Link to={cta.to} className={styles.ctaButton} onClick={click}>
            {cta.buttonLabel}
          </Link>
        </section>
      </div>

      {viewer ? (
        <Lightbox
          items={viewer.items}
          index={viewer.index}
          onClose={() => setViewer(null)}
          onIndexChange={(index) => setViewer((v) => (v ? { ...v, index } : v))}
        />
      ) : null}
    </main>
  );
}
