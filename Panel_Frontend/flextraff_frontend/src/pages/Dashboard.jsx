import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Sidebar from "../components/Sidebar";

export default function Dashboard({ darkMode, toggleDarkMode }) {
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

  const bgMain = darkMode ? "bg-gray-950 text-white" : "bg-white text-gray-900";
  const sideMainBg = darkMode ? "bg-gray-900" : "bg-gray-100";
  const headerText = darkMode ? "text-yellow-400" : "text-blue-600";

  return (
    <div className={`h-screen flex ${bgMain} transition-colors duration-300`}>
      <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="flex-1 p-8 overflow-y-auto">
        <h2 className={`text-3xl font-semibold mb-6 ${headerText}`}>
          Admin Dashboard
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className={`${sideMainBg} p-6 rounded-2xl shadow-lg border border-gray-200`}
          >
            <h3 className="text-lg mb-4 font-semibold">Car Count per Lane</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={trafficData}>
                <XAxis stroke={darkMode ? "#facc15" : "#3b82f6"} dataKey="lane" />
                <YAxis stroke={darkMode ? "#facc15" : "#3b82f6"} />
                <Tooltip />
                <Bar
                  dataKey="cars"
                  fill={darkMode ? "#facc15" : "#3b82f6"}
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div
            className={`${sideMainBg} p-6 rounded-2xl shadow-lg border border-gray-200`}
          >
            <h3 className="text-lg mb-4 font-semibold">Light Time Distribution</h3>
            <ResponsiveContainer width="100%" height={255}>
              <PieChart>
                <Pie
                  data={lightDist}
                  outerRadius={100}
                  label
                  dataKey="value"
                  nameKey="name"
                >
                  {lightDist.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div
          className={`${sideMainBg} mt-8 p-6 rounded-2xl shadow-lg border border-gray-200`}
        >
          <h3 className="text-lg mb-4 font-semibold">Recent Traffic Logs</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead
                className={
                  darkMode ? "bg-gray-800 text-yellow-400" : "bg-blue-200 text-blue-800"
                }
              >
                <tr>
                  <th className="py-2 px-4 text-left">Time</th>
                  <th className="py-2 px-4 text-left">Lane</th>
                  <th className="py-2 px-4 text-left">Cars Counted</th>
                  <th className="py-2 px-4 text-left">Signal</th>
                </tr>
              </thead>
              <tbody>
                <tr className={darkMode ? "border-t border-gray-800" : "border-t border-blue-300"}>
                  <td className="py-2 px-4">10:30 AM</td>
                  <td className="py-2 px-4">North</td>
                  <td className="py-2 px-4">35</td>
                  <td className={darkMode ? "py-2 px-4 text-green-400" : "py-2 px-4 text-green-700"}>
                    Green
                  </td>
                </tr>
                <tr className={darkMode ? "border-t border-gray-800" : "border-t border-blue-300"}>
                  <td className="py-2 px-4">10:32 AM</td>
                  <td className="py-2 px-4">East</td>
                  <td className="py-2 px-4">22</td>
                  <td className={darkMode ? "py-2 px-4 text-red-400" : "py-2 px-4 text-red-600"}>
                    Red
                  </td>
                </tr>
                <tr className={darkMode ? "border-t border-gray-800" : "border-t border-blue-300"}>
                  <td className="py-2 px-4">10:35 AM</td>
                  <td className="py-2 px-4">West</td>
                  <td className="py-2 px-4">18</td>
                  <td className={darkMode ? "py-2 px-4 text-yellow-400" : "py-2 px-4 text-yellow-600"}>
                    Yellow
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
