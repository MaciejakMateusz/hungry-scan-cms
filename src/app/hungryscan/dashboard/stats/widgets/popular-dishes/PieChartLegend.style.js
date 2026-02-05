import styled from "styled-components";

export const LegendContainer = styled.div`

`

export const Position = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
    font-size: 1rem;
    font-weight: 300;
`

export const IconLabelWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

export const Icon = styled.div`
    padding: 4px;
    background: ${({ $color }) => $color};
    border-radius: 100px;
`

export const Label = styled.div`
    line-height: 1.2;
    max-height: 1.2em;
    overflow: clip;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
`

export const Value = styled.div`
    font-weight: 600;
`