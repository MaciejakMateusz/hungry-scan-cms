import {generateUUID} from "./utils";

export const WEEK_DAYS = [
    "MONDAY", "TUESDAY", "WEDNESDAY",
    "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"
];

export const getDayOfWeek = dateTimeISO => {
    const date = new Date(dateTimeISO)
    return date.toLocaleDateString('en-US', {weekday: 'long'}).toUpperCase()
}

export const parseDayOfWeek = dayOfWeek => {
    const upperDay = dayOfWeek.toUpperCase();
    switch (upperDay) {
        case WEEK_DAYS[0]:
            return '2020-01-06';
        case WEEK_DAYS[1]:
            return '2020-01-07';
        case WEEK_DAYS[2]:
            return '2020-01-08';
        case WEEK_DAYS[3]:
            return '2020-01-09';
        case WEEK_DAYS[4]:
            return '2020-01-10';
        case WEEK_DAYS[5]:
            return '2020-01-11';
        case WEEK_DAYS[6]:
            return '2020-01-12';
        default:
            return '2020-01-06';
    }
}

export const toLocalISOString = date => {
    const Y = date.getFullYear();
    const M = String(date.getMonth() + 1).padStart(2, '0');
    const D = String(date.getDate()).padStart(2, '0');
    const h = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');
    const s = String(date.getSeconds()).padStart(2, '0');
    return `${Y}-${M}-${D}T${h}:${m}:${s}`;
}

export const getTime = date => {
    const dateTime = date.split('T')
    const time = dateTime[1]
    return time.substring(0, 8);
}

export const getLocalTimeFromDate = date => {
    const dateTime = toLocalISOString(date).split('T');
    return dateTime[1];
}

export const joinDateTime = (date, time) => {
    return (date + 'T' + time);
}

export const parseMenusToEvents = menus => {
    const schedulerEvents = []
    menus.forEach(menu => {
        menu.plan?.forEach(plan => {
            plan.timeRanges?.forEach(timeRange => {
                const date = parseDayOfWeek(plan.dayOfWeek);
                const event = {
                    id: generateUUID(),
                    title: menu.name,
                    start: joinDateTime(date, timeRange.startTime),
                    end: joinDateTime(date, timeRange.endTime),
                    extendedProps: {
                        menuId: menu.id,
                        standard: menu.standard
                    }
                };
                schedulerEvents.push(event)
            });
        });
    });
    return schedulerEvents;
}

export const parseEventsToMenus = events => {
    const menus = parseMenus(events)
    return groupMenus(menus);
}

const parseMenus = events => {
    const menus = []
    events.forEach(event => {
        const extProps = event.extendedProps;
        const menu = {
            id: Number(extProps.menuId),
            name: event.title,
            plan: {
                id: event.id.toString(),
                menuId: extProps.menuId,
                dayOfWeek: getDayOfWeek(event.start),
                startTime: getTime(event.start),
                endTime: getTime(event.end)
            }
        };
        menus.push(menu);
    });
    return menus;
}

const groupMenus = menus => {
    return menus.reduce((accumulator, menu) => {
        const existing = accumulator.find(m => m.id === menu.id);
        if (existing) {
            existing.plan.push(menu.plan)
        } else {
            accumulator.push({
                id: menu.id,
                name: menu.name,
                plan: [menu.plan]
            });
        }
        return accumulator;
    }, []);
}