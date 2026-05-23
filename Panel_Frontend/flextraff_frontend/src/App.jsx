import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"; // 👈 Added Navigate here
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Controls from "./pages/controls";
import { ThemeProvider, ThemeContext } from "./components/ThemeContext";
import TrafficData from "./pages/Traffic_data";
import Logs from "./pages/Logs";
import Scanners from "./pages/Scanners";
import { useContext } from "react";
import Verify2FA from "./pages/Verify2fa";
import Setup2FA from "./pages/setup2FA";
import CreateUser from "./pages/CreateUser";
import { AdminRoute } from "./components/ProtectedRoute";
import Users from "./pages/Users";
import UserDetail from "./pages/UserDetail";
import Junctions from "./pages/Junctions";

function AppRoutes() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <Router>
      <Routes>
        {/* 👇 FIX: Handles the root "/" path. If a user loads your site, it forces them to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
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
        <Route path="/verify-2fa" element={<Verify2FA />} />
        <Route path="/setup-2fa" element={<Setup2FA />} />
        <Route
          path="/create-user"
          element={
            <AdminRoute>
              <CreateUser darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            </AdminRoute>
          }
        />
        <Route
          path="/users"
          element={
            <AdminRoute>
              <Users darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            </AdminRoute>
          }
        />
        <Route
          path="/users/:user_id"
          element={
            <AdminRoute>
              <UserDetail darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            </AdminRoute>
          }
        />
        <Route
          path="/junctions"
          element={
            <AdminRoute>
              <Junctions darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            </AdminRoute>
          }
        />

        {/* 💡 OPTIONAL BONUS CATCH-ALL: Handles any typos or invalid URLs */}
        <Route path="*" element={<Navigate to="/login" replace />} />
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
