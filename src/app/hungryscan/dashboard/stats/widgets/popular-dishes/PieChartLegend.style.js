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
    width: 9px;
    height: 9px;
    background: ${({ $color }) => $color};
    border-radius: 100px;
`

export const Label = styled.div`

`

export const Value = styled.div`
    font-weight: 600;
`