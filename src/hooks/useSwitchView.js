import {useDispatch, useSelector} from "react-redux";
import {setCurrentView, setNextViewName} from "../slices/globalParamsSlice";

export const useSwitchView = ({clearStateHandler}) => {
    const dispatch = useDispatch();
    const {isInEditMode, currentView} = useSelector(state => state.globalParams.globalParams);

    return viewName => {
        if (isInEditMode) {
            dispatch(setNextViewName(viewName));
        } else if (viewName !== currentView) {
            clearStateHandler();
            dispatch(setCurrentView(viewName));
        }
    };
}