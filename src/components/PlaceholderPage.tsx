import { useEffect } from "react";
import { Link } from "react-router-dom";
import RoomMusic from "./RoomMusic";
import styles from "./PlaceholderPage.module.css";

type Props = {
  title: string;
  message: string;
};

export default function PlaceholderPage({ title, message }: Props) {
  useEffect(() => {
    document.title = `${title} — Chong Yi Jie`;
    return () => { document.title = "Chong Yi Jie — Portfolio"; };
  }, [title]);

  return (
    <main className={styles.page}>
      <article className={styles.card}>
        <p className={styles.eyebrow}>Chong Yi Jie</p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.message}>{message}</p>
        <Link to="/" className={styles.back} aria-label="Back to the landing page">
          <span aria-hidden="true">←</span> Back to the room
        </Link>

        <div className={styles.music}>
          <RoomMusic />
        </div>
      </article>
    </main>
  );
}
