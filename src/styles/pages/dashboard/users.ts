import styled from "styled-components";

export const UsersContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  margin: 1.5rem 1rem;
  gap: 1rem;

  > li {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    gap: 1rem;
    width: 100%;

    list-style-type: none;

    > img {
      min-width: 5rem;
      width: 100%;
      max-width: 5rem;
      min-height: 5rem;
      height: 100%;
      max-height: 5rem;

      border-radius: 4px;

      object-fit: cover;
      pointer-events: none;
      user-select: none;
    }

    > span {
      font-weight: bold;
    }

    @media (max-width: 768px) {
      flex-direction: column;

      gap: 0.25rem;

      > img {
        min-width: 8rem;
        width: 100%;
        max-width: 8rem;
        min-height: 8rem;
        height: 100%;
        max-height: 8rem;

        margin-bottom: 1rem;
      }
    }
  }

  @media (max-width: 768px) {
    gap: 2rem;
  }
`;
