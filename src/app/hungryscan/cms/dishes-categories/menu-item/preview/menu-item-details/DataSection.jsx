import React from "react";
import {NameAndDescription} from "./NameAndDescription";
import {Variants} from "./Variants";
import {Additions} from "./Additions.jsx";
import {BannersLabelsTopper} from "./BannersLabelsTopper.jsx";
import {Container, Section} from "./DataSection.style";

export const DataSection = ({image}) => {

    return (
        <Section $noImage={!image}>
            <Container>
                <BannersLabelsTopper/>
                <NameAndDescription/>
                <Variants/>
                <Additions/>
            </Container>
        </Section>
    );
}