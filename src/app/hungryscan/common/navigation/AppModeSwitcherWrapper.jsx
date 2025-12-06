import React from "react";
import {setCmsActive, setCurrentView, setMobileNavActive} from "../../../../slices/globalParamsSlice";
import {DISHES_CATEGORIES, STATS} from "../../../../utils/viewsConstants";
import {useDispatch, useSelector} from "react-redux";
import {Wrapper} from "./AppModeSwitcher.style";

export const AppModeSwitcherWrapper = ({hasAccessToDashboard, children}) => {
    const dispatch = useDispatch();
    const {cmsActive} = useSelector(state => state.globalParams.globalParams);

    const switchAppMode = () => {
        dispatch(setCmsActive(!cmsActive));
        dispatch(setMobileNavActive(false));
        !cmsActive ?
            dispatch(setCurrentView(DISHES_CATEGORIES)) :
            dispatch(setCurrentView(STATS));
    }

    if (!hasAccessToDashboard) return;

    return (
        <Wrapper onClick={() => switchAppMode()}>
            {children}
        </Wrapper>
    );
}