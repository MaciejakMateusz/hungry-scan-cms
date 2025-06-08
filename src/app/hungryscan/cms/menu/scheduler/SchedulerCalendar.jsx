import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, {Draggable} from "@fullcalendar/interaction";
import {getLanguage} from "../../../../../locales/langUtils";
import React, {useCallback, useEffect, useMemo} from "react";
import {useSelector} from "react-redux";
import {generateUUID} from "../../../../../utils/utils";
import {
    getDayOfWeek,
    getLocalTimeFromDate,
    parseEventsToMenus, parseMenusToEvents,
    toLocalISOString
} from "../../../../../utils/schedulerUtils";

export const SchedulerCalendar = ({menusConfig, setMenusConfig, externalRef, trashRef}) => {
    const {restaurant} = useSelector((state) => state.dashboard.view);
    const restaurantSettings = restaurant?.value?.settings;
    const {openingTime, closingTime} = restaurantSettings;

    const events = useMemo(() => {
        return parseMenusToEvents(menusConfig);
    }, [menusConfig]);

    const syncMenusWithCalendar = useCallback(
        (calendarApi) => {
            const allEvents = calendarApi.getEvents()
                .map(ev => ({
                    id: ev.id,
                    title: ev.title,
                    start: toLocalISOString(ev.start),
                    end: toLocalISOString(ev.end),
                    extendedProps: ev.extendedProps
                }));

            const menusFromEvents = parseEventsToMenus(allEvents);
            const newMenusConfig = menusConfig.map((m) => {
                const updated = menusFromEvents.find(u => String(u.id) === String(m.id));
                if (!updated) return m;
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
            setMenusConfig(newMenusConfig);
        },
        [menusConfig, setMenusConfig]
    );

    const handleEventChange = useCallback(
        (info) => {
            syncMenusWithCalendar(info.view.calendar);
        },
        [syncMenusWithCalendar]
    );

    useEffect(() => {
        let draggable = new Draggable(externalRef.current, {
            itemSelector: '.external-event',
            eventData: eventEl => ({
                id: generateUUID(),
                title: eventEl.innerText.trim(),
                duration: '00:30',
                extendedProps: {
                    menuId: eventEl.getAttribute('data-menu-id')
                }
            })
        });

        return () => draggable.destroy();
    }, [externalRef]);

    const handleEventReceive = useCallback(info => {
        const {id, extendedProps, start, end} = info.event;
        const newPlan = {
            id,
            menuId: extendedProps.menuId,
            dayOfWeek: getDayOfWeek(start),
            timeRanges: [{
                startTime: getLocalTimeFromDate(start),
                endTime: getLocalTimeFromDate(end),
            }]
        };

        setMenusConfig(prev =>
            prev.map(menu =>
                menu.id === newPlan.menuId
                    ? {...menu, plan: [...(menu.plan || []), newPlan]}
                    : menu
            )
        );
        syncMenusWithCalendar(info.view.calendar);
    }, [setMenusConfig, syncMenusWithCalendar]);

    const handleEventDragStop = useCallback(info => {
        const {clientX: x, clientY: y} = info.jsEvent;
        const droppedElem = document.elementFromPoint(x, y);

        if (trashRef.current && trashRef.current.contains(droppedElem)) {
            info.event.remove();
            syncMenusWithCalendar(info.view.calendar);
        }
    }, [syncMenusWithCalendar, trashRef]);

    return (
        <div className={'scheduler-container'}>
            <FullCalendar plugins={[timeGridPlugin, interactionPlugin]}
                          droppable={true}
                          initialView={'timeGridWeek'}
                          initialDate={'2020-01-06'}
                          headerToolbar={false}
                          allDaySlot={false}
                          editable={true}
                          selectable={true}
                          firstDay={1}
                          slotMinTime={openingTime}
                          slotMaxTime={closingTime}
                          businessHours={{
                              daysOfWeek: [1, 2, 3, 4, 5, 6, 0],
                              startTime: openingTime,
                              endTime: closingTime
                          }}
                          eventConstraint={'businessHours'}
                          navLinks={false}
                          events={events}
                          eventDrop={handleEventChange}
                          eventResize={handleEventChange}
                          eventReceive={handleEventReceive}
                          eventDragStop={handleEventDragStop}
                          dragRevertDuration={0}
                          eventOverlap={false}
                          selectOverlap={false}
                          slotEventOverlap={false}
                          slotLabelFormat={{
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: false
                          }}
                          locale={getLanguage()}
                          dayHeaderFormat={{
                              weekday: 'long'
                          }}
            />
        </div>
    );
}