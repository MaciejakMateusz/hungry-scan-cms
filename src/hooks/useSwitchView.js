import {useDispatch, useSelector} from "react-redux";
import {setCmsActive, setCurrentView, setMobileNavActive, setNextViewName} from "../slices/globalParamsSlice";

export const useSwitchView = ({clearStateHandler}) => {
    const dispatch = useDispatch();
    const {
        isCmsInEditMode,
        isDashboardInEditMode,
        currentView
    } = useSelector(state => state.globalParams.globalParams);
    const viewPrefix = currentView?.split('/')[0];
    const isInEditMode = viewPrefix === 'dashboard' ? isDashboardInEditMode : isCmsInEditMode;

    return viewName => {
        if (isInEditMode) {
            dispatch(setNextViewName(viewName));
        } else if (viewName !== currentView) {
            clearStateHandler();
            dispatch(setCurrentView(viewName));
            dispatch(setMobileNavActive(false));
            const viewPrefix = viewName.split('/')[0];
            dispatch(setCmsActive(viewPrefix === 'cms'));
        }
    };
}