import styled from "styled-components";

export const HelpTitle = styled.div`
  order: 2;
  text-align: center;
  margin: 2rem 1rem;
`;

export const HelpContainer = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  max-width: 1120px;
  margin: 4rem auto;
  padding: 0 1rem;

  gap: 2rem;

  > .help-content {
    width: 100%;
    max-width: 600px;
    flex: 1 1 600px;

    > header {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      gap: 2rem;
      margin: 0 0 2rem;

      > h1 {
        font-weight: normal;
      }

      > .input {
        display: flex;
        justify-content: center;
        align-items: flex-start;

        gap: 0.5rem;

        border: 1px solid var(--shape);
        padding: 0.5rem 1rem 0.5rem 0.5rem;
        border-radius: 4px;

        width: 100%;

        &.disabled {
          opacity: 0.5;
          border-color: var(--red);
          color: var(--red);
          cursor: not-allowed;

          > input {
            cursor: not-allowed;

            &::placeholder {
              color: var(--red);
            }
          }
        }

        > input {
          border: unset;
          background: unset;
          width: 100%;

          &:focus {
            outline: unset;
          }
        }
      }
    }

    #about-info {
      margin-bottom: 2rem;
    }

    .questions {
      > ul {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;

        /* gap: 1rem; */

        > span {
          font-size: 1.75rem;
          text-transform: uppercase;
          transition: var(--transition);
        }

        li {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;

          color: var(--text);
          margin: 1.5rem 0;

          gap: 1rem;

          position: relative;

          > span {
            color: var(--black);
            font-weight: 500;
            font-size: 1.25rem;
          }

          > p {
            text-align: justify;

            > p {
              margin: 0.5rem 0;
            }

            a {
              color: var(--primary);
            }
          }
        }
      }
    }
  }

  > .help-side {
    width: 300px;
    height: 100%;
    position: sticky;
    top: 32px;
    padding: 3rem 2rem;

    background: var(--shape);
    color: var(--white);
    border-radius: 4px;

    font-size: 14px;

    > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      gap: 0.5rem;

      &:not(#topics) {
        cursor: pointer;
      }

      span {
        font-weight: bold;
        text-transform: uppercase;
        transition: var(--transition);
      }

      p,
      ul {
        color: var(--text);
        transition: var(--transition);

        list-style-type: none;
      }

      .info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;

        transition: var(--transition);
        gap: 0.5rem;
      }

      & + div {
        box-shadow: inset 0 1px var(--shape-light);
        margin-top: 1rem;
        padding-top: 1rem;
      }

      @media (min-width: 900px) {
        &:hover {
          > .info {
            > p {
              color: unset;
            }
          }
        }
      }
    }

    > #topics {
      > ul {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;

        gap: 0.5rem;

        > a {
          cursor: pointer;
          position: relative;
          transition: var(--transition);
          color: var(--primary);

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }

  @media (max-width: 900px) {
    flex-direction: column;
    justify-content: flex-start;

    gap: unset;

    > .help-content {
      max-width: unset;
    }

    > .help-side {
      position: relative;
      width: 100%;

      padding: unset;
      background: unset;
      color: var(--black);
    }
  }
`;
