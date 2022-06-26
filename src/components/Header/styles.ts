import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;

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

    > ul {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 2rem;
      list-style-type: none;

      @media (max-width: 900px) {
        display: none;
      }
    }

    a {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      cursor: pointer;

      font-weight: 500;
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
      color: var(--black);
      background: var(--primary);
      padding: 0.5rem 1.5rem;
      border-radius: 4px;

      &:hover {
        background: var(--primary-hover);
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
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    margin: 0 1rem;
    gap: 8px;

    &:before,
    &:after {
      content: "🎉";
    }

    @media (max-width: 450px) {
      &:before,
      &:after {
        position: absolute;
        content: "🎉";
        font-size: 20vw;
        opacity: 0.1;
      }

      &:before {
        left: -20%;
      }

      &:after {
        right: -20%;
        transform: scaleX(-1);
      }
    }
  }
`;
