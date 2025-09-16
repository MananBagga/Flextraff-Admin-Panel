import { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function Controls() {
  const [mode, setMode] = useState("automatic");

  // Automatic mode state
  const [autoMinCycle, setAutoMinCycle] = useState(30);
  const [autoMaxCycle, setAutoMaxCycle] = useState(90);

  // Manual mode state
  const [manualCycle, setManualCycle] = useState(60);
  const [greenTimes, setGreenTimes] = useState({
    north: 15,
    south: 15,
    east: 15,
    west: 15,
  });

  const [error, setError] = useState("");
  const lanes = ["north", "south", "east", "west"];

  const handleModeChange = (e) => {
    setMode(e.target.value);
    setError("");
  };

  const handleGreenTimeChangeManual = (lane, value) => {
    let valNum = Number(value);
    if (valNum < 0) valNum = 0;

    if (lane !== "west") {
      const newGreenTimes = { ...greenTimes, [lane]: valNum };

      const sumFirstThree = lanes
        .filter((l) => l !== "west")
        .reduce(
          (acc, l) => (l === lane ? acc + valNum : acc + greenTimes[l]),
          0
        );

      const availableForLast = manualCycle - sumFirstThree;

      if (availableForLast < 0) {
        setError("Not sufficient green time available. Please reduce other lanes.");
        return;
      }

      newGreenTimes["west"] = availableForLast >= 0 ? availableForLast : 0;
      setGreenTimes(newGreenTimes);
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "automatic") {
      alert(
        `Automatic mode set with Min: ${autoMinCycle}s, Max: ${autoMaxCycle}s`
      );
    } else {
      alert(
        `Manual mode set with Cycle: ${manualCycle}s and Greens: ${JSON.stringify(
          greenTimes
        )}`
      );
    }
  };

  return (
    <div className="h-screen flex bg-gray-950 text-white">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-3xl font-semibold text-yellow-400 mb-6">
          Traffic Light Controls
        </h2>

        <form onSubmit={handleSubmit} className="max-w-lg">
          <div className="mb-6">
            <label className="block mb-2 font-semibold">Select Mode</label>
            <select
              value={mode}
              onChange={handleModeChange}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="automatic">Automatic</option>
              <option value="manual">Manual Override</option>
            </select>
          </div>

          {mode === "automatic" && (
            <>
              <div className="mb-4">
                <label className="block mb-1">Minimum Cycle Time (seconds)</label>
                <input
                  type="number"
                  min="10"
                  value={autoMinCycle}
                  onChange={(e) => setAutoMinCycle(e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Maximum Cycle Time (seconds)</label>
                <input
                  type="number"
                  min={autoMinCycle}
                  value={autoMaxCycle}
                  onChange={(e) => setAutoMaxCycle(e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
                  required
                />
              </div>
            </>
          )}

          {mode === "manual" && (
            <div className="space-y-7 border border-gray-700 rounded-lg p-6 bg-gray-900 shadow-md">
  <h3 className="text-xl font-semibold text-gray-100 mb-3 border-b border-gray-700 pb-2">
    Manual Override Settings
  </h3>
  <div>
    <label className="block mb-2 text-gray-400 font-medium">
      Total Cycle Time (seconds)
    </label>
    <input
      type="number"
      min="10"
      value={manualCycle}
      onChange={(e) => {
        const val = Number(e.target.value);
        setManualCycle(val);
        setError("");
        const sumOthers = lanes
          .filter((l) => l !== "west")
          .reduce((acc, l) => acc + greenTimes[l], 0);
        if (sumOthers > val) {
          setError("Assigned green times exceed total cycle time.");
        } else {
          setGreenTimes((gt) => ({
            ...gt,
            west: val - sumOthers,
          }));
        }
      }}
      className="w-full p-3 rounded-lg bg-gray-800 border border-blue-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
    <p className="text-sm text-gray-500 mt-1">
      Total duration of one complete signal cycle.
    </p>
  </div>
  <div>
    <div className="mb-2 text-gray-400 font-semibold border-b border-gray-700 pb-2">
      Individual Lane Green Times
    </div>
    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
      {lanes.slice(0, 3).map((lane) => (
        <div key={lane}>
          <label className="block mb-1 capitalize text-gray-300 font-medium">
            {lane} Lane
          </label>
          <input
            type="number"
            min="5"
            value={greenTimes[lane]}
            onChange={(e) => handleGreenTimeChangeManual(lane, e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 border border-blue-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      ))}
      <div>
        <label className="block mb-1 capitalize text-gray-400 font-medium">
          West Lane (auto-filled)
        </label>
        <input
          type="number"
          value={greenTimes["west"]}
          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-500 text-gray-400 cursor-not-allowed"
          readOnly
        />
        <p className="text-xs text-gray-500 mt-1 italic">
          Auto-calculated from remaining cycle time.
        </p>
      </div>
    </div>
    {error && (
      <p className="mt-2 text-red-500 font-semibold">{error}</p>
    )}
  </div>
</div>

          )}

          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-lg transition mt-4"
          >
            Save Settings
          </button>
        </form>
      </main>
    </div>
  );
}
