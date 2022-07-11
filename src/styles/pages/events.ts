import styled from "styled-components";

export const CompetitionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .competitions {
    display: flex;
    flex-direction: column;
    overflow: hidden;

    li {
      position: relative;
      cursor: pointer;

      &:first-child {
        height: 60vh;
        width: 100vw;

        > .info {
          display: flex;
          flex-direction: column;
          flex: 1;
          justify-content: center;
          align-items: center;
          position: absolute;

          width: 100%;
          height: 100%;
          gap: 0.75rem;

          z-index: 1;
          color: var(--white);

          > span {
            font-weight: bold;
            text-transform: uppercase;
            line-height: 100%;
            font-size: 1.25rem;
          }

          > button {
            font-weight: bold;
            font-size: 1rem;
            border: unset;
            background: var(--primary);
            padding: 0.75rem 2rem;
            border-radius: 4px;
            color: var(--white);
            transition: var(--transition);

            cursor: pointer;

            &:hover {
              background: var(--primary-hover);
            }
          }
        }

        > img {
          height: 100%;
          width: 100%;

          object-fit: cover;
          pointer-events: none;
          user-select: none;
          z-index: 0;

          mask-image: linear-gradient(to top, transparent, black);
          filter: brightness(25%) grayscale(1);

          transition: var(--transition);
        }

        @media (max-width: 500px) {
          text-align: center;
          height: 40vh;

          .info {
            width: 100%;
            padding: 0 1rem;
          }
        }
      }

      &:not(:first-child) {
        display: none;
      }
    }

    list-style-type: none;
  }
`;
