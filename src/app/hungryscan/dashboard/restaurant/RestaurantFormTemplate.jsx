import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    setAddress,
    setCity,
    setClosingTime,
    setName,
    setOpeningTime,
    setPostalCode
} from "../../../../slices/restaurantSlice";
import {NameField} from "../../cms/form-components/NameField";
import {CustomTextField} from "../../cms/form-components/CustomTextField";
import {TimeField} from "../../cms/form-components/TimeField";

export const RestaurantFormTemplate = () => {
    const dispatch = useDispatch();
    const {
        name,
        address,
        postalCode,
        city,
        settings} = useSelector(state => state.restaurant.form);
    const {errorData} = useSelector(state => state.restaurant.post);

    return (
        <>
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
            <p>Ustawienia:</p>
            <div>
                <TimeField name={'openingTime'}
                           value={settings.openingTime}
                           onChange={setOpeningTime}
                           label={'Godzina otwarcia'}
                           info={'Godziny otwarcia ułatwią zaplanowanie harmonogramu menu'}
                           error={errorData?.openingTime}
                />
                <TimeField name={'closingTime'}
                           value={settings.closingTime}
                           onChange={setClosingTime}
                           label={'Godzina zamknięcia'}
                           info={'Godziny otwarcia ułatwią zaplanowanie harmonogramu menu'}
                           error={errorData?.closingTime}
                />
                {errorData?.settings && <span className={'form-validation-msg'}>{errorData?.settings}</span>}
            </div>

        </>
    );
}