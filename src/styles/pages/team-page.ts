import styled from "styled-components";

export const AboutTeamContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > div {
    width: 100%;
    margin: 1rem;
    max-width: 1120px;
  }
`;

export const TeamInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 1rem;

  > header {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    width: 100%;
    padding: 0 1rem;

    text-align: center;

    > svg {
      position: absolute;
      width: 100%;
      max-width: 2rem;
      height: 100%;
      max-height: 2rem;

      cursor: pointer;

      left: 0;
      margin: 0 1rem;
    }
  }

  > .about-team {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    width: 100%;
    gap: 1rem;
    padding: 0 1rem;

    > .logo {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      border: 1px dashed #e6e6e6;

      width: 100%;
      max-width: 20rem;
      height: 100%;
      /* max-height: 550px; */

      border-radius: 4px;

      > span {
        text-transform: uppercase;
        text-align: center;
        font-weight: bold;
        width: 100%;

        background: #e6e6e675;
        border-bottom: 1px dashed #e6e6e6;
        padding: 1rem 0;
      }

      .source {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 100%;
        height: 100%;
        min-height: calc(350px - 52px);
        padding: 2rem;

        > img {
          width: 100%;
          height: 100%;
          object-fit: contain;

          pointer-events: none;
          user-select: none;
          border-radius: 4px;
        }
      }
    }

    > .team-info {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;

      width: 100%;
      height: 100%;
      gap: 1rem;

      span {
        font-weight: bold;
      }

      > ul {
        display: flex;
        flex-direction: column;

        /* background: linear-gradient(to right, transparent, #e6e6e675); */
        border: 1px dashed #e6e6e6;
        border-radius: 4px;

        > span {
          text-transform: uppercase;
          text-align: center;
          width: 100%;

          background: #e6e6e675;
          border-bottom: 1px dashed #e6e6e6;
          padding: 1rem 0;
        }

        > ul {
          display: flex;
          flex-direction: column;

          gap: 1rem;
          padding: 1rem 2rem;

          list-style-type: none;
        }
      }
    }

    @media (max-width: 900px) {
      flex-direction: column;
      align-items: center;

      .team-info {
        justify-content: flex-start;
        min-height: unset;
      }

      > .logo {
        justify-content: center;
        width: 100%;
        max-width: unset;
        min-height: unset;

        .source {
          min-height: unset;
        }

        img {
          width: 100%;
          height: 100%;
          max-height: 20rem;
        }
      }
    }
  }
`;

export const PlayersContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    border: 1px dashed #e6e6e6;
    border-radius: 4px;
    > span {
      width: 100%;
      text-transform: uppercase;
      text-align: center;
      font-weight: bold;
      background: #e6e6e675;
      border-bottom: 1px dashed #e6e6e6;
      padding: 1rem 0;
    }
  }
  .players {
    display: flex;
    flex-direction: column;
    width: 100%;
    .table {
      text-align: left;
    }
  }
  .warn {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 1rem;
    margin: 1rem;
    > svg {
      width: 100%;
      max-width: 3rem;
      height: 100%;
    }
    > span {
      text-transform: uppercase;
      font-weight: bold;
    }
  }
  .player,
  .table {
    display: grid;
    grid-template-columns: 3rem 50fr 30fr 20fr;
    align-items: center;
    width: 100%;
    padding: 0 1rem;
    overflow: hidden auto;
    input {
      width: 100%;
      max-width: 300px;
      border: 1.5px solid var(--black);
      color: var(--black);
      padding: 5px;
      font-size: 18px;
      border-radius: 4px;
      background: transparent;
    }
    .info {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 1rem;
      width: 100%;
      > span {
        text-transform: capitalize;
      }
      > p {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.5rem;
        border-radius: 0.5rem;
        font-weight: bold;
        font-size: 0.75rem;
        text-align: center;
        width: 100%;
        max-width: 5rem;
        height: 2rem;
        text-transform: uppercase;
        background: var(--black);
        color: var(--white);
        cursor: default;
        pointer-events: none;
        user-select: none;
      }
      > img {
        width: 100%;
        max-width: 4rem;
        height: 100%;
        max-height: 4rem;
        border-radius: 0.15rem;
        /* border: 1px solid var(--black); */
        object-fit: contain;
        pointer-events: none;
        user-select: none;
      }
    }
  }
  .player {
    gap: 1rem;
    > p {
      text-align: right;
      text-transform: capitalize;
    }
    > #number {
      text-align: left;
    }
    > #left {
      text-align: left;
    }
    &:nth-child(even) {
      background: #e6e6e675;
    }
    @media (max-width: 1120px) {
    }
  }
  .table {
    margin: 1rem 0;
    font-weight: bold;
    > p {
      text-align: right;
      text-transform: capitalize;
    }
    > div {
      display: flex;
      gap: 3rem;
    }
    > #number {
      text-align: left;
    }
    > #left {
      text-align: left;
    }
  }
`;
