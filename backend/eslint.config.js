import globals from "globals";
import pluginJs from "@eslint/js";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended, // Podstawowa konfiguracja ESLint
  prettierConfig, // Wyłącza reguły ESLint, które mogą kolidować z Prettierem
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error", // Włącza integrację Prettiera jako reguły ESLint
    },
  },
];
