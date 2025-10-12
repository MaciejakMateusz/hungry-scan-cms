import React, {useEffect} from "react";
import {NavButton} from "../NavButton";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentView} from "../../../slices/globalParamsSlice";
import {StatsIcon} from "../../icons/StatsIcon";
import {QrCodeIcon} from "../../icons/QrCodeIcon";
import {UsersIcon} from "../../icons/UsersIcon";
import {CODE_QR, PACKAGE, STATS, USER_PROFILE, USERS} from "../../../utils/viewsConstants";
import {Statistics} from "./stats/Statistics";
import {DashboardTopper} from "./DashboardTopper";
import {NewRestaurantForm} from "./restaurant/NewRestaurantForm";
import {EditRestaurantForm} from "./restaurant/EditRestaurantForm";
import {NavPanel} from "../NavPanel";
import {QrCode} from "./qr/QrCode";
import {getUserProfile} from "../../../slices/userProfileSlice";
import {useTranslation} from "react-i18next";
import {UserProfile} from "./user/UserProfile";
import {Users} from "./users/Users";

export const Dashboard = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {currentView} = useSelector(state => state.globalParams.globalParams);
    const {newRestaurantFormActive, editRestaurantFormActive} = useSelector(state => state.restaurant.form);
    const statsHoveredOrActive = currentView === STATS;
    const qrHoveredOrActive = currentView === CODE_QR;
    const usersHoveredOrActive = currentView === USERS;

    useEffect(() => {
        dispatch(getUserProfile())
    }, [dispatch]);

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
                   onClick={() => dispatch(setCurrentView(STATS))}/>,
        <NavButton key={CODE_QR}
                   isActive={currentView === CODE_QR}
                   name={t('qrCode')}
                   icon={<QrCodeIcon active={qrHoveredOrActive}/>}
                   onClick={() => dispatch(setCurrentView(CODE_QR))}/>,
        <NavButton key={USERS}
                   isActive={currentView === USERS}
                   name={t('users')}
                   icon={<UsersIcon active={usersHoveredOrActive}/>}
                   onClick={() => dispatch(setCurrentView(USERS))}/>
    ]

    return (
        <>
            <NavPanel children={navElements}/>
            <div className={'cms-main'}>
                <DashboardTopper/>
                {renderMainView()}
            </div>
        </>
    );
}