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

    return (
        <>
            <Container>
                <div className={'form-group-header'}>
                    {t('openingHours')}
                </div>
                <DayOpeningHoursRow objKey={'MONDAY'}
                                    operatingHours={operatingHours}
                                    availableHandler={() => dispatch(setMondayAvailable(!operatingHours.MONDAY.available))}
                                    closingTimeHandler={setMondayClosingTime}
                                    openingTimeHandler={setMondayOpeningTime}/>
                <DayOpeningHoursRow objKey={'TUESDAY'}
                                    operatingHours={operatingHours}
                                    availableHandler={() => dispatch(setTuesdayAvailable(!operatingHours.TUESDAY.available))}
                                    closingTimeHandler={setTuesdayClosingTime}
                                    openingTimeHandler={setTuesdayOpeningTime}/>
                <DayOpeningHoursRow objKey={'WEDNESDAY'}
                                    operatingHours={operatingHours}
                                    availableHandler={() => dispatch(setWednesdayAvailable(!operatingHours.WEDNESDAY.available))}
                                    closingTimeHandler={setWednesdayClosingTime}
                                    openingTimeHandler={setWednesdayOpeningTime}/>
                <DayOpeningHoursRow objKey={'THURSDAY'}
                                    operatingHours={operatingHours}
                                    availableHandler={() => dispatch(setThursdayAvailable(!operatingHours.THURSDAY.available))}
                                    closingTimeHandler={setThursdayClosingTime}
                                    openingTimeHandler={setThursdayOpeningTime}/>
                <DayOpeningHoursRow objKey={'FRIDAY'}
                                    operatingHours={operatingHours}
                                    availableHandler={() => dispatch(setFridayAvailable(!operatingHours.FRIDAY.available))}
                                    closingTimeHandler={setFridayClosingTime}
                                    openingTimeHandler={setFridayOpeningTime}/>
                <DayOpeningHoursRow objKey={'SATURDAY'}
                                    operatingHours={operatingHours}
                                    availableHandler={() => dispatch(setSaturdayAvailable(!operatingHours.SATURDAY.available))}
                                    closingTimeHandler={setSaturdayClosingTime}
                                    openingTimeHandler={setSaturdayOpeningTime}/>
                <DayOpeningHoursRow objKey={'SUNDAY'}
                                    operatingHours={operatingHours}
                                    availableHandler={() => dispatch(setSundayAvailable(!operatingHours.SUNDAY.available))}
                                    closingTimeHandler={setSundayClosingTime}
                                    openingTimeHandler={setSundayOpeningTime}/>
            </Container>
        </>
    );
}