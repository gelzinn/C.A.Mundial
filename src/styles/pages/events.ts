import styled from "styled-components";

export const CompetitionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .competitions {
    display: flex;
    flex-direction: column;
    overflow: hidden;

    li {
      position: relative;
      cursor: pointer;
      text-align: center;

      transition: var(--transition);

      &.without-image {
        color: var(--black);
      }

      &:not(.without-image) {
        .info {
          color: var(--white);
        }
      }

      .info {
        padding: 1rem;
      }

      min-height: 200px;
      height: 100%;
      max-height: 250px;
      width: 100%;
      max-width: 600px;

      overflow: hidden;
      order: 2;

      > .info {
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: center;
        align-items: center;
        position: absolute;

        top: 0;
        left: 0;

        width: 100%;
        height: 100%;
        gap: 0.75rem;

        z-index: 1;

        > span {
          font-weight: bold;
          text-transform: uppercase;
          line-height: 100%;
          font-size: 1.25rem;
        }

        > button {
          font-weight: bold;
          font-size: 1rem;
          border: unset;
          background: var(--primary);
          padding: 0.75rem 2rem;
          border-radius: 4px;
          color: var(--white);
          transition: var(--transition);

          cursor: pointer;

          &:hover {
            background: var(--primary-hover);
          }
        }
      }

      > img {
        height: 100%;
        width: 100%;

        object-fit: cover;
        pointer-events: none;
        user-select: none;
        z-index: 0;

        filter: brightness(25%) blur(1.5px);

        transition: var(--transition);
      }

      &:hover {
        filter: brightness(80%);
      }
    }

    .highlighted {
      position: relative;

      height: 60vh;
      width: 100vw;
      order: 1;

      border-bottom: 1px solid var(--shape);
      cursor: pointer;

      > .info {
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: center;
        align-items: center;
        position: absolute;

        width: 100%;
        height: 100%;
        gap: 0.75rem;

        z-index: 1;
        color: var(--white);

        > span {
          font-weight: bold;
          text-transform: uppercase;
          line-height: 100%;
          font-size: 1.5rem;
        }

        > button {
          text-transform: uppercase;
          font-weight: bold;
          font-size: 1rem;
          border: unset;
          background: var(--primary);
          padding: 0.75rem 2rem;
          border-radius: 4px;
          color: var(--white);
          transition: var(--transition);

          cursor: pointer;

          &:hover {
            background: var(--primary-hover);
          }
        }

        &.without-image {
          color: var(--black);
        }
      }

      > img {
        height: 100%;
        width: 100%;

        object-fit: cover;
        pointer-events: none;
        user-select: none;
        z-index: 0;

        /* mask-image: linear-gradient(to top, transparent, black); */
        filter: brightness(20%) blur(0.5px);

        transition: var(--transition);
      }

      @media (max-width: 500px) {
        text-align: center;
        height: 40vh;

        .info {
          width: 100%;
          padding: 0 1rem;
        }
      }
    }

    .events-warning {
      order: 2;
      text-align: center;
      margin: 2rem 1rem;

      > svg {
        width: 100%;
        max-width: 4rem;
        height: 100%;
        margin-bottom: 1rem;
      }

      .image {
        width: 100%;
        max-width: 300px;
      }

      > h1 {
        text-transform: uppercase;
        line-height: 100%;
      }
    }

    .all-events {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;

      padding: 0 1rem 1rem;
      gap: 1rem;
      order: 2;

      > li {
        flex-grow: 1;
        flex-basis: 600px;
        max-width: 600px;

        height: 250px;
        border-radius: 4px;

        background: linear-gradient(to bottom, transparent, #e6e6e675);
        border: 1px dashed #e6e6e6;

        &.without-image {
          padding: 2rem 0;

          &.today {
            color: var(--white);
          }
        }

        &.today {
          background: var(--green);
          border: 1px dashed var(--green);
          box-shadow: inset 0 0 0 5px var(--green);
        }
      }
    }
  }

  list-style-type: none;
`;

export const EventsHistory = styled.div`
  margin: 1rem auto;
  max-width: 1120px;
  padding: 0 1rem;

  .title {
    text-align: center;
    margin: 2rem 1rem;

    > h1 {
      text-transform: uppercase;
      line-height: 100%;
    }
  }

  .container {
    display: flex;
    flex-wrap: wrap;

    gap: 1rem;

    list-style-type: none;

    li {
      width: 100%;
      height: auto;

      flex-basis: 350px;
      flex-grow: 1;
      background: var(--black);
      color: var(--white);
      border-radius: 4px;
      overflow: hidden;
      transition: var(--transition);

      > img {
        width: 100%;
        height: 300px;
        object-fit: cover;

        user-select: none;
        pointer-events: none;
        transition: var(--transition);

        @media (min-width: 900px) {
          filter: brightness(50%) grayscale(1);
        }
      }

      .info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 2rem 1rem;
        background: var(--black);

        height: calc(100% - 300px);

        text-align: center;

        gap: 1rem;

        > span {
          font-weight: bold;
          text-transform: uppercase;
        }
      }

      @media (min-width: 900px) {
        &:hover {
          > img {
            filter: unset;
          }
        }
      }
    }
  }
`;
