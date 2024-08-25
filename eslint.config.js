import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.node, // Include Node.js globals
      },
    },
    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^next$" }], // Custom rule
    },
  },
  pluginJs.configs.recommended,
];
