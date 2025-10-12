import styled from "styled-components";

export const UsersTable = styled.table`
    width: 100%;
    border-collapse: collapse;

    td {
        vertical-align: middle;
        padding: 10px 0;
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
    &:hover {
        background: #F9F9F9;
    }
`;

export const TableData = styled.td`
`;

export const TableDataActions = styled.td`
    display: flex;
    align-items: center;
`;

export const Actions = styled.div`
    display: flex;
`;

export const Action = styled.span`
    cursor: pointer;
    padding: 0 7px;
`;