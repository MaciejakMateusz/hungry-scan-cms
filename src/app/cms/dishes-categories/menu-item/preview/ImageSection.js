import React from "react";
import {useSelector} from "react-redux";
import {Img} from "react-image";
import {ArrowLeftIcon} from "../../../../icons/ArrowLeftIcon";
import {imagesPath} from "../../../../../apiData";

export const ImageSection = () => {
    const {fileName} = useSelector(state => state.dishForm.form);

    const renderImage = () => {
        if (!fileName) {
            return (<></>);
        }
        return (
            <div className={'details-image-container'}>
                <Img src={`${imagesPath}/${fileName}`}
                     className={'details-image'}
                />
            </div>
        );
    }

    return (
        <section className={'details-image-section'}>
            <button className={'return-button'}><ArrowLeftIcon/></button>
            {renderImage()}
        </section>
    );
}