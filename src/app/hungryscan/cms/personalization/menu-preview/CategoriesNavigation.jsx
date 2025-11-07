import React from "react";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {useGetTranslation} from "../../../../../hooks/useGetTranslation";

export const CategoriesNavigation = ({chooseCategory, chosenCategory}) => {
    const {t} = useTranslation();
    const {menu} = useSelector(state => state.cms.fetchActiveMenu);
    const getTranslation = useGetTranslation();
    const categories = menu?.categories;
    const theme = menu?.theme;

    const renderCategoriesButtons = () => {
        if (categories.length === 0) {
            return (
                <div className={'menu-preview-nav-category'}>
                    <span>{t('noCategoriesToDisplay')}</span>
                </div>
            );
        }
        return categories.map(category => (
            <div key={category.id}
                 className={`menu-preview-nav-category ${category?.id === chosenCategory?.id ? 'active' : ''}`}
                 style={category?.id === chosenCategory?.id ? {background: theme} : {}}
                 onClick={() => chooseCategory(category)}>
                <span>{getTranslation(category?.name)}</span>
            </div>
        ));
    };

    return (
        <div className={'menu-preview-nav-container'}>
            {renderCategoriesButtons()}
        </div>
    );
};