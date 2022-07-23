import styled from "styled-components";

export const EventsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 1rem auto;
  /* max-width: 1120px; */
  height: unset;
  gap: 1rem;
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    margin: 0 1rem;
    gap: 1rem;
    > li,
    button {
      display: flex;
      flex-basis: 250px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 250px;
      padding: 1rem;
      position: relative;
      text-decoration: none;
      text-align: center;
      background: linear-gradient(to bottom, transparent, #e6e6e675);
      border: 1px dashed #e6e6e6;
      transition: var(--transition);
      border-radius: 4px;
      cursor: pointer;
      overflow: hidden;
      font-size: 1.25rem;
      span {
        font-weight: bold;
        text-transform: capitalize;
        line-height: 100%;
      }
      > .info {
        display: none;
        z-index: 1;
      }
      > img {
        height: 100%;
        width: 100%;
        position: absolute;
        object-fit: cover;
        transition: var(--transition);
        z-index: 0;
      }
      @media (min-width: 768px) {
        &:not(.without-image) {
          color: var(--white);
        }
        &.without-image {
          color: var(--black);
        }
        &:hover {
          > .info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          > img {
            transform: scale(1.05);
            filter: grayscale(1) blur(5px) brightness(25%);
          }
        }
      }
      @media (max-width: 768px) {
        display: flex;
        flex-direction: column-reverse;
        padding: unset;
        color: var(--black);
        min-height: 350px;
        > img {
          position: relative;
          top: 0;
          height: 250%;
        }
        > .info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 2rem 1rem;
          font-size: 1rem;
          height: 100%;
        }
      }
    }
    > li {
      flex-grow: 1;
    }
    > button {
      > svg {
        width: 100%;
        max-width: 5rem;
        height: 100%;
        max-height: 5rem;
        color: #d6d6d6;
        transition: var(--transition);
      }
      &:hover {
        > svg {
          transform: scale(1.1);
        }
      }
      @media (max-width: 880px) {
        flex-grow: 1;
      }
    }
  }
`;
