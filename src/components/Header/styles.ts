import styled, { keyframes } from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  background: var(--black);
  color: var(--white);
  min-height: 6.25rem;
  height: 100%;
  max-height: 6.25rem;
  width: 100%;

  .logo {
    width: 100%;
    max-width: 5rem;
    height: 100%;
    z-index: 5;

    padding: 1rem 0;

    > img {
      width: 100%;
      height: 100%;

      object-fit: cover;
      pointer-events: none;
      user-select: none;
    }
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;

    position: relative;

    width: 100%;
    max-width: 1120px;
    height: 6.25rem;
    margin: 0 1rem;
    z-index: 1000;

    .mobile-menu {
      display: none;
      width: 80px;
      height: 80px;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      background: unset;
      border: unset;
      z-index: 5;

      > div {
        background: var(--primary);
        width: 32px;
        height: 0.15rem;
        position: relative;
        transition: background 10ms ease 300ms;

        &:before,
        &:after {
          transition: top 300ms ease 350ms, transform 300ms ease 50ms;
          position: absolute;
          background: var(--primary);
          width: 100%;
          height: 0.15rem;
          content: "";
        }

        &:before {
          top: 0.5rem;
          left: 0;
        }

        &:after {
          bottom: 0.5rem;
          left: 0;
        }
      }

      &.opened {
        > div {
          background: transparent;
          transition: top 300ms ease 50ms, transform 300ms ease 350ms;
          top: 0px;

          &:before,
          &:after {
            top: 0;
          }

          &:before {
            transform: rotate(45deg);
          }

          &:after {
            transform: rotate(-45deg);
          }
        }
      }

      @media (max-width: 900px) {
        display: flex;
      }
    }

    > .menu {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      list-style-type: none;

      height: 100%;

      > a {
        padding: 0 1rem;
        height: 100%;
        transition: var(--transition);

        &:hover {
          border-bottom: 0.15rem solid var(--primary);
        }
      }
      @media (min-width: 900px) {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      @media (max-width: 900px) {
        display: none;

        &.open {
          position: absolute;
          display: flex;
          left: -1rem;
          top: 0;

          padding: 0 2rem;

          width: 100vw;
          height: 100vh;
          z-index: 2;
          background: var(--black);

          flex-direction: column;
          justify-content: center;
          align-items: center;

          > a {
            height: 100%;
            max-height: 5rem;
            width: 100%;

            &:hover:not(.subscribe) {
              background: var(--shape);
              border-radius: 4px;
              border-bottom: unset;
            }
          }
        }
      }
    }

    a {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      cursor: pointer;

      text-decoration: none;
      text-transform: capitalize;
      color: var(--text);
      transition: var(--transition);

      &:hover {
        color: var(--white);

        &:after {
          content: "";
          position: absolute;
          background: var(--white);
          bottom: 0;
          width: 100%;
        }
      }
    }

    > .account-actions {
      display: flex;
      justify-content: center;
      align-items: center;

      gap: 1rem;

      > a {
        padding: 12px 24px;
        text-transform: uppercase;
        font-size: 0.75rem;
      }

      @media (max-width: 900px) {
        display: none;
      }
    }

    .subscribe {
      width: 100%;
      height: 100%;
      max-height: 40px;

      font-weight: bold;
      border: 1px solid var(--primary);
      background: unset;
      padding: 0.5rem 2rem;
      border-radius: 4px;
      color: var(--primary);

      &:hover {
        background: var(--primary-hover);
        color: var(--black);
      }
    }
  }
`;

const fadeInBanner = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }   
`;

export const Warnings = styled.div`
  background: var(--shape);
  color: var(--white);
  padding: 0.5rem;
  text-align: center;

  z-index: 2;
  overflow: hidden;

  > p {
    position: relative;

    animation: ${fadeInBanner} 1s ease-in-out;

    > a {
      color: var(--primary);
      margin-left: 0.25rem;
    }

    &:before,
    &:after {
      content: "🎉";
    }

    &:before {
      margin-right: 0.5rem;
    }

    &:after {
      margin-left: 0.5rem;
    }

    @media (max-width: 450px) {
      margin: 0 0.5rem;

      &:before,
      &:after {
        display: none;
      }
    }
  }
`;
