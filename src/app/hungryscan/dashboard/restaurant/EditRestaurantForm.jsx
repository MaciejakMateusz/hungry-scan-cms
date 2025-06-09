import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {RestaurantFormTemplate} from "./RestaurantFormTemplate";
import {FormErrorDialog} from "../../../error/FormErrorDialog";
import {
    clearForm,
    postRestaurant,
    setAddress,
    setCity,
    setEditRestaurantFormActive,
    setErrorData,
    setErrorMessage, setFridayAvailable,
    setFridayClosingTime,
    setFridayOpeningTime,
    setId, setMondayAvailable,
    setMondayClosingTime,
    setMondayOpeningTime,
    setName,
    setPostalCode,
    setRestaurantUpdated, setSaturdayAvailable,
    setSaturdayClosingTime,
    setSaturdayOpeningTime,
    setSettingsId,
    setSettingsRestaurantId, setSundayAvailable,
    setSundayClosingTime,
    setSundayOpeningTime, setThursdayAvailable,
    setThursdayClosingTime,
    setThursdayOpeningTime, setTuesdayAvailable,
    setTuesdayClosingTime,
    setTuesdayOpeningTime, setWednesdayAvailable,
    setWednesdayClosingTime,
    setWednesdayOpeningTime,
} from "../../../../slices/restaurantSlice";
import {useConfirmationMessage} from "../../../../hooks/useConfirmationMessage";

export const EditRestaurantForm = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {restaurant} = useSelector(state => state.dashboard.view);
    const {errorMessage} = useSelector(state => state.restaurant.form);
    const {errorData} = useSelector(state => state.restaurant.post);
    const renderConfirmation = useConfirmationMessage(setRestaurantUpdated);

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

            const operatingHours = restaurantValue.settings.operatingHours;

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
            dispatch(setMondayAvailable(operatingHours.MONDAY.available));

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
            dispatch(setTuesdayAvailable(operatingHours.TUESDAY.available));

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
            dispatch(setWednesdayAvailable(operatingHours.WEDNESDAY.available));

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
            dispatch(setThursdayAvailable(operatingHours.THURSDAY.available));

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
            dispatch(setFridayAvailable(operatingHours.FRIDAY.available));

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
            dispatch(setSaturdayAvailable(operatingHours.SATURDAY.available));

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
            dispatch(setSundayAvailable(operatingHours.SUNDAY.available));
        }
        fillForm();
    }, [restaurant, dispatch]);

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
            dispatch(setErrorMessage(null));
            dispatch(setErrorData(null));
            renderConfirmation();
        } else if (postRestaurant.rejected.match(resultAction)) {
            dispatch(setErrorMessage(resultAction.payload));
            dispatch(setErrorData(resultAction.payload));
        }
    }

    return (
        <div className={'background'}>
            <div className={'translations-padded-view-container'}>
                {errorMessage ?
                    <FormErrorDialog error={errorData} resetMessage={() => dispatch(setErrorMessage(null))}/> : null}
                <div className={'form-grid category'}>
                    <form className={'padded-form-fragment'}>
                        <div className={'form-header'}>
                            {t('editRestaurant')}
                        </div>
                        <div className={'menu-item-form'}>
                            <RestaurantFormTemplate/>
                        </div>
                        <div className={'form-footer category'}>
                            <div className={'general-button cancel'}
                                 onClick={() => {
                                     dispatch(clearForm());
                                     dispatch(setEditRestaurantFormActive(false));
                                 }}>
                                {t('cancel')}
                            </div>
                            <div className={'general-button submit'} onClick={handleFormSubmit}>{t('save')}</div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}