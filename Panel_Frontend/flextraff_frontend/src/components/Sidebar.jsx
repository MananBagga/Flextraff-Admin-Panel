// src/components/Sidebar.jsx
import { BarChart3, Table, Settings, LogOut, Moon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import flextraff_logo from "../assets/flextraff_logo.png";

export default function Sidebar({ darkMode, toggleDarkMode }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear Supabase / local auth (depending on how you handle it)
    localStorage.removeItem("auth");
    navigate("/login"); // 🔹 go to /login instead of "/"
  };

  return (
    <aside
      className={`w-64 border-r ${
        darkMode
          ? "bg-gray-900 border-gray-800 text-gray-100"
          : "bg-gray-100 border-gray-300 text-gray-900"
      } p-6 flex flex-col justify-between min-h-screen`}
    >
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-10">
          {/* Dark mode toggle */}
          <button
            aria-label="Toggle dark mode"
            className={`rounded-full p-2 shadow ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
            onClick={toggleDarkMode}
          >
            <Moon
              size={22}
              color={darkMode ? "#facc15" : "#555"}
              fill={darkMode ? "#facc15" : "none"}
            />
          </button>

          <h1
            className={`text-xl font-bold tracking-wide ${
              darkMode ? "text-yellow-400" : "text-blue-600"
            }`}
          >
            <img src={flextraff_logo} alt="flextraff logo" className="w-10 h-10 flex items-center" /> FlexTraff
          </h1>
        </div>

        {/* Nav Links */}
        <nav className="space-y-2">
          <Link
            to="/dashboard"
            className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
              darkMode
                ? "hover:bg-gray-800 hover:text-yellow-400"
                : "hover:bg-blue-50 hover:text-blue-700"
            }`}
          >
            <BarChart3
              size={18}
              className={darkMode ? "text-yellow-400" : "text-blue-500"}
            />
            <span>Analytics</span>
          </Link>

          <Link
            to="/traffic-data"
            className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
              darkMode
                ? "hover:bg-gray-800 hover:text-yellow-400"
                : "hover:bg-blue-50 hover:text-blue-700"
            }`}
          >
            <Table
              size={18}
              className={darkMode ? "text-yellow-400" : "text-blue-500"}
            />
            <span>Traffic Data</span>
          </Link>

          <Link
            to="/controls"
            className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
              darkMode
                ? "hover:bg-gray-800 hover:text-yellow-400"
                : "hover:bg-blue-50 hover:text-blue-700"
            }`}
          >
            <Settings
              size={18}
              className={darkMode ? "text-yellow-400" : "text-blue-500"}
            />
            <span>Controls</span>
          </Link>

          <Link
            to="/logs"
            className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
              darkMode
                ? "hover:bg-gray-800 hover:text-yellow-400"
                : "hover:bg-blue-50 hover:text-blue-700"
            }`}
          >
            <Table
              size={18}
              className={darkMode ? "text-yellow-400" : "text-blue-500"}
            />
            <span>Logs</span>
          </Link>

          <Link
            to="/scanners"
            className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
              darkMode
                ? "hover:bg-gray-800 hover:text-yellow-400"
                : "hover:bg-blue-50 hover:text-blue-700"
            }`}
          >
            <Settings
              size={18}
              className={darkMode ? "text-yellow-400" : "text-blue-500"}
            />
            <span>Scanners</span>
          </Link>
        </nav>
      </div>

      {/* Logout */}
      <button
        className="flex items-center gap-2 mt-6 text-gray-400 hover:text-red-500 transition"
        onClick={handleLogout}
      >
        <LogOut size={18} /> Logout
      </button>
    </aside>
  );
}
