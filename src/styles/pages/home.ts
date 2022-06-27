import styled from "styled-components";

export const MainBanner = styled.div`
  width: 100%;

  > img {
    width: 100%;
    max-width: 100%;
    max-height: 100%;
    margin: auto;
    display: block;
    pointer-events: none;
    user-select: none;
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
