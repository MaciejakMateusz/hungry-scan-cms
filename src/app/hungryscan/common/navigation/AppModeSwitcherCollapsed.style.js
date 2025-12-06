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
    width: 32px;
    height: 70px;
    background: #23262D;
    border-radius: 100px;
    display: grid;
    grid-template-rows: 1fr 1fr;
    align-items: center;
    justify-content: center;
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    cursor: pointer;
    box-sizing: border-box;
`;

export const IndexedText = styled.span`
    z-index: 12;
`;

export const SwitcherPill = styled.div`
    grid-row: ${({ $cmsActive }) => ($cmsActive ? "2" : "1")};;
    z-index: 11;
    width: 28px;
    height: 28px;
    background: #8540DD;
    color: var(--Basic-300);
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const SwitcherPillInactive = styled.div`
    grid-row: ${({$cmsActive}) => ($cmsActive ? "1" : "2")};;
    z-index: 11;
    color: #93939e;
    width: 28px;
    height: 28px;
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
`;