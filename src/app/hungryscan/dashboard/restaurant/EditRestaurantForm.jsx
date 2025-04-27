import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {RestaurantFormTemplate} from "./RestaurantFormTemplate";
import {FormErrorDialog} from "../../../error/FormErrorDialog";
import {
    clearForm,
    postRestaurant,
    setAddress,
    setCity, setClosingTime,
    setEditRestaurantFormActive,
    setErrorData,
    setErrorMessage, setId,
    setName, setOpeningTime,
    setPostalCode,
    setRestaurantUpdated, setSettingsId, setSettingsRestaurantId,
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
            const openingTimeRaw = restaurantValue.settings.openingTime;
            const openingTimeLabel = openingTimeRaw.substring(0, openingTimeRaw.length - 3)
            const closingTimeRaw = restaurantValue.settings.closingTime;
            const closingTimeLabel = closingTimeRaw.substring(0, closingTimeRaw.length - 3)
            dispatch(setOpeningTime({
                value: openingTimeRaw,
                label: openingTimeLabel
            }));
            dispatch(setClosingTime({
                value: closingTimeRaw,
                label: closingTimeLabel
            }));
        }
        fillForm();
    }, [restaurant, dispatch]);

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