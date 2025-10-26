import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {
    clearForm,
    postRestaurant,
    setErrorData,
    setFridayClosingTime,
    setFridayOpeningTime,
    setMondayClosingTime,
    setMondayOpeningTime,
    setNewRestaurantCreated,
    setNewRestaurantFormActive,
    setSaturdayClosingTime,
    setSaturdayOpeningTime,
    setSundayClosingTime,
    setSundayOpeningTime,
    setThursdayClosingTime,
    setThursdayOpeningTime,
    setTuesdayClosingTime,
    setTuesdayOpeningTime,
    setWednesdayClosingTime,
    setWednesdayOpeningTime,
} from "../../../../slices/restaurantSlice";
import {useConfirmationMessage} from "../../../../hooks/useConfirmationMessage";
import {RestaurantFormWrapper} from "./RestaurantFormWrapper";

export const NewRestaurantForm = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const renderConfirmation = useConfirmationMessage(setNewRestaurantCreated);

    useEffect(() => {
        const fillDefaultOpeningTimes = () => {

            const defaultOpeningTime = {
                value: "10:00:00",
                label: "10:00"
            }
            const defaultClosingTime = {
                value: "22:00:00",
                label: "22:00"
            }

            dispatch(setMondayOpeningTime(defaultOpeningTime));
            dispatch(setMondayClosingTime(defaultClosingTime));

            dispatch(setTuesdayOpeningTime(defaultOpeningTime));
            dispatch(setTuesdayClosingTime(defaultClosingTime));

            dispatch(setWednesdayOpeningTime(defaultOpeningTime));
            dispatch(setWednesdayClosingTime(defaultClosingTime));

            dispatch(setThursdayOpeningTime(defaultOpeningTime));
            dispatch(setThursdayClosingTime(defaultClosingTime));

            dispatch(setFridayOpeningTime(defaultOpeningTime));
            dispatch(setFridayClosingTime(defaultClosingTime));

            dispatch(setSaturdayOpeningTime(defaultOpeningTime));
            dispatch(setSaturdayClosingTime(defaultClosingTime));

            dispatch(setSundayOpeningTime(defaultOpeningTime));
            dispatch(setSundayClosingTime(defaultClosingTime));
        }
        fillDefaultOpeningTimes();
    }, [dispatch]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(postRestaurant({action: 'add'}));
        if (postRestaurant.fulfilled.match(resultAction)) {
            await dispatch(setNewRestaurantFormActive(false));
            dispatch(clearForm());
            dispatch(setErrorData(null));
            renderConfirmation();
        } else {
            dispatch(setErrorData(resultAction?.payload));
        }
    }

    const handleFormDiscard = () => {
        dispatch(clearForm());
        dispatch(setNewRestaurantFormActive(false));
        dispatch(setErrorData(null));
    }

    return (
        <RestaurantFormWrapper onSubmit={handleFormSubmit}
                               onDiscard={handleFormDiscard}
                               title={t('addRestaurant')}/>
    );
}