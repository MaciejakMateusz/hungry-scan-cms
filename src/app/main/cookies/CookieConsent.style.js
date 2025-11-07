import styled from "styled-components";

export const Container = styled.div`
    position: fixed;
    bottom: 40px;
    left: 40px;
    height: 200px;
    width: 400px;
    background: var(--Basic-300);
    box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.05);
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 9999;
`

export const Header = styled.span`
    color: #000;
    font-size: 1.2rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Text = styled.span`
    color: var(--Grey-700);
    font-size: 1rem;
`

export const Footer = styled.footer`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`
