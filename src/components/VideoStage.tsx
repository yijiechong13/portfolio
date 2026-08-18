import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./VideoStage.module.css";

/** Intrinsic size of the source video (1920x1080 = 16:9). */
const VIDEO_W = 1920;
const VIDEO_H = 1080;

const VIDEO_SRC = "/cozy_portfolio_tulip_loop_cool_8s.mp4";

type Rect = { left: number; top: number; width: number; height: number };

/**
 * Computes the rectangle the video actually paints inside `container`
 * under `object-fit: cover`, so overlays can be positioned in the
 * coordinate space of the original video frame.
 */
function coverRect(cw: number, ch: number, vw: number, vh: number): Rect {
  if (cw <= 0 || ch <= 0) return { left: 0, top: 0, width: 0, height: 0 };
  const scale = Math.max(cw / vw, ch / vh);
  const width = vw * scale;
  const height = vh * scale;
  return { left: (cw - width) / 2, top: (ch - height) / 2, width, height };
}

type Props = {
  /** Rendered inside the video rect; receives the calibrated overlay box. */
  children?: ReactNode;
  /** Falls back to a still-friendly dim layer when true. */
  overlayTint?: boolean;
};

export default function VideoStage({ children, overlayTint = true }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [rect, setRect] = useState<Rect>({ left: 0, top: 0, width: 0, height: 0 });

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const measure = () => {
      const { width, height } = host.getBoundingClientRect();
      // Prefer the real decoded size once metadata is available; the
      // constants are only a pre-load estimate.
      const v = videoRef.current;
      const vw = v?.videoWidth || VIDEO_W;
      const vh = v?.videoHeight || VIDEO_H;
      setRect(coverRect(width, height, vw, vh));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(host);

    const v = videoRef.current;
    v?.addEventListener("loadedmetadata", measure);
    window.addEventListener("orientationchange", measure);

    return () => {
      ro.disconnect();
      v?.removeEventListener("loadedmetadata", measure);
      window.removeEventListener("orientationchange", measure);
    };
  }, []);

  // Autoplay can be rejected on some mobile browsers; retry once muted.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const play = async () => {
      try {
        await v.play();
      } catch {
        v.muted = true;
        try { await v.play(); } catch { /* leave the poster frame up */ }
      }
    };
    void play();
  }, []);

  const stageStyle = {
    "--stage-left": `${rect.left}px`,
    "--stage-top": `${rect.top}px`,
    "--stage-width": `${rect.width}px`,
    "--stage-height": `${rect.height}px`,
  } as React.CSSProperties;

  return (
    <div ref={hostRef} className={styles.host} style={stageStyle}>
      <video
        ref={videoRef}
        className={styles.video}
        src={VIDEO_SRC}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
      />
      {overlayTint && <div className={styles.tint} aria-hidden="true" />}

      {/* Positioned to the painted video rect, not the viewport. */}
      <div className={styles.stage}>{children}</div>
    </div>
  );
}
