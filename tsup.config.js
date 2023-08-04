import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    cli: 'src/index.ts'
  },
  splitting: false,
  sourcemap: true,
  clean: true,
  target: 'node20.4',
  format: "esm"
})
