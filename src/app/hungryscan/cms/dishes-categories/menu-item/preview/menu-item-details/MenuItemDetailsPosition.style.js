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
    width: 100%;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    line-height: 1.3;
    max-height: calc(1.3em * 3);
    margin-right: 10px;
`

export const PositionPrice= styled.span`
    color: var(--Basic-900);
    font-size: 14px;
    font-weight: 400;
    text-wrap: nowrap;
`