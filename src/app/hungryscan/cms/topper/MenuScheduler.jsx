import Select from "react-select";
import {setTimeFrom, setTimeTo, setWeekDay} from "../../../../slices/cmsSlice";
import {mainSelectChipless, mainSelectTime} from "../../../../selectStyles";
import {CustomNoOptionsMessage} from "../form-components/CustomNoOptionsMessage";
import {CountedDaysContainer} from "../shared-components/CountedValuesContainer";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {useWeekDays} from "../../../../hooks/useWeekDays";
import {useScheduleHours} from "../../../../hooks/useScheduleHours";

export const MenuScheduler = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {activeMenu} = useSelector(state => state.globalParams.globalParams);
    const {isInEditMode} = useSelector(state => state.dishesCategories.view);
    const {weekDay, timeFrom, timeTo} = useSelector(state => state.cms.view);
    const weekDays = useWeekDays();
    const scheduleHours = useScheduleHours();

    if (activeMenu?.value.standard) {
        return <></>;
    }

    return (
        <div className={'flex-wrapper-gapped'}>
            <Select id={'week-days'}
                    name={'week-days'}
                    value={weekDay}
                    placeholder={t('choose')}
                    isMulti
                    isDisabled={isInEditMode}
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    options={weekDays}
                    defaultValue={weekDays[0]}
                    onChange={(selected) => dispatch(setWeekDay(selected))}
                    styles={mainSelectChipless}
                    components={{
                        NoOptionsMessage: CustomNoOptionsMessage,
                        ValueContainer: CountedDaysContainer
                    }}
            />
            <label className={'flex-centered flex-wrapper-gapped'}>
                Od
                <Select id={'time-from'}
                        name={'time-from'}
                        value={timeFrom}
                        placeholder={t('choose')}
                        isDisabled={isInEditMode}
                        options={scheduleHours}
                        onChange={(selected) => dispatch(setTimeFrom(selected))}
                        styles={mainSelectTime}
                        components={{NoOptionsMessage: CustomNoOptionsMessage}}
                />
            </label>
            <label className={'flex-centered flex-wrapper-gapped'}>
                Do
                <Select id={'time-to'}
                        name={'time-to'}
                        value={timeTo}
                        placeholder={t('choose')}
                        isDisabled={isInEditMode}
                        options={scheduleHours}
                        onChange={(selected) => dispatch(setTimeTo(selected))}
                        styles={mainSelectTime}
                        components={{NoOptionsMessage: CustomNoOptionsMessage}}
                />
            </label>
        </div>
    );
}