import styled from "styled-components";

export const TranslationContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: ${({ $hasDescription }) => ($hasDescription ? "82px" : "50px")};
    background: #FFF;
    padding-right: 20px;
    padding-left: 20px;
    position: relative;
    min-width: 450px;
    
    &:hover {
        background: #F9F9F9;
    }
`

export const TextWrapper = styled.div`
    grid-column: 3;
    max-width: 340px;
    width: 100%;
    min-width: 300px;
`;