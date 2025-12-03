import styled from "styled-components";

export const Container = styled.div`
    position: absolute;
    left: 0;
    top: 45vh;
    width: 22px;
    height: 64px;

    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    
    @media (max-width: 550px) {
        left: 0;
    }
`