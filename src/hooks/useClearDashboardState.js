import {useDispatch} from "react-redux";
import {clearForm, clearView, setSaveUserError} from "../slices/usersSlice";
import {setEditRestaurantFormActive, setNewRestaurantFormActive} from "../slices/restaurantSlice";

export const useClearDashboardState = () => {
    const dispatch = useDispatch();
    return () => {
        dispatch(clearForm());
        dispatch(clearView());
        dispatch(setEditRestaurantFormActive(false));
        dispatch(setNewRestaurantFormActive(false));
        dispatch(setSaveUserError(null));
    };
}