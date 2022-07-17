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
  padding: 2rem;

  border: 1px solid var(--shape-dark);
  border-style: solid none;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    gap: 2rem;

    width: 100%;
    max-width: 1120px;

    > ul {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      gap: 1rem;

      img {
        width: 100%;
        max-width: 5rem;

        user-select: none;
        pointer-events: none;
      }

      > p {
        color: var(--text);
      }

      > span {
        text-transform: uppercase;
        font-weight: bold;
        cursor: default;
      }

      &:not(:first-child) {
        a {
          position: relative;
          text-decoration: none;
          transition: var(--transition);
          color: var(--text);
          line-height: 2rem;

          &:before {
            content: "";
            position: absolute;
            bottom: 0;
            right: 0;
            width: 0;
            height: 2px;
            background: var(--primary);
            transition: width 0.6s cubic-bezier(0.25, 0.5, 0.5, 1);
          }

          &:hover {
            color: var(--white);

            &:before {
              left: 0;
              right: 0;
              width: 100%;
            }
          }
        }
      }

      &:first-child {
        width: 100%;
        max-width: 260px;
      }
    }

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
      text-align: center;

      > ul {
        align-items: center;
        width: 100%;
      }
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
