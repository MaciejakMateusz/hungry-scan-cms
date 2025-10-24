import styled from "styled-components";

export const LegendContainer = styled.div`
    display: grid;
    grid-template-columns: 10px auto 1fr;
    grid-template-rows: auto auto;
    gap: 7px;
    font-size: 1rem;
    font-weight: 300;
`

export const UniqueScanIconContainer = styled.div`
    grid-column: 1;
    grid-row: 1;
    display: flex;
    align-items: center;
`

export const UniqueScanIcon = styled.div`
    width: 9px;
    height: 9px;
    background: #016DFF;
    border-radius: 100px;
`

export const RepeatedScanIconContainer = styled.div`
    grid-column: 1;
    grid-row: 2;
    display: flex;
    align-items: center;
`

export const RepeatedScanIcon = styled.div`
    width: 9px;
    height: 9px;
    background: #4C97F6;
    border-radius: 100px;
`

export const UniqueScanLabel = styled.div`
    grid-column: 2;
    grid-row: 1;
    margin-right: 10px;
`

export const RepeatedScanLabel = styled.div`
    grid-column: 2;
    grid-row: 2;
    margin-right: 20px;
`

export const UniqueValuesWrapper = styled.div`
    grid-column: 3;
    grid-row: 1;
    font-weight: 600;
    display: flex;
    gap: 15px;
`

export const RepeatedValuesWrapper = styled.div`
    grid-column: 3;
    grid-row: 2;
    font-weight: 600;
    display: flex;
    gap: 15px;
`

export const UniqueScanValue = styled.div`

`

export const RepeatedScanValue = styled.div`

`

export const UniqueScanDifference = styled.div`
    color: ${({ $isPositive }) => ($isPositive ? "#6EC191" : "#EC5858")};
`

export const RepeatedScanDifference = styled.div`
    color: ${({ $isPositive }) => ($isPositive ? "#6EC191" : "#EC5858")};
`