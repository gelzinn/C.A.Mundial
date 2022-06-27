import styled from "styled-components";

export const MainBanner = styled.div`
  width: 100%;
  /* background: var(--black); */
  position: relative;

  img {
    width: 100%;
    max-width: 100%;
    max-height: 100%;
    margin: auto;
    display: block;
    pointer-events: none;
    user-select: none;
    transition: var(--transition);
    /* mask-image: linear-gradient(black, black, transparent); */
  }

  .actions {
    display: flex;
    justify-content: center;
    gap: 16px;

    visibility: visible;
    position: absolute;

    z-index: 2;
    transition: var(--transition);
    margin: 0 auto;
    padding: 0 2rem;

    width: 100%;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);

    > a {
      text-align: center;
      text-decoration: none;
      border: 1px solid var(--white);
      color: var(--white);
      padding: 0.5rem 1.5rem;
      border-radius: 4px;
      font-size: 100%;
      transition: var(--transition);

      &:hover {
        background: var(--white);
        color: var(--black);
      }
    }
  }

  @media (min-width: 768px) {
    height: auto;
  }
  @media (max-width: 768px) {
    height: 300px;

    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

export const RecentEvent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  max-width: 1120px;
  margin: 0 auto;
`;
