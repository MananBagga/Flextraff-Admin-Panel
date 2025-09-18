// src/pages/Traffic_data.jsx
import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import Sidebar from "../components/Sidebar";

export default function TrafficData({ darkMode, toggleDarkMode }) {
  const [junctions, setJunctions] = useState([]);
  const [loading, setLoading] = useState(false);

  // form state
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    junction_name: "",
    location: "",
    latitude: "",
    longitude: "",
    status: "active",
    algorithm_config: "",
  });

  const inputBase = "p-3 rounded w-full border focus:outline-none focus:ring-2";
const inputBg = darkMode
  ? "bg-gray-800 text-white placeholder-gray-400 border-gray-600 focus:ring-yellow-400"
  : "bg-gray-100 text-gray-900 placeholder-gray-500 border-gray-300 focus:ring-blue-500";

  const inputText = darkMode ? "text-white" : "text-gray-900";
  const labelText = darkMode ? "text-yellow-400" : "text-blue-700";

  useEffect(() => {
    fetchJunctions();
  }, []);

  async function fetchJunctions() {
    setLoading(true);
    const { data, error } = await supabase
      .from("traffic_junctions")
      .select("*")
      .order("id", { ascending: false });
    if (error) console.error(error);
    else setJunctions(data ?? []);
    setLoading(false);
  }

  function openNew() {
    setEditing(null);
    setForm({
      junction_name: "",
      location: "",
      latitude: "",
      longitude: "",
      status: "active",
      algorithm_config: "",
    });
  }

  function openEdit(j) {
    setEditing(j.id);
    setForm({
      junction_name: j.junction_name || "",
      location: j.location || "",
      latitude: j.latitude ?? "",
      longitude: j.longitude ?? "",
      status: j.status || "active",
      algorithm_config: j.algorithm_config || "",
    });
  }

  async function handleSave(e) {
    e.preventDefault();
    const payload = {
      junction_name: form.junction_name,
      location: form.location,
      latitude: form.latitude ? Number(form.latitude) : null,
      longitude: form.longitude ? Number(form.longitude) : null,
      status: form.status,
      algorithm_config: form.algorithm_config || null,
    };

    try {
      if (editing) {
        const { error } = await supabase
          .from("traffic_junctions")
          .update(payload)
          .eq("id", editing);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("traffic_junctions").insert(payload);
        if (error) throw error;
      }
      await fetchJunctions();
      setEditing(null);
      setForm({
        junction_name: "",
        location: "",
        latitude: "",
        longitude: "",
        status: "active",
        algorithm_config: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error saving junction. See console.");
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete junction? This is permanent.")) return;
    const { error } = await supabase.from("traffic_junctions").delete().eq("id", id);
    if (error) console.error(error);
    else fetchJunctions();
  }

  return (
    <div className={`h-screen flex ${darkMode ? "bg-gray-950 text-white" : "bg-white text-gray-900"}`}>
      <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-3xl font-semibold ${labelText}`}>Traffic Junctions</h2>
          <div>
            <button onClick={openNew} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              Add Junction
            </button>
          </div>
        </div>

        {/* form */}
        <form onSubmit={handleSave} className={`max-w-2xl mb-6 p-6 rounded-lg ${inputBg} shadow`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Junction name"
              value={form.junction_name}
              onChange={(e) => setForm((s) => ({ ...s, junction_name: e.target.value }))}
              className={`p-3 rounded ${inputText} ${inputBg} ${inputBase} w-full`}
              required
            />
            <input
              placeholder="Location (city / area)"
              value={form.location}
              onChange={(e) => setForm((s) => ({ ...s, location: e.target.value }))}
              className={`p-3 rounded ${inputText} ${inputBg} ${inputBase} w-full`}
            />
            <input
              placeholder="Latitude"
              value={form.latitude}
              onChange={(e) => setForm((s) => ({ ...s, latitude: e.target.value }))}
              className={`p-3 rounded ${inputText} ${inputBg} ${inputBase} w-full`}
            />
            <input
              placeholder="Longitude"
              value={form.longitude}
              onChange={(e) => setForm((s) => ({ ...s, longitude: e.target.value }))}
              className={`p-3 rounded ${inputText} ${inputBg} ${inputBase} w-full`}
            />
            <select
              value={form.status}
              onChange={(e) => setForm((s) => ({ ...s, status: e.target.value }))}
              className={`p-3 rounded ${inputText} ${inputBg} ${inputBase} w-full`}
            >
              <option value="active">active</option>
              <option value="maintenance">maintenance</option>
              <option value="inactive">inactive</option>
            </select>
            <textarea
              placeholder="algorithm_config (JSON)"
              value={form.algorithm_config}
              onChange={(e) => setForm((s) => ({ ...s, algorithm_config: e.target.value }))}
              className={`p-3 rounded ${inputText} ${inputBg} ${inputBase} w-full md:col-span-2`}
            />
          </div>

          <div className="mt-4">
            <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded">
              {editing ? "Update Junction" : "Create Junction"}
            </button>
            {editing && (
              <button type="button" onClick={() => { setEditing(null); openNew(); }} className="ml-3 py-2 px-4 border rounded">
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* list */}
        <div className="rounded-lg overflow-hidden shadow">
          <table className="min-w-full text-sm">
            <thead className={darkMode ? "bg-gray-800 text-yellow-400" : "bg-blue-200 text-blue-800"}>
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Location</th>
                <th className="p-3 text-left">Lat,Lng</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td className="p-4" colSpan="6">Loading...</td></tr>
              ) : (
                junctions.map((j) => (
                  <tr key={j.id} className={darkMode ? "border-t border-gray-800" : "border-t"}>
                    <td className="p-3">{j.id}</td>
                    <td className="p-3">{j.junction_name}</td>
                    <td className="p-3">{j.location}</td>
                    <td className="p-3">{j.latitude ?? "-"}, {j.longitude ?? "-"}</td>
                    <td className="p-3">{j.status}</td>
                    <td className="p-3">
                      <button onClick={() => openEdit(j)} className="mr-2 text-sm px-3 py-1 rounded border">Edit</button>
                      <button onClick={() => handleDelete(j.id)} className="text-sm px-3 py-1 rounded border text-red-600">Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
