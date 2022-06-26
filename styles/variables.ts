import { css } from "styled-components";

export const Variables = css`
  :root {
    // Font
    --font-main: "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

    // Colors
    --background: #fef9ff;
    --black: #09090a;
    --white: #fff;

    --primary: #cead00;
    --primary-hover: #ceaa00;

    --text: #27272a;
    --text-secondary: #71717a;
    --text-on-tooltip: #f4f4f5;

    // Other Values
    --max-width: 900px;
    --transition: 0.2s ease;
    --transition-medium: 0.35s ease-in-out;
    --transition-low: 0.5s ease;
    --transition-turtle: 0.75s ease;
    --transition-slowest: 3s ease-in-out;
  }
`;
