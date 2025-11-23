import React, {useEffect, useMemo} from "react";
import {ImageContainer, ReturnButton} from "./ImageSection.style";
import {ReactSVG} from "react-svg";

export const ImageSection = ({image}) => {
    const objectUrl = useMemo(() => image && URL.createObjectURL(image), [image]);

    useEffect(() => {
        return () => {
            if (objectUrl) URL.revokeObjectURL(objectUrl);
        };
    }, [objectUrl]);

    const renderImage = () => {
        if (!image) return;
        return (
            <ImageContainer>
                <img src={objectUrl}
                     alt="Preview"
                     className={'details-image'}
                />
            </ImageContainer>
        )
    }

    return (
        <section>
            <ReturnButton>
                <ReactSVG src={`${process.env.PUBLIC_URL}/theme/icons/chevron-left.svg`}/>
            </ReturnButton>
            {renderImage()}
        </section>
    );
}