// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8001", // your FastAPI port (main.py runs on 8001)
        changeOrigin: true,
        secure: false,
      },
      // forward websocket path
      "/ws": {
        target: "ws://localhost:8001",
        ws: true,
        changeOrigin: true,
      },
    },
  },
});
