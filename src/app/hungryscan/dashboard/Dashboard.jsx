import React from "react";
import {NavButton} from "../NavButton";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentView} from "../../../slices/globalParamsSlice";
import {StatsIcon} from "../../icons/StatsIcon";
import {QrCodeIcon} from "../../icons/QrCodeIcon";
import {PackageIcon} from "../../icons/PackageIcon";
import {UsersIcon} from "../../icons/UsersIcon";
import {D_CODE_QR, PACKAGE, STATS, USERS} from "../../../utils/viewsConstants";
import {Statistics} from "./stats/Statistics";
import {DashboardTopper} from "./DashboardTopper";
import {NewRestaurantForm} from "./restaurant/NewRestaurantForm";
import {EditRestaurantForm} from "./restaurant/EditRestaurantForm";
import {NavPanel} from "../NavPanel";

export const Dashboard = () => {
    const dispatch = useDispatch();
    const {currentView} = useSelector(state => state.globalParams.globalParams);
    const {newRestaurantFormActive, editRestaurantFormActive} = useSelector(state => state.restaurant.form);
    const statsHoveredOrActive = currentView === STATS;
    const qrHoveredOrActive = currentView === D_CODE_QR;
    const packageHoveredOrActive = currentView === PACKAGE;
    const usersHoveredOrActive = currentView === USERS;

    const renderMainView = () => {
        if (newRestaurantFormActive) {
            return (<NewRestaurantForm/>);
        } else if (editRestaurantFormActive) {
            return (<EditRestaurantForm/>);
        }

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

    const navElements = [
        <NavButton key={STATS}
                   isActive={currentView === STATS}
                   name={'Statystyki'}
                   icon={<StatsIcon active={statsHoveredOrActive}/>}
                   onClick={() => dispatch(setCurrentView(STATS))}/>,
        <NavButton key={D_CODE_QR}
                   isActive={currentView === D_CODE_QR}
                   name={'Kod QR'}
                   icon={<QrCodeIcon active={qrHoveredOrActive}/>}
                   onClick={() => dispatch(setCurrentView(D_CODE_QR))}/>,
        <NavButton key={PACKAGE}
                   isActive={currentView === PACKAGE}
                   name={'Twój pakiet'}
                   icon={<PackageIcon active={packageHoveredOrActive}/>}
                   onClick={() => dispatch(setCurrentView(PACKAGE))}/>,
        <NavButton key={USERS}
                   isActive={currentView === USERS}
                   name={'Użytkownicy'}
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