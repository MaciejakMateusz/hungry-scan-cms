import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setAddress, setCity, setName, setPostalCode} from "../../../../slices/restaurantSlice";
import {NameField} from "../../cms/form-components/NameField";
import {CustomTextField} from "../../cms/form-components/CustomTextField";
import {OperatingHoursFieldsSet} from "./OperatingHoursFieldsSet";
import {useTranslation} from "react-i18next";

export const RestaurantFormTemplate = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const {
        name,
        address,
        postalCode,
        city
    } = useSelector(state => state.restaurant.form);
    const {errorData} = useSelector(state => state.restaurant.form);

    return (
        <>
            <div>
                <div className={'form-group-header'}>
                    {t('restaurantData')}
                </div>
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
            <OperatingHoursFieldsSet/>
            {errorData?.settings && <span className={'form-validation-msg'}>{errorData?.settings}</span>}
        </>
    );
}