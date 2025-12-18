import styled from "styled-components";


export const DialogContainer = styled.div`
    position: relative;
    background-color: #FFF;
    padding: 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    z-index: 9998;
    width: 500px;
    max-height: 70vh;
    border-radius: 10px;
    overflow: hidden;
    margin: 10px;
`

export const ScrollableWrapper = styled.div`
    width: 100%;
    max-height: 70vh;
    overflow-y: auto;
`

export const ButtonsWrapper = styled.div`
    padding-right: 5px;
`;