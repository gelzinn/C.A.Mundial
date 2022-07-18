import styled from "styled-components";

export const SubscribeContainer = styled.div`
  display: grid;
  grid-template-columns: 50fr 50fr;

  height: 100vh;
  overflow: hidden auto;

  .illustration {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    max-width: calc(100% / 2);
    height: 100vh;

    position: fixed;
    left: 0;
    background: var(--black);
    color: var(--white);
    overflow: hidden;

    > img {
      width: 150%;
      height: 150%;
      transform: scaleX(-1);
      object-fit: cover;
      mask-image: linear-gradient(to right, transparent, black);
      opacity: 0.1;
      filter: grayscale(1);

      pointer-events: none;
      user-select: none;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;

    margin-left: 50vw;
    width: 100%;
    max-width: 50vw;
    background: var(--background);
    overflow: hidden auto;

    .actions {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 100%;
      gap: 0.5rem;

      > button {
        font-weight: bold;
        background: unset;
        padding: 0.5rem 2rem;
        border-radius: 4px;
        cursor: pointer;
        width: 100%;
        max-width: 300px;
        transition: var(--transition);

        &:nth-child(even) {
          background: var(--primary);
          border: 1px solid var(--primary);
          color: var(--white);

          &:hover {
            background: var(--primary-hover);
          }
        }

        &:nth-child(odd) {
          border: 1px solid var(--black);

          &:hover {
            background: var(--black);
            color: var(--white);
          }
        }
      }

      @media (max-width: 500px) {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        > button {
          max-width: unset;
        }
      }
    }

    .form-group {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      width: 100%;
      max-width: 600px;
      gap: 0.5rem;

      .category {
        display: flex;
        gap: 1rem;
      }

      input,
      textarea,
      select {
        width: 100%;
        border: 1.5px solid var(--black);
        color: var(--black);
        padding: 5px;
        font-size: 18px;
        margin-top: 5px;
        border-radius: 4px;
      }

      > div {
        display: flex;
        width: 100%;
        gap: 0.5rem;

        > select {
          width: 100%;
          max-width: 100px;
        }

        @media (max-width: 500px) {
          flex-direction: column;

          > select {
            max-width: unset;
          }
        }
      }

      label {
        display: flex;
        flex-wrap: wrap;
        text-align: left;
        gap: 0.25rem;

        > p#not-required {
          color: var(--error);
          margin-left: 0.25rem;

          &:before,
          &:after {
            content: "*";
          }
        }
      }

      &.starter {
        text-align: justify;
        text-align-last: center;
        gap: 1.5rem;
      }
    }
  }

  .pages-count {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;

    bottom: 0;
    left: 0;

    padding: 0.5rem 1rem;
    background: var(--black);
    color: var(--text);

    width: 100%;
    height: 35px;
    font-size: 1rem;

    p > span {
      font-weight: bold;
    }

    @media (max-width: 968px) {
      position: fixed;
      width: 100vw;
      bottom: unset;

      top: 0;
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    overflow-y: auto;

    height: 100%;
    width: 100%;
    text-align: center;
    padding: 6rem 1rem 3rem;
    position: relative;

    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;

      font-weight: bold;
      font-size: 2rem;
      text-transform: uppercase;
    }

    .logo-preview {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      width: 100%;
      gap: 0.5rem;

      > img {
        min-height: 128px;
        height: 100%;
        max-height: 128px;
        object-fit: contain;
        border-radius: 4px;

        pointer-events: none;
        user-select: none;
      }
    }
  }

  .return {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;

    background: unset;
    border: unset;

    top: 1rem;
    right: 1rem;
    width: 32px;
    height: 32px;

    z-index: 5;
    cursor: pointer;

    > div {
      background: transparent;
      width: 100%;
      height: 0.15rem;
      position: relative;
      transition: background 10ms ease 300ms;

      &:before,
      &:after {
        content: "";
        transition: top 300ms ease 350ms, transform 300ms ease 50ms;
        position: absolute;
        background: var(--black);
        width: 100%;
        height: 0.15rem;
        left: 0;
      }

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

    @media (max-width: 968px) {
      top: 3rem;
      right: 1rem;
    }
  }

  @media (max-width: 968px) {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    .illustration {
      display: none;
    }

    .info {
      overflow: hidden;
      padding: 2rem 0 0;
    }

    form {
      width: 100%;
      max-width: unset;
      height: 100%;

      padding: 1rem;
      margin-left: unset;
    }
  }
`;
