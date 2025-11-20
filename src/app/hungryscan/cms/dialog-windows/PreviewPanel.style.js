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

export const Header = styled.div`
    height: 30px;
    background: #F6F6F6;
    display: flex;
    padding: 10px;
    box-sizing: border-box;
`;
export const CloseButton = styled.span`
    font-size: 1rem;
    cursor: pointer;
`;