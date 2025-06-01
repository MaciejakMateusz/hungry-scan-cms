import React, {useEffect, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import {Img} from "react-image";
import {ArrowLeftIcon} from "../../../../../icons/ArrowLeftIcon";
import {s3BucketUrl} from "../../../../../../apiData";

export const ImageSection = ({image}) => {
    const {id} = useSelector(state => state.dishForm.form);
    const {dish} = useSelector(state => state.dishesCategories.view);
    const [shouldRender, setShouldRender] = useState(() => Boolean(image));

    useEffect(() => {
        if (image || id) {
            setShouldRender(true);
        } else {
            setShouldRender(false);
        }
    }, [image, id]);

    const objectUrl = useMemo(() => image && URL.createObjectURL(image), [image]);

    useEffect(() => {
        return () => {
            if (objectUrl) URL.revokeObjectURL(objectUrl);
        };
    }, [objectUrl]);

    if (!shouldRender) return (<></>);

    const renderImage = () => {
        return image ? (
            <img src={objectUrl}
                 alt="Preview"
                 className="details-image"
            />
        ) : (
            <Img src={`${s3BucketUrl}/${id}?t=${dish.updated}`}
                 className="details-image"
                 onError={() => setShouldRender(false)}
            />
        )
    }

    return (
        <section className="details-image-section">
            <button className="return-button">
                <ArrowLeftIcon/>
            </button>
            <div className="details-image-container">
                {renderImage()}
            </div>
        </section>
    );
};
