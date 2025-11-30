import {NavButton} from "./NavButton";
import {executeLogoutFetch, setLogoutActive} from "../../slices/loginFormSlice";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {AppModeSwitcher} from "./common/navigation/AppModeSwitcher";
import {DecisionDialog} from "./cms/dialog-windows/DecisionDialog";
import {LogoutIcon} from "../icons/LogoutIcon";
import {BrandLogo} from "../icons/BrandLogo";
import {USER_PROFILE} from "../../utils/viewsConstants";
import {useSwitchView} from "../../hooks/useSwitchView";
import {ReactSVG} from "react-svg";
import {setNavPanelCollapsed} from "../../slices/globalParamsSlice";
import {useWindowWidth} from "../../hooks/useWindowWidth";

export const NavPanel = ({children, childrenCollapsed, clearStateHandler}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {restaurant} = useSelector(state => state.dashboard.view);
    const {userData} = useSelector(state => state.userProfile.getUserProfile);
    const {logoutActive} = useSelector(state => state.login.logoutFetch);
    const {navPanelCollapsed} = useSelector(state => state.globalParams.globalParams);
    const [isLogoutHovered, setIsLogoutHovered] = useState(false);
    const hasAccessToDashboard = userData?.roles?.some(role => [2, 3].includes(role.id));
    const handleSwitchView = useSwitchView({clearStateHandler: clearStateHandler});
    const windowWidth = useWindowWidth();
    const isTablet = windowWidth < 1000;

    if (isTablet) return null;

    if (navPanelCollapsed) {
        return (
            <div className={`app-nav-panel collapsed`}>
                {logoutActive &&
                    <DecisionDialog
                        msg={t('confirmLogout')}
                        onCancel={() => dispatch(setLogoutActive(false))}
                        onSubmit={() => dispatch(executeLogoutFetch())}
                    />
                }
                <div className={'flex-centered'}>
                    <div className={'user-profile-logo'} onClick={() => handleSwitchView(USER_PROFILE)}>
                        {userData?.forename?.[0].toUpperCase()}
                    </div>
                </div>
                <div className={'app-nav-menu collapsed'}>
                    <ul className={'app-nav-ul collapsed'}>
                        {childrenCollapsed}
                    </ul>
                </div>

                <div className={'collapse-panel-button'}
                     onClick={() => dispatch(setNavPanelCollapsed(!navPanelCollapsed))}>
                    <ReactSVG src={`${process.env.PUBLIC_URL}/theme/icons/chevron-right.svg`}/>
                </div>

                <div className={'app-nav-logout-collapsed-container'}>
                    <LogoutIcon active={isLogoutHovered}
                                onClick={() => dispatch(setLogoutActive(true))}
                                collapsed={true}/>
                </div>
            </div>
        );
    }

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
            <AppModeSwitcher hasAccessToDashboard={hasAccessToDashboard}/>

            <div className={'collapse-panel-button'}
                 onClick={() => dispatch(setNavPanelCollapsed(!navPanelCollapsed))}>
                <ReactSVG src={`${process.env.PUBLIC_URL}/theme/icons/chevron-left.svg`}/>
            </div>

            <div className={'app-nav-menu'}>
                <ul className={'app-nav-ul'}>
                    {children}
                </ul>
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
    );
}