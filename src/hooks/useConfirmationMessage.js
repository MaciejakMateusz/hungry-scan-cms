import {useDispatch} from "react-redux";
import {useState} from "react";

export const useConfirmationMessage = (activator) => {
    const dispatch = useDispatch();
    const [confirmationTimeoutId, setConfirmationTimeoutId] = useState();

    return () => {
        dispatch(activator(true));

        if (confirmationTimeoutId) {
            clearTimeout(confirmationTimeoutId);
        }

        const newConfirmationTimeoutId = setTimeout(() => {
            dispatch(activator(false))
        }, 4000);
        setConfirmationTimeoutId(newConfirmationTimeoutId);
    }
}