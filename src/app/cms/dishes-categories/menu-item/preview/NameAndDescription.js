import React from "react";
import {useSelector} from "react-redux";
import {Labels} from "./Labels";

export const NameAndDescription = () => {
    const {name, description, banner} = useSelector(state => state.dishForm.form);
    const hasBanner = banner !== '';

    return (
        <>
            <div className={`details-name ${!hasBanner ? 'no-banner' : ''}`}>
                {name}
                <Labels/>
            </div>
            <div className={'details-description'}>
                {description}
            </div>
        </>
    );
}