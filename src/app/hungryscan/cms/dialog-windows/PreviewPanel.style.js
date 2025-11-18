import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
    from {
        transform: translateX(100%);
    }
    to {
        transform: translateX(0);
    }
`;

export const SidePanel = styled.div`
    display: ${({ $previewActive }) => $previewActive};
    width: 500px;
    height: 100%;
    background: #FFF;
    z-index: 9999;

    animation: ${slideIn} 0.5s ease-in-out forwards;
`;

export const CloseButton = styled.span`
    cursor: pointer;
    font-size: 1.5rem;
    padding: 10px;
`;