import styled from "styled-components";

export const DialogWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9997;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const DialogContainer = styled.div`
    position: relative;
    background-color: #FFF;
    padding: 5px 5px 30px 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    z-index: 9998;
    width: 40vw;
    max-height: 70vh;
    overflow: auto;
`

export const ButtonsWrapper = styled.div`
    padding-right: 5px;
`;