/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  root: true,
  env: {
    node: true,
    apiKey: "AIzaSyC350FgZ5eHd8klQy6aO5Z6EN6yrVhckio",
    authDomain: "camundial-4faa1.firebaseapp.com",
    databaseURL: "https://camundial-4faa1-default-rtdb.firebaseio.com",
    projectId: "camundial-4faa1",
    storageBucket: "camundial-4faa1.appspot.com",
    messagingSenderId: "546762496336",
    appId: "1:546762496336:web:e3dc46fbaf39e0f3adb455",
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
