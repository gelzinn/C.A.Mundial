import styled from "styled-components";

export const EventContainer = styled.div`
  position: relative;

  margin: 0 0 4rem;

  .back-arrow {
    color: var(--white);

    > svg {
      position: absolute;
      width: 100%;
      max-width: 3rem;
      height: 100%;
      max-height: 3rem;
      padding: 0.75rem;
      cursor: pointer;
      left: 0px;
      margin: 1rem;
      z-index: 1;
      border-radius: 50%;
      transition: var(--transition);

      &:hover {
        background: var(--shape);
      }
    }
  }

  > img {
    width: 100%;
    min-height: 400px;
    height: 50vh;
    object-fit: cover;
    mask-image: linear-gradient(to top, transparent, black, black);
    pointer-events: none;
    user-select: none;
    z-index: 0;

    &.today {
      filter: invert(60%) sepia(96%) saturate(187%) hue-rotate(97deg)
        brightness(90%) contrast(104%);
    }

    @media (max-width: 768px) {
      height: 25vh;
    }

    @media (max-width: 468px) {
      min-height: 200px;
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: -2.5rem auto 0;
    padding: 0 1rem;
    z-index: 1;

    gap: 4rem;

    width: 100%;
    max-width: 1120px;

    text-align: center;

    > header {
      display: grid;
      grid-template-columns: 65fr 35fr;

      justify-content: space-between;
      align-items: flex-start;

      width: 100%;

      .ages {
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        gap: 0.5rem;

        > span {
          text-align: right;
          /* text-transform: capitalize; */
          line-height: 100%;
          font-size: 2rem;
          font-weight: bold;
        }

        > ul {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.25rem;
          list-style-type: none;

          li {
            background: #e6e6e675;
            padding: 1rem;
            border-radius: 4px;
            transition: var(--transition);
            cursor: default;

            &:hover {
              box-shadow: inset 0 0 0 2px var(--primary);
            }
          }
        }
      }
    }

    .basic-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      gap: 0.5rem;

      > h1 {
        text-align: left;
        /* text-transform: capitalize; */
      }

      .date-and-location {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 1rem;

        width: 100%;
      }

      .location {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .dates {
        color: var(--white);
        background: var(--primary);
        padding: 0.5rem 1rem;
        border-radius: 4px;

        &.today {
          background: var(--green);

          text-transform: uppercase;
          line-height: 100%;
          font-weight: bold;
        }
      }
    }

    > .about-event {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 3rem;

      span {
        /* text-transform: capitalize; */
        line-height: 100%;
        font-size: 2rem;
        font-weight: bold;
      }

      .description {
        display: flex;
        flex-direction: column;
        align-items: center;

        gap: 0.5rem;

        > p {
          text-align: justify;
          text-align-last: center;
        }
      }
    }

    .countdown {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      gap: 1rem;

      .title {
        > span {
          text-transform: uppercase;
          line-height: 100%;
          font-size: 2rem;
          font-weight: bold;
        }
      }
    }

    .time-to-wait {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;

      gap: 1rem;

      list-style-type: none;

      > li {
        display: flex;
        flex-basis: 5rem;
        flex-grow: 1;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        min-width: 5rem;
        width: 100%;
        /* max-width: 10rem; */

        position: relative;

        background: #e6e6e675;
        padding: 1rem;
        border-radius: 4px;
        transition: var(--transition);
        cursor: default;

        &:hover {
          box-shadow: inset 0 0 0 2px var(--primary);
        }

        &:not(:first-child):before {
          position: absolute;
          content: ":";
          font-weight: bold;

          left: -11.5%;

          @media (max-width: 495px) {
            content: "";
          }
        }

        > span {
          font-weight: bold;
          font-size: 2rem;
        }
      }
    }

    .subscribe {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      gap: 1rem;
      padding: 2rem 1rem;
      width: 100vw;

      background: var(--primary);
      color: var(--white);

      > .invite {
        > span {
          text-transform: uppercase;
          line-height: 100%;
          font-size: 2rem;
          font-weight: bold;
        }
      }

      > button {
        text-transform: uppercase;
        font-weight: bold;
        font-size: 1rem;

        border: 1px solid var(--white);
        background: unset;
        padding: 0.5rem 2rem;
        border-radius: 4px;
        color: var(--white);

        transition: var(--transition);
        cursor: pointer;

        &:hover {
          background: var(--white);
          color: var(--primary);
        }
      }
    }

    .event-rules {
      display: flex;
      flex-direction: column;

      gap: 1rem;

      background: #e6e6e675;
      padding: 2rem;
      border-radius: 4px;

      width: 100%;

      > span {
        text-align: left;
        line-height: 100%;
        font-size: 2rem;
        font-weight: bold;
      }

      .rules {
        display: flex;
        flex-direction: column;

        gap: 1rem;
        text-align: justify;

        > ul {
          list-style-type: none;

          > span {
            text-align: left;
            font-weight: bold;
            font-size: 1.25rem;
          }

          > li,
          p {
            margin: 1rem 0;
          }

          > p#pu {
            color: var(--red);
          }

          > ul {
            list-style-type: disc;
            list-style-position: outside;

            text-indent: 1rem;
            padding-left: 1rem;

            > li {
              margin: 1rem 0;

              > p {
                margin: unset;
              }
            }

            > ul {
              list-style-type: lower-alpha;
              list-style-position: outside;

              text-indent: 1rem;
              padding-left: 1rem;
            }
          }
        }

        @media (min-width: 768px) {
          margin: 2rem;
        }
      }
    }

    @media (max-width: 768px) {
      .event-rules {
        padding: 2rem 1.5rem;
      }

      > header {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        gap: 3rem;

        > .ages {
          align-items: center;

          > span {
            text-align: center;
          }
        }

        .basic-info {
          > h1 {
            text-align: center;
          }

          > .date-and-location {
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      }

      gap: 3rem;
    }
  }
`;
