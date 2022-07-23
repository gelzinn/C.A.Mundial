import styled from "styled-components";

export const SponsorsContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding: 0 1rem;
  gap: 1rem;
  margin-bottom: 1rem;
  > li,
  > button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-basis: 500px;
    flex-grow: 1;
    min-height: 150px;
    height: 100%;
    max-height: 200px;
    border: 1px dashed #e6e6e6;
    border-radius: 4px;
    padding: 1rem;
    &.create-sponsor {
      background: unset;
      justify-content: center;
      cursor: pointer;
      flex-grow: 1;
      > svg {
        width: 100%;
        max-width: 5rem;
        height: 100%;
        color: #d6d6d6;
        transition: var(--transition);
      }
      &:hover {
        > svg {
          transform: scale(1.1);
        }
      }
    }
    &.editing {
      max-width: unset;
      box-shadow: 0 0 5rem 0 #00000010;
    }
    > .info {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      input {
        width: 100%;
        border: 1.5px solid var(--black);
        color: var(--black);
        padding: 5px;
        font-size: 18px;
        border-radius: 4px;
      }
      p {
        > span {
          font-weight: bold;
        }
        @media (max-width: 600px) {
          display: flex;
          flex-direction: column;
        }
      }
      > img {
        max-height: 8rem;
        min-height: 8rem;
        max-width: 8rem;
        min-width: 8rem;
        object-fit: scale-down;
        border-radius: 4px;
        pointer-events: none;
        user-select: none;
        transition: var(--transition);
      }
      &.w-full {
        width: 100%;
        justify-content: flex-start;
        margin: 1rem 0;
      }
      @media (min-width: 600px) {
        padding-right: 1rem;
      }
      @media (max-width: 600px) {
        flex-direction: column;
        gap: unset;
        padding: 1rem;
        > img {
          margin-bottom: 1rem;
        }
      }
    }
    > .actions {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      button {
        display: flex;
        justify-content: center;
        align-items: center;
        border: unset;
        background: var(--red);
        width: 2rem;
        border-radius: 50%;
        padding: 0.5rem;
        cursor: pointer;
        &.confirm {
          background: var(--green);
        }
        > svg {
          width: 100%;
          height: 100%;
          color: var(--white);
          fill: var(--white);
        }
        &:hover {
          filter: brightness(110%);
        }
      }
    }
    @media (max-width: 600px) {
      flex-direction: column;
      padding: unset;
      max-height: unset;
      text-align: center;
      > .actions {
        width: 100%;
        padding: 0.5rem 0;
        border-top: 1px dashed #e6e6e6;
        background: #e6e6e675;
      }
    }
  }
`;

export const AddSponsorsContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 500px;
  height: 100%;
  margin: 0 auto;
  padding: 1rem;
  gap: 0.5rem;
  > svg {
    width: 100%;
    max-width: 10rem;
    height: 100%;
    max-height: 10rem;
  }
  > p {
    text-align: justify;
    text-align-last: center;
    > a {
      color: var(--primary);
    }
  }
  > input,
  textarea,
  select {
    text-align: center;
    width: 100%;
    border: 1.5px solid var(--black);
    color: var(--black);
    padding: 5px;
    font-size: 18px;
    border-radius: 4px;
  }
  > textarea {
    resize: vertical;
    min-height: 35px;
    height: 35px;
    max-height: 100px;
  }
  > button[type="submit"] {
    font-weight: bold;
    text-transform: uppercase;
    background: unset;
    padding: 0.5rem 2rem;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
    transition: var(--transition);
    background: var(--primary);
    border: 1px solid var(--primary);
    color: var(--white);
    &:hover {
      background: var(--primary-hover);
    }
  }
  label {
    &.file {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      width: 100%;
      border: 1.5px solid var(--black);
      color: var(--black);
      padding: 5px;
      font-size: 18px;
      margin-top: 5px;
      border-radius: 4px;
      cursor: pointer;
      > input {
        display: none;
      }
    }
  }
`;
