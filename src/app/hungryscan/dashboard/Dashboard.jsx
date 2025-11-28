import React from "react";
import {NavButton} from "../NavButton";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentView, setIsInEditMode, setNextViewName} from "../../../slices/globalParamsSlice";
import {StatsIcon} from "../../icons/StatsIcon";
import {QrCodeIcon} from "../../icons/QrCodeIcon";
import {UsersIcon} from "../../icons/UsersIcon";
import {CODE_QR, STATS, USER_PROFILE, USERS} from "../../../utils/viewsConstants";
import {Statistics} from "./stats/Statistics";
import {DashboardTopper} from "./DashboardTopper";
import {NewRestaurantForm} from "./restaurant/NewRestaurantForm";
import {EditRestaurantForm} from "./restaurant/EditRestaurantForm";
import {NavPanel} from "../NavPanel";
import {QrCode} from "./qr/QrCode";
import {useTranslation} from "react-i18next";
import {UserProfile} from "./user/UserProfile";
import {Users} from "./users/Users";
import {useClearDashboardState} from "../../../hooks/useClearDashboardState";
import {DecisionDialog} from "../cms/dialog-windows/DecisionDialog";
import {setSchedulerActive} from "../../../slices/cmsSlice";
import {useSwitchView} from "../../../hooks/useSwitchView";

export const Dashboard = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {currentView, nextViewName} = useSelector(state => state.globalParams.globalParams);
    const {newRestaurantFormActive, editRestaurantFormActive} = useSelector(state => state.restaurant.form);
    const statsHoveredOrActive = currentView === STATS;
    const qrHoveredOrActive = currentView === CODE_QR;
    const usersHoveredOrActive = currentView === USERS;
    const clearDashboardState = useClearDashboardState();
    const handleSwitchView = useSwitchView({clearStateHandler: clearDashboardState})

    const renderMainView = () => {
        if (newRestaurantFormActive) {
            return (<NewRestaurantForm/>);
        } else if (editRestaurantFormActive) {
            return (<EditRestaurantForm/>);
        }

        switch (currentView) {
            case USER_PROFILE:
                return (<UserProfile/>)
            case STATS:
                return (<Statistics/>);
            case CODE_QR:
                return (<QrCode/>);
            case USERS:
                return (<Users/>);
            default:
                return (<Statistics/>);
        }
    };

    const navElements = [
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
    ]

    const navElementsCollapsed = [
        <div onClick={() => handleSwitchView(STATS)}>
            <StatsIcon active={statsHoveredOrActive} collapsed={true}/>
        </div>,
        <div onClick={() => handleSwitchView(CODE_QR)}>
            <QrCodeIcon active={qrHoveredOrActive} collapsed={true}/>
        </div>,
        <div onClick={() => handleSwitchView(USERS)}>
            <UsersIcon active={usersHoveredOrActive} collapsed={true}/>
        </div>
    ]

    return (
        <>
            {nextViewName &&
                <DecisionDialog
                    msg={t('confirmViewSwitch')}
                    onCancel={() => dispatch(setNextViewName(null))}
                    onSubmit={() => {
                        clearDashboardState();
                        dispatch(setSchedulerActive(false));
                        dispatch(setCurrentView(nextViewName));
                        dispatch(setIsInEditMode(false));
                        dispatch(setNextViewName(null));
                    }}
                />
            }
            <NavPanel children={navElements}
                      childrenCollapsed={navElementsCollapsed}
                      clearStateHandler={clearDashboardState}/>
            <div className={'cms-main'}>
                <DashboardTopper children={navElements}
                                 clearStateHandler={clearDashboardState}/>
                {renderMainView()}
            </div>
        </>
    );
}