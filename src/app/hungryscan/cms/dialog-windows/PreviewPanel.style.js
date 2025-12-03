import styled from "styled-components";

export const SidePanel = styled.div`
    display: ${({ $previewActive }) => $previewActive ? 'block' : 'none'};
    width: 310px;
    height: ${({ $personalizationMode }) => $personalizationMode ? '100%' : '94%'};
    background: #FFF;

    @media (max-width: 1000px) {
        position: fixed;
        right: 0;
        top: 0;
        height: 100%;
        z-index: 9990;
        width: ${({ $personalizationMode }) => $personalizationMode ? '350px' : '310px'};
    }
    
    @media (max-width: 550px) {
        position: fixed;
        right: 0;
        top: 0;
        height: 100%;
        z-index: 9990;
        max-width: unset;
        width: 100%;
    }
`;