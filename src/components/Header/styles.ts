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

  transition: var(--transition);

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

      > li {
        display: flex;
        justify-content: center;
        align-items: center;

        cursor: pointer;
        color: var(--text);

        height: 100%;
        transition: var(--transition);
        border-bottom: 0.15rem solid transparent;

        @media (min-width: 900px) {
          padding: 0.15rem 1rem 0;
        }

        &.new {
          gap: 0.5rem;

          &:after {
            content: "Novo";
            text-transform: uppercase;
            font-size: 0.75rem;

            color: var(--green);
            border: 1px solid var(--green);
            border-radius: 4px;
            padding: 0.25rem 0.5rem;
          }
        }

        &:hover {
          color: var(--white);
        }

        @media (min-width: 900px) {
          &:hover {
            border-bottom: 0.15rem solid var(--primary);
          }
        }

        @media (max-width: 900px) {
          width: 100%;
          height: 100%;
          max-height: 4rem;
        }
      }

      > .account-actions {
        @media (min-width: 900px) {
          display: none;
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

          padding: 2rem;

          width: 100vw;
          height: 100vh;
          z-index: 2;
          overflow: hidden auto;

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

          > .account-actions {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            gap: 1rem;

            width: 100%;
            height: 100%;
            max-height: 8rem;

            a:not(.subscribe):hover {
              color: var(--white);
            }

            .user {
              display: flex;
              justify-content: center;
              align-items: center;

              width: 100%;
              max-width: 150px;

              .user-icon {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;

                width: 100%;
                height: 100%;
                padding: 0.5rem;
                gap: 0.5rem;

                border: 1px solid var(--white);
                border-radius: 4px;

                text-transform: uppercase;
                font-size: 0.85rem;

                > svg {
                  width: 100%;
                  max-width: 1.5rem;
                  height: 100%;
                  max-height: 1.5rem;

                  color: var(--text);
                  border-radius: 50%;
                }

                &:hover {
                  background: var(--primary);
                  border: 1px solid transparent;

                  > svg {
                    color: var(--white);
                  }
                }
              }
            }

            @media (min-height: 480px) {
              max-height: 10rem;
            }
          }

          @media (max-height: 480px) {
            padding: 1rem 0;
            top: 50px;
            height: calc(100vh - 50px);
          }
        }
      }
    }

    a:not(.subscribe) {
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
    }

    > .account-actions {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      height: 100%;
      gap: 1rem;

      > a {
        padding: 12px 24px;
        text-transform: uppercase;
        font-size: 0.75rem;

        &:not(.subscribe):hover {
          color: var(--white);
        }
      }

      .user {
        display: flex;
        flex-direction: row-reverse;
        justify-content: center;
        align-items: center;

        gap: 0.5rem;
        position: relative;
        height: 100%;

        .user-icon {
          width: 2.25rem;
          height: 2.25rem;
          padding: 0.5rem;

          border: 1px solid var(--white);
          border-radius: 50%;

          > svg {
            width: 100%;
            height: 100%;
            color: var(--white);
            border-radius: 50%;
          }

          &:hover {
            background: var(--primary);
            border: 1px solid transparent;
          }
        }

        > svg {
          height: 100%;
        }

        > ul {
          position: absolute;
          top: 75%;
          right: 0;

          margin: 0.5rem 0;

          background: var(--primary);
          color: var(--white);
          width: 200px;
          border-radius: 4px;

          overflow: hidden;
          list-style-type: none;

          > li {
            display: flex;
            flex-direction: row-reverse;
            justify-content: flex-start;
            align-items: center;

            gap: 0.5rem;

            padding: 0.75rem 1rem;
            cursor: pointer;

            transition: var(--transition);

            > svg {
              width: 100%;
              max-width: 1.25rem;
              height: 100%;
            }

            &:hover {
              background: var(--primary-hover);
            }
          }

          > footer {
            display: flex;
            flex-direction: column;

            gap: 0.5rem;

            width: 100%;
            max-width: 300px;

            background: var(--black);
            padding: 0.5rem;

            cursor: default;

            pointer-events: none;
            user-select: none;

            > p {
              width: 100%;

              text-align: right;
              font-size: 0.65rem;

              color: var(--text);
              opacity: 0.5;
            }
          }
        }
      }

      @media (max-width: 900px) {
        display: none;
      }
    }

    .subscribe {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 100%;
      height: 100%;
      max-height: 40px;

      text-decoration: none;
      font-weight: bold;
      border: 1px solid var(--primary);
      background: unset;
      padding: 0.5rem 2rem;
      border-radius: 4px;
      color: var(--primary);

      > svg {
        opacity: 0;
        visibility: hidden;
        transform: translateX(100%);

        width: 100%;
        height: 100%;
        max-height: 0;

        transition: max-height 1s ease-in-out;
        transition: var(--transition);
      }

      &:hover {
        background: var(--primary-hover);
        color: var(--black);

        > svg {
          margin-left: 0.5rem;
          max-height: 12px;
          opacity: 1;
          visibility: visible;
          transform: translateX(0);
        }
      }
    }
  }

  /* &.scrolled {
    position: sticky;
    top: 0;
    background: unset;
    backdrop-filter: saturate(180%) blur(15px);
    transition: translateX(0);
  } */
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

  /* filter: drop-shadow(0 0.2rem 0.25rem rgba(0, 0, 0, 0.2)); */
  user-select: none;

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
