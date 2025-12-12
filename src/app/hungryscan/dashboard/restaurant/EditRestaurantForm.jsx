import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {
    clearForm,
    postRestaurant,
    setAddress,
    setChosenSupportedLanguages,
    setCity,
    setEditRestaurantFormActive,
    setErrorData,
    setFridayAvailable,
    setFridayClosingTime,
    setFridayOpeningTime,
    setId, setInitialOperatingHours,
    setLanguage,
    setMondayAvailable,
    setMondayClosingTime,
    setMondayOpeningTime,
    setName,
    setPostalCode,
    setRestaurantUpdated,
    setSaturdayAvailable,
    setSaturdayClosingTime,
    setSaturdayOpeningTime, setScheduleChanged,
    setSettingsId,
    setSettingsRestaurantId,
    setSundayAvailable,
    setSundayClosingTime,
    setSundayOpeningTime,
    setThursdayAvailable,
    setThursdayClosingTime,
    setThursdayOpeningTime,
    setTuesdayAvailable,
    setTuesdayClosingTime,
    setTuesdayOpeningTime,
    setWednesdayAvailable,
    setWednesdayClosingTime,
    setWednesdayOpeningTime,
} from "../../../../slices/restaurantSlice";
import {useConfirmationMessage} from "../../../../hooks/useConfirmationMessage";
import {RestaurantFormWrapper} from "./RestaurantFormWrapper";
import {setIsInEditMode} from "../../../../slices/globalParamsSlice";

