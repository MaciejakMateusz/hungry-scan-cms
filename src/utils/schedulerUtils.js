export const getDayOfWeek = dateTimeISO => {
    const date = new Date(dateTimeISO)
    return date.toLocaleDateString('en-US', {weekday: 'long'}).toUpperCase()
}

export const parseDayOfWeek = dayOfWeek => {
    const upperDay = dayOfWeek.toUpperCase();
    switch (upperDay) {
        case 'MONDAY':
            return '2020-01-06';
        case 'TUESDAY':
            return '2020-01-07';
        case 'WEDNESDAY':
            return '2020-01-08';
        case 'THURSDAY':
            return '2020-01-09';
        case 'FRIDAY':
            return '2020-01-10';
        case 'SATURDAY':
            return '2020-01-11';
        case 'SUNDAY':
            return '2020-01-12';
        default:
            return '2020-01-06';
    }
}

export const getTime = (dateTimeISO) => {
    const date = dateTimeISO.split('T')
    return date[1]
}

export const joinDateTime = (date, time) => {
    return date + 'T' + time
}

export const parseMenusToEvents = menus => {
    const schedulerEvents = []
    menus.forEach(menu => {
        menu.plan?.forEach(plan => {
            plan.timeRanges?.forEach(timeRange => {
                const date = parseDayOfWeek(plan.dayOfWeek);
                const event = {
                    id: plan.menuId,
                    title: menu.name,
                    start: joinDateTime(date, timeRange.startTime),
                    end: joinDateTime(date, timeRange.endTime)
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
        const menu = {
            id: event.id,
            name: event.title,
            plan: {
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