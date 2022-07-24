import styled from "styled-components";

export const LoginPage = styled.div`
  display: grid;
  grid-template-columns: 65fr 35fr;
  justify-content: center;
  align-items: center;

  height: 100vh;

  .illustration {
    background: var(--black);

    position: relative;
    overflow: hidden;

    > img:not(#logo) {
      position: absolute;

      left: -10%;

      height: 150%;

      mask-image: linear-gradient(to left, transparent, black);
      opacity: 0.1;
      filter: grayscale(1);

      &#side {
        left: -25%;
        opacity: 0.025;
      }
    }

    .bg {
      position: absolute;
      width: 100%;
      height: 100vh;

      left: 0;

      background-image: url("https://global-uploads.webflow.com/61d83a2ebb0ae01ab96e841a/629642e4e4b6821da70eac38_blur-rocketseat-plus.png");
      background-position: center center;
      background-size: cover;
      background-repeat: no-repeat;
      opacity: 0.5;
      filter: invert(67%) sepia(98%) saturate(5004%) hue-rotate(8deg)
        brightness(250%) contrast(104%);

      &.corner {
        bottom: 0;
        left: -100%;

        width: 250%;
        height: 150vh;
      }

      &.left {
        left: 0;

        width: 100vh;
        height: 150%;

        transform: rotate(90deg);
      }
    }
  }

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 100vh;

    &.form {
      padding: 0 1rem;

      > form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        width: 100%;
        max-width: 450px;

        gap: 1rem;

        > h1 {
          text-transform: uppercase;
        }

        > input {
          width: 100%;
          border: 1.5px solid var(--black);
          color: var(--black);
          padding: 5px;
          font-size: 18px;
          border-radius: 4px;
        }

        > .actions {
          display: flex;
          justify-content: space-between;
          align-items: center;

          width: 100%;

          .checkbox-container {
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            padding-left: calc(20px + 0.25rem);
            cursor: pointer;
            user-select: none;

            > input {
              position: absolute;
              opacity: 0;
              cursor: pointer;
              height: 0;
              width: 0;

              &:checked ~ .checkmark {
                background-color: var(--primary);
                border: unset;

                &:after {
                  display: block;
                }
              }
            }

            .checkmark {
              position: absolute;
              top: 0;
              left: 0;
              height: 20px;
              width: 20px;
              border: 1px solid var(--black);
              border-radius: 4px;

              &:after {
                content: "";
                position: absolute;
                display: none;

                left: 6px;
                top: 2px;
                width: 5px;
                height: 10px;

                border: solid var(--white);
                border-width: 0 3px 3px 0;

                transform: rotate(45deg);
              }
            }

            &:hover input {
              &:not(:checked) {
                & ~ .checkmark {
                  background-color: var(--white-dark);
                }
              }
              &:checked {
                & ~ .checkmark {
                  background-color: var(--primary-hover);
                }
              }
            }
          }
        }

        > button {
          background: var(--primary);
          border: 1px solid var(--primary);
          color: var(--white);

          text-transform: uppercase;
          font-weight: bold;

          padding: 0.5rem 2rem;
          border-radius: 4px;
          cursor: pointer;

          width: 100%;
          transition: var(--transition);

          &:hover {
            background: var(--primary-hover);
          }
        }

        > p {
          display: flex;

          gap: 0.25rem;

          text-decoration: none;

          > b {
            color: var(--primary);
            cursor: pointer;

            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }
  }

  @media (max-width: 1200px) {
    grid-template-columns: 50fr 50fr;
  }

  @media (max-width: 900px) {
    display: flex;
    justify-content: center;
    align-items: center;

    > div:first-child {
      display: none;
    }
  }
`;
