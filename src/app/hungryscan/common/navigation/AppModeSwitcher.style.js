import styled from "styled-components";

export const Wrapper = styled.div`
    grid-row: 2;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Switcher = styled.div`
    position: relative;
    z-index: 10;
    width: 210px;
    height: 37px;
    background: #23262D;
    border-radius: 100px;
    display: flex;
    align-items: center;
    color: var(--Basic-300);
    font-weight: 400;
    line-height: 16px;
    cursor: pointer;
`;

export const IndexedText = styled.span`
    z-index: 12;
`;

export const SwitcherPill = styled.div`
    position: absolute;
    z-index: 11;
    width: 100px;
    height: 27px;
    background: #8540DD;
    border-radius: 100px;
    left: ${({ $cmsActive }) => ($cmsActive ? "105px" : "5px")};
    transition: left 0.3s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
`;