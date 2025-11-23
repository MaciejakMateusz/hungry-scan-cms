import styled from "styled-components";

export const ImageContainer = styled.div`
    height: 268px;
    width: 100%;
    overflow: hidden;
    position: relative;
`;

export const ReturnButton = styled.div`
    position: absolute;
    top: 10px;
    left: 15px;
    z-index: 1;
    width: 34px;
    height: 34px;
    background: var(--Basic-100);
    filter: drop-shadow(0px 2px 15px rgba(0, 0, 0, 0.10));
    box-shadow: 0 2px 17px 0 rgba(149, 149, 149, 0.10);
    border: none;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;