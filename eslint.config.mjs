import { defineConfig, globalIgnores } from "eslint/config";
import * as nextVitalsModule from "eslint-config-next/core-web-vitals.js";
import * as nextTsModule from "eslint-config-next/typescript.js";

const normalize = (module: unknown) => {
  const config = (module as { default?: unknown }).default ?? module;
  return Array.isArray(config) ? config : [config];
};

export default defineConfig([
  ...normalize(nextVitalsModule),
  ...normalize(nextTsModule),
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"])
]);
