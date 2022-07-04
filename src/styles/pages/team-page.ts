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

    > div {
      min-height: 550px;
    }

    > .logo {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      border: 1px dashed #e6e6e6;

      width: 100%;
      max-width: 20rem;
      height: 100%;
      max-height: 550px;

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
        min-height: calc(550px - 52px);
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
      flex-direction: column;
      justify-content: space-between;

      width: 100%;
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

  > span {
    width: 100%;
    text-transform: uppercase;
    text-align: center;
    font-weight: bold;

    background: #e6e6e675;
    border-bottom: 1px dashed #e6e6e6;
    padding: 1rem 0;
  }
`;
