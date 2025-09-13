import React from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {RestaurantFormTemplate} from "./RestaurantFormTemplate";
import {FormErrorDialog} from "../../../error/FormErrorDialog";
import {
    clearForm,
    postRestaurant,
    setErrorData,
    setErrorMessage,
    setNewRestaurantCreated,
    setNewRestaurantFormActive,
} from "../../../../slices/restaurantSlice";
import {useConfirmationMessage} from "../../../../hooks/useConfirmationMessage";

export const NewRestaurantForm = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {errorMessage} = useSelector(state => state.restaurant.form);
    const {errorData} = useSelector(state => state.restaurant.post);
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

    return (
        <div className={'background'}>
            <div className={'cms-padded-view-container'}>
                {errorMessage ?
                    <FormErrorDialog error={errorData} resetMessage={() => dispatch(setErrorMessage(null))}/> : null}
                <div className={'form-grid category'}>
                    <form className={'padded-form-fragment'}>
                        <div className={'form-header'}>
                            {t('addRestaurant')}
                        </div>
                        <div className={'menu-item-form'}>
                            <RestaurantFormTemplate/>
                        </div>
                        <div className={'form-footer category'}>
                            <div className={'general-button cancel'}
                                 onClick={() => {
                                     dispatch(clearForm());
                                     dispatch(setNewRestaurantFormActive(false));
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