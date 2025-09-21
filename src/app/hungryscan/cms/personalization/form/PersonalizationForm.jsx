import React, {useEffect} from "react";
import {WelcomeSloganField} from "./WelcomeSloganField";
import {ThemesField} from "./ThemesField";
import {LogicalToggleField} from "../../form-components/LogicalToggleField";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {setBannerIconVisible} from "../../../../../slices/personalizationSlice";

export const PersonalizationForm = () => {
    const {t } = useTranslation();
    const dispatch = useDispatch();
    const {bannerIconVisible} = useSelector(state => state.personalization.form);
    const {activeMenu} = useSelector(state => state.globalParams.globalParams);

    useEffect(() => {
        if (!activeMenu) return;
        dispatch(setBannerIconVisible(activeMenu.value.bannerIconVisible));
    }, [activeMenu, dispatch]);

    return (
        <>
            <WelcomeSloganField/>
            <ThemesField/>
            <LogicalToggleField id={'toggleIconBanner'}
                                name={t('showBannerIcon')}
                                value={bannerIconVisible}
                                onChange={() => dispatch(setBannerIconVisible(!bannerIconVisible))}/>
        </>
    );
}