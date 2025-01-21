import React, {useState} from "react";
import {NavButton} from "../cms/NavButton";
import {UserProfileWhiteIcon} from "../icons/UserProfileWhiteIcon";
import {NotificationIcon} from "../icons/NotificationIcon";
import {StatsIcon} from "../icons/StatsIcon";
import {QrCodeIcon} from "../icons/QrCodeIcon";
import {PackageIcon} from "../icons/PackageIcon";
import {UsersIcon} from "../icons/UsersIcon";
import {RestaurantLocationIcon} from "../icons/RestaurantLocationIcon";
import {LogoutIcon} from "../icons/LogoutIcon";
import {useDispatch, useSelector} from "react-redux";
import {executeLogoutFetch} from "../../slices/loginFormSlice";
import {toggleMode} from "../../slices/globalParamsSlice";

export const DashboardNav = () => {
    const dispatch = useDispatch();
    const [activeView, setActiveView] = useState("stats");
    const [isStatsHovered, setIsStatsHovered] = useState(false);
    const [isQrHovered, setIsQrHovered] = useState(false);
    const [isPackageHovered, setIsPackageHovered] = useState(false);
    const [isUsersHovered, setIsUsersHovered] = useState(false);
    const [isLogoutHovered, setIsLogoutHovered] = useState(false);
    const statsHoveredOrActive = activeView === 'stats' || isStatsHovered;
    const qrHoveredOrActive = activeView === 'codeQr' || isQrHovered;
    const packageHoveredOrActive = activeView === 'package' || isPackageHovered;
    const usersHoveredOrActive = activeView === 'users' || isUsersHovered;
    const {cmsActive} = useSelector(state => state.globalParams.globalParams);

    const renderMainView = () => {
        switch (activeView) {
            case 'stats':
                return <h1>Stats</h1>;
            case 'codeQr':
                return <h1>Code QR</h1>;
            case 'package':
                return <h1>Package</h1>;
            case 'users':
                return <h1>Users</h1>;
            default:
                return <h1>Stats</h1>;
        }
    };

    return (
        <>
            <div className={'app-nav-panel'}>
                <div className={'app-nav-header'}>
                    <span className={'profile-name'}>Witaj, Mateusz!</span><UserProfileWhiteIcon/><NotificationIcon/>
                </div>
                <div className={'app-mode-switcher-wrapper'}>
                    <div className={'app-mode-switcher'} onClick={() => dispatch(toggleMode())}>
                        <span className={`app-mode-indicator dashboard ${cmsActive ? '' : 'active'}`}>Pulpit</span>
                        <span className={`app-mode-indicator cms ${cmsActive ? 'active' : ''}`}>CMS</span>
                    </div>
                </div>
                <div className={'app-nav-menu'}>
                    <ul className={'app-nav-ul'}>
                        <NavButton isActive={activeView === 'stats'}
                                   name={'Statystyki'}
                                   icon={<StatsIcon active={statsHoveredOrActive}/>}
                                   onClick={() => setActiveView("stats")}
                                   setHovered={setIsStatsHovered}/>
                        <NavButton isActive={activeView === 'codeQr'}
                                   name={'Kod QR'}
                                   icon={<QrCodeIcon active={qrHoveredOrActive}/>}
                                   onClick={() => setActiveView("codeQr")}
                                   setHovered={setIsQrHovered}/>
                        <NavButton isActive={activeView === 'package'}
                                   name={'Twój pakiet'}
                                   icon={<PackageIcon active={packageHoveredOrActive}/>}
                                   onClick={() => setActiveView("package")}
                                   setHovered={setIsPackageHovered}/>
                        <NavButton isActive={activeView === 'users'}
                                   name={'Użytkownicy'}
                                   icon={<UsersIcon active={usersHoveredOrActive}/>}
                                   onClick={() => setActiveView("users")}
                                   setHovered={setIsUsersHovered}/>
                    </ul>
                </div>
                <div className={'app-nav-logout'}>
                    <ul className={'app-nav-ul'}>
                        <NavButton name={'Wyloguj się'}
                                   icon={<LogoutIcon active={isLogoutHovered}/>}
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
                {renderMainView()}
            </div>
        </>
    );
}