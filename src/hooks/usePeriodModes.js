import {useTranslation} from "react-i18next";

export const usePeriodModes = () => {
    const {t} = useTranslation();
    return [
        {
            value: 'year',
            label: t('year')
        },
        {
            value: 'month',
            label: t('month')
        },
        {
            value: 'week',
            label: t('week')
        },
        {
            value: 'day',
            label: t('day')
        }
    ];
}