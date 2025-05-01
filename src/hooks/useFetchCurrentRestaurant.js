import {useCallback} from "react";
import {getCurrentRestaurant, setRestaurant} from "../slices/dashboardSlice";
import {useDispatch} from "react-redux";

export const useFetchCurrentRestaurant = () => {
    const dispatch = useDispatch();
    return useCallback(
        async () => {
            const resultAction = await dispatch(getCurrentRestaurant());
            if (getCurrentRestaurant.fulfilled.match(resultAction)) {
                dispatch(setRestaurant({
                    value: resultAction.payload,
                    label: resultAction.payload?.name
                }))
            }
        }, [dispatch]
    );
}