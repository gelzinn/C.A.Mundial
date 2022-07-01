import styled from "styled-components";

export const SubscribeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 100vh;

  .illustration {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    max-width: calc(100% / 2);
    height: 100vh;

    background: var(--black);
    color: var(--white);
    overflow: hidden;

    > img {
      width: 100%;
      height: 100%;
      transform: scaleX(-1);
      object-fit: cover;
      mask-image: linear-gradient(to right, transparent, black);
      opacity: 0.1;
      /* filter: grayscale(1); */

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

    margin: 0 auto;
    padding: 0 1rem;
    width: calc(100% / 2);
    max-width: 650px;
    height: 100vh;
    background: var(--background);

    .actions {
      display: flex;
      justify-content: center;
      align-items: center;

      gap: 1rem;
      width: 100%;

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
      textarea {
        width: 100%;
        border: 1.5px solid var(--black);
        color: var(--black);
        padding: 5px;
        font-size: 18px;
        margin-top: 5px;
        border-radius: 4px;
      }

      label {
        display: flex;
        gap: 0.25rem;
      }
    }

    @media (max-width: 768px) {
      width: 100%;
      max-width: unset;
    }
  }

  .pages-count {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;

    bottom: 0;

    padding: 0.5rem 1rem;
    background: var(--black);
    color: var(--text);

    width: 50vw;
    height: 35px;
    font-size: 1rem;

    p > span {
      font-weight: bold;
    }

    @media (max-width: 768px) {
      width: 100vw;
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
    max-height: 90vh;
    width: 100%;
    text-align: center;

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
      gap: 1rem;

      > img {
        min-width: 128px;
        width: 100%;
        max-width: 128px;
        min-height: 128px;
        height: 100%;
        max-height: 128px;
        object-fit: cover;
        border-radius: 4px;
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

    top: 1.5rem;
    right: 1.5rem;
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
  }

  @media (max-width: 768px) {
    .illustration {
      display: none;
    }

    .form {
      width: 100%;
    }
  }
`;
