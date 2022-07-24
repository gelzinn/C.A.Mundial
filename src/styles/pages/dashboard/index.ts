import styled from "styled-components";

export const GridAppContainer = styled.main`
  display: flex;
  > main {
    margin-left: 300px;
    width: 100%;
  }
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    > main {
      margin: unset;
    }
  }
`;

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  margin: 1rem;
  gap: 1rem;

  @media (max-width: 768px) {
    height: unset;
    align-items: flex-start;
    justify-content: flex-start;
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 600px;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  /* margin: 0 1rem; */
  padding: 2rem;
  gap: 1rem;
  width: 100%;
  height: 100%;
  min-height: 250px;
  border: 1px dashed #e6e6e6;
  border-radius: 4px;
  cursor: pointer;
  transition: var(--transition);
  background: linear-gradient(to bottom, transparent, #e6e6e675);
  > span {
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1.25rem;
  }
  > p {
    text-align: center;
    width: 100%;
    max-width: 450px;
  }
  > svg {
    width: 100%;
    max-width: 5rem;
    height: 100%;
    margin-bottom: 0.5rem;
  }
  &:hover {
    background: #e6e6e675;
  }
`;
