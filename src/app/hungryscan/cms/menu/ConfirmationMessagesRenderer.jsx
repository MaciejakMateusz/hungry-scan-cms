import {SuccessMessage} from "../dialog-windows/SuccessMessage";
import React from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

export const ConfirmationMessagesRenderer = () => {
    const {t} = useTranslation();
    const {
        newMenuCreated,
        menuDuplicated,
        menuUpdated,
        menuRemoved,
        standardSwitched,
        plansUpdated
    } = useSelector(state => state.menu.form);
    const {
        restaurantRemoved,
        newRestaurantCreated,
        restaurantUpdated} = useSelector(state => state.restaurant.form);
    const {personalizationUpdated} = useSelector(state => state.personalization.form);

    return (
        <>
            {restaurantRemoved && <SuccessMessage text={t('restaurantRemovalSuccess')}/>}
            {newRestaurantCreated && <SuccessMessage text={t('newRestaurantCreated')}/>}
            {restaurantUpdated && <SuccessMessage text={t('restaurantUpdated')}/>}
            {menuRemoved && <SuccessMessage text={t('menuRemovalSuccess')}/>}
            {newMenuCreated && <SuccessMessage text={t('newMenuCreated')}/>}
            {menuDuplicated && <SuccessMessage text={t('menuDuplicated')}/>}
            {menuUpdated && <SuccessMessage text={t('menuUpdated')}/>}
            {plansUpdated && <SuccessMessage text={t('plansUpdated')}/>}
            {standardSwitched && <SuccessMessage text={t('standardSwitched')}/>}
            {personalizationUpdated && <SuccessMessage text={t('personalizationUpdated')}/>}
        </>
    );
}