import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["core/index.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  minify: true,
  treeshake: true,
  splitting: false,
  target: "es2020",
  outDir: "dist",
});
