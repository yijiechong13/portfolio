import { BrowserRouter, Route, Routes } from "react-router-dom";
import RoomMusicProvider from "./components/RoomMusicProvider";
import Landing from "./pages/Landing";
import CaseStudy from "./pages/CaseStudy";
import Projects from "./pages/Projects";
import Internship from "./pages/Internship";
import About from "./pages/About";
import Hobbies from "./pages/Hobbies";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      {/* Above the router so music survives navigation between pages. */}
      <RoomMusicProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<CaseStudy />} />
          <Route path="/internship" element={<Internship />} />
          <Route path="/about" element={<About />} />
          {/* Kept so existing links/bookmarks still resolve. */}
          <Route path="/hobbies" element={<Hobbies />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </RoomMusicProvider>
    </BrowserRouter>
  );
}
