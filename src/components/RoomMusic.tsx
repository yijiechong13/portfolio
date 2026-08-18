import { useRoomMusic } from "./roomMusicContext";
import styles from "./RoomMusic.module.css";

function SpeakerOn() {
  return (
    <svg viewBox="0 0 20 20" className={styles.icon} aria-hidden="true">
      <path
        d="M4 8h2.6L10 5v10L6.6 12H4z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M12.7 7.6a3.4 3.4 0 0 1 0 4.8M14.9 5.4a6.5 6.5 0 0 1 0 9.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SpeakerOff() {
  return (
    <svg viewBox="0 0 20 20" className={styles.icon} aria-hidden="true">
      <path
        d="M4 8h2.6L10 5v10L6.6 12H4z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M13.2 8.2l3.6 3.6M16.8 8.2l-3.6 3.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Small toggle for the room music. Never autoplays — click to start. */
export default function RoomMusic({ className }: { className?: string }) {
  const { playing, toggle } = useRoomMusic();
  // One control for all site audio.
  const label = playing ? "Mute sound" : "Enable sound";

  return (
    <button
      type="button"
      className={`${styles.button}${className ? ` ${className}` : ""}`}
      onClick={toggle}
      aria-pressed={playing}
      aria-label={label}
      title={label}
    >
      {playing ? <SpeakerOn /> : <SpeakerOff />}
      <span className={styles.label}>
        {playing ? "Sound on" : "Room music"}
      </span>
    </button>
  );
}
