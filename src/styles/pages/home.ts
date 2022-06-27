import styled from "styled-components";

export const MainBanner = styled.div`
  width: 100%;
  /* background: var(--black); */
  position: relative;

  img {
    width: 100%;
    max-width: 100%;
    max-height: 100%;
    margin: auto;
    display: block;
    pointer-events: none;
    user-select: none;
    transition: var(--transition);
    /* mask-image: linear-gradient(black, black, transparent); */
  }

  .actions {
    display: flex;
    justify-content: center;
    gap: 16px;

    visibility: visible;
    position: absolute;

    z-index: 2;
    transition: var(--transition);
    margin: 0 auto;
    padding: 0 2rem;

    width: 100%;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);

    > a {
      text-align: center;
      text-decoration: none;
      border: 1px solid var(--white);
      color: var(--white);
      padding: 0.5rem 1.5rem;
      border-radius: 4px;
      font-size: 100%;
      transition: var(--transition);

      &:hover {
        background: var(--white);
        color: var(--black);
      }
    }
  }

  @media (min-width: 768px) {
    height: auto;
  }
  @media (max-width: 768px) {
    height: 300px;

    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

export const ShortDescription = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  max-width: 1120px;
  margin: 0 auto;
  overflow: hidden;

  h1 {
    text-transform: uppercase;
    text-align: center;
    margin: 1rem;
  }

  > ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    list-style: none;
    overflow: hidden;
    position: relative;
    margin: 0 1rem;
    width: 100%;

    @media (min-width: 900px) {
      &:before {
        content: "";
        position: absolute;
        left: 50%;
        bottom: 2rem;
        width: 0.15rem;
        height: 80%;
        background: var(--primary);
      }
    }

    @media (max-width: 900px) {
      &:before {
        content: "";
        position: absolute;
        left: 64px;
        bottom: 2rem;
        width: 0.15rem;
        height: 80%;
        background: var(--primary);
      }
    }

    @media (max-width: 500px) {
      &:before {
        display: none;
      }
    }

    > li {
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      justify-content: right;
      position: relative;

      width: 100%;
      max-width: 650px;
      margin: 3rem 0;
      left: -16.25rem;

      .about {
        width: 50%;
        text-align: right;
        margin-right: 10rem;

        > span {
          font-weight: 800;
          text-transform: uppercase;
        }
      }

      .icon {
        display: flex;
        justify-content: center;
        align-items: center;

        position: absolute;
        background: var(--background);
        border: 2px solid var(--primary);
        width: 8rem;
        height: 8rem;
        border-radius: 50%;
        padding: 1.5rem;

        > svg {
          width: 100%;
          height: 100%;
        }
      }

      @media (min-width: 900px) {
        &:nth-child(odd) {
          justify-content: left;
          left: 16.25rem;

          .icon {
            transform: scaleX(-1);
          }

          .about {
            text-align: left;
            margin-left: 10rem;
          }
        }
      }

      @media (max-width: 900px) {
        position: relative;
        flex-direction: row;
        justify-content: center;
        left: unset;
        gap: 1rem;
        margin: 1rem 0;
        width: 100%;
        max-width: unset;

        .icon,
        .about {
          position: relative;
          text-align: left;
          margin: unset;
        }

        .icon {
          width: 100%;
          max-width: 8rem;
        }

        .about {
          width: 100%;
        }
      }

      @media (max-width: 500px) {
        flex-direction: column;

        .about {
          text-align: center;
        }
      }
    }
  }
`;
