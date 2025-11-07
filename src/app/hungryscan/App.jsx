import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Dashboard} from "./dashboard/Dashboard";
import {Cms} from "./cms/Cms";
import {getInactivityTimeout} from "../../utils/utils";
import {useInactivityTimeout} from "../../hooks/useInactivityTimeout";
import {GlobalRenderingPlugin} from "./common/GlobalRenderingPlugin";
import {getUserProfile} from "../../slices/userProfileSlice";
import {setCurrentView} from "../../slices/globalParamsSlice";
import {DISHES_CATEGORIES, STATS} from "../../utils/viewsConstants";
import {CookieConsent} from "../main/cookies/CookieConsent";

export const App = () => {
    const dispatch = useDispatch();
    const {cmsActive} = useSelector(state => state.globalParams.globalParams);
    const {userData} = useSelector(state => state.userProfile.getUserProfile);
    const hasAccessToDashboard = userData?.roles?.some(role => [2, 3].includes(role.id));
    useInactivityTimeout(getInactivityTimeout);

    useEffect(() => {
        dispatch(getUserProfile())
        if (hasAccessToDashboard !== undefined) {
            hasAccessToDashboard ? dispatch(setCurrentView(STATS)) : dispatch(setCurrentView(DISHES_CATEGORIES));
        }
    }, [dispatch, hasAccessToDashboard]);

    const renderView = () => {
        if (hasAccessToDashboard !== undefined && hasAccessToDashboard === false) {
            return (<Cms/>);
        }
        return cmsActive ? <Cms/> : <Dashboard/>;
    }

    return (
        <div className={'app-grid'}>
            <GlobalRenderingPlugin/>
            {renderView()}
            <CookieConsent/>
        </div>
    );
}