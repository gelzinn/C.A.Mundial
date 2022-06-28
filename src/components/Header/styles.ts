import styled from "styled-components";

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

    width: 100%;
    height: 100%;
    max-width: 1120px;
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

    > ul {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 2rem;
      list-style-type: none;

      > a {
        /* &:not(.subscribe):after {
          content: "";
          position: absolute;
          width: 100%;
          height: 1px;
          left: 0;
          bottom: 0;
          background: #fbfaff;
          transform: scale(0, 1);
          transition: var(--transition);
        } */

        &:hover:after {
          transform: scale(1, 1);
        }
      }

      @media (max-width: 900px) {
        display: none;

        &.open {
          position: absolute;
          display: flex;
          flex: 0 0 100%;
          left: 0;
          top: 0;

          width: 100%;
          height: 100%;
          z-index: 2;
          background: var(--black);

          flex-direction: column;
          justify-content: center;
          align-items: center;
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
      color: var(--white);
      transition: var(--transition);

      &:hover:after {
        content: "";
        position: absolute;
        background: var(--white);
        bottom: 0;
        width: 100%;
      }
    }

    .subscribe {
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

export const Warnings = styled.div`
  background: var(--shape);
  color: var(--white);
  padding: 0.5rem;
  text-align: center;
  overflow: hidden;

  > p {
    position: relative;

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
