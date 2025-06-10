import {generateUUID} from "./utils";
import {useCallback} from "react";

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
                    end: joinDateTime(date, timeRange.endTime === '00:00:00' ? '24:00:00' : timeRange.endTime),
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

export const parseEventsToMenus = (events, menusConfig) => {
    const menus = groupMenus(parseMenus(events));
    return syncWithMenusConfig(menus, menusConfig)
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

const syncWithMenusConfig = (menusFromEvents, menusConfig) => menusConfig.map(m => {
    const updated = menusFromEvents.find(u => String(u.id) === String(m.id));
    if (!updated) return {...m, plan: []};
    const plan = updated.plan.map(p => {
        return ({
            id: p.id,
            menuId: Number(p.menuId),
            dayOfWeek: p.dayOfWeek,
            timeRanges: [
                {
                    startTime: p.startTime,
                    endTime: p.endTime
                }
            ]
        });
    });

    return {
        ...m,
        plan
    };
});

export const cleanseAndGroupMenuPlans = menus => {
    return menus.map(menu => {
        const flatPlans = menu.plan.map(menuPlan => ({
            id: null,
            menuId: menuPlan.menuId,
            dayOfWeek: menuPlan.dayOfWeek,
            timeRanges: menuPlan.timeRanges
        }));

        const grouped = {};
        flatPlans.forEach(plan => {
            const key = `${plan.menuId}-${plan.dayOfWeek}`;
            const cleansedTimeRanges = plan.timeRanges.map(timeRange => ({
                ...timeRange,
                endTime: timeRange.endTime === '24:00:00' ? '00:00:00' : timeRange.endTime
            }));
            if (!grouped[key]) {
                grouped[key] = {
                    id: plan.id,
                    menuId: plan.menuId,
                    dayOfWeek: plan.dayOfWeek,
                    timeRanges: [...cleansedTimeRanges]
                };
            } else {
                grouped[key].timeRanges.push(...cleansedTimeRanges);
            }
        });

        const groupedPlans = Object.values(grouped);

        return {
            ...menu,
            plan: groupedPlans
        };
    });
}

export const fillGapsWithStandard = (setMenusConfig, operatingHours) => {
    setMenusConfig(prevMenus => {
        const standardMenu = prevMenus.find(m => m.standard);
        if (!standardMenu) return prevMenus;

        const segmentsByDay = createDaySegments(operatingHours);
        const rangesByDay = createDayRanges(prevMenus);
        const gapPlans = computeGapPlans(rangesByDay, segmentsByDay, standardMenu);

        return prevMenus.map(menu =>
            menu.id === standardMenu.id
                ? {...menu, plan: gapPlans}
                : menu
        );
    });
};

const createDaySegments = operatingHours => {
    const segmentsByDay = WEEK_DAYS.reduce((acc, day) => {
        acc[day] = [];
        return acc;
    }, {});

    WEEK_DAYS.forEach((day, idx) => {
        const oh = operatingHours[day];
        if (!oh?.available || !oh.startTime || !oh.endTime) return;

        const {startTime, endTime} = oh;
        if (endTime > startTime) {
            segmentsByDay[day].push({start: startTime, end: endTime});
        } else {
            segmentsByDay[day].push({start: startTime, end: '24:00:00'});
            const nextDay = WEEK_DAYS[(idx + 1) % WEEK_DAYS.length];
            segmentsByDay[nextDay].push({start: '00:00:00', end: endTime});
        }
    });
    return segmentsByDay;
}

const createDayRanges = (prevMenus) => {
    const rangesByDay = WEEK_DAYS.reduce((acc, day) => {
        acc[day] = [];
        return acc;
    }, {});

    prevMenus.forEach(menu => {
        if (!menu.standard) {
            menu.plan?.forEach(({dayOfWeek, timeRanges}) => {
                timeRanges.forEach(({startTime, endTime}) => {
                    rangesByDay[dayOfWeek].push({start: startTime, end: endTime});
                });
            });
        }
    });
    return rangesByDay;
}

const computeGapPlans = (rangesByDay, segmentsByDay, standardMenu) => {
    const gapPlans = [];

    WEEK_DAYS.forEach(day => {
        const dayRanges = rangesByDay[day].sort((a, b) =>
            a.start.localeCompare(b.start)
        );

        segmentsByDay[day].forEach(({start: segStart, end: segEnd}) => {
            let cursor = segStart;

            dayRanges
                .filter(({start, end}) => start < segEnd && end > segStart)
                .sort((a, b) => a.start.localeCompare(b.start))
                .forEach(({start, end}) => {
                    if (start > cursor) {
                        gapPlans.push({
                            id: generateUUID(),
                            menuId: standardMenu.id,
                            dayOfWeek: day,
                            timeRanges: [{startTime: cursor, endTime: start}],
                        });
                    }
                    if (end > cursor) {
                        cursor = end > segEnd ? segEnd : end;
                    }
                });

            if (cursor < segEnd) {
                gapPlans.push({
                    id: generateUUID(),
                    menuId: standardMenu.id,
                    dayOfWeek: day,
                    timeRanges: [{startTime: cursor, endTime: segEnd}],
                });
            }
        });
    });
    return gapPlans;
}