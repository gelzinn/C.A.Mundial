import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;

  background: var(--black);
  color: var(--white);
  height: 80px;
  width: 100%;

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    max-width: 1120px;
    margin: 0 24px;
  }
`;
