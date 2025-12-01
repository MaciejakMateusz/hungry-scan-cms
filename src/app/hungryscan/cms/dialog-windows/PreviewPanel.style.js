import styled from "styled-components";

export const SidePanel = styled.div`
    display: ${({ $previewActive }) => $previewActive ? 'block' : 'none'};
    width: 310px;
    height: 94%;
    background: #FFF;
`;