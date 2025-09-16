import { BarChart3, Table, Settings, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 p-6 flex flex-col justify-between min-h-screen">
      <div>
        <h1 className="text-2xl font-bold text-yellow-400 mb-10">🚦 FlexTraff</h1>
        <nav className="space-y-4">
          <Link to="/dashboard" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800">
            <BarChart3 size={18} /> <span>Analytics</span>
          </Link>
          <Link to="/dashboard" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800">
            <Table size={18} /> <span>Traffic Data</span>
          </Link>
          <Link to="/control" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800">
            <Settings size={18} /> <span>Controls</span>
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
