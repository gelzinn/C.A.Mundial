import { createGlobalStyle, keyframes } from "styled-components";
import { Variables } from "./variables";

export const GlobalStyles = createGlobalStyle`
  ${Variables}
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: var(--font-main);
  }
  html {
    scroll-behavior: smooth;
    box-sizing: inherit;
    width: 100vw;
    height: max-content;
    overflow-x: hidden;
    background: var(--background);
    color: var(--text);
    -webkit-font-smoothing: antialiased;
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-track {
      background: var(--black);
    }
    &::-webkit-scrollbar-thumb {
      background: var(--primary);
      transition: var(--transition);
    }
    &::-webkit-scrollbar-thumb:hover {
      background: var(--primary-hover);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
  }
`;
