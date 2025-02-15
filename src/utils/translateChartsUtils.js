export const translateX = (period, x, t) => {
    if (period === 'year') {
        return translateMonth(x, t);
    } else if (period === 'week') {
        return translateDay(x, t);
    }
    return x;
}

const translateMonth = (x, t) => {
    switch (x) {
        case 1:
            return t('januaryShort');
        case 2:
            return t('februaryShort');
        case 3:
            return t('marchShort');
        case 4:
            return t('aprilShort');
        case 5:
            return t('mayShort');
        case 6:
            return t('juneShort');
        case 7:
            return t('julyShort');
        case 8:
            return t('augustShort');
        case 9:
            return t('septemberShort');
        case 10:
            return t('octoberShort');
        case 11:
            return t('novemberShort');
        case 12:
            return t('decemberShort');
        default:
            return 'Err';
    }
}


const translateDay = (x, t) => {
    switch (x) {
        case 1:
            return t('mondayShort');
        case 2:
            return t('tuesdayShort');
        case 3:
            return t('wednesdayShort');
        case 4:
            return t('thursdayShort');
        case 5:
            return t('fridayShort');
        case 6:
            return t('saturdayShort');
        case 7:
            return t('sundayShort');
        default:
            return 'Err';
    }
}
