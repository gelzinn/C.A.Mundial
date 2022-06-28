import styled from "styled-components";

export const MainDocs = styled.main`
  overflow-x: hidden;

  @media screen and (prefers-reduced-motion: no-preference) {
    scroll-snap-type: y mandatory;
  }

  > div {
    scroll-snap-align: center;
  }
`;

export const PresentationDocs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;

  height: 100vh;
  background: var(--black);
  position: relative;
  text-align: center;

  .container {
    position: relative;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    max-width: 1120px;
    height: 100%;
    margin: 0 1rem;
    z-index: 1;
    gap: 3rem;
    color: var(--white);

    > p {
      width: 100%;
      max-width: 600px;
    }

    > span {
      font-size: 5rem;
      font-weight: 900;
      line-height: 100%;

      @media (max-width: 500px) {
        /* font-size: 3rem; */
      }
    }

    > a {
      color: var(--white);
      border: 1px solid var(--white);
      border-radius: 4px;
      padding: 0.5rem 2rem;
      font-weight: bold;
      text-decoration: none;
      text-transform: capitalize;

      &:hover {
        background: var(--white);
        color: var(--black);
      }
    }
  }

  .bg {
    position: absolute;
    top: 0;
    width: 100vw;
    height: 50vh;
    background-image: url("https://global-uploads.webflow.com/61d83a2ebb0ae01ab96e841a/629642e4e4b6821da70eac38_blur-rocketseat-plus.png");
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    transform: scaleY(-1);
    opacity: 0.5;
    z-index: 0;
    filter: invert(67%) sepia(98%) saturate(1504%) hue-rotate(8deg)
      brightness(150%) contrast(104%);
  }
`;

export const DocumentationContainer = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  overflow: hidden auto;

  @media (max-width: 768px) {
    margin: 1rem;
    flex-direction: row-reverse;

    > aside {
      display: none;
    }
  }
`;

export const AsideDocs = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
  position: sticky;
  top: 0;

  width: 100%;
  max-width: 300px;
  height: 100vh;
  background: var(--shape);
  color: var(--white);

  .logo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    max-width: 5rem;
    height: 100%;
    z-index: 5;

    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      pointer-events: none;
      user-select: none;
    }
  }

  nav {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 1rem;
  }

  ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;

    > a {
      width: 100%;
      color: var(--white);
      text-decoration: none;
      padding: 1rem 2rem;
      border-radius: 4px;

      &:hover {
        background: var(--shape-dark);
      }
    }
  }

  .legal-data {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin: 0 2rem;
    color: var(--text);
  }
`;

export const DocsContent = styled.div`
  width: 100%;
  margin: 1rem;
  text-align: justify;

  > h1 {
    font-size: 2.5rem;
    color: #161616;
    font-weight: 900;
    margin: 2rem 0;
    text-align: center;
    text-transform: uppercase;
    line-height: 100%;
    text-align: center;
  }

  > h2,
  h3 {
    margin: 1rem 0;
    text-align: left;
  }
`;
