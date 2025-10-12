import styled from "styled-components";

export const Grid = styled.div`
    display: grid;
    grid-template-columns: 150px 1fr;
    align-items: center;
`;

export const Label = styled.div`
    grid-column: 1;
    margin-bottom: 1rem;
`;

export const Fields = styled.div`
    grid-column: 2;
    display: flex;
    align-items: center;
    gap: 15px;
`;

export const Available = styled.div`
    margin-left: 15px;
`;