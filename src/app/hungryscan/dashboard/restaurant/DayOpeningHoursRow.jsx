import React from "react";
import {TimeField} from "../../cms/form-components/TimeField";
import {useTranslation} from "react-i18next";
import {Available, Fields, Grid, Label} from "./DayOpeningHoursRow.style";
import {LogicalToggleField} from "../../cms/form-components/LogicalToggleField";
import {useDispatch} from "react-redux";

export const DayOpeningHoursRow = ({
                                       operatingHours,
                                       objKey,
                                       availableHandler,
                                       openingTimeHandler,
                                       closingTimeHandler
                                   }) => {
    const {t} = useTranslation();
    const lowerKey = objKey?.toLowerCase();

    return (
        <Grid>
            <Label>{t(lowerKey)}</Label>
            <Fields>
                <TimeField name={`${lowerKey}OpeningTime`}
                           value={operatingHours?.[objKey]?.startTime}
                           onChange={openingTimeHandler}
                           isDisabled={!operatingHours?.[objKey]?.available}
                           label={'Otwarcie'}
                />
                <TimeField name={`${lowerKey}ClosingTime`}
                           value={operatingHours?.[objKey]?.endTime}
                           onChange={closingTimeHandler}
                           isDisabled={!operatingHours?.[objKey]?.available}
                           label={'Zamknięcie'}
                />
                <Available>
                    <LogicalToggleField id={`${lowerKey}Available`}
                                        value={operatingHours?.[objKey]?.available}
                                        onChange={availableHandler}
                                        customMessageTrue={t('open')}
                                        customMessageFalse={t('closed')}/>
                </Available>
            </Fields>
        </Grid>
    );
}