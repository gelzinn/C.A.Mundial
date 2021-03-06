import { css } from "styled-components";

export const Variables = css`
  :root {
    // Font
    --font-main: "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

    // Colors
    --background: #fff;
    --black: #09090a;
    --white: #fff;
    --white-dark: #f2f2f2;

    --shape: #121214;
    --shape-light: #1e1e21;
    --shape-light-lowopacity: #28282d50;
    --shape-dark: #060607;
    --shape-dark-lowopacity: #3c3c4225;
    --shape-hover: #29292e;

    --primary: #f9a826;
    --primary-hover: #f5ce00;

    --text: #71717a;
    --text-secondary: #27272a;
    --text-on-tooltip: #f4f4f5;

    --red: #ce4a4a;
    --error: var(--red);

    --green: #04d361;
    --success: var(--green);

    // Other Values
    --max-width: 900px;
    --transition: 0.2s ease;
    --transition-medium: 0.35s ease-in-out;
    --transition-low: 0.5s ease;
    --transition-turtle: 0.75s ease;
    --transition-slowest: 3s ease-in-out;
  }
`;
