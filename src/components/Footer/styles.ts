import styled from "styled-components";

export const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  background: var(--shape);
  color: var(--text);
  padding: 1.5rem;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    max-width: 1120px;
    margin: 0 1rem;
  }

  .follow-us {
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: capitalize;
    gap: 16px;

    .social-icons {
      display: flex;
      justify-content: center;
      align-items: center;

      > a {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 100%;
        height: 100%;
        position: relative;

        > svg {
          width: 2.5rem;
          height: 2.5rem;
          padding: 8px;
          fill: var(--text);
          transition: var(--transition);
          border-radius: 4px;
          cursor: pointer;

          &:hover {
            fill: var(--white);
            background: var(--shape-dark);
          }
        }
      }
    }
  }
`;
