import styled from "styled-components";

export const Section = styled.section`
    position: relative;
    border-radius: 20px 20px 0 0;
    background: var(--Basic-100);
    margin-top: -35px;
    filter: none;
    box-shadow: 0 -9px 20px -11px rgba(0, 0, 0, 0.25);
    width: 100%;
    max-width: 100%;
    height: 100%;

    ${({$noImage}) => $noImage && `
      margin-top: -20px;
      padding-top: 50px;
      box-shadow: none;
      `}
`;

export const Container = styled.div`
    padding: 17px 17px 0 17px;
    font-family: var(--Font-Family-Main), sans-serif;
    font-style: normal;
    line-height: 18px;
    position: relative;
`