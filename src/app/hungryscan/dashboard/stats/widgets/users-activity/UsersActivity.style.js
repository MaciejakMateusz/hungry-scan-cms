import styled from "styled-components";

export const WidgetHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    font-size: 1.1rem;
    font-weight: 500;
`

export const Container = styled.div`
    width: 100%;
    height: 318px;
    box-sizing: border-box;
    padding: 30px;
    overflow-y: auto;
`

export const Position = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`

export const PositionSeparator = styled.div`
    background: #D9D9D9;
    height: 1px;
    width: 100%;
    margin-bottom: 10px;
`

export const InfoWrapper = styled.div`
    
`

export const TopRow = styled.div`
    display:  flex;
    align-items: center;
    font-size: 1rem;
    color: #1F242D;
`

export const Ellipsis = styled.div`
    max-width: 200px;
    overflow-x: hidden;
    text-overflow: ellipsis;
    text-wrap: nowrap;
`

export const BottomRow = styled.div`
    font-size: 1rem;
    color: #93939E;
    font-weight: 300;
`

export const SignedIndicator = styled.div`
    width: 9px;
    height: 9px;
    background: #6EC191;
    border-radius: 100px;
    margin-right: 5px;
`

export const RoleLabel = styled.div`
    padding: 3px 8px;
    background: ${({$background}) => $background};
    border-radius: 5px;
    margin-left: 5px;
`

export const RoleLabelText = styled.div`
    color: ${({$color}) => $color};
    font-size: 0.8rem;
`

export const ActivityTime = styled.div`
    
`