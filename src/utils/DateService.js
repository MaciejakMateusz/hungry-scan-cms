export class DateService {
    static #current = new Date();

    static getCurrentFormattedDate = t => {
        const currentDay = this.#current.getDate();
        const currentMonth = this.#current.getMonth() + 1;
        const currentYear = this.#current.getFullYear();
        const formattedMonth = this.getMonth(currentMonth, t);
        return `${currentDay} ${formattedMonth} ${currentYear}`;
    }

    static getYearsCollection = startYear => {
        const currentYear = this.#current.getFullYear();
        const collection = [];
        for (let year = startYear; year <= currentYear; year++) {
            collection.push({value: year, label: year});
        }
        return collection;
    };

    static getMonthsCollection = (date, chosenYear, t) => {
        const currentMonth = this.#current.getMonth();
        const currentYear = this.#current.getFullYear();
        const beginYear = date.getFullYear()
        const beginMonth = date.getMonth();
        const collection = [];
        if (chosenYear?.value === beginYear) {
            this.#addMonths(beginMonth + 1, 12, collection, t);
            return collection;
        } else if (currentYear === chosenYear?.value) {
            this.#addMonths(1, currentMonth + 1, collection, t);
            return collection;
        }
        this.#addMonths(1, 12, collection, t);
        return collection;
    }

    static getWeeksCollection = (date, chosenYear, t) => {
        const currentWeek = this.getCurrentWeekNumber();
        const currentYear = this.#current.getFullYear();
        const beginYear = date.getFullYear()
        const beginWeek = this.getWeekNumber(date);
        const collection = [];
        if (chosenYear?.value === beginYear) {
            this.#addWeeks(beginWeek, 52, collection, t);
            return collection;
        } else if (currentYear === chosenYear?.value) {
            this.#addWeeks(1, currentWeek, collection, t);
            return collection;
        }
        this.#addWeeks(1, 52, collection, t);
        return collection;
    };

    static getCurrentWeekNumber = () => {
        const date = new Date(Date.UTC(this.#current.getFullYear(), this.#current.getMonth(), this.#current.getDate()));
        const dayOfWeek = date.getUTCDay() || 7;
        date.setUTCDate(date.getUTCDate() + 4 - dayOfWeek);
        const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
        return Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
    };

    static getWeekNumber = (date) => {
        const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        const dayOfWeek = utcDate.getUTCDay() || 7;
        utcDate.setUTCDate(utcDate.getUTCDate() + 4 - dayOfWeek);
        const yearStart = new Date(Date.UTC(utcDate.getUTCFullYear(), 0, 1));
        return Math.ceil((((utcDate - yearStart) / 86400000) + 1) / 7);
    };

    static getMonth = (month, t) => {
        switch (month) {
            case 1:
                return t('january')
            case 2:
                return t('february')
            case 3:
                return t('march')
            case 4:
                return t('april')
            case 5:
                return t('may')
            case 6:
                return t('june')
            case 7:
                return t('july')
            case 8:
                return t('august')
            case 9:
                return t('september')
            case 10:
                return t('october')
            case 11:
                return t('november')
            case 12:
                return t('december')
            default:
                return "Month"
        }
    }

    static #addWeeks = (beginWeek, endWeek, collection, t) => {
        for (let week = beginWeek; week <= endWeek; week++) {
            collection.push({value: week, label: `${week} ${t('week')}`});
        }
    };

    static #addMonths = (beginMonth, endMonth, collection, t) => {
        for (let month = beginMonth; month <= endMonth; month++) {
            collection.push({value: month, label: this.getMonth(month, t)});
        }
    };
}