import React from "react";
import {FormField} from "./forms/FormField";
import {LoadingSpinner} from "../icons/LoadingSpinner";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {
    createInitialRestaurant,
    setAddress,
    setCity,
    setName,
    setPostalCode
} from "../../slices/restaurantSlice";
import {CreateFirstRestaurantInit} from "./CreateFirstRestaurantInit";

export const CreateFirstRestaurant = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const {
        initialized,
        name,
        address,
        postalCode,
        city
    } = useSelector(state => state.restaurant.form)
    const {isLoading, errorData} = useSelector(state => state.restaurant.postInitial)
    const checkName = errorData?.name && name.length === 0;
    const checkAddress = errorData?.address && address.length === 0;
    const checkPostalCode = errorData?.postalCode && postalCode.length === 0;
    const checkCity = errorData?.city && city.length === 0;
    const is500Error = errorData?.status === 500

    const handleInitialRestaurantCreation = (e) => {
        e.preventDefault();
        dispatch(createInitialRestaurant());
    };

    if (!initialized) {
        return (<CreateFirstRestaurantInit/>);
    }

    return (
        <section className={'create-restaurant-view'}>
            <div className={'main-page-dialog-wrapper'}>
                <div className={'main-page-dialog'}>
                    <h3 className={'register-header'}>{t('restaurantProfile')}</h3>
                    <h4 className={'register-subheader'}>{t('createFirstRestaurant')}</h4>
                    <form className={'main-page-login-form'}>
                        <FormField type={'text'}
                                   placeholder={t('restaurantName')}
                                   name={'name'}
                                   value={name}
                                   error={errorData?.name}
                                   hasError={checkName}
                                   changeHandler={(e) => dispatch(setName(e.target.value))}/>
                        <FormField type={'text'}
                                   placeholder={t('address')}
                                   name={'address'}
                                   value={address}
                                   error={errorData?.address}
                                   hasError={checkAddress}
                                   changeHandler={(e) => dispatch(setAddress(e.target.value))}/>
                        <FormField type={'text'}
                                   placeholder={t('postalCode')}
                                   name={'postalCode'}
                                   value={postalCode}
                                   error={errorData?.postalCode}
                                   hasError={checkPostalCode}
                                   changeHandler={(e) => dispatch(setPostalCode(e.target.value))}/>
                        <FormField type={'text'}
                                   placeholder={t('city')}
                                   name={'city'}
                                   value={city}
                                   error={errorData?.city}
                                   hasError={checkCity}
                                   changeHandler={(e) => dispatch(setCity(e.target.value))}/>
                        <button className={'form-submit-button'} onClick={handleInitialRestaurantCreation}>
                            {isLoading ? <LoadingSpinner buttonMode={true}/> : t('create')}
                        </button>
                        {is500Error && <p className={'form-validation-msg'}>{t('internalServerError')}</p>}
                    </form>
                    <span className={'change-restaurant-data-info '}>
                        {t('changeRestaurantDataInfo')}
                    </span>
                </div>
            </div>
        </section>
    );

}