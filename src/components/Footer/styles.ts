import styled from "styled-components";

export const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  background: var(--shape);
  color: var(--white);
  padding: 1.5rem;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    max-width: 1120px;
    margin: 0 1rem;

    @media (max-width: 768px) {
      text-align: center;
      flex-direction: column-reverse;
      gap: 1rem;

      .follow-us {
        flex-direction: column;
        gap: unset;

        > p {
          display: none;
        }
      }
    }
  }

  .follow-us {
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: capitalize;
    gap: 1rem;

    .social-icons {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;

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
          padding: 0.5rem;
          fill: var(--white);
          transition: var(--transition);
          border-radius: 4px;
          cursor: pointer;

          &:hover {
            background: var(--shape-dark);
          }
        }
      }
    }
  }
`;
