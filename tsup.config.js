export const tsup = {
  splitting: true,
  clean: true,
  format: ["cjs", "esm"],
  minify: false,
  bundle: true,
  skipNodeModulesBundle: true,
  entryPoints: ["src/index.ts"],
  target: "esnext",
  treeshake: true,
  tsconfigResolvePaths: {
    "~/*": ["src/*"],
  },
}
