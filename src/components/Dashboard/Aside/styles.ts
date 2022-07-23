import styled from "styled-components";

export const AsideContainer = styled.aside`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  background: var(--black);
  color: var(--white);
  width: 100%;
  max-width: 300px;
  height: 100vh;
  /* padding: 1.5rem 0 0; */
  direction: rtl;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--shape);
    border-radius: 1rem;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  @media (min-width: 768px) {
    overflow: hidden hidden;
    &:hover {
      overflow: hidden auto;
    }
    > nav {
      display: flex;
      direction: ltr;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 100%;
      padding-left: 0.75rem;
      margin-bottom: 1rem;
    }
  }
  > .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.5rem 0 0;
    width: 100%;
    position: relative;
    > svg {
      top: 1rem;
      left: 1rem;
      position: absolute;

      width: 100%;
      max-width: 1.25rem;
      height: 100%;
      max-height: 1.25rem;
      cursor: pointer;

      @media (max-width: 768px) {
        display: none;
      }
    }
    > img {
      width: 100%;
      max-width: 80px;
      height: 100%;
      pointer-events: none;
      user-select: none;
    }
    @media (max-width: 768px) {
      width: unset;
      padding: unset;
    }
  }
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
    @media (max-width: 768px) {
      display: flex;
    }
  }
  @media (max-width: 768px) {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    direction: ltr;
    width: 100vw;
    max-width: unset;
    min-height: 100px;
    height: 100%;
    max-height: 100px;
    padding: 0 1rem;
    &:not(.opened) {
      overflow: hidden hidden;
    }
    > nav {
      position: absolute;
      display: flex;
      flex: 1;
      left: 0;
      top: 100px;
      width: 100vw;
      height: calc(100vh - 100px);
      z-index: 1000;
      background: var(--black);
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0 1rem;
      overflow: hidden auto;
      transform: translateX(150%);
      transition: var(--transition);
      > div {
        height: 100%;
      }
      &.opened {
        transform: translateX(0);
      }
    }
  }
`;

export const LinksContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 2rem 0;
  gap: 1.5rem;
  width: 100%;
  height: 100%;
  > div {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0.25rem;
    > span {
      color: var(--text);
      text-transform: uppercase;
      font-weight: bold;
      cursor: default;
      pointer-events: none;
      user-select: none;
    }
    > ul {
      width: 100%;
      > li {
        display: flex;
        flex: 1;
        justify-content: flex-start;
        align-items: center;
        text-transform: capitalize;
        padding: 0.75rem 1rem;
        gap: 1.25rem;
        width: 100%;
        position: relative;
        transition: var(--transition);
        > svg {
          width: 100%;
          max-width: 1.25rem;
          height: 100%;
          max-height: 1.25rem;
        }
        > p {
          user-select: none;
          pointer-events: none;
          width: 100%;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        &:not(.active, .soon, .maintenance) {
          width: 100%;
          border-radius: 4px;
          @media (min-width: 768px) {
            max-width: calc(100% - 0.75rem);
          }
          &:hover {
            background: var(--shape);
            cursor: pointer;
          }
        }
        &.active {
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
          border-right: 0.25rem solid var(--primary);
          background: linear-gradient(to right, transparent, var(--shape));
          cursor: default;
        }
        &.new:after {
          content: "Novo";
          font-size: 0.65rem;
          text-transform: uppercase;
          position: absolute;
          right: 0.75rem;
          padding: 0.35rem 0.5rem;
          border-radius: 1rem;
          background: var(--primary);
        }
        &.soon,
        &.maintenance {
          width: 100%;
          opacity: 0.25;
          /* @media (min-width: 768px) {
            max-width: calc(100% - 0.75rem);
          } */
        }
        &.soon {
          > p {
            width: calc(100% - 100px);
          }
          &:after {
            content: "Em breve";
            font-size: 0.65rem;
            text-transform: uppercase;
            position: absolute;
            right: 0.75rem;
            padding: 0.35rem 0.5rem;
            border-radius: 1rem;
            background: var(--shape-dark);
          }
        }
        &.maintenance:after {
          content: "Manutenção";
          font-size: 0.65rem;
          text-transform: uppercase;
          position: absolute;
          right: 0.75rem;
          padding: 0.35rem 0.5rem;
          border-radius: 1rem;
          background: var(--red);
        }
      }
    }
  }
  @media (max-width: 768px) {
    margin: unset;
  }
`;
