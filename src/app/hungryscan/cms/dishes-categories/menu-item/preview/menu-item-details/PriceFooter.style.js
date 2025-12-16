import styled from "styled-components";

export const FixedContainer = styled.div`
    position: sticky;
    bottom: -30px;
    left: 0;
    width: 100%;
    height: 77px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.95) 34.99%);
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 1000px) {
        bottom: 0;
        height: 0;
    }
`

export const PriceLabel = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 100px;
    background: var(--Default-Theme);
    position: absolute;
    bottom: 20px;
    width: 91%;
    padding: 10px 0;
`

export const PriceText = styled.span`
    color: var(--Basic-200);
    font-size: 16px;
    font-weight: 400;
`