export const EditRestaurantForm = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {restaurant} = useSelector(state => state.dashboard.view);
    const renderConfirmation = useConfirmationMessage(setRestaurantUpdated);
    const {initialOperatingHours, settings} = useSelector(state => state.restaurant.form);


    useEffect(() => {
        const fillForm = () => {
            if (!restaurant) {
                return;
            }
            const restaurantValue = restaurant.value;
            dispatch(setId(restaurantValue.id));
            dispatch(setName(restaurantValue.name));
            dispatch(setAddress(restaurantValue.address));
            dispatch(setPostalCode(restaurantValue.postalCode));
            dispatch(setCity(restaurantValue.city));
            dispatch(setSettingsId(restaurantValue.settings.id));
            dispatch(setSettingsRestaurantId(restaurantValue.id));

            dispatch(setLanguage({
                value: restaurantValue.settings.language,
                label: t(restaurantValue.settings.language.toLowerCase())
            }));

            const supportedLanguages = restaurantValue.settings.supportedLanguages.map(language => ({
                value: language,
                label: t(language.toLowerCase())
            }));
            dispatch(setChosenSupportedLanguages(supportedLanguages));

            const operatingHours = restaurantValue.settings.operatingHours;

            if (!operatingHours) {
                return;
            }

            dispatch(setMondayAvailable(operatingHours.MONDAY.available));
            dispatch(setTuesdayAvailable(operatingHours.TUESDAY.available));
            dispatch(setWednesdayAvailable(operatingHours.WEDNESDAY.available));
            dispatch(setThursdayAvailable(operatingHours.THURSDAY.available));
            dispatch(setFridayAvailable(operatingHours.FRIDAY.available));
            dispatch(setSaturdayAvailable(operatingHours.SATURDAY.available));
            dispatch(setSundayAvailable(operatingHours.SUNDAY.available));

            const mondayOpeningTime = operatingHours.MONDAY.startTime;
            const mondayOpeningTimeLabel = parseOperatingTimeToLabel(mondayOpeningTime);
            dispatch(setMondayOpeningTime({
                value: mondayOpeningTime,
                label: mondayOpeningTimeLabel
            }));

            const mondayClosingTime = operatingHours.MONDAY.endTime;
            const mondayClosingTimeLabel = parseOperatingTimeToLabel(mondayClosingTime);
            dispatch(setMondayClosingTime({
                value: mondayClosingTime,
                label: mondayClosingTimeLabel
            }));

            const tuesdayOpeningTime = operatingHours.TUESDAY.startTime;
            const tuesdayOpeningTimeLabel = parseOperatingTimeToLabel(tuesdayOpeningTime);
            dispatch(setTuesdayOpeningTime({
                value: tuesdayOpeningTime,
                label: tuesdayOpeningTimeLabel
            }));

            const tuesdayClosingTime = operatingHours.TUESDAY.endTime;
            const tuesdayClosingTimeLabel = parseOperatingTimeToLabel(tuesdayClosingTime);
            dispatch(setTuesdayClosingTime({
                value: tuesdayClosingTime,
                label: tuesdayClosingTimeLabel
            }));

            const wednesdayOpeningTime = operatingHours.WEDNESDAY.startTime;
            const wednesdayOpeningTimeLabel = parseOperatingTimeToLabel(wednesdayOpeningTime);
            dispatch(setWednesdayOpeningTime({
                value: wednesdayOpeningTime,
                label: wednesdayOpeningTimeLabel
            }));

            const wednesdayClosingTime = operatingHours.WEDNESDAY.endTime;
            const wednesdayClosingTimeLabel = parseOperatingTimeToLabel(wednesdayClosingTime);
            dispatch(setWednesdayClosingTime({
                value: wednesdayClosingTime,
                label: wednesdayClosingTimeLabel
            }));

            const thursdayOpeningTime = operatingHours.THURSDAY.startTime;
            const thursdayOpeningTimeLabel = parseOperatingTimeToLabel(thursdayOpeningTime);
            dispatch(setThursdayOpeningTime({
                value: thursdayOpeningTime,
                label: thursdayOpeningTimeLabel
            }));

            const thursdayClosingTime = operatingHours.THURSDAY.endTime;
            const thursdayClosingTimeLabel = parseOperatingTimeToLabel(thursdayClosingTime);
            dispatch(setThursdayClosingTime({
                value: thursdayClosingTime,
                label: thursdayClosingTimeLabel
            }));

            const fridayOpeningTime = operatingHours.FRIDAY.startTime;
            const fridayOpeningTimeLabel = parseOperatingTimeToLabel(fridayOpeningTime);
            dispatch(setFridayOpeningTime({
                value: fridayOpeningTime,
                label: fridayOpeningTimeLabel
            }));

            const fridayClosingTime = operatingHours.FRIDAY.endTime;
            const fridayClosingTimeLabel = parseOperatingTimeToLabel(fridayClosingTime);
            dispatch(setFridayClosingTime({
                value: fridayClosingTime,
                label: fridayClosingTimeLabel
            }));

            const saturdayOpeningTime = operatingHours.SATURDAY.startTime;
            const saturdayOpeningTimeLabel = parseOperatingTimeToLabel(saturdayOpeningTime);
            dispatch(setSaturdayOpeningTime({
                value: saturdayOpeningTime,
                label: saturdayOpeningTimeLabel
            }));

            const saturdayClosingTime = operatingHours.SATURDAY.endTime;
            const saturdayClosingTimeLabel = parseOperatingTimeToLabel(saturdayClosingTime);
            dispatch(setSaturdayClosingTime({
                value: saturdayClosingTime,
                label: saturdayClosingTimeLabel
            }));

            const sundayOpeningTime = operatingHours.SUNDAY.startTime;
            const sundayOpeningTimeLabel = parseOperatingTimeToLabel(sundayOpeningTime);
            dispatch(setSundayOpeningTime({
                value: sundayOpeningTime,
                label: sundayOpeningTimeLabel,
            }));

            const sundayClosingTime = operatingHours.SUNDAY.endTime;
            const sundayClosingTimeLabel = parseOperatingTimeToLabel(sundayClosingTime);
            dispatch(setSundayClosingTime({
                value: sundayClosingTime,
                label: sundayClosingTimeLabel
            }));

            dispatch(setInitialOperatingHours(settings.operatingHours));
        }
        dispatch(setIsInEditMode(true));
        fillForm();
    }, [restaurant, dispatch, t]);

    const parseOperatingTimeToLabel = time => {
        if (!time) return null;
        return time.substring(0, time.length - 3)
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(postRestaurant({action: 'update'}));
        if (postRestaurant.fulfilled.match(resultAction)) {
            await dispatch(setEditRestaurantFormActive(false));
            dispatch(clearForm());
            dispatch(setErrorData(null));
            renderConfirmation();
            if (JSON.stringify(initialOperatingHours) !== JSON.stringify(settings.operatingHours)) {
                dispatch(setScheduleChanged(true));
            }
            dispatch(setIsInEditMode(false));
        } else {
            dispatch(setErrorData(resultAction?.payload));
        }
    }

    const handleFormDiscard = () => {
        dispatch(clearForm());
        dispatch(setEditRestaurantFormActive(false));
        dispatch(setErrorData(null));
        dispatch(setIsInEditMode(false));
    }

    return (
        <RestaurantFormWrapper onSubmit={handleFormSubmit}
                               onDiscard={handleFormDiscard}
                               title={t('editRestaurant')}/>
    );
}