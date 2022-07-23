import styled from "styled-components";

export const CreateEvent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > h1 {
    text-align: center;
    text-transform: uppercase;
    margin: 1rem 0;
  }
  > form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: calc(600px + 1rem);
    gap: 1rem;
    padding: 0 1rem;
    margin: 1rem 0;
    > div {
      display: flex;
      flex-direction: column;
      width: 100%;
      > .event-ages-add {
        display: flex;
        width: 100%;
        height: 100%;
        > input {
          border-radius: unset;
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
        }
        > a {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          max-width: 35px;
          margin-top: 5px;
          text-transform: uppercase;
          font-weight: bold;
          background: var(--primary);
          border: 1px solid var(--primary);
          color: var(--white);
          text-align: center;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
          > svg {
            color: var(--white);
          }
        }
      }
      ul {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        margin-top: 1rem;
        gap: 1rem;
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          min-height: 35px;
          height: 100%;
          max-height: 35px;
          > a {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: var(--primary);
            border: 1px solid var(--primary);
            color: var(--white);
            text-align: center;
            width: 35px;
            height: 35px;
            border-radius: 4px;
            cursor: pointer;
          }
        }
      }
      label {
        text-transform: capitalize;
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
      textarea {
        resize: vertical;
        min-height: 35px;
        height: 100%;
        max-height: 300px;
      }
      input#event-name {
        /* text-transform: capitalize; */
      }
    }
    > button {
      font-weight: bold;
      background: unset;
      padding: 0.5rem 2rem;
      border-radius: 4px;
      cursor: pointer;
      width: 100%;
      transition: var(--transition);
      text-transform: uppercase;
      font-weight: bold;
      font-size: 1rem;
      background: var(--primary);
      border: 1px solid var(--primary);
      color: var(--white);
      &:hover {
        background: var(--primary-hover);
      }
    }
  }
`;
