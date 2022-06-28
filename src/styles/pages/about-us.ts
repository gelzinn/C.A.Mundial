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

  .container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    &.container-vertical {
      flex-direction: column;
      justify-content: center;
      align-items: center;

      img {
        max-width: 600px;
      }
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

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin: 0 1rem;
    gap: 1rem;
    width: 100%;
    text-align: justify;

    > span {
      text-transform: uppercase;
      font-size: 2.5rem;
      font-weight: 900;
      line-height: 100%;
    }

    > img {
      width: 100%;
      max-width: 30rem;
      padding: 2rem;
      pointer-events: none;
      user-select: none;
    }
  }

  .slogan {
    width: 100vw;
    background: var(--black);
    color: var(--white);
    font-weight: bold;
    font-size: 1.25rem;
    text-align: center;
    text-transform: uppercase;
    padding: 2rem 0;
  }
`;
