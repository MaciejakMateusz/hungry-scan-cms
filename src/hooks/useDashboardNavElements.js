import {NavButton} from "../app/hungryscan/NavButton";
import {CODE_QR, STATS, USERS} from "../utils/viewsConstants";
import React from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {useSwitchView} from "./useSwitchView";
import {Tooltip} from "../app/hungryscan/cms/Tooltip";
import {StatsIcon} from "../app/icons/StatsIcon";
import {QrCodeIcon} from "../app/icons/QrCodeIcon";
import {UsersIcon} from "../app/icons/UsersIcon";
import {useClearDashboardState} from "./useClearDashboardState";

export const useDashboardNavElements = ({type}) => {
    const {t} = useTranslation();
    const {currentView} = useSelector(state => state.globalParams.globalParams);
    const clearDashboardState = useClearDashboardState();
    const handleSwitchView = useSwitchView({clearStateHandler: clearDashboardState});
    const statsHoveredOrActive = currentView === STATS;
    const qrHoveredOrActive = currentView === CODE_QR;
    const usersHoveredOrActive = currentView === USERS;

    if (type === 'expanded') {
        return [
            <NavButton key={STATS}
                       isActive={currentView === STATS}
                       name={t('statistics')}
                       icon={<StatsIcon active={statsHoveredOrActive}/>}
                       onClick={() => handleSwitchView(STATS)}/>,
            <NavButton key={CODE_QR}
                       isActive={currentView === CODE_QR}
                       name={t('qrCode')}
                       icon={<QrCodeIcon active={qrHoveredOrActive}/>}
                       onClick={() => handleSwitchView(CODE_QR)}/>,
            <NavButton key={USERS}
                       isActive={currentView === USERS}
                       name={t('users')}
                       icon={<UsersIcon active={usersHoveredOrActive}/>}
                       onClick={() => handleSwitchView(USERS)}/>
        ];
    } else if (type === 'collapsed') {
        return [
            <div onClick={() => handleSwitchView(STATS)}>
                <Tooltip content={t('statistics')} topOffset={-20}>
                    <StatsIcon active={statsHoveredOrActive} collapsed={true}/>
                </Tooltip>
            </div>,
            <div onClick={() => handleSwitchView(CODE_QR)}>
                <Tooltip content={t('qrCode')} topOffset={-20}>
                    <QrCodeIcon active={qrHoveredOrActive} collapsed={true}/>
                </Tooltip>
            </div>,
            <div onClick={() => handleSwitchView(USERS)}>
                <Tooltip content={t('users')} topOffset={-20}>
                    <UsersIcon active={usersHoveredOrActive} collapsed={true}/>
                </Tooltip>
            </div>
        ];
    }
}