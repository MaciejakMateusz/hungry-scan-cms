import React from "react";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {setInitialized} from "../../slices/restaurantSlice";

export const CreateFirstRestaurantInit = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();

    return (
        <section className={'create-restaurant-view'}>
            <div className={'main-page-dialog-wrapper create-restaurant'}>
                <div className={'main-page-dialog create-restaurant'}>
                    <h3 className={'register-header'}>{t('welcomeToHC')}</h3>
                    <h4 className={'register-subheader'}>{t('readyToCreateRestaurant')}</h4>
                    <button className={'form-submit-button create-restaurant'}
                            onClick={() => dispatch(setInitialized(true))}>
                        {t('begin')}
                    </button>
                </div>
            </div>
        </section>
    );
}