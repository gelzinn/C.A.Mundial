import styled from "styled-components";

export const FooterContainer = styled.footer`
  z-index: 1000;
`;

export const FastNavigation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  background: var(--shape);
  color: var(--white);
  padding: 1.5rem;

  border: 1px var(--shape-dark);
  border-style: solid none;

  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;

    gap: 1rem;

    width: 100%;
    max-width: 1120px;

    text-transform: capitalize;

    > p {
      font-weight: bold;
    }

    a {
      text-decoration: none;
      color: var(--text);
      transition: var(--transition);

      &:hover {
        color: var(--white);
      }
    }

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }
`;

export const RightsAndSocial = styled.div`
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

export const CompanyLegalData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  background: var(--shape);
  color: var(--text);
  padding: 1.5rem;

  > p {
    max-width: 1120px;
    text-align: center;
  }
`;
