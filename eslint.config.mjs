import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  // Photos are pre-sized JPGs in /public, so plain <img> is fine here.
  { rules: { "@next/next/no-img-element": "off" } },
  // React Bits components are vendored as-is from github.com/DavidHDev/react-bits.
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "src/components/reactbits/**"]),
]);
