import styled from "styled-components";

export const UsersTable = styled.table`
    width: 100%;
    border-collapse: collapse;

    td {
        vertical-align: middle;
        padding: 10px 5px 10px 0;
        font-size: 1rem;
    }
`;

export const TableHead = styled.thead`
    border-bottom: 1px solid var(--Grey-300);
`;

export const TableHeadRow = styled.tr`
`;

export const TableHeadCell = styled.th`
    text-align: left;
    padding-bottom: 10px;
    font-size: 1.1rem;
    font-weight: 500;
`;

export const TableRow = styled.tr`
    cursor: pointer;
    height: 52px;
    &:hover {
        background: #F9F9F9;
    }
`;

export const TableData = styled.td`
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-wrap: nowrap;
`;

export const TableDataActions = styled.td`
    ${({ $isWide }) => !$isWide && `
    position: sticky;
    right: 1px;
    `};
`

export const ActionsWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    ${({ $isWide }) => !$isWide && `
    border: 1px solid #EDEFF3;
    background: #FFF;
    border-radius: 100px;
    width: 28px;
    height: 28px;
    `};
`;


export const Actions = styled.div`
    display: flex;
`;