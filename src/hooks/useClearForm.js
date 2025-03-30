import {clearAllergens, clearForm, clearLabels} from "../slices/dishFormSlice";
import {clearAdditions} from "../slices/dishAdditionsSlice";
import {useDispatch} from "react-redux";

export const useClearForm = () => {
    const dispatch = useDispatch();
    return () => {
        dispatch(clearForm());
        dispatch(clearAllergens());
        dispatch(clearAdditions());
        dispatch(clearLabels());
    };
}