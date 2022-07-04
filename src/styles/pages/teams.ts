import styled from "styled-components";

export const TeamsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;
  margin: 1rem;

  > a {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    max-width: 1120px;
    min-height: 8rem;

    margin: 0 1rem;
    text-decoration: none;
    color: var(--black);
    transition: var(--transition);
    border-radius: 4px;

    border: 1px dashed transparent;

    > div {
      display: flex;
      justify-content: center;
      align-items: center;

      gap: 1rem;

      .info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
      }

      > .logo {
        display: flex;
        justify-content: center;
        align-items: center;

        min-width: 128px;
        width: 100%;
        max-width: 128px;
        min-height: 128px;
        height: 100%;
        max-height: 128px;
        overflow: hidden;
        border-radius: 4px;
        padding: 1rem;

        transition: var(--transition);

        > img {
          width: 100%;
          height: 100%;
          max-height: 120px;
          object-fit: contain;

          pointer-events: none;
          user-select: none;
        }
      }
    }

    > .location {
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      gap: unset;
      padding: 0 1rem;

      > span {
        font-weight: bold;
      }
    }

    &:hover {
      background: linear-gradient(to right, transparent, #e6e6e675);
      border: 1px dashed #e6e6e6;
    }

    @media (max-width: 768px) {
      flex-direction: column;
      gap: unset;

      background: linear-gradient(to bottom, transparent, #e6e6e675);
      border: 1px dashed #e6e6e6;

      &:hover {
        background: #e6e6e675;
      }

      > div {
        .logo {
          padding: 1rem;
        }
      }

      > .location {
        padding: 1rem 0;
        align-items: center;
        padding: 1rem 0;

        > span {
          display: none;
        }
      }
    }

    @media (max-width: 400px) {
      > div {
        flex-direction: column;

        .info {
          align-items: center;
          text-align: center;
        }
      }
    }
  }

  > span {
    text-transform: uppercase;
    text-align: center;
    font-size: 2.5rem;
    font-weight: 900;
    line-height: 100%;
    margin-bottom: 1rem;
  }

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;
