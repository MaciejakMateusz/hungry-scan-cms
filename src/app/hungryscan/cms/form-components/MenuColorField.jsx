import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {InformationTooltip} from "../shared-components/InformationTooltip";
import {useDispatch, useSelector} from "react-redux";
import {setColor} from "../../../../slices/menuSlice";
import {MenuColorSelect} from "./MenuColorSelect";

export const MenuColorField = ({externalColor}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {color} = useSelector(state => state.menu.form);
    const currentColor = color ? color : externalColor;
    const [expanded, setExpanded] = useState(false);

    const handleColorChange = color => {
        dispatch(setColor(color));
        setExpanded(!expanded);
    }

    return (
        <div className={'form-field-wrapper'}>
            <div className={'form-field-container'}>
                <label htmlFor={'menu-color'} className={'form-label'}>
                    <InformationTooltip text={t('colorSelectTooltip')}/>
                    {t('color')} *
                </label>
                <MenuColorSelect currentColor={currentColor}
                                 handleColorChange={handleColorChange}/>
            </div>
        </div>
    );
}