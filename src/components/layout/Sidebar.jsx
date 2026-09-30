import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/interns", label: "Interns" },
  { to: "/contact", label: "Contact" },
  { to: "/projects", label: "Projects" },
  { to: "/announcements", label: "Announcements" },
];

export default function Sidebar({ isOpen }) {
  return (
    <aside
      className={`${isOpen ? "flex" : "hidden"} md:flex flex-col w-full md:w-48 border-r p-4 gap-2`}
    >
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.end}
          className={({ isActive }) =>
            `block px-3 py-2 rounded ${isActive ? "text-indigo-700 bg-indigo-50 font-semibold" : "text-slate-600 hover:bg-gray-100"}`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </aside>
  );
}