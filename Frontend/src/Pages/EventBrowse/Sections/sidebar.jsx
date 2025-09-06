import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Contexts/authContext";
import { FiLogOut, FiCalendar, FiShoppingCart , FiUser, FiMenu, FiX } from "react-icons/fi";

const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); 

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-2 mb-4 p-2 rounded hover:text-green-400 ${
      isActive ? "text-green-400 font-bold" : ""}`;
  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-black text-white rounded-md shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <aside
        className={`
          fixed top-0 left-0 h-full bg-black text-white p-6 flex flex-col justify-between
          w-64 z-40 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static
        `}
      >
        <div>
          <h2 className="text-2xl font-bold mb-6">EventX Stidio</h2>
          <nav className="flex flex-col">
            <NavLink to="/browse-events" className={linkClasses} onClick={() => setIsOpen(false)}>
              <FiCalendar /> Browse Events
            </NavLink>
            <NavLink to="/my-tickets" className={linkClasses} onClick={() => setIsOpen(false)}>
              <FiShoppingCart  /> My Tickets
            </NavLink>
            <NavLink to="/profile" className={linkClasses} onClick={() => setIsOpen(false)}>
              <FiUser /> Profile
            </NavLink>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 p-2 hover:text-red-400 mt-6"
        >
          <FiLogOut /> Logout
        </button>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
