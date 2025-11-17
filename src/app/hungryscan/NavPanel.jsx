import {UserProfileWhiteIcon} from "../icons/UserProfileWhiteIcon";
import {NavButton} from "./NavButton";
import {DocumentIcon} from "../icons/DocumentIcon";
import {executeLogoutFetch, setLogoutActive} from "../../slices/loginFormSlice";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {LanguageSwitcherMobile} from "../../locales/LanguageSwitcherMobile";
import {AppModeSwitcher} from "./common/navigation/AppModeSwitcher";
import {DecisionDialog} from "./cms/dialog-windows/DecisionDialog";

export const NavPanel = ({children, clearStateHandler}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {restaurant} = useSelector(state => state.dashboard.view);
    const {userData} = useSelector(state => state.userProfile.getUserProfile);
    const {logoutActive} = useSelector(state => state.login.logoutFetch);
    const [isLogoutHovered, setIsLogoutHovered] = useState(false);
    const hasAccessToDashboard = userData?.roles?.some(role => [2, 3].includes(role.id));

    return (
        <div className={`app-nav-panel ${!hasAccessToDashboard && 'no-dashboard'}`}>
            {logoutActive &&
                <DecisionDialog
                    msg={t('confirmLogout')}
                    onCancel={() => dispatch(setLogoutActive(false))}
                    onSubmit={() => dispatch(executeLogoutFetch())}
                />
            }
            <div className={'app-nav-header'}>
                    <span className={'profile-name'}>
                        {t('welcome')} {userData?.forename}!
                    </span>
                <div className={'flex-centered'}>
                    <UserProfileWhiteIcon clearStateHandler={clearStateHandler}/>
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
                               onClick={() => dispatch(setLogoutActive(true))}
                               setHovered={setIsLogoutHovered}/>
                </ul>
            </div>
            <div className={'app-nav-restaurant-info-wrapper'}>
                <div className={'app-nav-restaurant-info-container'}>
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