import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditorialPhoto from "../components/EditorialPhoto";
import GalleryRail from "../components/GalleryRail";
import Lightbox from "../components/Lightbox";
import RoomMusic from "../components/RoomMusic";
import { useClickSound } from "../components/roomMusicContext";
import {
  type Media,
  cta,
  education,
  galleryItems,
  hobbies,
  intro,
  involvement,
} from "../data/about";
import styles from "./About.module.css";

/** Which set of images the lightbox is currently showing. */
type Viewer = { items: Media[]; index: number } | null;

export default function About() {
  const click = useClickSound();
  const [viewer, setViewer] = useState<Viewer>(null);

  useEffect(() => {
    document.title = "About — Chong Yi Jie";
    return () => {
      document.title = "Chong Yi Jie — Portfolio";
    };
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        {/* ------------------------------------------------- top bar --- */}
        <header className={styles.topbar}>
          <Link to="/" className={styles.back} onClick={click}>
            <span aria-hidden="true">←</span> Back to the room
          </Link>
          <RoomMusic />
        </header>

        {/* --------------------------------------------------- intro --- */}
        <section className={styles.intro} aria-labelledby="about-heading">
          <h1 id="about-heading" className={styles.h1}>
            {intro.heading}
          </h1>
          <p className={styles.lead}>{intro.paragraph}</p>
        </section>

        <hr className={styles.divider} />

        {/* ----------------------------------------------- education --- */}
        <section className={styles.section} aria-labelledby="education-heading">
          <p className={styles.eyebrow}>{education.eyebrow}</p>
          <h2 id="education-heading" className={styles.h2}>
            {education.heading}
          </h2>
          <p className={styles.sectionIntro}>{education.intro}</p>

          <ul className={styles.education}>
            {education.entries.map((e) => (
              <li key={e.qualification} className={styles.eduCard}>
                <div className={styles.eduHead}>
                  {/* A real mark if one is ever supplied; otherwise a warm
                      monogram. No third-party logo is bundled. */}
                  {e.logo?.src ? (
                    <img
                      className={styles.eduLogo}
                      src={e.logo.src}
                      alt={e.logo.alt}
                      width={e.logo.width}
                      height={e.logo.height}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <span className={styles.eduMonogram} aria-hidden="true">
                      {e.monogram}
                    </span>
                  )}

                  <div className={styles.eduHeadText}>
                    <p className={styles.eduDates}>{e.dates}</p>
                    <h3 className={styles.eduInstitution}>{e.institution}</h3>
                    <p className={styles.eduLocation}>{e.location}</p>
                  </div>
                </div>

                <p className={styles.eduQualification}>{e.qualification}</p>

                <ul className={styles.eduPoints}>
                  {e.scholarships?.length ? (
                    <li className={styles.eduPoint}>
                      <span className={styles.eduScholarship}>
                        {e.scholarships.join(" · ")}
                      </span>
                    </li>
                  ) : null}
                  {e.detailItems?.length ? (
                    <li className={styles.eduPoint}>
                      <span className={styles.eduPointLabel}>
                        {e.detailLabel}:
                      </span>{" "}
                      {e.detailItems.join(", ")}
                    </li>
                  ) : null}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        <hr className={styles.divider} />

        {/* ------------------------------------------------- hobbies --- */}
        <section className={styles.section} aria-labelledby="hobbies-heading">
          <h2 id="hobbies-heading" className={styles.h2}>
            {hobbies.heading}
          </h2>
          <p className={styles.sectionIntro}>{hobbies.intro}</p>

          {/* One vertical column: title → description → media, for every
              hobby, at every viewport. Never side by side. */}
          <div className={styles.hobbies}>
            <article className={styles.hobby}>
              <h3 className={styles.h3}>{hobbies.volleyball.title}</h3>
              <p className={styles.hobbyText}>{hobbies.volleyball.description}</p>
              <GalleryRail
                items={hobbies.volleyball.images}
                onOpen={(i) =>
                  setViewer({ items: hobbies.volleyball.images, index: i })
                }
              />
            </article>

            <article className={styles.hobby}>
              <h3 className={styles.h3}>{hobbies.photography.title}</h3>
              <p className={styles.hobbyText}>
                {hobbies.photography.description}
              </p>
              <GalleryRail
                items={galleryItems}
                onOpen={(i) => setViewer({ items: galleryItems, index: i })}
              />
            </article>

            <article className={styles.hobby}>
              <h3 className={styles.h3}>{hobbies.piano.title}</h3>
              <p className={styles.hobbyText}>{hobbies.piano.description}</p>
              {/* Renders nothing until a piano image is supplied — see
                  hobbies.piano.media in src/data/about.ts. */}
              <EditorialPhoto
                media={hobbies.piano.media}
                ratio="16 / 9"
                className={styles.hobbyMedia}
                onOpen={
                  hobbies.piano.media.src
                    ? () => setViewer({ items: [hobbies.piano.media], index: 0 })
                    : undefined
                }
              />
            </article>
          </div>
        </section>

        <hr className={styles.divider} />

        {/* -------------------------------------------- involvement --- */}
        <section className={styles.section} aria-labelledby="involvement-heading">
          <div className={styles.involvementHead}>
            <h2 id="involvement-heading" className={styles.h2}>
              {involvement.heading}
            </h2>
            <span className={styles.period}>{involvement.period}</span>
          </div>
          <p className={styles.sectionIntro}>{involvement.note}</p>

          {/* One vertical column at every viewport. Each entry completes
              before the next begins: role → organisation → dates →
              description → metric/link → its own photograph. */}
          <ol className={styles.entries}>
            {involvement.items.map((item) => (
              <li key={item.organisation} className={styles.entry}>
                <h3 className={styles.entryRole}>{item.role}</h3>
                <p className={styles.entryOrg}>{item.organisation}</p>
                {item.dates ? (
                  <p className={styles.entryDates}>{item.dates}</p>
                ) : null}
                <p className={styles.entryText}>{item.description}</p>

                {item.highlight ? (
                  <p className={styles.highlight}>{item.highlight}</p>
                ) : null}

                {item.link ? (
                  <a
                    className={styles.link}
                    href={item.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.link.label}
                    <svg viewBox="0 0 16 16" className={styles.linkIcon} aria-hidden="true">
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
                ) : null}

                {/* Several photos → a borderless rail, like the hobby
                    sections. Renders nothing when the entry has no photo. */}
                {item.images?.length ? (
                  <div className={styles.entryRail}>
                    <GalleryRail
                      items={item.images}
                      onOpen={(i) =>
                        setViewer({ items: item.images as Media[], index: i })
                      }
                    />
                  </div>
                ) : null}

                {/* Single photo. Portrait sources keep their natural ratio
                    (height-capped); landscape uses a 16:9 editorial crop. */}
                {item.media?.src ? (
                  <EditorialPhoto
                    media={item.media}
                    mode={item.media.portrait ? "natural" : "cover"}
                    ratio="16 / 9"
                    className={
                      item.media.portrait
                        ? styles.entryMediaTall
                        : styles.entryMedia
                    }
                    onOpen={() =>
                      setViewer({ items: [item.media as Media], index: 0 })
                    }
                  />
                ) : null}
              </li>
            ))}
          </ol>
        </section>

        <hr className={styles.divider} />

        {/* ----------------------------------------------------- cta --- */}
        <section className={styles.cta} aria-labelledby="cta-heading">
          <h2 id="cta-heading" className={styles.h2}>
            {cta.heading}
          </h2>
          <p className={styles.sectionIntro}>{cta.text}</p>
          <Link to={cta.to} className={styles.ctaButton} onClick={click}>
            {cta.buttonLabel}
            <svg viewBox="0 0 16 16" className={styles.arrowIcon} aria-hidden="true">
              <path
                d="M3.5 8h9m0 0L9 4.5M12.5 8L9 11.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
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
