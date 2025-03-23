import {useTranslation} from "react-i18next";

export const useWeekDays = () => {
    const { t } = useTranslation();
    return [
        {
            value: 'monday',
            label: t('monday')
        },
        {
            value: 'tuesday',
            label: t('tuesday')
        },
        {
            value: 'wednesday',
            label: t('wednesday')
        },
        {
            value: 'thursday',
            label: t('thursday')
        },
        {
            value: 'friday',
            label: t('friday')
        },
        {
            value: 'saturday',
            label: t('saturday')
        },
        {
            value: 'sunday',
            label: t('sunday')
        }
    ];
}