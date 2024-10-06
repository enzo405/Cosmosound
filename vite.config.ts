import { UserConfig, defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { readdirSync } from "fs";

const absolutePathAliases: { [key: string]: string } = {};
// Root resources folder
const srcPath = path.resolve("./src/");
// Ajust the regex here to include, .js, .jsx, etc.. files from the src folder
const srcRootContent = readdirSync(srcPath, { withFileTypes: true }).map((dirent) =>
  dirent.name.replace(/(\.ts){1}(x?)/, ""),
);

srcRootContent.forEach((directory) => {
  absolutePathAliases[directory] = path.join(srcPath, directory);
});

export default ({ mode }: UserConfig) => {
  // Load app-level env vars to node-level env vars.
  process.env = { ...process.env, ...loadEnv(mode!, process.cwd()) };

  return defineConfig({
    envDir: ".env",
    server: {
      port: 3000,
    },
    resolve: { alias: { ...absolutePathAliases } },

    plugins: [react()],
  });
};
