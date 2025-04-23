import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {NameField} from "../form-components/NameField";
import {
    postRestaurant,
    setAddress,
    setCity,
    setErrorData,
    setName,
    setNewRestaurantCreated,
    setPostalCode,
    setRestaurantFormActive
} from "../../../../slices/restaurantSlice";
import {clearForm} from "../../../../slices/menuSlice";
import {CustomTextField} from "../form-components/CustomTextField";

export const RestaurantFormDialog = ({isEditForm}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {name, address, postalCode, city} = useSelector(state => state.restaurant.form);
    const {errorData} = useSelector(state => state.restaurant.post);
    const [confirmationTimeoutId, setConfirmationTimeoutId] = useState(null);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(postRestaurant({action: isEditForm ? 'update' : 'add'}));
        if (postRestaurant.fulfilled.match(resultAction)) {
            await dispatch(setRestaurantFormActive(false));
            dispatch(clearForm());
            dispatch(setNewRestaurantCreated(true));

            if (confirmationTimeoutId) {
                clearTimeout(confirmationTimeoutId);
            }

            const newConfirmationTimeoutId = setTimeout(() => {
                dispatch(setNewRestaurantCreated(false))
            }, 4000);
            setConfirmationTimeoutId(newConfirmationTimeoutId);
        }
    }

    const handleFormDiscard = async () => {
        await dispatch(setRestaurantFormActive(false));
        dispatch(clearForm());
        dispatch(setErrorData(null));
    }

    return (
        <>
            <div className={'overlay'}></div>
            <div className={'variant-form-dialog '}>
                <div className={'variant-form-dialog-content'}>
                    <h4>
                        {isEditForm ? t('editRestaurant') : t('addRestaurant')}
                    </h4>
                    <NameField id={'restaurant-name'}
                               value={name}
                               onChange={(e) => dispatch(setName(e))}
                               error={errorData}
                    />
                    <CustomTextField id={'restaurant-address'}
                                     errorField={errorData?.address}
                                     value={address}
                                     onChange={(e) => dispatch(setAddress(e))}
                                     required={true}
                                     placeholder={'Wpisz adres'}
                                     label={'Adres'}
                    />
                    <CustomTextField id={'restaurant-postalCode'}
                                     value={postalCode}
                                     onChange={(e) => dispatch(setPostalCode(e))}
                                     errorField={errorData?.postalCode}
                                     required={true}
                                     placeholder={'Wpisz kod pocztowy'}
                                     label={'Kod pocztowy'}
                    />
                    <CustomTextField id={'restaurant-city'}
                                     value={city}
                                     onChange={(e) => dispatch(setCity(e))}
                                     errorField={errorData?.city}
                                     required={true}
                                     placeholder={'Wpisz miasto'}
                                     label={'Miasto'}
                    />
                </div>
                <div className={'variant-dialog-footer'}>
                    <button className={'general-button cancel'} onClick={handleFormDiscard}>
                        {t('cancel')}
                    </button>
                    <form style={{all: 'unset'}} onSubmit={handleFormSubmit}>
                        <button type="submit" className={'general-button'}>{t('save')}</button>
                    </form>
                </div>

            </div>
        </>
    );
}