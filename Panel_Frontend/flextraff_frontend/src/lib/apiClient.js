// src/lib/apiClient.js
const BASE_URL = import.meta.env.VITE_API_BASE || "http://localhost:8001";


async function request(path, { method = "GET", body = null, headers = {} } = {}) {
  const opts = { method, headers: { ...headers } };
  if (body) {
    opts.headers["Content-Type"] = "application/json";
    opts.body = JSON.stringify(body);
  }
  const res = await fetch(`${BASE_URL}${path}`, opts);
  const text = await res.text();
  let data = text ? JSON.parse(text) : null;
  if (!res.ok) throw { status: res.status, data };
  return data;
}

export const api = {
  getJunctions: () => request("/junctions"),
  getJunctionStatus: (id) => request(`/junction/${id}/status`),
  getJunctionHistory: (id) => request(`/junction/${id}/history`),
  getDailySummary: () => request("/daily-summary"),
  calculateTiming: (payload) => request("/calculate-timing", { method: "POST", body: payload }),
  logVehicleDetection: (payload) =>
    request("/log-vehicle-detection", { method: "POST", body: payload }),
  // optional CRUD if backend supports create/update/delete for junctions
  createJunction: (payload) => request("/junctions", { method: "POST", body: payload }),
  updateJunction: (id, payload) => request(`/junctions/${id}`, { method: "PUT", body: payload }),
  deleteJunction: (id) => request(`/junctions/${id}`, { method: "DELETE" }),
  // for live streaming (if backend exposes event stream)
  liveTimingUrl: () => `${BASE_URL}/live-timing`,
};
