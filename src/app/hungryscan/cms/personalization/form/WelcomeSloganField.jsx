import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {InformationTooltip} from "../../shared-components/InformationTooltip";
import {useDispatch, useSelector} from "react-redux";
import {setErrorData, setWelcomeSlogan} from "../../../../../slices/personalizationSlice";
import {WelcomeSloganProposition} from "./WelcomeSloganProposition";

export const WelcomeSloganField = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const [isFocused, setIsFocused] = useState(false);
    const {restaurant} = useSelector(state => state.dashboard.view);
    const [isBlankMessage, setIsBlankMessage] = useState(null);
    const [isTooLongMessage, setIsTooLongMessage] = useState(null);
    const {activeMenu} = useSelector(state => state.globalParams.globalParams);
    const {welcomeSlogan} = useSelector(state => state.personalization.form);

    useEffect(() => {
        if (!activeMenu) return;
        const restaurantLanguage = restaurant?.value.settings.language.toLowerCase();
        dispatch(setWelcomeSlogan(activeMenu.value.message[restaurantLanguage]));
    }, [activeMenu, dispatch, restaurant?.value.settings.language]);

    useEffect(() => {
        const isBlank = welcomeSlogan === '' || welcomeSlogan === null;
        const isTooLong = welcomeSlogan?.length > 255;
        setIsBlankMessage(isBlank ? t('constraints.NotBlank') : null);
        setIsTooLongMessage(isTooLong ? t('constraints.MaxLength') : null);
        if (isBlankMessage) {
            dispatch(setErrorData(isBlankMessage ? {message: isBlankMessage} : null));
        } else if (isTooLongMessage) {
            dispatch(setErrorData(isTooLongMessage ? {message: isTooLongMessage} : null));
        } else {
            dispatch(setErrorData(null));
        }
    }, [dispatch, isBlankMessage, isTooLongMessage, t, welcomeSlogan]);

    return (
        <>
            <label htmlFor={'welcome-slogan'} className={'form-label-vertical'}>
                <InformationTooltip text={t('welcomeSloganTooltip')} nonAbsolute={true}/>
                {t('welcomeSlogan')} *
            </label>
            <div className={'full-width'}>
                <input type={'text'}
                       className={`form-field welcome-slogan ${(isBlankMessage || isTooLongMessage) && 'error'}`}
                       id={'welcome-slogan'}
                       name={'name'}
                       value={welcomeSlogan}
                       onChange={(e) => {
                           dispatch(setWelcomeSlogan(e.target.value));
                       }}
                       placeholder={isFocused ? '' : t('addSlogan')}
                       maxLength={255}
                       onFocus={() => setIsFocused(true)}
                       onBlur={() => setIsFocused(false)}/>
                {isBlankMessage && <div className={'validation-msg'}>{isBlankMessage}</div>}
                {isTooLongMessage && <div className={'validation-msg'}>{isTooLongMessage}</div>}
            </div>
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