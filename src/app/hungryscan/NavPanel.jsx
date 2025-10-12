import {UserProfileWhiteIcon} from "../icons/UserProfileWhiteIcon";
import {NavButton} from "./NavButton";
import {DocumentIcon} from "../icons/DocumentIcon";
import {executeLogoutFetch} from "../../slices/loginFormSlice";
import {RestaurantLocationIcon} from "../icons/RestaurantLocationIcon";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {LanguageSwitcherMobile} from "../../locales/LanguageSwitcherMobile";
import {AppModeSwitcher} from "./common/navigation/AppModeSwitcher";

export const NavPanel = ({children}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {restaurant} = useSelector(state => state.dashboard.view);
    const {userData} = useSelector(state => state.userProfile.getUserProfile);
    const [isLogoutHovered, setIsLogoutHovered] = useState(false);
    const hasAccessToDashboard = userData?.roles?.some(role => [2, 3].includes(role.id));

    return (
        <div className={`app-nav-panel ${!hasAccessToDashboard && 'no-dashboard'}`}>
            <div className={'app-nav-header'}>
                    <span className={'profile-name'}>
                        {t('welcome')} {userData?.forename}!
                    </span>
                <div className={'flex-centered'}>
                    <UserProfileWhiteIcon/>
                    <LanguageSwitcherMobile/>
                </div>
            </div>
            <AppModeSwitcher hasAccessToDashboard={hasAccessToDashboard}/>
            <div className={'app-nav-menu'}>
                <ul className={'app-nav-ul'}>
                    {children}
                </ul>
            </div>
            <div className={'app-nav-logout'}>
                <ul className={'app-nav-ul'}>
                    <NavButton name={t('logout')}
                               icon={<DocumentIcon active={isLogoutHovered}/>}
                               onClick={() => dispatch(executeLogoutFetch())}
                               setHovered={setIsLogoutHovered}/>
                </ul>
            </div>
            <div className={'app-nav-restaurant-info-wrapper'}>
                <div className={'app-nav-restaurant-info-container'}>
                    <div className={'app-nav-restaurant-info-icon'}>
                        <RestaurantLocationIcon/>
                    </div>
                    <div className={'app-nav-restaurant-info'}>
                        <div>
                            <span className={'restaurant-info-name'}>{restaurant?.label}</span>
                            <span className={'restaurant-info-address'}>{restaurant?.value.address}</span>
                            <span className={'restaurant-info-address'}>{restaurant?.value.city}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'app-nav-footer'}>
                <span>Powered by HungryScan &copy;</span>
            </div>
        </div>
    );
}