import { useEffect } from "react";
import VideoStage from "../components/VideoStage";
import MonitorOverlay from "../components/MonitorOverlay";

export default function Landing() {
  // The landing scene is fixed and full-bleed; prevent body scroll while here.
  useEffect(() => {
    document.body.classList.add("is-landing");
    return () => document.body.classList.remove("is-landing");
  }, []);

  return (
    <main>
      <h1 className="visually-hidden">
        Chong Yi Jie — portfolio of a penultimate NUS Computer Science student
      </h1>
      <VideoStage>
        <MonitorOverlay />
      </VideoStage>
    </main>
  );
}
