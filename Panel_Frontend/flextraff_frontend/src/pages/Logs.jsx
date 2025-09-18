// src/pages/Logs.jsx
import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import Sidebar from "../components/Sidebar";

export default function Logs({ darkMode, toggleDarkMode }) {
  const [logs, setLogs] = useState([]);
  const [junctionFilter, setJunctionFilter] = useState(null);
  const [junctions, setJunctions] = useState([]);

  useEffect(() => {
    fetchJunctions();
    fetchLogs();
  }, []);

  useEffect(() => {
    fetchLogs();
  }, [junctionFilter]);

  async function fetchJunctions() {
    const { data } = await supabase
      .from("traffic_junctions")
      .select("id,junction_name")
      .order("id");
    if (data) setJunctions(data);
  }

  async function fetchLogs() {
    let q = supabase
      .from("system_logs")
      .select("*")
      .order("timestamp", { ascending: false })
      .limit(200);
    if (junctionFilter) q = q.eq("junction_id", junctionFilter);
    const { data, error } = await q;
    if (error) console.error(error);
    else setLogs(data ?? []);
  }

  return (
    <div
      className={`h-screen flex ${
        darkMode ? "bg-gray-950 text-white" : "bg-white text-gray-900"
      }`}
    >
      <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2
            className={
              darkMode
                ? "text-3xl font-semibold text-yellow-400"
                : "text-3xl font-semibold text-blue-600"
            }
          >
            System Logs
          </h2>
          <div>
            <select
              value={junctionFilter ?? ""}
              onChange={(e) =>
                setJunctionFilter(
                  e.target.value ? Number(e.target.value) : null
                )
              }
              className={`px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 ${
                darkMode
                  ? "bg-gray-800 text-gray-200 border border-gray-700 focus:ring-yellow-400"
                  : "bg-white text-gray-900 border border-gray-300 focus:ring-blue-500"
              }`}
            >
              <option value="">All junctions</option>
              {junctions.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.junction_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div
          className={`rounded-lg shadow overflow-hidden ${
            darkMode
              ? "bg-gray-900 border border-gray-800"
              : "bg-gray-50 border border-gray-200"
          }`}
        >
          <table className="w-full text-sm">
            <thead
              className={
                darkMode
                  ? "bg-gray-800 text-yellow-400"
                  : "bg-gray-100 text-blue-700"
              }
            >
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Time</th>
                <th className="px-4 py-3 text-left font-semibold">Level</th>
                <th className="px-4 py-3 text-left font-semibold">Component</th>
                <th className="px-4 py-3 text-left font-semibold">Message</th>
              </tr>
            </thead>

            <tbody>
              {logs.map((l) => (
                <tr
                  key={l.id}
                  className={darkMode ? "border-t border-gray-800" : "border-t"}
                >
                  <td className="p-2">
                    {new Date(l.timestamp).toLocaleString()}
                  </td>
                  <td className="p-2">{l.log_level}</td>
                  <td className="p-2">{l.component}</td>
                  <td className="p-2">{l.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
