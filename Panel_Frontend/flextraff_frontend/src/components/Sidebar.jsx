import { BarChart3, Table, Settings, LogOut, Moon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar({ darkMode, toggleDarkMode }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  return (
    <aside
      className={`w-64 ${
        darkMode ? "bg-gray-900 border-gray-800" : "bg-gray-100 border-gray-300"
      } p-6 flex flex-col justify-between min-h-screen`}
    >
      <div>
        <div className="flex items-center justify-between mb-10">
          <button
            aria-label="Toggle dark mode"
            className={`rounded-full p-1 ${darkMode ? "bg-gray-900" : "bg-white"}`}
            onClick={toggleDarkMode}
          >
            <Moon
              size={28}
              color={darkMode ? "#facc15" : "#888"}
              fill={darkMode ? "#facc15" : "none"}
            />
          </button>
          <h1 className={`text-2xl font-bold ${darkMode ? "text-yellow-400" : "text-blue-600"}`}>
            🚦 FlexTraff
          </h1>
        </div>
        <nav className="space-y-4">
          <Link
            to="/dashboard"
            className={`flex items-center gap-2 p-2 rounded-lg transition-colors duration-150 ${
              darkMode ? "hover:bg-gray-800 hover:text-yellow-400" : "hover:bg-blue-50 hover:text-blue-700"
            }`}
          >
            <BarChart3 size={18} className={darkMode ? "text-yellow-400" : "text-blue-500"} />{" "}
            <span>Analytics</span>
          </Link>
          <Link
            to="/dashboard"
            className={`flex items-center gap-2 p-2 rounded-lg transition-colors duration-150 ${
              darkMode ? "hover:bg-gray-800 hover:text-yellow-400" : "hover:bg-blue-50 hover:text-blue-700"
            }`}
          >
            <Table size={18} className={darkMode ? "text-yellow-400" : "text-blue-500"} />{" "}
            <span>Traffic Data</span>
          </Link>

          {/* Changed route path from /control to /controls */}
          <Link
            to="/controls"
            className={`flex items-center gap-2 p-2 rounded-lg transition-colors duration-150 ${
              darkMode ? "hover:bg-gray-800 hover:text-yellow-400" : "hover:bg-blue-50 hover:text-blue-700"
            }`}
          >
            <Settings size={18} className={darkMode ? "text-yellow-400" : "text-blue-500"} />{" "}
            <span>Controls</span>
          </Link>
        </nav>
      </div>
      <button
        className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition"
        onClick={handleLogout}
      >
        <LogOut size={18} /> Logout
      </button>
    </aside>
  );
}
