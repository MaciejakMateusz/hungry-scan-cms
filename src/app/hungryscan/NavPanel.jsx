import {UserProfileWhiteIcon} from "../icons/UserProfileWhiteIcon";
import {NotificationIcon} from "../icons/NotificationIcon";
import {NavButton} from "./NavButton";
import {DocumentIcon} from "../icons/DocumentIcon";
import {executeLogoutFetch} from "../../slices/loginFormSlice";
import {RestaurantLocationIcon} from "../icons/RestaurantLocationIcon";
import React, {useState} from "react";
import {setCurrentView} from "../../slices/globalParamsSlice";
import {DISHES_CATEGORIES, STATS} from "../../utils/viewsConstants";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {LanguageSwitcherMobile} from "../../locales/LanguageSwitcherMobile";

export const NavPanel = ({children}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {restaurant} = useSelector(state => state.dashboard.view);
    const {cmsActive, userForename} = useSelector(state => state.globalParams.globalParams);
    const [isLogoutHovered, setIsLogoutHovered] = useState(false);

    const switchAppMode = () => {
        cmsActive ?
            dispatch(setCurrentView(STATS)) :
            dispatch(setCurrentView(DISHES_CATEGORIES));
    }

    return (
        <div className={'app-nav-panel'}>
            <div className={'app-nav-header'}>
                    <span className={'profile-name'}>
                        {t('welcome')}, {userForename}!
                    </span>
                <UserProfileWhiteIcon/>
                <NotificationIcon/>
                <LanguageSwitcherMobile/>
            </div>
            <div className={'app-mode-switcher-wrapper'}>
                <div className={'app-mode-switcher'} onClick={() => switchAppMode()}>
                    <span className={`app-mode-indicator dashboard ${cmsActive ? '' : 'active'}`}>Pulpit</span>
                    <span className={`app-mode-indicator cms ${cmsActive ? 'active' : ''}`}>CMS</span>
                </div>
            </div>
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