import React, {useState} from "react";
import {NavButton} from "../NavButton";
import {useDispatch, useSelector} from "react-redux";
import {UserProfileWhiteIcon} from "../../icons/UserProfileWhiteIcon";
import {NotificationIcon} from "../../icons/NotificationIcon";
import {setCurrentView} from "../../../slices/globalParamsSlice";
import {StatsIcon} from "../../icons/StatsIcon";
import {QrCodeIcon} from "../../icons/QrCodeIcon";
import {PackageIcon} from "../../icons/PackageIcon";
import {UsersIcon} from "../../icons/UsersIcon";
import {DocumentIcon} from "../../icons/DocumentIcon";
import {executeLogoutFetch} from "../../../slices/loginFormSlice";
import {RestaurantLocationIcon} from "../../icons/RestaurantLocationIcon";
import {D_CODE_QR, DISHES_CATEGORIES, PACKAGE, STATS, USERS} from "../../../utils/viewsConstants";
import {Statistics} from "./stats/Statistics";
import {DashboardTopper} from "./DashboardTopper";

export const Dashboard = () => {
    const dispatch = useDispatch();
    const {currentView, cmsActive, userForename} = useSelector(state => state.globalParams.globalParams);
    const [isStatsHovered, setIsStatsHovered] = useState(false);
    const [isQrHovered, setIsQrHovered] = useState(false);
    const [isPackageHovered, setIsPackageHovered] = useState(false);
    const [isUsersHovered, setIsUsersHovered] = useState(false);
    const [isLogoutHovered, setIsLogoutHovered] = useState(false);
    const statsHoveredOrActive = currentView === STATS || isStatsHovered;
    const qrHoveredOrActive = currentView === D_CODE_QR || isQrHovered;
    const packageHoveredOrActive = currentView === PACKAGE || isPackageHovered;
    const usersHoveredOrActive = currentView === USERS || isUsersHovered;

    const renderMainView = () => {
        switch (currentView) {
            case STATS:
                return (<Statistics/>);
            case D_CODE_QR:
                return <h1>Code QR</h1>;
            case PACKAGE:
                return <h1>Package</h1>;
            case USERS:
                return <h1>Users</h1>;
            default:
                return <h1>Stats</h1>;
        }
    };

    const switchAppMode = () => {
        cmsActive ?
            dispatch(setCurrentView(STATS)) :
            dispatch(setCurrentView(DISHES_CATEGORIES));
    }

    return (
        <>
            <div className={'app-nav-panel'}>
                <div className={'app-nav-header'}>
                    <span className={'profile-name'}>Witaj, {userForename}!</span><UserProfileWhiteIcon/><NotificationIcon/>
                </div>
                <div className={'app-mode-switcher-wrapper'}>
                    <div className={'app-mode-switcher'} onClick={() => switchAppMode()}>
                        <span className={`app-mode-indicator dashboard ${cmsActive ? '' : 'active'}`}>Pulpit</span>
                        <span className={`app-mode-indicator cms ${cmsActive ? 'active' : ''}`}>CMS</span>
                    </div>
                </div>
                <div className={'app-nav-menu'}>
                    <ul className={'app-nav-ul'}>
                        <NavButton isActive={currentView === STATS}
                                   name={'Statystyki'}
                                   icon={<StatsIcon active={statsHoveredOrActive}/>}
                                   onClick={() => dispatch(setCurrentView(STATS))}
                                   setHovered={setIsStatsHovered}/>
                        <NavButton isActive={currentView === D_CODE_QR}
                                   name={'Kod QR'}
                                   icon={<QrCodeIcon active={qrHoveredOrActive}/>}
                                   onClick={() => dispatch(setCurrentView(D_CODE_QR))}
                                   setHovered={setIsQrHovered}/>
                        <NavButton isActive={currentView === PACKAGE}
                                   name={'Twój pakiet'}
                                   icon={<PackageIcon active={packageHoveredOrActive}/>}
                                   onClick={() => dispatch(setCurrentView(PACKAGE))}
                                   setHovered={setIsPackageHovered}/>
                        <NavButton isActive={currentView === USERS}
                                   name={'Użytkownicy'}
                                   icon={<UsersIcon active={usersHoveredOrActive}/>}
                                   onClick={() => dispatch(setCurrentView(USERS))}
                                   setHovered={setIsUsersHovered}/>
                    </ul>
                </div>
                <div className={'app-nav-logout'}>
                    <ul className={'app-nav-ul'}>
                        <NavButton name={'Wyloguj się'}
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
                            <span className={'restaurant-info-name'}>Dom Retro Pivnica</span>
                            <span className={'restaurant-info-address'}>ul. Kamienna 55 </span>
                            <span className={'restaurant-info-address'}>Katowice</span>
                        </div>
                    </div>
                </div>
                <div className={'app-nav-footer'}>
                    <span>Powered by HackyBear &copy;</span>
                </div>
            </div>
            <div className={'cms-main'}>
                <section className={'app-base-grid'}>
                    <DashboardTopper/>
                    {renderMainView()}
                </section>
            </div>
        </>
    );
}