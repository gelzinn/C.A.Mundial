/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  root: true,
  env: {
    node: true,
    API_KEY: "AIzaSyC350FgZ5eHd8klQy6aO5Z6EN6yrVhckio",
    AUTH_DOMAIN: "camundial-4faa1.firebaseapp.com",
    DATABASE_URL: "https://camundial-4faa1-default-rtdb.firebaseio.com",
    PROJECT_ID: "camundial-4faa1",
    STORAGE_BUCKET: "camundial-4faa1.appspot.com",
    MESSAGING_SENDER_ID: "546762496336",
    APP_ID: "1:546762496336:web:e3dc46fbaf39e0f3adb455",
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/warnings",
  ],
  rules: {
    "import/order": [
      "error",
      {
        groups: [["builtin", "external"]],
        "newlines-between": "always",
      },
    ],
  },
};
