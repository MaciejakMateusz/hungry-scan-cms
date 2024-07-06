import React, {useEffect, useState} from "react";
import Select from "react-select";
import {components} from "react-select";
import {customSelect} from "../../styles";
import {useTranslation} from "react-i18next";

export const CustomSelect = (props) => {
    const {t} = useTranslation();
    const [chosenValue, setChosenValue] = useState(props.value)

    useEffect(() => {
        setChosenValue(props.value)
    }, [props.value]);
    
    const CustomNoOptionsMessage = (props) => {
        return (
            <components.NoOptionsMessage {...props}>
                <div>
                    {t('noOptionsMsg')}
                </div>
            </components.NoOptionsMessage>
        );
    };

    return (
        <Select id={props.id}
                name={props.name}
                styles={customSelect}
                isDisabled={props.isDisabled}
                value={chosenValue}
                onChange={props.onChange}
                placeholder={props.placeholder}
                isClearable={props.isClearable}
                options={props.options}
                components={{NoOptionsMessage: CustomNoOptionsMessage}}
        />
    );
}