import styled from "styled-components";

export const AboutUsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  max-width: 1120px;
  margin: 2rem auto 0;
  gap: 5rem;

  @media (max-width: 900px) {
    gap: 2rem;
  }

  .container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    &.container-vertical {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    @media (min-width: 900px) {
      &:nth-child(even) {
        flex-direction: row-reverse;

        div {
          text-align: justify;
          text-align-last: right;
          align-items: flex-end;
        }
      }
    }

    @media (max-width: 900px) {
      flex-direction: column;
      padding: 1rem;
    }
  }

  > div:not(.slogan) {
    > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      text-align: justify;
      gap: 1rem;
      width: 100%;

      > span {
        text-transform: uppercase;
        font-size: 2.5rem;
        font-weight: 900;
        line-height: 100%;
      }
    }

    > img {
      width: 100%;
      max-width: 30rem;
      /* padding: 2rem; */
      pointer-events: none;
      user-select: none;
    }
  }

  .slogan {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100vw;
    background: var(--white-dark);
    color: var(--black);

    padding: 3rem 1rem;
    margin: 0 1rem;
    gap: 1rem;

    > div {
      width: 100%;
      max-width: 600px;
      text-align: center;
      align-items: center;

      > span {
        width: 100%;
        font-weight: bold;
        font-size: 2rem;
        text-transform: uppercase;
        line-height: 100%;
        @media (max-width: 768px) {
          font-size: 1.5rem;
        }
      }
    }

    img {
      width: 100%;
      max-width: 450px;
      height: 350px;

      object-fit: cover;
      object-position: bottom;
      pointer-events: none;
      user-select: none;

      @media (max-width: 768px) {
        height: 100%;
        max-height: 350px;
        object-position: 25% 75%;
      }
    }

    @media (max-width: 768px) {
      gap: unset;
    }
  }
`;
