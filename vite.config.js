import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import dotenv from "dotenv";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";

dotenv.config();

export default defineConfig({
  define: {
    "import.meta.env.VITE_API_ZERODEV_PROJECT_ID": JSON.stringify(
      "a48ba5f6-0dcf-4a51-b7ae-b72ddb83c14e"
    ),
    "import.meta.env.VITE_API_WEB3AUTH_CLIENTID": JSON.stringify(
      "BKK0Wou6EXM1bUgBtQhlCGSHhB_ghRUpuJGjnl4W_FhNfCBWvNi71Ckc9qUq6IR88YyrPz4mRZ7Jb7iXScHgnuk"
    ),
    "import.meta.env.VITE_API_GOOGLE_ID": JSON.stringify(
      "34320206936-vuacc32homtcggdp9djdsaa8v7honbpd.apps.googleusercontent.com"
    ),
    "import.meta.env.VITE_API_APP_ALCHEMY_KEY": JSON.stringify(
      "vBwEupHTfqXRo7CLn6GOVIy6g2oZ8i5H"
    ),
    "import.meta.env.VITE_API_ALCHEMY_API_KEY": JSON.stringify(
      "https://eth-mainnet.g.alchemy.com/v2/vBwEupHTfqXRo7CLn6GOVIy6g2oZ8i5H"
    ),
    "import.meta.env.VITE_API_MORALIS_API_KEY": JSON.stringify(
      "AbnLG53x7xee2CCFoJSTqc1eCczyclLBdAiayTsscAcq6Il0VPg6qKGtMM88Yx52"
    ),
    "import.meta.env.VITE_API_PAYMASTER_SESSION_KEY": JSON.stringify(
      "016d80a10e14a107ad54e90426ee2ebf21e8ae9e5e869700470167f3af8988f5"
    ),
    "import.meta.env.VITE_API_ACCESSCODE": JSON.stringify("ERC4337"),
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "./src/main.jsx", // Set the output file name to 'main.js'
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
