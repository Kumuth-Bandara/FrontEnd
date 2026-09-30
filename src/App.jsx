import { Routes, Route } from "react-router-dom";
import AppShell from "./components/layout/AppShell";
import Home from "./pages/Home";
import About from "./pages/About";
import InternsLayout from "./pages/InternsLayout";
import InternsList from "./pages/InternsList";
import InternsByTrack from "./pages/InternsByTrack";
import InternDetail from "./pages/InternDetail";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Announcements from "./pages/Announcements";
import AnnouncementDetail from "./pages/AnnouncementDetail";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppShell />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />

        {/* Task 5: nested layout route — Outlet inside an Outlet */}
        <Route path="interns" element={<InternsLayout />}>
          <Route index element={<InternsList />} />
          <Route path="by-track" element={<InternsByTrack />} />
        </Route>

        <Route path="interns/:id" element={<InternDetail />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:id" element={<ProjectDetail />} />
        <Route path="announcements" element={<Announcements />} />
        <Route path="announcements/:id" element={<AnnouncementDetail />} />
        <Route path="contact" element={<Contact />} />

        {/* Task 6: fallback, must be last */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}