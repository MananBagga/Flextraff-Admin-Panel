// src/pages/CreateUser.jsx
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import supabase from "../supabaseClient";

const ROLES = ["ADMIN", "OPERATOR", "OBSERVER"];

export default function CreateUser({ darkMode, toggleDarkMode }) {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    role: "",
    status: "active",
    junction_id: null,
  });
  const [errors, setErrors] = useState({});
  const [junctions, setJunctions] = useState([]);
  const [loadingJ, setLoadingJ] = useState(true);

  // ── Fetch junctions from Supabase ──────────────────────────────────────
  useEffect(() => {
    async function fetchJunctions() {
      const { data, error } = await supabase
        .from("traffic_junctions")
        .select("id, junction_name")
        .order("id");
      if (!error) setJunctions(data || []);
      setLoadingJ(false);
    }
    fetchJunctions();
  }, []);

  const set = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: null }));
  };

  // ── Style helpers (matching your existing pages) ───────────────────────
  const cardBg = darkMode ? "bg-gray-900" : "bg-gray-100";
  const headerText = darkMode ? "text-yellow-400" : "text-blue-600";
  const subText = darkMode ? "text-gray-400" : "text-gray-500";
  const divider = darkMode ? "border-gray-700" : "border-gray-200";

  const inputCls = (field) =>
    `w-full px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 ${
      darkMode
        ? "bg-gray-800 text-gray-200 border border-gray-700 focus:ring-yellow-400"
        : "bg-white text-gray-900 border focus:ring-blue-500"
    } ${errors[field] ? "border-red-500" : ""}`;

  const labelCls = `block text-xs font-semibold uppercase tracking-wide mb-1 ${subText}`;

  // ── Junction card style ────────────────────────────────────────────────
  const junctionCardCls = (id) => {
    const selected = form.junction_id === id;
    if (selected) {
      return darkMode
        ? "border-yellow-400 bg-gray-800 ring-1 ring-yellow-400"
        : "border-blue-500 bg-blue-50 ring-1 ring-blue-500";
    }
    return darkMode
      ? "border-gray-700 bg-gray-800 hover:border-gray-500"
      : "border-gray-200 bg-white hover:border-gray-400";
  };

  return (
    <div
      className={`h-screen flex ${darkMode ? "bg-gray-950 text-white" : "bg-white text-gray-900"}`}
    >
      <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="flex-1 p-8 overflow-y-auto">
        {/* ── Page Header ── */}
        <div className="mb-8">
          <h2 className={`text-3xl font-semibold ${headerText}`}>
            Create User
          </h2>
          <p className={`text-sm mt-1 ${subText}`}>
            Add a new operator and assign them to a junction
          </p>
        </div>

        <div className="max-w-3xl space-y-6">
          {/* ── Card 1: Personal Information ── */}
          <div
            className={`${cardBg} p-6 rounded-2xl shadow-lg border ${divider}`}
          >
            <h3
              className={`text-base font-semibold mb-4 pb-3 border-b ${divider}`}
            >
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelCls}>Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Arjun Mehta"
                  value={form.full_name}
                  onChange={(e) => set("full_name", e.target.value)}
                  className={inputCls("full_name")}
                />
                {errors.full_name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.full_name}
                  </p>
                )}
              </div>

              <div>
                <label className={labelCls}>Email Address *</label>
                <input
                  type="email"
                  placeholder="name@flextraff.gov"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  className={inputCls("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className={labelCls}>Phone (optional)</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  className={inputCls("phone")}
                />
              </div>

              <div>
                <label className={labelCls}>Role *</label>
                <select
                  value={form.role}
                  onChange={(e) => set("role", e.target.value)}
                  className={inputCls("role")}
                >
                  <option value="">Select a role…</option>
                  {ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                {errors.role && (
                  <p className="text-red-500 text-xs mt-1">{errors.role}</p>
                )}
              </div>

              <div>
                <label className={labelCls}>Account Status</label>
                <select
                  value={form.status}
                  onChange={(e) => set("status", e.target.value)}
                  className={inputCls("status")}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* ── Card 2: Assign Junction ── */}
          <div
            className={`${cardBg} p-6 rounded-2xl shadow-lg border ${divider}`}
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b ${divider}">
              <h3 className="text-base font-semibold">Assign Junction *</h3>
              {errors.junction_id && (
                <p className="text-red-500 text-xs">{errors.junction_id}</p>
              )}
            </div>

            {loadingJ ? (
              <p className={`text-sm ${subText}`}>Loading junctions…</p>
            ) : junctions.length === 0 ? (
              <p className={`text-sm ${subText}`}>
                No junctions found in database.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {junctions.map((j) => (
                  <button
                    key={j.id}
                    type="button"
                    onClick={() => set("junction_id", j.id)}
                    className={`text-left px-4 py-3 rounded-xl border transition-all ${junctionCardCls(j.id)}`}
                  >
                    <div
                      className={`text-xs font-mono mb-1 ${
                        darkMode ? "text-yellow-400" : "text-blue-500"
                      }`}
                    >
                      JCT-{String(j.id).padStart(3, "0")}
                    </div>
                    <div className="text-sm font-semibold">
                      {j.junction_name}
                    </div>
                    {form.junction_id === j.id && (
                      <div
                        className={`text-xs mt-1 font-medium ${
                          darkMode ? "text-yellow-400" : "text-blue-600"
                        }`}
                      >
                        ✓ Selected
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Actions ── */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className={`px-5 py-2 rounded-lg text-sm border transition ${
                darkMode
                  ? "border-gray-600 text-gray-400 hover:bg-gray-800"
                  : "border-gray-300 text-gray-500 hover:bg-gray-100"
              }`}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-5 py-2 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Create User
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
