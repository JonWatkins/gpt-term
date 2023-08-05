import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    cli: "src/index.ts",
  },
  splitting: false,
  sourcemap: false,
  clean: true,
  target: "node20.4",
  format: "esm",
});
