import React from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {LoadingSpinner} from "../../../icons/LoadingSpinner";
import {MenuItemVariants} from "./records/MenuItemVariants";
import {DishesCategories} from "./records/DishesCategories";
import {Additions} from "./records/Additions";
import {WelcomeSlogans} from "./records/WelcomeSlogans";

export const TranslationsList = ({isDataLoading}) => {
    const {t} = useTranslation();
    const {chosenGroup} = useSelector(state => state.translations.view);

    const renderRecords = () => {
        if (isDataLoading) return <LoadingSpinner/>
        switch (chosenGroup?.value) {
            case 'menuItemsVariants':
                return <MenuItemVariants/>;
            case 'categoriesMenuItems':
                return <DishesCategories/>;
            case 'additions':
                return <Additions/>;
            case 'welcomeSlogans':
                return <WelcomeSlogans/>;
            default:
                return (<p className={'text-center'}>{t('noRecordsFound')}</p>);
        }
    }

    return (
        <div className={'scrollable-wrapper'}>
            {renderRecords()}
        </div>
    );
}