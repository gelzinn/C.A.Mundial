import styled from "styled-components";

export const TeamsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;
  width: 100%;
  max-width: 1120px;
  margin: 1rem auto;
  gap: 1rem;

  > li {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    margin: 0 1rem;
    padding: 0 1rem;
    gap: 1rem;

    > div {
      display: flex;
      justify-content: center;
      align-items: center;

      gap: 1rem;

      .info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
      }

      > img {
        min-width: 128px;
        width: 100%;
        max-width: 128px;
        min-height: 128px;
        height: 100%;
        max-height: 128px;
        object-fit: contain;
        border-radius: 4px;

        pointer-events: none;
        user-select: none;
      }
    }

    @media (max-width: 768px) {
      flex-direction: column;
    }

    @media (max-width: 400px) {
      gap: 1rem;

      > div {
        flex-direction: column;

        .info {
          align-items: center;
          text-align: center;
        }
      }
    }
  }

  > p {
    text-align: center;
  }

  @media (max-width: 400px) {
    gap: 2rem;
  }
`;
