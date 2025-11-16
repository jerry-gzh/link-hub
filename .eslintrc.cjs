/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,

  extends: [
    "plugin:astro/recommended",
  ],

  overrides: [
    {
      files: ["**/*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        extraFileExtensions: [".astro"],
      },
    },
    {
      files: ["**/*.ts", "**/*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        sourceType: "module",
        ecmaVersion: 2020,
      },
      plugins: ["@typescript-eslint"],
      extends: ["plugin:@typescript-eslint/recommended"],
    }
  ],
};