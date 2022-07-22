import styled from "styled-components";

export const AboutUsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  max-width: 1120px;
  margin: 2rem auto 0;
  gap: 5rem;

  @media (max-width: 900px) {
    gap: 2rem;
  }

  .container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    &.container-vertical {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    @media (min-width: 900px) {
      &:nth-child(even) {
        flex-direction: row-reverse;

        div {
          text-align: justify;
          text-align-last: right;
          align-items: flex-end;
        }
      }
    }

    @media (max-width: 900px) {
      flex-direction: column;
      padding: 1rem;
    }
  }

  .our-team-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 1rem;

    > span {
      text-transform: uppercase;
      font-size: 2.5rem;
      font-weight: 900;
      line-height: 100%;
    }

    .our-team {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;

      list-style-type: none;
      width: 100%;
      gap: 1rem;
      padding: 0 1rem;

      > li {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        justify-content: center;
        align-items: center;

        overflow: hidden;
        flex-basis: 350px;

        width: 100%;
        height: auto;
        color: var(--black);
        border-radius: 4px;

        .info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;

          background: var(--white-dark);
          width: 100%;
          max-width: 350px;
          padding: 1rem 0;
          border-radius: 0 0 4px 4px;

          > span {
            font-weight: bold;
            text-transform: uppercase;
          }

          > p {
            color: var(--text);
          }
        }

        picture {
          width: 100%;
          max-width: 350px;
          min-height: 350px;
          height: 100%;
          max-height: 350px;
          border-radius: 4px 4px 0 0;

          overflow: hidden;

          > img {
            width: 100%;
            height: 100%;

            object-fit: cover;
            pointer-events: none;
            user-select: none;

            transition: var(--transition);

            @media (min-width: 768px) {
              filter: grayscale(1);
            }

            &.zoom-image {
              transform: scale(1.15);
            }
          }

          @media (max-width: 768px) {
            min-height: unset;

            > img {
              max-height: 50%;

              &.zoom-image {
                transform: scale(1.15);
                transform-origin: top;
              }
            }
          }
        }

        @media (min-width: 768px) {
          &:hover {
            > picture > img {
              transform: scale(1.05);
              filter: unset;

              &.zoom-image {
                transform: scale(1.2);
              }
            }
          }
        }

        @media (max-width: 768px) {
          flex-direction: column;

          > .info {
            align-items: center;
          }
        }
      }
    }
  }

  > div:not(.slogan) {
    > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      text-align: justify;
      gap: 1rem;
      width: 100%;
      max-width: 600px;

      > span {
        text-transform: uppercase;
        font-size: 2.5rem;
        font-weight: 900;
        line-height: 100%;
      }
    }

    > img {
      width: 100%;
      max-width: 30rem;
      /* padding: 2rem; */
      pointer-events: none;
      user-select: none;
    }
  }

  .slogan {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100vw;
    background: var(--white-dark);
    color: var(--black);

    padding: 3rem 1rem;
    margin: 0 1rem;
    gap: 1rem;

    > div {
      width: 100%;
      max-width: 600px;
      text-align: center;
      align-items: center;

      > span {
        width: 100%;
        font-weight: bold;
        font-size: 2rem;
        text-transform: uppercase;
        line-height: 100%;
        @media (max-width: 768px) {
          font-size: 1.5rem;
        }
      }
    }

    img {
      width: 100%;
      max-width: 450px;
      height: 350px;

      object-fit: cover;
      object-position: bottom;
      pointer-events: none;
      user-select: none;

      @media (max-width: 768px) {
        height: 100%;
        max-height: 350px;
        object-position: 25% 75%;
      }
    }

    @media (max-width: 768px) {
      gap: unset;
    }
  }
`;
