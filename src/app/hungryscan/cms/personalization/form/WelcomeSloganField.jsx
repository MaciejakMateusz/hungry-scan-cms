import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {InformationTooltip} from "../../shared-components/InformationTooltip";
import {useDispatch, useSelector} from "react-redux";
import {setWelcomeSlogan} from "../../../../../slices/personalizationSlice";
import {getTranslation} from "../../../../../locales/langUtils";
import {WelcomeSloganProposition} from "./WelcomeSloganProposition";

export const WelcomeSloganField = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const [isFocused, setIsFocused] = useState(false);
    const {activeMenu} = useSelector(state => state.globalParams.globalParams);
    const {welcomeSlogan} = useSelector(state => state.personalization.form);

    useEffect(() => {
        if (!activeMenu) return;
        dispatch(setWelcomeSlogan(getTranslation(activeMenu.value.message)));
    }, [activeMenu, dispatch]);

    return (
        <>
            <label htmlFor={'welcome-slogan'} className={'form-label-vertical'}>
                <InformationTooltip text={t('welcomeSloganTooltip')} nonAbsolute={true}/>
                {t('welcomeSlogan')} *
            </label>
            <input type={'text'}
                   className={`form-field welcome-slogan`}
                   id={'welcome-slogan'}
                   name={'name'}
                   value={welcomeSlogan}
                   onChange={(e) => {
                       dispatch(setWelcomeSlogan(e.target.value));
                   }}
                   placeholder={isFocused ? '' : t('addSlogan')}
                   onFocus={() => setIsFocused(true)}
                   onBlur={() => setIsFocused(false)}/>
            <div className={'welcome-slogan-propositions-container'}>
                <WelcomeSloganProposition value={t('goodDay')}/>
                <WelcomeSloganProposition value={t('enjoyYourMeal')}/>
                <WelcomeSloganProposition value={t('weWelcome')}/>
                <WelcomeSloganProposition value={t('niceToSeeYou')}/>
                <WelcomeSloganProposition value={t('hello')}/>
            </div>
        </>
    );
}