import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {LogoGroup} from "../icons/LogoGroup";
import {UserProfileIcon} from "../icons/UserProfileIcon";
import {useDispatch, useSelector} from "react-redux";
import {getUserProfile} from "../../slices/userProfileSlice";

export const NavMenu = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {userData} = useSelector(state => state.userProfile.getUserProfile);
    const isBeta = process.env.REACT_APP_IS_BETA === 'true';

    useEffect(() => {
        dispatch(getUserProfile());
    }, [dispatch]);

    const renderMenuButtons = () => {
        if (isBeta) return;
        return (
            <div className={'main-page-menu-buttons'}>
                <button className={'main-page-menu-button'} onClick={() => window.location.href = '/'}>
                    Home
                </button>
                <button className={'main-page-menu-button'} onClick={() => window.location.href = '/our-offer'}>
                    {t('ourOffer')}
                </button>
                <button className={'main-page-menu-button'} onClick={() => window.location.href = '/price-plans'}>
                    {t('pricePlans')}
                </button>
                <button className={'main-page-menu-button'} onClick={() => window.location.href = '/about-us'}>
                    {t('aboutUs')}
                </button>
                <button className={'main-page-menu-button'} onClick={() => window.location.href = '/contact'}>
                    {t('contact')}
                </button>
            </div>
        );
    }

    return (
        <div className={'main-page-menu'}>
            <div className={'main-page-menu-wrapper'}>
                <LogoGroup onClick={() => window.location.href = '/'}/>
                {renderMenuButtons()}
                <div className={'main-page-login-button-group'} onClick={() => window.location.href = '/sign-in'}>
                    <UserProfileIcon/>
                    <button className={'main-page-login-button'}>
                        {userData?.forename ? `${t('welcome')} ${userData?.forename}!` : t('logInButton')}
                    </button>
                </div>
            </div>
        </div>
    );
}