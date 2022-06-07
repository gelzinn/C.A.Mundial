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
    color: var(--white);
    /* &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-track {
      background: rgba(130, 87, 229, 0.1);
    }
    &::-webkit-scrollbar-thumb {
      background: var(--primary);
      transition: var(--transition);
    }
    &::-webkit-scrollbar-thumb:hover {
      background: var(--tertiary);
    } */
  }
  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
  }
`;
