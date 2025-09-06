import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Contexts/authContext";
import { FiHome, FiSettings, FiUsers, FiBarChart2, FiGrid, FiLogOut, FiMessageSquare, FiMenu, FiX } from "react-icons/fi";

export default function Sidebar() {
  const { logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const linkClasses = ({ isActive }) => `flex items-center gap-2 px-2 py-1 rounded 
     ${isActive ? "text-green-400 font-bold" : "hover:text-green-400"}`;

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md"
        onClick={() => setIsOpen(true)}
      >
        <FiMenu className="w-6 h-6" />
      </button>

      <aside className={`fixed top-0 left-0 h-full w-64 bg-[#111111] text-white flex flex-col z-40 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:w-42`}>
        <div className="p-4 text-lg font-bold border-b border-gray-700 flex justify-between items-center">
          EventX Studio
          <button className="md:hidden" onClick={() => setIsOpen(false)}>
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-4 text-sm">
          <div className="mb-4">
            <NavLink
              to="/add-event"
              className="flex items-center gap-3 p-3 rounded-xl bg-[#1a1a1a] hover:bg-[#222] transition"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-[#c1ff72] text-white text-xl font-bold">
                +
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-medium">Add Quick Event</span>
                <span className="text-xs text-gray-400">Events</span>
              </div>
            </NavLink>
          </div>

          <NavLink to="/" className={linkClasses}>
            <FiHome /> Dashboard
          </NavLink>
          <NavLink to="/manage-events" className={linkClasses}>
            <FiGrid /> Manage Events
          </NavLink>
          <NavLink to="/attendees" className={linkClasses}>
            <FiUsers /> Attendee Insights
          </NavLink>
          <NavLink to="/analytics" className={linkClasses}>
            <FiBarChart2 /> Analytics & Reports
          </NavLink>

          <hr className="border-gray-700" />

          <NavLink to="/support" className={linkClasses}>
            <FiMessageSquare /> Contact Support
          </NavLink>
          <NavLink to="/settings" className={linkClasses}>
            <FiSettings /> Settings
          </NavLink>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={logout}
            className="flex items-center gap-2 hover:text-red-400 w-full text-left"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>

      {isOpen && <div className="fixed inset-0 bg-black opacity-30 z-30 md:hidden" onClick={() => setIsOpen(false)}></div>}
    </>
  );
}
