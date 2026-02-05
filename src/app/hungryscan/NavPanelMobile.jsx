import {NavButton} from "./NavButton";
import {executeLogoutFetch, setLogoutActive} from "../../slices/loginFormSlice";
import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {AppModeSwitcher} from "./common/navigation/AppModeSwitcher";
import {DecisionDialog} from "./cms/dialog-windows/DecisionDialog";
import {LogoutIcon} from "../icons/LogoutIcon";
import {BrandLogo} from "../icons/BrandLogo";
import {USER_PROFILE} from "../../utils/viewsConstants";
import {useSwitchView} from "../../hooks/useSwitchView";
import {ReactSVG} from "react-svg";
import {useOutsideClick} from "../../hooks/useOutsideClick";
import {setMobileNavActive} from "../../slices/globalParamsSlice";
import {AppModeSwitcherWrapper} from "./common/navigation/AppModeSwitcherWrapper";

export const NavPanelMobile = ({children, clearStateHandler, onCollapse}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {restaurant} = useSelector(state => state.dashboard.view);
    const {logoutActive} = useSelector(state => state.login.logoutFetch);
    const {userData} = useSelector(state => state.userProfile.getUserProfile);
    const {mobileNavActive} = useSelector(state => state.globalParams.globalParams);
    const [isLogoutHovered, setIsLogoutHovered] = useState(false);
    const hasAccessToDashboard = userData?.roles?.some(role => [2, 3].includes(role.id));
    const handleSwitchView = useSwitchView({clearStateHandler: clearStateHandler});
    const navPanelRef = useRef(null);

    useOutsideClick(navPanelRef, () => {
        dispatch(setMobileNavActive(false));
    }, mobileNavActive);

    return (
        <div className={'app-nav-panel-mobile-wrapper'} ref={navPanelRef}>
            <div className={`app-nav-panel ${!hasAccessToDashboard && 'no-dashboard'}`}>
                {logoutActive &&
                    <DecisionDialog
                        msg={t('confirmLogout')}
                        onCancel={() => dispatch(setLogoutActive(false))}
                        onSubmit={() => dispatch(executeLogoutFetch({isInactive: false}))}
                    />
                }
                <div className={'app-nav-header'}>
                    <div className={'nav-header-brand-group'}>
                        <BrandLogo/>
                        <span className={'profile-name'}>
                        {t('welcome')} {userData?.forename}!
                    </span>
                    </div>
                    <div className={'flex-centered'}>
                        <div className={'user-profile-logo'} onClick={() => handleSwitchView(USER_PROFILE)}>
                            {userData?.forename?.[0].toUpperCase()}
                        </div>
                    </div>
                </div>

                <AppModeSwitcherWrapper hasAccessToDashboard={hasAccessToDashboard}>
                    <AppModeSwitcher/>
                </AppModeSwitcherWrapper>

                <div className={'app-nav-menu'}>
                    <ul className={'app-nav-ul'}>
                        {children}
                    </ul>
                </div>

                <div className={'collapse-panel-button'} onClick={onCollapse}>
                    <ReactSVG src={`${process.env.PUBLIC_URL}/theme/icons/chevron-left.svg`}/>
                </div>

                <div className={'app-nav-logout'}>
                    <ul className={'app-nav-ul'}>
                        <NavButton name={t('logout')}
                                   icon={<LogoutIcon active={isLogoutHovered}/>}
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
        </div>
    );
}