import React, {useCallback, useState} from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {fillGapsWithStandard} from "../../../../../utils/schedulerUtils";
import {MenuColorSelect} from "../../form-components/MenuColorSelect";
import {DecisionDialog} from "../../dialog-windows/DecisionDialog";
import {getCookie, setCookie} from "../../../../../utils/utils";

export const SchedulerControlPanel = ({menusConfig, setMenusConfig, externalRef, trashRef}) => {
    const {t} = useTranslation();
    const {restaurant} = useSelector((state) => state.dashboard.view);
    const menus = restaurant?.value.menus;
    const [colorConfirmationDialogParams, setColorConfirmationDialogParams] = useState(null);
    const restaurantSettings = restaurant?.value?.settings;
    const operatingHours = restaurantSettings.operatingHours;
    const [logicalToggleValue, setLogicalToggleValue] = useState(false);
    const hideColorConfirmation = getCookie('hideColorConfirmation') === 'true';
    const [hoveredId, setHoveredId] = useState(null);

    const clearSchedules = () => {
        setMenusConfig(prevMenus =>
            prevMenus.map(menu => ({
                ...menu,
                plan: []
            }))
        );
    };

    const fillWithStandard = useCallback(() => {
        fillGapsWithStandard(setMenusConfig, operatingHours);
    }, [operatingHours, setMenusConfig]);

    const handleColorChange = (color, menu, actionConfirmed) => {
        if (menu.color.id === color.id) return;
        if (menus.map(menu => menu.color.hex).includes(color.hex) && !actionConfirmed && !hideColorConfirmation) {
            setColorConfirmationDialogParams({color: color, menu: menu});
            return;
        }
        let menuToChange = menusConfig.find(m => m.id === menu.id);
        const otherMenus = [...menusConfig].filter(m => m.id !== menu.id);
        menuToChange = {
            ...menuToChange,
            color: color
        };
        otherMenus.push(menuToChange);
        otherMenus.sort((a, b) => {
            if (a.standard !== b.standard) {
                return a.standard ? -1 : 1;
            }
            return a.name.localeCompare(b.name, 'pl', {sensitivity: 'base'});
        });
        setMenusConfig(otherMenus);
    }

    const handleDialogSubmit = () => {
        handleColorChange(colorConfirmationDialogParams.color, colorConfirmationDialogParams.menu, true);
        setColorConfirmationDialogParams(null);
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() + 1);
        const expiryDate = currentDate.toUTCString();
        setCookie('hideColorConfirmation', logicalToggleValue.toString(), expiryDate);
    }

    return (
        <div className={'scheduler-control-panel'} ref={trashRef}>
            {(colorConfirmationDialogParams && !hideColorConfirmation) &&
                <DecisionDialog msg={t('confirmColorChange')}
                                onCancel={() => setColorConfirmationDialogParams(null)}
                                onSubmit={() => handleDialogSubmit()}
                                logicalToggleHandler={setLogicalToggleValue}
                                logicalToggleValue={logicalToggleValue}
                />
            }
            <div className={'external-events'} ref={externalRef}>
                {menusConfig?.map(menu => (
                    <div key={menu.id} className={'external-event-wrapper'}>
                        <MenuColorSelect handleColorChange={handleColorChange}
                                         currentColor={menu.color}
                                         menu={menu}/>
                        <div className={'external-event'}
                             onMouseEnter={() => setHoveredId(menu.id)}
                             onMouseLeave={() => setHoveredId(null)}
                             style={{
                                 background: hoveredId === menu.id && `color-mix(in srgb, ${menu.color.hex}, white 80%)`
                             }}
                             data-menu-id={menu.id}>
                            <span className={'text-ellipsis'}
                                  style={menu.standard ? {maxWidth: '75%'} : {}}>
                                {menu.name}
                            </span>
                            {menu.standard &&
                                <div className={'external-event-standard-indicator'}>
                                    {t('main')}
                                </div>}
                        </div>
                    </div>
                ))}
            </div>

            <div className={'scheduler-utility-buttons'}>
                <div className={'general-button scheduler-button'}
                     onClick={clearSchedules}>
                    {t('clearSchedule')}
                </div>

                <div className={'general-button scheduler-button'}
                     onClick={fillWithStandard}>
                    {t('fillEmptyWithStandard')}
                </div>
            </div>

        </div>
    );
}