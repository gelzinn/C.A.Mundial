import styled from "styled-components";

type ProfileProps = {
  color: string;
};

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 0 1rem;

  position: relative;

  @media (min-width: 768px) {
    > section {
      margin-top: calc(400px + 1rem);
    }
  }

  @media (max-width: 768px) {
    > section {
      margin-top: calc(400px + 1rem);
    }
  }

  @media (max-width: 500px) {
    > section {
      margin-top: calc(220px + 1rem);
    }
  }

  > section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    gap: 1rem;

    > h1 {
      text-transform: uppercase;
    }

    > div {
      display: flex;
      justify-content: center;
      align-items: center;

      gap: 0.5rem;

      > span {
        font-weight: bold;
      }
    }
  }
`;

export const ProfileImage = styled.div<ProfileProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: calc(100vw - 300px);
  padding: 1rem;
  gap: 1rem;

  position: absolute;
  top: 0;
  left: -1rem;

  background: linear-gradient(to bottom, ${(p) => p.color}, transparent);

  > span {
    font-weight: bold;
    font-size: 1.5rem;

    text-align: center;
    line-height: 100%;

    color: var(--white);
  }

  @media (min-width: 768px) {
    padding: 3rem 1rem 0;
  }

  @media (max-width: 768px) {
    width: 100vw;
  }

  > img {
    width: 300px;
    height: 300px;

    object-fit: cover;

    border-radius: 50%;
    border: 0.25rem solid var(--white);
    padding: 0.5rem;

    pointer-events: none;
    user-select: none;

    @media (max-width: 500px) {
      width: 150px;
      height: 150px;
    }
  }
`;
