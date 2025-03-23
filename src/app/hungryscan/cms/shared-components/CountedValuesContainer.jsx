import React from "react";
import {components} from 'react-select';
import {useTranslation} from "react-i18next";

export const CountedDaysContainer = ({children, ...props}) => {
    const {t} = useTranslation();
    const selectedCount = props.getValue().length;

    const renderLabel = () => {
        if(selectedCount > 0 && selectedCount !== 7) {
            return t('selectedCount', {count: selectedCount});
        }
        if(selectedCount === 7) {
            return t('everyday');
        }
        return null;
    }

    return (
        <components.ValueContainer {...props}>
            {renderLabel()}
            {children}
        </components.ValueContainer>
    );
};