import { defineConfig, UserConfigExport } from "vitest/config";
import { loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as path from "node:path";
import * as fs from "node:fs";

const pkg = JSON.parse(fs.readFileSync("./package.json", "utf8"));

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load app-level env vars to node-level env vars.
  // @ts-ignore
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const baseConfig: UserConfigExport = {
    resolve: {
      alias: {
        src: path.resolve("src/"),
      },
    },

    define: {
      __APP_VERSION__: JSON.stringify(pkg.version),
    },
    // define: {
    //   __VERSION: JSON.stringify(pkg.version),
    // },
    plugins: [
      react({
        // @ts-ignore
        fastRefresh: process.env.NODE_ENV !== "test",
      }),
    ],
  };

  if (mode === "debug") {
    baseConfig.build = {
      sourcemap: true,
      minify: false,
    };
  }

  return baseConfig;
});
