import styled from "styled-components";

export const Container = styled.div`
    position: relative;
    width: 100%;
    min-height: 100%;
    height: fit-content;
    background: var(--Basic-100);
    max-height: 100%;
    overflow-y: auto;
    padding-bottom: 70px;
    box-sizing: border-box;

    &::-webkit-scrollbar {
        display: none;
    }
`