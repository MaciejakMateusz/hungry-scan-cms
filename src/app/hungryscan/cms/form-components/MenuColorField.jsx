import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {InformationTooltip} from "../shared-components/InformationTooltip";
import {useDispatch, useSelector} from "react-redux";
import {setColor} from "../../../../slices/menuSlice";
import {MenuColorSelect} from "./MenuColorSelect";
import {DecisionDialog} from "../dialog-windows/DecisionDialog";
import {getCookie, setCookie} from "../../../../utils/utils";

export const MenuColorField = ({externalColor}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {color: menuColor} = useSelector(state => state.menu.form);
    const {restaurant} = useSelector(state => state.dashboard.view);
    const [colorConfirmationDialogParams, setColorConfirmationDialogParams] = useState(null);
    const menus = restaurant?.value.menus;
    const currentColor = menuColor ? menuColor : externalColor;
    const [expanded, setExpanded] = useState(false);
    const [logicalToggleValue, setLogicalToggleValue] = useState(false);
    const hideColorConfirmation = getCookie('hideColorConfirmation') === 'true';

    const handleColorChange = (color, actionConfirmed) => {
        if (color.id === menuColor.id) return;
        if (menus.map(menu => menu.color.hex).includes(color.hex) && !actionConfirmed && !hideColorConfirmation) {
            setColorConfirmationDialogParams({color: color});
            return;
        }
        dispatch(setColor(color));
        setExpanded(!expanded);
    }

    const handleDialogSubmit = () => {
        handleColorChange(colorConfirmationDialogParams.color, true);
        setColorConfirmationDialogParams(null);
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() + 1);
        const expiryDate = currentDate.toUTCString();
        setCookie('hideColorConfirmation', logicalToggleValue.toString(), expiryDate);
    }

    return (
        <div className={'form-field-wrapper'}>
            {(colorConfirmationDialogParams && !hideColorConfirmation) &&
                <DecisionDialog msg={t('confirmColorChange')}
                                onCancel={() => setColorConfirmationDialogParams(null)}
                                onSubmit={() => handleDialogSubmit()}
                                logicalToggleHandler={setLogicalToggleValue}
                                logicalToggleValue={logicalToggleValue}
                />
            }
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