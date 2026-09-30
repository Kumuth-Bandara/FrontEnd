import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Bonus: close mobile menu automatically on navigation
  useEffect(() => setMenuOpen(false), [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <button
        className="md:hidden p-3 text-xl border-b text-left"
        onClick={() => setMenuOpen((open) => !open)}
      >
        ☰
      </button>

      <div className="flex flex-1">
        <Sidebar isOpen={menuOpen} />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}