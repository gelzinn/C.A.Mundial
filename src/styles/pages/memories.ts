import styled from "styled-components";

export const MemoriesDescription = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  width: 100%;
  min-height: 500px;
  height: 100%;
  max-height: 650px;
  overflow: hidden;

  border-bottom: 1px solid var(--shape-dark);

  .info {
    flex: 1;
    margin: 0 1rem;
    width: 100%;
    max-width: 1120px;

    h1 {
      text-transform: uppercase;
      font-weight: 800;
    }

    p {
      text-align: justify;
      width: 100%;
      max-width: 500px;
    }
  }

  > video {
    position: absolute;
    right: 0;
    top: 0;

    width: 100%;
    max-width: calc(100% / 2);
    height: auto;
    min-height: 500px;
    mask-image: linear-gradient(to right, transparent, black);
    filter: grayscale(1);
    object-fit: cover;
  }

  @media (max-width: 768px) {
    flex-direction: column;

    .info {
      text-align: center;
      margin: 1rem;

      p {
        text-align: center;
        width: 100%;
        max-width: unset;
        padding: 0 0.5rem;
      }
    }

    > video {
      position: absolute;
      width: 100%;
      max-width: unset;
      min-height: unset;
      height: auto;

      top: unset;
      right: unset;
      bottom: 0;
      mask-image: linear-gradient(to bottom, transparent, black);
    }
  }
`;

export const MemoriesLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem;

  > span {
    font-weight: bold;
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;

    width: 100%;
    max-width: 1120px;
    margin: 1rem;
  }

  .item {
    overflow: hidden;
    flex-grow: 1;
    border-radius: 4px;

    > img {
      pointer-events: none;
      user-select: none;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
