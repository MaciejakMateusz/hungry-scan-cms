import styled from "styled-components";

export const Container = styled.div`
    margin-bottom: 8px;
    width: 100%;
    border-radius: 8px;
    background: var(--Basic-100);
    box-shadow: 0 2px 16px 0 rgba(149, 149, 149, 0.10);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 8px;
    box-sizing: border-box;
`

export const PositionText = styled.span`
    color: var(--Basic-900);
    font-size: 14px;
    font-weight: 300;
`

export const PositionPrice= styled.span`
    color: var(--Basic-900);
    font-size: 14px;
    font-weight: 400;
    text-wrap: nowrap;
`