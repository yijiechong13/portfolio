import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Lightbox, { type LightboxItem } from "../components/Lightbox";
import ProjectLinks from "../components/ProjectLinks";
import RoomMusic from "../components/RoomMusic";
import { useClickSound } from "../components/roomMusicContext";
import { type Step, care4you, nuwa } from "../data/caseStudies";
import { findProject } from "../data/projects";
import styles from "./CaseStudy.module.css";

/** Numbered process/flow strip — plain HTML and CSS, no diagram dependency. */
function Flow({ steps }: { steps: Step[] }) {
  return (
    <ol className={styles.flow}>
      {steps.map((s, i) => (
        <li key={s.name} className={styles.flowStep}>
          <span className={styles.flowNum} aria-hidden="true">
            {i + 1}
          </span>
          <span className={styles.flowText}>
            <span className={styles.flowName}>{s.name}</span>
            {/* Optional detail — used by the architecture layers. */}
            {s.text ? (
              <span className={styles.flowDetail}>{s.text}</span>
            ) : null}
          </span>
        </li>
      ))}
    </ol>
  );
}

export default function CaseStudy() {
  const click = useClickSound();
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? findProject(slug) : undefined;
  const [viewer, setViewer] = useState<{
    items: LightboxItem[];
    index: number;
  } | null>(null);

  useEffect(() => {
    document.title = project
      ? `${project.title} — Chong Yi Jie`
      : "Project — Chong Yi Jie";
    return () => {
      document.title = "Chong Yi Jie — Portfolio";
    };
  }, [project]);

  if (!project || !project.hasCaseStudy) {
    return (
      <main className={styles.page}>
        <div className={styles.shell}>
          <h1 className={styles.h1}>Project not found</h1>
          <p className={styles.lead}>
            That case study doesn’t exist yet.
          </p>
          <Link to="/projects" className={styles.back} onClick={click}>
            <span aria-hidden="true">←</span> Back to projects
          </Link>
        </div>
      </main>
    );
  }

  /* The two lead screens — the same pair used on the Projects page. The
     walkthrough extras stay in the data but are not rendered here, so no
     screenshot appears twice on the page. */
  const leadShots = (project.media ?? []).filter((m) => m.src && !m.previewHidden);

  /* The cover is NOT part of `media`, so it opens as its own single-item
     viewer rather than indexing into the walkthrough list. */
  const openCover = () => {
    if (project.cover.src) setViewer({ items: [project.cover], index: 0 });
  };

  const isNuwa = project.slug === "nuwa";
  const c = isNuwa ? nuwa : care4you;

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.topbar}>
          <Link to="/projects" className={styles.back} onClick={click}>
            <span aria-hidden="true">←</span> Back to projects
          </Link>
          <RoomMusic />
        </header>

        {/* ------------------------------------------------------ hero --- */}
        <section className={styles.hero} aria-labelledby="cs-heading">
          <h1 id="cs-heading" className={styles.h1}>
            {project.title}
          </h1>
          {project.subtitle ? (
            <p className={styles.subtitle}>{project.subtitle}</p>
          ) : null}
          <p className={styles.meta}>
            {project.context}
            <span aria-hidden="true"> · </span>
            {project.dates}
            <span aria-hidden="true"> · </span>
            <span className={styles.team}>{project.teamLabel}</span>
          </p>
          <p className={styles.lead}>{project.summary}</p>

          {/* Care4You has no single cover image; its two lead screenshots
              carry the hero. They appear ONCE, here — the walkthrough
              carousel that repeated them has been removed. */}
          {!project.cover.src && leadShots.length ? (
            <ul className={styles.heroShots}>
              {leadShots.map((m, i) => (
                <li key={m.src} className={styles.heroShot}>
                  <button
                    type="button"
                    className={styles.heroShotButton}
                    onClick={() => {
                      click();
                      setViewer({ items: leadShots, index: i });
                    }}
                    aria-label={`View full screenshot: ${m.alt}`}
                  >
                    <img
                      className={styles.heroShotImg}
                      src={m.src as string}
                      alt={m.alt}
                      width={m.width}
                      height={m.height}
                      decoding="async"
                    />
                  </button>
                  {m.caption ? (
                    <p className={styles.heroShotCaption}>{m.caption}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : null}

          {project.cover.src ? (
            <figure className={styles.coverFigure}>
              <button
                type="button"
                className={styles.coverButton}
                onClick={() => {
                  click();
                  openCover();
                }}
                aria-label={`View full image: ${project.cover.alt}`}
              >
                <img
                  className={styles.cover}
                  src={project.cover.src}
                  alt={project.cover.alt}
                  /* Intrinsic size reserves the box before load — no shift. */
                  width={project.cover.width}
                  height={project.cover.height}
                  decoding="async"
                />
              </button>
              {project.cover.caption ? (
                <figcaption className={styles.coverCaption}>
                  {project.cover.caption}
                  {project.cover.credit ? (
                    <span className={styles.coverNote}>
                      {project.cover.credit}
                    </span>
                  ) : null}
                </figcaption>
              ) : null}
            </figure>
          ) : null}

          <ProjectLinks
            links={project.links.filter((l) => l.type !== "case-study")}
          />
        </section>

        <hr className={styles.divider} />

        {/* --------------------------------------------------- problem --- */}
        <section className={styles.section}>
          <h2 className={styles.h2}>{c.problem.heading}</h2>
          <p className={styles.body}>{c.problem.body}</p>
          {"metricNote" in c.problem && c.problem.metricNote ? (
            <p className={styles.note}>{c.problem.metricNote}</p>
          ) : null}
        </section>

        {/* ------------------------------------------------- nuwa only --- */}
        {isNuwa ? (
          <>
            <section className={styles.section}>
              <h2 className={styles.h2}>{nuwa.solution.heading}</h2>
              <p className={styles.body}>{nuwa.solution.body}</p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.h2}>{nuwa.flow.heading}</h2>
              <Flow steps={nuwa.flow.steps} />
              <p className={styles.body}>{nuwa.flow.body}</p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.h2}>{nuwa.dataset.heading}</h2>
              <p className={styles.body}>{nuwa.dataset.body}</p>
              <Flow steps={nuwa.dataset.steps} />
              <p className={styles.note}>{nuwa.dataset.note}</p>
            </section>

            {/* How the architecture was actually chosen — this sits before
                the evaluation numbers so the results have context. */}
            <section className={styles.section}>
              <h2 className={styles.h2}>{nuwa.research.heading}</h2>
              <p className={styles.body}>{nuwa.research.body}</p>
              {/* One variable per experiment — numbered so the sequence of
                  decisions is legible, not just the conclusion. */}
              <ol className={styles.experiments}>
                {nuwa.research.experiments.map((e, i) => (
                  <li key={e.name} className={styles.experiment}>
                    <span className={styles.experimentNum} aria-hidden="true">
                      {i + 1}
                    </span>
                    <span className={styles.experimentText}>
                      <span className={styles.experimentName}>{e.name}</span>
                      <span className={styles.experimentBody}>{e.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <p className={styles.body}>{nuwa.research.body2}</p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.h2}>{nuwa.evaluation.heading}</h2>
              <ul className={styles.results}>
                {nuwa.evaluation.results.map((r) => (
                  <li key={r.label} className={styles.result}>
                    <span className={styles.resultValue}>{r.value}</span>
                    <span className={styles.resultLabel}>{r.label}</span>
                    <span className={styles.resultNote}>{r.note}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.h2}>{nuwa.delivery.heading}</h2>
              <p className={styles.body}>{nuwa.delivery.body}</p>
              <ul className={styles.stackList}>
                {nuwa.delivery.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </section>

            {/* Scope and limitations, stated plainly. */}
            <section className={styles.section}>
              <h2 className={styles.h2}>{nuwa.responsible.heading}</h2>
              <p className={styles.body}>{nuwa.responsible.body}</p>
              <p className={styles.body}>{nuwa.responsible.body2}</p>
            </section>
          </>
        ) : (
          <>
            <section className={styles.section}>
              <h2 className={styles.h2}>{care4you.users.heading}</h2>
              <ul className={styles.people}>
                {care4you.users.items.map((u) => (
                  <li key={u.name} className={styles.person}>
                    <h3 className={styles.h3}>{u.name}</h3>
                    <p className={styles.bodySm}>{u.text}</p>
                  </li>
                ))}
              </ul>
            </section>

            {/* Two labelled paths, side by side so they are easy to compare.
                Plain text steps with CSS arrows — no screenshots, no cards,
                no diagram library. */}
            <section className={styles.section}>
              <h2 className={styles.h2}>{care4you.workflows.heading}</h2>
              <div className={styles.workflows}>
                {care4you.workflows.paths.map((path) => (
                  <div key={path.label} className={styles.workflow}>
                    <h3 className={styles.workflowLabel}>{path.label}</h3>
                    <ol className={styles.workflowSteps}>
                      {path.steps.map((step) => (
                        <li key={step} className={styles.workflowStep}>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.h2}>{care4you.translation.heading}</h2>
              <p className={styles.body}>{care4you.translation.body}</p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.h2}>{care4you.architecture.heading}</h2>
              <Flow steps={care4you.architecture.steps} />
            </section>

            <section className={styles.section}>
              <h2 className={styles.h2}>{care4you.decisions.heading}</h2>
              <ul className={styles.decisions}>
                {care4you.decisions.items.map((d) => (
                  <li key={d.name} className={styles.decision}>
                    <h3 className={styles.h4}>{d.name}</h3>
                    <p className={styles.bodySm}>{d.text}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.h2}>{care4you.outcome.heading}</h2>
              <ul className={styles.results}>
                {care4you.outcome.results.map((r) => (
                  <li key={r.value} className={styles.result}>
                    <span className={styles.resultValue}>{r.value}</span>
                    <span className={styles.resultNote}>{r.note}</span>
                  </li>
                ))}
              </ul>
              {/* States plainly that the hours are the EXISTING workload, not
                  measured savings from a deployment. */}
              <p className={styles.body}>{care4you.outcome.body}</p>
            </section>
          </>
        )}

        {/* Care4You's architecture section already names every layer and its
            technologies, so a separate chip list would repeat it. Nuwa's flow
            does not, so it keeps this section. */}
        {isNuwa ? (
          <section className={styles.section}>
            <h2 className={styles.h2}>Technologies</h2>
            <ul className={styles.tags}>
              {project.technologies.map((t) => (
                <li key={t} className={styles.tag}>
                  {t}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <hr className={styles.divider} />

        <section className={styles.section}>
          <h2 className={styles.h2}>{c.reflection.heading}</h2>
          <p className={styles.body}>{c.reflection.body}</p>
          <ProjectLinks
            links={[
              {
                type: "overview",
                label: "Back to all projects",
                url: "/projects",
                enabled: true,
              },
            ]}
          />
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
