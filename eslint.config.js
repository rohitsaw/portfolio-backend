import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.node, // Include Node.js globals
      },
    },
  },
  pluginJs.configs.recommended,
];
