import React from "react";
import Select from "react-select";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {useWeekDays} from "../../../../hooks/useWeekDays";
import {useScheduleHours} from "../../../../hooks/useScheduleHours";
import {mainSelectChipless, mainSelectTime} from "../../../../selectStyles";
import {CustomNoOptionsMessage} from "../form-components/CustomNoOptionsMessage";
import {CountedDaysContainer} from "../shared-components/CountedValuesContainer";

export const MenuScheduler = ({menu, onPlanChange}) => {
    const {t} = useTranslation();
    const {isInEditMode} = useSelector(state => state.dishesCategories.view);
    const weekDays = useWeekDays();
    const scheduleHours = useScheduleHours();

    const plan = menu.plan;

    const updatePlan = (patch) => {
        onPlanChange({...plan, ...patch});
    };

    return (
        <div className="flex-wrapper-gapped">
            <Select
                id="week-days"
                name="week-days"
                value={plan.weekDay}
                placeholder={t("choose")}
                isMulti
                isDisabled={isInEditMode}
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                options={weekDays}
                onChange={(selected) => updatePlan({weekDay: selected})}
                styles={mainSelectChipless}
                components={{
                    NoOptionsMessage: CustomNoOptionsMessage,
                    ValueContainer: CountedDaysContainer,
                }}
            />
            <label className="flex-centered flex-wrapper-gapped">
                Od
                <Select
                    id="start-time"
                    name="start-time"
                    value={plan.startTime}
                    placeholder={t("choose")}
                    isDisabled={isInEditMode}
                    options={scheduleHours}
                    onChange={(selected) => updatePlan({startTime: selected})}
                    styles={mainSelectTime}
                    components={{NoOptionsMessage: CustomNoOptionsMessage}}
                />
            </label>
            <label className="flex-centered flex-wrapper-gapped">
                Do
                <Select
                    id="end-time"
                    name="end-time"
                    value={plan.endTime}
                    placeholder={t("choose")}
                    isDisabled={isInEditMode}
                    options={scheduleHours}
                    onChange={(selected) => updatePlan({endTime: selected})}
                    styles={mainSelectTime}
                    components={{NoOptionsMessage: CustomNoOptionsMessage}}
                />
            </label>
        </div>
    );
};