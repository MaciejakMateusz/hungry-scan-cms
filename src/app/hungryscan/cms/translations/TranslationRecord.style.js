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
    
    &:hover {
        background: #F9F9F9;
    }
`