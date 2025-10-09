import React from "react";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {
    clearForm,
    postRestaurant,
    setErrorData,
    setErrorMessage,
    setNewRestaurantCreated,
    setNewRestaurantFormActive,
} from "../../../../slices/restaurantSlice";
import {useConfirmationMessage} from "../../../../hooks/useConfirmationMessage";
import {RestaurantFormWrapper} from "./RestaurantFormWrapper";

export const NewRestaurantForm = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const renderConfirmation = useConfirmationMessage(setNewRestaurantCreated);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(postRestaurant({action: 'add'}));
        if (postRestaurant.fulfilled.match(resultAction)) {
            await dispatch(setNewRestaurantFormActive(false));
            dispatch(clearForm());
            dispatch(setErrorMessage(null));
            dispatch(setErrorData(null));
            renderConfirmation();
        } else if (postRestaurant.rejected.match(resultAction)) {
            dispatch(setErrorMessage(resultAction.payload));
            dispatch(setErrorData(resultAction.payload));
        }
    }

    const handleFormDiscard = () => {
        dispatch(clearForm());
        dispatch(setNewRestaurantFormActive(false));
    }

    return (
        <RestaurantFormWrapper onSubmit={handleFormSubmit}
                               onDiscard={handleFormDiscard}
                               title={t('addRestaurant')}/>
    );
}