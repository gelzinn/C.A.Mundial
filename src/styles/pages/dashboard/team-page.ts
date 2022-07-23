import styled from "styled-components";

export const AboutTeamContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > div {
    width: 100%;
    margin: 0 0 1rem;
    /* max-width: 1120px; */
  }
  &.editing {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > div > div {
      > header {
        background: var(--primary);
      }
      @media (min-width: 900px) {
        > div {
          max-height: 650px;
          .team-info {
            min-height: 650px;
            height: 100%;
            max-height: 650px;
          }
          .logo {
            max-height: 650px;
            > .source {
              min-height: calc(650px - 52px);
            }
          }
        }
      }
    }
  }
`;

export const EditingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 1rem;
  /* border: 2px dashed var(--primary); */
  border-radius: 4px;
  /* padding: 2rem 0; */
  > p {
    color: var(--primary);
    font-weight: bold;
    font-size: 1.5rem;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 1rem;
    > span {
      &:before {
        content: "“";
      }
      &:after {
        content: "”";
      }
    }
  }
  > div {
    width: 100%;
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
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    padding: 1rem;
    text-align: center;
    position: sticky;
    top: 0;
    background: var(--black);
    color: var(--white);
    > h1 {
      line-height: 100%;
    }
    > svg {
      position: absolute;
      width: 100%;
      max-width: 3rem;
      height: 100%;
      max-height: 3rem;
      padding: 0.75rem;
      cursor: pointer;
      left: 0;
      margin: 0 1rem;
      border-radius: 50%;
      transition: var(--transition);
      &:hover {
        background: var(--shape);
      }
      @media (max-width: 500px) {
        margin: 0 0.5rem 0;
      }
    }
    @media (max-width: 500px) {
      > h1 {
        width: 100%;
        text-align: right;
        padding-left: 32px;
        font-size: 1.5rem;
      }
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
          input {
            width: 100%;
            border: 1.5px solid var(--black);
            color: var(--black);
            padding: 5px;
            font-size: 18px;
            border-radius: 4px;
          }
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
        /* border: 1px solid var(--black); */
        object-fit: contain;
        pointer-events: none;
        user-select: none;
      }
    }
  }
  .player {
    border: unset;
    font-size: 1rem;
    background: unset;
    transition: var(--transition);
    cursor: pointer;
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
    &:hover {
      background: linear-gradient(to left, var(--shape), var(--black));
      color: var(--white);
    }
    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      padding: 1rem;
      > p {
        display: none;
      }
      .info {
        justify-content: flex-start;
        > span {
          text-align: center;
        }
        > img {
          border-radius: 0.15rem;
        }
      }
    }
    @media (max-width: 500px) {
      .info {
        flex-direction: column;
      }
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
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

export const DangerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 1rem;
    border: 1px dashed var(--red);
    border-radius: 4px;
    > span {
      width: 100%;
      text-transform: uppercase;
      text-align: center;
      font-weight: bold;
      background: var(--red);
      color: var(--white);
      padding: 1rem 0;
    }
    > p {
      text-align: center;
      margin: 0 1rem;
    }
    .actions {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 0 2rem;
      margin: 1rem 0;
      gap: 1rem;
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        list-style-type: none;
        width: 100%;
        gap: 1rem;
        > div {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          width: 100%;
          gap: 1rem;
          > svg {
            width: 100%;
            max-width: 3rem;
            height: 100%;
            color: var(--red);
            fill: var(--red);
            border: 1px dashed var(--red);
            border-radius: 4px;
            padding: 0.5rem;
          }
          .info {
            > span {
              font-weight: bold;
              text-transform: uppercase;
              color: var(--red);
            }
            p {
              text-align: justify;
            }
          }
        }
        > button {
          width: 100%;
          max-width: 300px;
          padding: 1rem 2rem;
          background: var(--red);
          border: unset;
          color: var(--white);
          font-weight: bold;
          border-radius: 4px;
          cursor: pointer;
          text-transform: uppercase;
        }
        @media (max-width: 900px) {
          flex-direction: column;
          justify-content: center;
          > div {
            align-items: flex-start;
            justify-content: flex-start;
            .info {
              width: 100%;
            }
          }
          > button {
            max-width: unset;
          }
        }
        @media (max-width: 500px) {
          > div {
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            .info > p {
              text-align: center;
            }
          }
        }
      }
    }
  }
  &.editing {
    > div {
      border: 1px dashed var(--primary);
      > span {
        background: var(--primary);
      }
      .actions > li {
        > div {
          > svg {
            color: var(--primary);
            fill: var(--primary);
            border: 1px dashed var(--primary);
          }
          .info > span {
            color: var(--primary);
          }
        }
        > button {
          background: var(--primary);
        }
      }
    }
  }
`;

export const PlayerInfoContainerModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  gap: 0.5rem;
  .about-player {
    display: grid;
    grid-template-columns: 50fr 50fr;
    align-items: flex-start;
    justify-content: flex-start;
    flex: 1;
    flex-grow: 1;
    width: 100%;
    height: 100%;
    > img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      user-select: none;
      pointer-events: none;
    }
    > span {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      width: 100%;
      height: 100%;
      position: relative;
      > div {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;
        height: 100%;
        > div {
          display: flex;
          flex-direction: column;
          width: 100%;
          padding: 1rem;
          gap: 0.25rem;
          > span {
            text-transform: uppercase;
            font-weight: bold;
            font-size: 1.25rem;
            width: 100%;
          }
          > p > i {
            background: var(--primary);
            color: var(--white);
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
          }
        }
      }
      footer {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        background-color: var(--red);
        padding: 1rem;
        > button {
          width: 100%;
          text-transform: uppercase;
          font-weight: bold;
          font-size: 1rem;
          border: 1px solid var(--white);
          background: unset;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          color: var(--white);
          transition: var(--transition);
          cursor: pointer;
          &:hover {
            background: var(--white);
            color: var(--red);
          }
        }
        @media (min-width: 768px) {
          position: absolute;
          bottom: 0;
        }
      }
    }
    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      /* > img {
        border-radius: 0.15rem;
      } */
      .info {
        > div {
          width: 100%;
          padding: 0 1rem;
        }
      }
    }
  }
`;
