import {useTranslation} from "react-i18next";

export const useWeekDays = () => {
    const { t } = useTranslation();
    return [
        {
            value: 'MONDAY',
            label: t('monday')
        },
        {
            value: 'TUESDAY',
            label: t('tuesday')
        },
        {
            value: 'WEDNESDAY',
            label: t('wednesday')
        },
        {
            value: 'THURSDAY',
            label: t('thursday')
        },
        {
            value: 'FRIDAY',
            label: t('friday')
        },
        {
            value: 'SATURDAY',
            label: t('saturday')
        },
        {
            value: 'SUNDAY',
            label: t('sunday')
        }
    ];
}