// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { crx } from "file:///home/project/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// manifest.json
var manifest_default = {
  manifest_version: 3,
  name: "Webpage Summarizer",
  version: "1.0.0",
  description: "AI-powered webpage summarization",
  action: {
    default_popup: "index.html"
  },
  permissions: [
    "activeTab",
    "storage"
  ],
  icons: {
    "16": "icon.svg",
    "48": "icon.svg",
    "128": "icon.svg"
  }
};

// vite.config.ts
var vite_config_default = defineConfig({
  plugins: [react(), crx({ manifest: manifest_default })]
});
export {
  vite_config_default as default
};
