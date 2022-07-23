import styled from "styled-components";

export const EventContainer = styled.div`
  position: relative;
  > .back-arrow {
    &.without-image {
      color: var(--black);
      &:hover {
        color: var(--white);
      }
    }
    &:not(.without-image) {
      color: var(--white);
    }
    > svg {
      position: absolute;
      width: 100%;
      max-width: 3rem;
      height: 100%;
      max-height: 3rem;
      padding: 0.75rem;
      cursor: pointer;
      left: 0;
      margin: 1rem;
      z-index: 1;
      border-radius: 50%;
      transition: var(--transition);
      &:hover {
        background: var(--shape);
      }
      @media (max-width: 500px) {
        margin: 0.5rem;
      }
      @media (max-width: 300px) {
        margin: unset;
        border-radius: unset;
        border-bottom-right-radius: 50%;
      }
    }
  }
  > img {
    width: 100%;
    min-height: 15rem;
    height: 100%;
    max-height: 20rem;
    object-fit: cover;
    mask-image: linear-gradient(to top, transparent, black);
    pointer-events: none;
    user-select: none;
    z-index: 0;
  }
  > .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin: -2.5rem 1rem 0;
    z-index: 1;
    &.without-image {
      padding: 5rem 1rem;
      margin: 0;
    }
    > h1 {
      text-transform: capitalize;
      font-size: 2rem;
      @media (max-width: 768px) {
        width: 100%;
        font-size: 1.5rem;
        text-align: center;
      }
    }
    > div {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.25rem;
      > span {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.25rem;
        font-weight: bold;
      }
      @media (max-width: 768px) {
        width: 100%;
        text-align: center;
      }
    }
    .about-event {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 1rem;
      margin-top: 1rem;
      .dates {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        color: var(--white);
        background: var(--primary);
        padding: 0.5rem 1rem;
        border-radius: 4px;
        > p {
          text-align: center;
          &:first-letter {
            text-transform: uppercase;
          }
        }
      }
      > span {
        text-transform: capitalize;
        text-align: center;
        font-weight: bold;
      }
      > ul {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.25rem;
        > li {
          background: #e6e6e675;
          padding: 1rem;
          border-radius: 4px;
          transition: var(--transition);
          &:hover {
            box-shadow: inset 0 0 0 2px var(--primary);
          }
        }
        list-style-type: none;
      }
      > button {
        width: 100%;
        max-width: 300px;
        padding: 1rem 2rem;
        background: var(--red);
        border: unset;
        color: var(--white);
        font-weight: bold;
        border-radius: 4px;
        cursor: pointer;
        text-transform: uppercase;
      }
      @media (max-width: 768px) {
        justify-content: center;
        align-items: center;
      }
    }
  }
`;
