import styled, { keyframes } from "styled-components";

const sponsorsRotating = keyframes`
  0% {
    transform: translateX(0)
  }
`;

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

export const Sponsors = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100px;
  background: var(--white-dark);

  .sponsors {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto hidden;

    width: 100%;
    height: 100%;
    /* animation: ${sponsorsRotating} 5s infinite; */

    > img {
      max-width: 100%;
      max-height: 150%;
      pointer-events: none;
      user-select: none;
      transition: var(--transition);
      filter: invert(1);
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
        transition: var(--transition);

        > svg {
          width: 100%;
          height: 100%;
        }

        &:hover {
          background: var(--primary);

          > svg {
            color: var(--background);
          }
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

export const Subscribe = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  background: var(--black);
  height: 400px;
  margin: 1rem auto 0;
  position: relative;

  .container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: space-between;

    width: 100%;
    max-width: 1120px;
    margin: 0 1rem;

    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      gap: 1rem;
      margin: 0 auto;
      z-index: 1;
      color: var(--white);
      width: 100%;
      max-width: 600px;

      > span {
        font-weight: 900;
        font-size: 1.75rem;
        text-transform: capitalize;
      }

      .legal-info {
        color: var(--text);
        > a {
          color: var(--text);
        }
      }

      > a {
        text-decoration: none;
        text-align: center;
        font-weight: bold;
        border: 1px solid var(--primary);
        background: unset;

        color: var(--primary);
        transition: var(--transition);
        text-transform: uppercase;

        width: 100%;
        max-width: 300px;
        padding: 0.5rem 2rem;
        border-radius: 4px;

        &:hover {
          background: var(--primary);
          color: var(--black);
        }
      }
    }
  }

  .bg {
    position: absolute;
    width: 100vw;
    height: 400px;
    background-image: url("https://global-uploads.webflow.com/61d83a2ebb0ae01ab96e841a/629642e4e4b6821da70eac38_blur-rocketseat-plus.png");
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.5;
    filter: invert(67%) sepia(98%) saturate(1504%) hue-rotate(8deg)
      brightness(150%) contrast(104%);
  }
`;
