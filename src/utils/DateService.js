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

    static getMonthsCollection = (year, t) => {
        const currentMonth = this.#current.getMonth() + 1;
        const currentYear = this.#current.getFullYear();
        const collection = [];
        if(currentYear === year || currentYear === year?.value) {
            this.#addMonths(currentMonth, collection, t);
            return collection;
        }
        this.#addMonths(12, collection, t);
        return collection;
    }

    static getWeeksCollection = (year, t) => {
        const currentWeek = this.getISOWeekNumber();
        const currentYear = this.#current.getFullYear();
        const collection = [];
        if(currentYear === year || currentYear === year?.value) {
            this.#addWeeks(currentWeek, collection, t);
            return collection;
        }
        this.#addWeeks(52, collection, t);
        return collection;
    };

    static getISOWeekNumber = () => {
        const date = new Date(Date.UTC(this.#current.getFullYear(), this.#current.getMonth(), this.#current.getDate()));
        const dayOfWeek = date.getUTCDay() || 7;
        date.setUTCDate(date.getUTCDate() + 4 - dayOfWeek);
        const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
        return Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
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

    static #addWeeks = (endWeek, collection, t) => {
        for (let week = 1; week <= endWeek; week++) {
            collection.push({value: week, label: `${week} ${t('week')}`});
        }
    };

    static #addMonths = (endMonth, collection, t) => {
        for (let month = 1; month <= endMonth; month++) {
            collection.push({value: month, label: this.getMonth(month, t)});
        }
    };
}