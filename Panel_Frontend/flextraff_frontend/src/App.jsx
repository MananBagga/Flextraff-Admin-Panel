import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Controls from "./pages/controls"; // Updated to capital C
import { ThemeProvider, ThemeContext } from "./components/themecontext";
import TrafficData from "./pages/Traffic_data";
import Logs from "./pages/Logs";
import Scanners from "./pages/Scanners";
import { useContext } from "react";

function AppRoutes() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/controls"
          element={
            <ProtectedRoute>
              <Controls darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/traffic-data"
          element={
            <ProtectedRoute>
              <TrafficData
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/logs"
          element={
            <ProtectedRoute>
              <Logs darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/scanners"
          element={
            <ProtectedRoute>
              <Scanners darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  );
}
