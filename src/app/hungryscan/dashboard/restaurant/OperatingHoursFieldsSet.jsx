import {TimeField} from "../../cms/form-components/TimeField";
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
import {useSelector} from "react-redux";
import {LogicalToggle} from "../../cms/form-components/LogicalToggle";

export const OperatingHoursFieldsSet = () => {
    const {t} = useTranslation();
    const operatingHours = useSelector(state => state.restaurant.form.settings.operatingHours);

    return (
        <>
            <div>Godziny otwarcia:</div>
            <div className={'flex-centered'}>
                <LogicalToggle id={'mondayAvailable'}
                               changeHandler={setMondayAvailable}
                               value={operatingHours?.MONDAY?.available}/>
                <div>{t('monday')}</div>
                <TimeField name={'mondayOpeningTime'}
                           value={operatingHours?.MONDAY?.startTime}
                           onChange={setMondayOpeningTime}
                />
                <TimeField name={'mondayClosingTime'}
                           value={operatingHours?.MONDAY?.endTime}
                           onChange={setMondayClosingTime}
                />

            </div>
            <div className={'flex-centered'}>
                <LogicalToggle id={'tuesdayAvailable'}
                               changeHandler={setTuesdayAvailable}
                               value={operatingHours?.TUESDAY?.available}/>
                <div>{t('tuesday')}</div>
                <TimeField name={'tuesdayOpeningTime'}
                           value={operatingHours?.TUESDAY?.startTime}
                           onChange={setTuesdayOpeningTime}
                />
                <TimeField name={'tuesdayClosingTime'}
                           value={operatingHours?.TUESDAY?.endTime}
                           onChange={setTuesdayClosingTime}
                />
            </div>
            <div className={'flex-centered'}>
                <LogicalToggle id={'wednesdayAvailable'}
                               changeHandler={setWednesdayAvailable}
                               value={operatingHours?.WEDNESDAY?.available}/>
                <div>{t('wednesday')}</div>
                <TimeField name={'wednesdayOpeningTime'}
                           value={operatingHours?.WEDNESDAY?.startTime}
                           onChange={setWednesdayOpeningTime}
                />
                <TimeField name={'wednesdayClosingTime'}
                           value={operatingHours?.WEDNESDAY?.endTime}
                           onChange={setWednesdayClosingTime}
                />
            </div>
            <div className={'flex-centered'}>
                <LogicalToggle id={'thursdayAvailable'}
                               changeHandler={setThursdayAvailable}
                               value={operatingHours?.THURSDAY?.available}/>
                <div>{t('thursday')}</div>
                <TimeField name={'thursdayOpeningTime'}
                           value={operatingHours?.THURSDAY?.startTime}
                           onChange={setThursdayOpeningTime}
                />
                <TimeField name={'thursdayClosingTime'}
                           value={operatingHours?.THURSDAY?.endTime}
                           onChange={setThursdayClosingTime}
                />
            </div>
            <div className={'flex-centered'}>
                <LogicalToggle id={'fridayAvailable'}
                               changeHandler={setFridayAvailable}
                               value={operatingHours?.FRIDAY?.available}/>
                <div>{t('friday')}</div>
                <TimeField name={'fridayOpeningTime'}
                           value={operatingHours?.FRIDAY?.startTime}
                           onChange={setFridayOpeningTime}
                />
                <TimeField name={'fridayClosingTime'}
                           value={operatingHours?.FRIDAY?.endTime}
                           onChange={setFridayClosingTime}
                />
            </div>
            <div className={'flex-centered'}>
                <LogicalToggle id={'saturdayAvailable'}
                               changeHandler={setSaturdayAvailable}
                               value={operatingHours?.SATURDAY?.available}/>
                <div>{t('saturday')}</div>
                <TimeField name={'saturdayOpeningTime'}
                           value={operatingHours?.SATURDAY?.startTime}
                           onChange={setSaturdayOpeningTime}
                />
                <TimeField name={'saturdayClosingTime'}
                           value={operatingHours?.SATURDAY?.endTime}
                           onChange={setSaturdayClosingTime}
                />
            </div>
            <div className={'flex-centered'}>
                <LogicalToggle id={'sundayAvailable'}
                               changeHandler={setSundayAvailable}
                               value={operatingHours?.SUNDAY?.available}/>
                <div>{t('sunday')}</div>
                <TimeField name={'sundayOpeningTime'}
                           value={operatingHours?.SUNDAY?.startTime}
                           onChange={setSundayOpeningTime}
                />
                <TimeField name={'sundayClosingTime'}
                           value={operatingHours?.SUNDAY?.endTime}
                           onChange={setSundayClosingTime}
                />
            </div>
        </>
    );
}