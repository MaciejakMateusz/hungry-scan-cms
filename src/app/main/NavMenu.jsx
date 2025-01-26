import React from "react";
import {useTranslation} from "react-i18next";
import {LogoGroup} from "../icons/LogoGroup";
import {UserProfileIcon} from "../icons/UserProfileIcon";
import {getCookie} from "../../utils/utils";

export const NavMenu = () => {
    const {t} = useTranslation();
    const userForename = getCookie('userForename');

    return (
        <div className={'main-page-menu'}>
            <div className={'main-page-menu-wrapper'}>
                <LogoGroup onClick={() => window.location.href = '/'}/>
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
                <div className={'main-page-login-button-group'} onClick={() => window.location.href = '/sign-in'}>
                        <UserProfileIcon/>
                        <button className={'main-page-login-button'}>
                            {userForename ? `Witaj, ${userForename}!` : t('logInButton')}
                        </button>
                </div>
            </div>
        </div>
    );
}