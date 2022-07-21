import styled from "styled-components";

export const MainBanner = styled.div`
  width: 100%;
  background: var(--black);
  height: 656px;
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
    mask-image: linear-gradient(black, black, transparent);
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

export const SponsorsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: calc(100px + 3rem);
  padding: 2rem 0 0;
  background: var(--white-dark);

  > span {
    text-transform: uppercase;
    font-size: 0.75rem;
    font-weight: bold;
  }

  .sponsors {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    position: relative;
    height: 100%;
    width: 100%;

    list-style-type: none;
    gap: 1rem;

    li {
      display: flex;
      justify-content: center;
      align-items: center;

      > img {
        padding: 1rem 0;
        max-height: 80px;
        min-height: 80px;
        width: 100%;
        object-fit: scale-down;
        border-radius: 4px;

        pointer-events: none;
        user-select: none;
        transition: var(--transition);

        @media (max-width: 600px) {
          max-height: 4rem;
          min-height: 4rem;
        }
      }
    }

    &:before,
    &:after {
      position: absolute;
      content: "";

      background: linear-gradient(to right, var(--white-dark), transparent);

      width: 30%;
      height: 100%;
      z-index: 2;

      @media (max-width: 600px) {
        width: 10%;
      }
    }

    &:before {
      left: 0;
      top: 0;
    }

    &:after {
      right: 0;
      top: 0;
      transform: scaleX(-1);
    }
  }

  @media (max-width: 600px) {
    height: 100px;
    padding: unset;

    > span {
      display: none;
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
  margin: 4rem auto;
  overflow: hidden;

  h1 {
    text-transform: uppercase;
    text-align: center;
    margin: 1rem 0;
    line-height: 100%;

    @media (max-width: 500px) {
      font-size: 1.5rem;
    }
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
        left: 4rem;
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
          text-align: justify;
          margin: unset;
        }

        .icon {
          width: 100%;
          max-width: 8rem;
          height: 100%;
        }

        .about {
          width: 100%;
        }
      }

      @media (max-width: 500px) {
        flex-direction: column;

        .icon {
          width: 100%;
          max-width: 6rem;
          height: 100%;
        }

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
  min-height: 400px;
  height: 100%;
  background: var(--black);
  margin: 0 auto;
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
    padding: 10rem 0;

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
    height: 100%;
    background-image: url("https://global-uploads.webflow.com/61d83a2ebb0ae01ab96e841a/629642e4e4b6821da70eac38_blur-rocketseat-plus.png");
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.5;
    filter: invert(67%) sepia(98%) saturate(1504%) hue-rotate(8deg)
      brightness(150%) contrast(104%);
  }
`;

export const LittleAboutUs = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  max-width: 1120px;
  margin: 4rem auto;
  overflow: hidden;

  > h1 {
    text-align: center;
    text-transform: uppercase;

    @media (max-width: 500px) {
      font-size: 1.5rem;
    }
  }
`;
