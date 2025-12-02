import React, {useEffect, useMemo} from "react";
import {ImageContainer} from "./ImageSection.style";

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
            {renderImage()}
        </section>
    );
}