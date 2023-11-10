import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import dotenv from "dotenv";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";

dotenv.config();

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "/src/main.jsx", // Set the output file name to 'main.js'
        // Other output options as needed
      },
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      register: true,
      devOptions: {
        enabled: true,
      },
      workbox: {
        mode: "development",
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api.example.com\//,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
            },
          },
        ],
      },
    }),
  ],
  server: {
    port: 3001,
    // Additional server options if needed
  },
});
