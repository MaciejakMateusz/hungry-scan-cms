import React from "react";
import {useTranslation} from "react-i18next";
import {MenuItemPosition} from "./menu-item/MenuItemPosition";

export const MenuItemsList = ({chosenCategory}) => {
    const {t} = useTranslation();
    const noPositions = chosenCategory?.menuItems.length === 0;

    const renderMenuItems = () => {
        if (!chosenCategory) {
            return null;
        } else if (noPositions) {
            return (<p className={'menu-preview-no-positions-text'}>{t('noPositionsToDisplay')}</p>);
        }

        return chosenCategory.menuItems.map((menuItem) => (
            <MenuItemPosition key={menuItem?.id} menuItem={menuItem}/>
        ));
    }

    return (
        <div className={'menu-preview-menu-items-wrapper'}>
            {renderMenuItems()}
        </div>
    );
}