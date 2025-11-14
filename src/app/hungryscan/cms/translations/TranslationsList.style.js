import styled from "styled-components";

export const TranslationContainer = styled.div`
    width: 100%;
    margin-bottom: ${({ $hasParent }) => ($hasParent ? "20px" : "1px")};

    cursor: pointer;
`