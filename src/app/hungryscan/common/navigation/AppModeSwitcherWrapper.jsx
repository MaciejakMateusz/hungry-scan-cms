import React from "react";
import {setMobileNavActive} from "../../../../slices/globalParamsSlice";
import {DISHES_CATEGORIES, STATS} from "../../../../utils/viewsConstants";
import {useDispatch, useSelector} from "react-redux";
import {Wrapper} from "./AppModeSwitcher.style";
import {useSwitchView} from "../../../../hooks/useSwitchView";
import {useClearCmsState} from "../../../../hooks/useClearCmsState";
import {useClearDashboardState} from "../../../../hooks/useClearDashboardState";

export const AppModeSwitcherWrapper = ({hasAccessToDashboard, children}) => {
    const dispatch = useDispatch();
    const {cmsActive, currentView} = useSelector(state => state.globalParams.globalParams);
    const viewPrefix = currentView?.split('/')[0];
    const clearCmsState = useClearCmsState();
    const clearDashboardState = useClearDashboardState();
    const clearStateHandler = viewPrefix === 'dashboard' ? clearDashboardState : clearCmsState;
    const handleSwitchView = useSwitchView({clearStateHandler: clearStateHandler});

    const switchAppMode = () => {
        dispatch(setMobileNavActive(false));
        const destinationView = !cmsActive ? DISHES_CATEGORIES : STATS;
        handleSwitchView(destinationView);
    }

    if (!hasAccessToDashboard) return;

    return (
        <Wrapper onClick={() => switchAppMode()}>
            {children}
        </Wrapper>
    );
}