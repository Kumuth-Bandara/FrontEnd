import { NavLink, Outlet } from "react-router-dom";

export default function InternsLayout() {
  const tabClass = ({ isActive }) =>
    `px-3 py-1 rounded ${isActive ? "bg-indigo-100 font-semibold" : "hover:bg-gray-100"}`;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Interns</h1>
      <div className="flex gap-2 border-b pb-2 mb-4">
        <NavLink to="/interns" end className={tabClass}>All Interns</NavLink>
        <NavLink to="/interns/by-track" className={tabClass}>By Track</NavLink>
      </div>
      <Outlet />
    </div>
  );
}
