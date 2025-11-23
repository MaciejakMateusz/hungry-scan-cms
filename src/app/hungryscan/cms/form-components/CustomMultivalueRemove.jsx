import {components} from "react-select";
import React from "react";
import {CloseIcon} from "../../../icons/CloseIcon";


export const CustomMultivalueRemove = (props) => {
    const {data} = props;
    return (
        <components.MultiValueRemove {...props}>
            <CloseIcon fill={'available' in data.value && !data.value?.available ? '#D80303' : '#8540DD'}/>
        </components.MultiValueRemove>
    );
};