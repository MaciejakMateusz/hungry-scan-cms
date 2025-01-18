import React from "react";
import {FormField} from "./forms/FormField";
import {LoadingSpinner} from "../icons/LoadingSpinner";
import {useTranslation} from "react-i18next";
import {executeRegisterFetch} from "../../slices/registerFormSlice";
import {useDispatch} from "react-redux";

export const CreateFirstRestaurant = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const isLoading = '';

    const handleSignUp = (e) => {
        e.preventDefault();
        dispatch(executeRegisterFetch());
    };

    return (
        <section className={'create-restaurant-view'}>
            <div className={'main-page-dialog-wrapper'}>
                <div className={'main-page-dialog'}>
                    <h3 className={'register-header'}>{t('restaurantProfile')}</h3>
                    <h4 className={'register-subheader'}>{t('createFirstRestaurant')}</h4>
                    <form className={'main-page-login-form'}>
                        <FormField type={'text'}
                                   placeholder={t('restaurantName')}
                                   name={'forename'}/>
                        <FormField type={'text'}
                                   placeholder={t('address')}
                                   name={'surname'}/>
                        <FormField type={'text'}
                                   placeholder={t('postalCode')}
                                   name={'username'}/>
                        <FormField type={'password'}
                                   placeholder={t('city')}
                                   name={'password'}/>
                        <button className={'form-submit-button'} onClick={handleSignUp}>
                            {isLoading ? <LoadingSpinner buttonMode={true}/> : t('create')}
                        </button>
                    </form>
                    <span className={'change-restaurant-data-info '}>
                        {t('changeRestaurantDataInfo')}
                    </span>
                </div>
            </div>
        </section>
    );
}