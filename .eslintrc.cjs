// @ts-check
const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
  root: true,
  extends: [
    "with-tsconfig",
    "plugin:react-hooks/recommended",
    "plugin:@eslint-react/recommended-legacy",
  ],
  rules: {
    "no-console": [
      "warn",
      {
        allow: [
          "info",
          "warn",
          "error",
        ],
      },
    ],
    "sonarjs/no-duplicate-string": "warn",
    "react/no-unused-prop-types": "off",
    "@typescript-eslint/no-redeclare": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "tailwindcss/no-custom-classname": "off",
    "security/detect-object-injection": "off",
  },
  ignorePatterns: ["node_modules/", "dist/", "src-tauri", "updater"],
  overrides: [
    {
      files: [
        "scripts/**/*.ts",
        "./*.config.ts",
        ".eslintrc.cjs",
      ],
      rules: {
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
      },
      parserOptions: {
        project: "tsconfig.node.json",
      },
    },
    {
      files: [
        "src/i18n/i18n-*.@(ts|tsx)",
      ],
      rules: {
        "unicorn/no-abusive-eslint-disable": "off",
      },
    },
    {
      files: [
        "src/**/*.css.ts",
      ],
      rules: {
        "sonarjs/no-duplicate-string": "off",
      },
    },
  ],
});
