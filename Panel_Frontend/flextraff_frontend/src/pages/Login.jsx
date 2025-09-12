import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/flextraff_logo.png";

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(""); // error state
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError(""); // reset previous error

    try {
      if (user === "admin" && pass === "admin123") {
        localStorage.setItem("auth", true);
        navigate("/dashboard");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="grid grid-cols-2 h-screen">
      {/* Left Side Logo */}
      <div className="flex items-center justify-center bg-white p-6">
        <img
          src={logo}
          alt="FlexTraff_Logo"
          className="max-h-[80%] object-contain drop-shadow-lg"
        />
      </div>

      {/* Right Side Login Form */}
      <div className="flex items-center justify-center bg-gray-950">
        <form
          onSubmit={handleLogin}
          className="bg-gray-900/90 backdrop-blur-md p-10 rounded-2xl shadow-xl w-96 border border-gray-700"
        >
          <h1 className="text-3xl font-bold text-yellow-400 mb-8 text-center tracking-wide">
            FlexTraff Admin
          </h1>

          {/* Username */}
          <div className="mb-5">
            <label className="block text-sm text-gray-300 mb-2">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="block text-sm text-gray-300 mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-400 text-sm mb-4">{error}</p>
          )}

          {/* Button */}
          <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-lg shadow-md transition duration-200">
            Login
          </button>

          {/* Small footer text */}
          <p className="text-xs text-gray-500 text-center mt-6">
            🚦 Authorized access only
          </p>
        </form>
      </div>
    </div>
  );
}
