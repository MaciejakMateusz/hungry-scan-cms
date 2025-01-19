import {components} from "react-select";
import React from "react";
import {useTranslation} from "react-i18next";


export const CustomNoOptionsMessage = (props) => {
    const {t} = useTranslation();
    return (
        <components.NoOptionsMessage {...props}>
            <div>
                {t('noOptionsMsg')}
            </div>
        </components.NoOptionsMessage>
    );
};