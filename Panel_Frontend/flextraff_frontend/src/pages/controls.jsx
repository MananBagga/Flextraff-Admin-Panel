import { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function Controls({ darkMode, toggleDarkMode }) {
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

  // Dynamic input/select styles based on darkMode
  const inputBg = darkMode ? "bg-gray-800" : "bg-gray-100";
  const inputBorder = darkMode ? "border border-gray-700" : "border border-gray-300";
  const inputText = darkMode ? "text-white" : "text-gray-900";
  const inputFocusRing = darkMode ? "focus:ring-yellow-400" : "focus:ring-blue-500";
  const labelText = darkMode ? "text-yellow-400" : "text-blue-700";
  const helperText = darkMode ? "text-yellow-300" : "text-blue-500";

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
        .reduce((acc, l) => (l === lane ? acc + valNum : acc + greenTimes[l]), 0);

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
      alert(`Automatic mode set with Min: ${autoMinCycle}s, Max: ${autoMaxCycle}s`);
    } else {
      alert(
        `Manual mode set with Cycle: ${manualCycle}s and Greens: ${JSON.stringify(
          greenTimes
        )}`
      );
    }
  };

  return (
    <div
      className={`h-screen flex ${
        darkMode ? "bg-gray-950 text-white" : "bg-white text-gray-900"
      } transition-colors duration-300`}
    >
      <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h2 className={`text-3xl font-semibold mb-6 ${labelText}`}>
          Traffic Light Controls
        </h2>

        <form onSubmit={handleSubmit} className="max-w-lg">
          <div className="mb-6">
            <label className={`block mb-2 font-semibold ${labelText}`}>Select Mode</label>
            <select
              value={mode}
              onChange={handleModeChange}
              className={`${inputBg} ${inputBorder} ${inputText} w-full p-3 rounded-lg focus:outline-none ${inputFocusRing}`}
            >
              <option value="automatic">Automatic</option>
              <option value="manual">Manual Override</option>
            </select>
          </div>

          {mode === "automatic" && (
            <>
              <div className="mb-4">
                <label className={`block mb-1 ${labelText}`}>
                  Minimum Cycle Time (seconds)
                </label>
                <input
                  type="number"
                  min="10"
                  value={autoMinCycle}
                  onChange={(e) => setAutoMinCycle(Number(e.target.value))}
                  className={`${inputBg} ${inputBorder} ${inputText} w-full p-3 rounded-lg focus:outline-none ${inputFocusRing}`}
                  required
                />
              </div>
              <div className="mb-4">
                <label className={`block mb-1 ${labelText}`}>
                  Maximum Cycle Time (seconds)
                </label>
                <input
                  type="number"
                  min={autoMinCycle}
                  value={autoMaxCycle}
                  onChange={(e) => setAutoMaxCycle(Number(e.target.value))}
                  className={`${inputBg} ${inputBorder} ${inputText} w-full p-3 rounded-lg focus:outline-none ${inputFocusRing}`}
                  required
                />
              </div>
            </>
          )}

          {mode === "manual" && (
            <div
              className={`space-y-7 border border-gray-700 rounded-lg p-6 ${inputBg} shadow-md`}
            >
              <h3
                className={`text-xl font-semibold mb-3 border-b border-gray-700 pb-2 ${labelText}`}
              >
                Manual Override Settings
              </h3>
              <div>
                <label className={`block mb-2 font-medium ${labelText}`}>
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
                  className={`${inputBg} ${inputBorder} ${inputText} w-full p-3 rounded-lg focus:outline-none ${inputFocusRing}`}
                  required
                />
                <p className={`text-sm mt-1 ${helperText}`}>
                  Total duration of one complete signal cycle.
                </p>
              </div>
              <div>
                <div
                  className={`mb-2 font-semibold border-b border-gray-700 pb-2 ${labelText}`}
                >
                  Individual Lane Green Times
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  {lanes.slice(0, 3).map((lane) => (
                    <div key={lane}>
                      <label
                        className={`block mb-1 capitalize font-medium ${labelText}`}
                      >
                        {lane} Lane
                      </label>
                      <input
                        type="number"
                        min="5"
                        value={greenTimes[lane]}
                        onChange={(e) =>
                          handleGreenTimeChangeManual(lane, e.target.value)
                        }
                        className={`${inputBg} ${inputBorder} ${inputText} w-full p-3 rounded-lg focus:outline-none ${inputFocusRing}`}
                        required
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block mb-1 capitalize font-medium text-gray-400">
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
                {error && <p className="mt-2 text-red-500 font-semibold">{error}</p>}
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
