import styled, {css} from "styled-components";

export const DragAndDropWrapper = styled.div`
    grid-column: 1;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding-left: 20px;
    cursor: grab;

    ${({$disabled}) =>
            $disabled &&
            css`
                cursor: unset;
                color: #7d7d7d;
            `}
`;

export const ImageWrapper = styled.div`
    grid-column: 2;
`;

export const TextWrapper = styled.div`
    grid-column: 3;
    max-width: 340px;
    width: 100%;
`;

export const PricesWrapper = styled.div`
    grid-column: 4;
    color: #33353E;
`;

export const BannersWrapper = styled.div`
    grid-column: 5;
    color: #33353E;
    min-width: 68px;
`;

export const BannersContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

export const VariantsAdditionsCounters = styled.div`
    grid-column: 6;
`;

export const LabelsAllergensCounters = styled.div`
    grid-column: 7;
`;


export const Banner = styled.div`
    padding: 6px 10px;
    border-radius: 16px;
    background: #F5EDFF;
    color: #8540DD;
    display: flex;
    justify-content: center;
    align-items: center;
`