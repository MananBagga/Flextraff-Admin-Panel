import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { LogOut, BarChart3, Table, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export default function Dashboard() {
  const [trafficData, setTrafficData] = useState([
    { lane: "North", cars: 120 },
    { lane: "South", cars: 95 },
    { lane: "East", cars: 140 },
    { lane: "West", cars: 80 },
  ]);

  const [lightDist, setLightDist] = useState([
    { name: "Green", value: 45 },
    { name: "Yellow", value: 15 },
    { name: "Red", value: 40 },
  ]);

  const COLORS = ["#22c55e", "#facc15", "#ef4444"];

  const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("auth");
  navigate("/");
};


  return (
    <div className="h-screen flex bg-gray-950 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold text-yellow-400 mb-10">🚦 FlexTraff</h1>
          <nav className="space-y-4">
            <a href="#" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800">
              <BarChart3 size={18} /> <span>Analytics</span>
            </a>
            <a href="#" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800">
              <Table size={18} /> <span>Traffic Data</span>
            </a>
            <a href="/control" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800">
              <Settings size={18} /> <span>Controls</span>
            </a>
          </nav>
        </div>
        <button
          className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition"
          onClick={handleLogout}
        >
        <LogOut size={18} /> Logout
        </button>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-3xl font-semibold mb-6 text-yellow-400">Admin Dashboard</h2>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-800">
            <h3 className="text-lg mb-4 font-semibold">Car Count per Lane</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={trafficData}>
                <XAxis dataKey="lane" stroke="#facc15" />
                <YAxis stroke="#facc15" />
                <Tooltip />
                <Bar dataKey="cars" fill="#facc15" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-800">
            <h3 className="text-lg mb-4 font-semibold">Light Time Distribution</h3>
            <ResponsiveContainer width="100%" height={255}>
              <PieChart>
                <Pie data={lightDist} dataKey="value" nameKey="name" outerRadius={100} label>
                  {lightDist.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Table Section */}
        <div className="mt-8 bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-800">
          <h3 className="text-lg mb-4 font-semibold">Recent Traffic Logs</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-gray-800 text-yellow-400">
                <tr>
                  <th className="py-2 px-4 text-left">Time</th>
                  <th className="py-2 px-4 text-left">Lane</th>
                  <th className="py-2 px-4 text-left">Cars Counted</th>
                  <th className="py-2 px-4 text-left">Signal</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-800">
                  <td className="py-2 px-4">10:30 AM</td>
                  <td className="py-2 px-4">North</td>
                  <td className="py-2 px-4">35</td>
                  <td className="py-2 px-4 text-green-400">Green</td>
                </tr>
                <tr className="border-t border-gray-800">
                  <td className="py-2 px-4">10:32 AM</td>
                  <td className="py-2 px-4">East</td>
                  <td className="py-2 px-4">22</td>
                  <td className="py-2 px-4 text-red-400">Red</td>
                </tr>
                <tr className="border-t border-gray-800">
                  <td className="py-2 px-4">10:35 AM</td>
                  <td className="py-2 px-4">West</td>
                  <td className="py-2 px-4">18</td>
                  <td className="py-2 px-4 text-yellow-400">Yellow</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
