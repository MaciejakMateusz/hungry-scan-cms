import {
    setFridayAvailable,
    setFridayClosingTime,
    setFridayOpeningTime,
    setMondayAvailable,
    setMondayClosingTime,
    setMondayOpeningTime,
    setSaturdayAvailable,
    setSaturdayClosingTime,
    setSaturdayOpeningTime,
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
    setWednesdayOpeningTime
} from "../../../../slices/restaurantSlice";
import React from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {DayOpeningHoursRow} from "./DayOpeningHoursRow";
import {Container} from "./OperatingHoursFieldsSet.style";

export const OperatingHoursFieldsSet = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const operatingHours = useSelector(state => state.restaurant.form.settings.operatingHours);
    const {errorData} = useSelector(state => state.restaurant.form);

    const handleAvailableChange = (setAvailable, key) => {
        dispatch(setAvailable(!operatingHours[key].available));
    }

    return (
        <>
            <Container>
                {errorData?.settings && <span className={'validation-msg'}>{errorData?.settings}</span>}
                <div className={'form-group-header'}>
                    {t('openingHours')}
                </div>
                <DayOpeningHoursRow objKey={'MONDAY'}
                                    operatingHours={operatingHours}
                                    availableHandler={() => handleAvailableChange(setMondayAvailable, 'MONDAY')}
                                    closingTimeHandler={setMondayClosingTime}
                                    openingTimeHandler={setMondayOpeningTime}/>
                <DayOpeningHoursRow objKey={'TUESDAY'}
                                    operatingHours={operatingHours}
                                    availableHandler={() => handleAvailableChange(setTuesdayAvailable, 'TUESDAY')}
                                    closingTimeHandler={setTuesdayClosingTime}
                                    openingTimeHandler={setTuesdayOpeningTime}/>
                <DayOpeningHoursRow objKey={'WEDNESDAY'}
                                    operatingHours={operatingHours}
                                    availableHandler={() => handleAvailableChange(setWednesdayAvailable, 'WEDNESDAY')}
                                    closingTimeHandler={setWednesdayClosingTime}
                                    openingTimeHandler={setWednesdayOpeningTime}/>
                <DayOpeningHoursRow objKey={'THURSDAY'}
                                    operatingHours={operatingHours}
                                    availableHandler={() => handleAvailableChange(setThursdayAvailable, 'THURSDAY')}
                                    closingTimeHandler={setThursdayClosingTime}
                                    openingTimeHandler={setThursdayOpeningTime}/>
                <DayOpeningHoursRow objKey={'FRIDAY'}
                                    operatingHours={operatingHours}
                                    availableHandler={() => handleAvailableChange(setFridayAvailable, 'FRIDAY')}
                                    closingTimeHandler={setFridayClosingTime}
                                    openingTimeHandler={setFridayOpeningTime}/>
                <DayOpeningHoursRow objKey={'SATURDAY'}
                                    operatingHours={operatingHours}
                                    availableHandler={() => handleAvailableChange(setSaturdayAvailable, 'SATURDAY')}
                                    closingTimeHandler={setSaturdayClosingTime}
                                    openingTimeHandler={setSaturdayOpeningTime}/>
                <DayOpeningHoursRow objKey={'SUNDAY'}
                                    operatingHours={operatingHours}
                                    availableHandler={() => handleAvailableChange(setSundayAvailable, 'SUNDAY')}
                                    closingTimeHandler={setSundayClosingTime}
                                    openingTimeHandler={setSundayOpeningTime}/>
            </Container>
        </>
    );
}