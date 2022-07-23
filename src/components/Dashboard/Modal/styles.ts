import styled from "styled-components";

export const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding: 1rem;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.7);
  .container {
    position: relative;
    background: var(--white);
    color: var(--black);
    border-radius: 4px;
    width: 100%;
    max-width: 768px;
    height: 100%;
    max-height: 768px;
  }
  .close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 100%;
    max-width: 2rem;
    height: 100%;
    max-height: 2rem;
    padding: 0.25rem;
    cursor: pointer;
    color: var(--white);
    background: var(--black);
    border-radius: 50%;
    > svg {
      width: 100%;
      height: 100%;
    }
  }
  .content {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    align-self: flex-start;
    overflow-y: auto;
    height: 100%;
    /* gap: 0.25rem; */
    > header {
      width: 100%;
      padding: 1rem 0 1rem 1rem;
      background: var(--black);
      color: var(--white);
      border-top-left-radius: 1px;
      border-top-right-radius: 1px;
      > h1 {
        width: 100%;
        max-width: calc(100% - 3.5rem);
        font-size: 1.5rem;
        font-weight: normal;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
`;
