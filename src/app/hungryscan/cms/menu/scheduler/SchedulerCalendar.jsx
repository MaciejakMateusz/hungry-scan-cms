import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, {Draggable} from "@fullcalendar/interaction";
import {getLanguage} from "../../../../../locales/langUtils";
import React, {useCallback, useEffect, useMemo, useRef} from "react";
import {useSelector} from "react-redux";
import {generateUUID} from "../../../../../utils/utils";
import {
    getDayOfWeek,
    getLocalTimeFromDate,
    parseEventsToMenus,
    parseMenusToEvents,
    toLocalISOString
} from "../../../../../utils/schedulerUtils";

export const SchedulerCalendar = ({menusConfig, setMenusConfig, externalRef, trashRef}) => {
    const {restaurant} = useSelector((state) => state.dashboard.view);
    const restaurantSettings = restaurant?.value?.settings;
    const calendarRef = useRef(null);
    const isDraggingRef = useRef(false);
    const scrollTargetRef = useRef(null);
    const horizontalScrollTargetRef = useRef(null);

    const findScrollTargets = () => {
        let verticalTarget = null;
        let horizontalTarget = null;

        const calendarApi = calendarRef.current && calendarRef.current.getApi
            ? calendarRef.current.getApi()
            : null;
        const calendarEl = (calendarApi && calendarApi.el) || (calendarRef.current && calendarRef.current.el);

        if (calendarEl) {
            let el = calendarEl.parentElement;

            while (el) {
                const canScrollY = el.scrollHeight > el.clientHeight + 1;
                const canScrollX = el.scrollWidth > el.clientWidth + 1;

                if (canScrollY && !verticalTarget) {
                    verticalTarget = el;
                }

                if (canScrollX && !horizontalTarget) {
                    horizontalTarget = el;
                }

                if (verticalTarget && horizontalTarget) break;

                el = el.parentElement;
            }

            if (!horizontalTarget) {
                const internalScroller =
                    calendarEl.querySelector('.fc-scroller') ||
                    calendarEl.querySelector('.fc-timegrid-body') ||
                    calendarEl.querySelector('.fc-timeGrid-body');

                if (
                    internalScroller &&
                    internalScroller.scrollWidth > internalScroller.clientWidth + 1
                ) {
                    horizontalTarget = internalScroller;
                }
            }
        }

        if (!verticalTarget) {
            verticalTarget = document.scrollingElement || document.documentElement;
        }

        if (!horizontalTarget) {
            horizontalTarget = verticalTarget;
        }

        return { verticalTarget, horizontalTarget };
    };

    useEffect(() => {
        const { verticalTarget, horizontalTarget } = findScrollTargets();
        scrollTargetRef.current = verticalTarget;
        horizontalScrollTargetRef.current = horizontalTarget;
    }, []);

    useEffect(() => {
        let verticalTarget = document.scrollingElement || document.documentElement;
        let horizontalTarget = null;

        const calendarApi = calendarRef.current?.getApi();
        const calendarEl = calendarApi?.el || calendarRef.current?.el;

        if (calendarEl) {
            let el = calendarEl.parentElement;

            while (el) {
                const style = window.getComputedStyle(el);
                const overflowY = style.overflowY;
                const overflowX = style.overflowX;

                const canScrollY =
                    (overflowY === 'auto' || overflowY === 'scroll') &&
                    el.scrollHeight > el.clientHeight + 1;

                const canScrollX =
                    (overflowX === 'auto' || overflowX === 'scroll') &&
                    el.scrollWidth > el.clientWidth + 1;

                if (canScrollY) {
                    verticalTarget = el;
                }

                if (canScrollX && !horizontalTarget) {
                    horizontalTarget = el;
                }

                if (canScrollY && canScrollX) break;

                el = el.parentElement;
            }

            if (!horizontalTarget) {
                horizontalTarget =
                    calendarEl.querySelector('.fc-scroller') ||
                    calendarEl.querySelector('.fc-timegrid-body') ||
                    calendarEl.querySelector('.fc-timeGrid-body');
            }
        }

        scrollTargetRef.current = verticalTarget;
        horizontalScrollTargetRef.current = horizontalTarget;
    }, []);

    const isPointerDown = (e) => {
        if (e.buttons != null) {
            return e.buttons === 1;
        }
        return !!e.touches?.length;
    };

    const isDraggingInternalOrExternal = (e, externalRef) => {
        const target = e.target;
        if (!(target instanceof Element)) return false;

        //internal events
        if (target.closest('.fc-event')) return true;

        //external events
        if (externalRef.current && externalRef.current.contains(target)) return true;

        //mirror element that FullCalendar renders while dragging
        return !!document.querySelector('.fc-event-mirror');
    };

    useEffect(() => {
        const SCROLL_AREA = 100;
        const SCROLL_STEP = 3;

        const ensureScrollTargets = () => {
            if (scrollTargetRef.current && horizontalScrollTargetRef.current) return;

            const { verticalTarget, horizontalTarget } = findScrollTargets();

            if (!scrollTargetRef.current) {
                scrollTargetRef.current = verticalTarget;
            }
            if (!horizontalScrollTargetRef.current) {
                horizontalScrollTargetRef.current = horizontalTarget;
            }
        };

        const handleMove = (e) => {
            ensureScrollTargets();

            if (!isDraggingRef.current) {
                if (!isPointerDown(e)) return;
                if (!isDraggingInternalOrExternal(e, externalRef)) return;

                isDraggingRef.current = true;
            }

            let clientX = null;
            let clientY = null;

            if ('clientX' in e && 'clientY' in e) {
                clientX = e.clientX;
                clientY = e.clientY;
            } else if (e.touches && e.touches.length) {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            }

            if (clientY == null && clientX == null) return;

            // ---------- VERTICAL SCROLL ----------
            if (clientY != null) {
                const viewportHeight = window.innerHeight;
                const topThreshold = SCROLL_AREA;
                const bottomThreshold = viewportHeight - SCROLL_AREA;

                const verticalTarget =
                    scrollTargetRef.current ||
                    document.scrollingElement ||
                    document.documentElement;

                if (clientY < topThreshold) {
                    verticalTarget.scrollTop -= SCROLL_STEP;
                } else if (clientY > bottomThreshold) {
                    verticalTarget.scrollTop += SCROLL_STEP;
                }
            }

            // ---------- HORIZONTAL SCROLL ----------
            const horizontalTarget = horizontalScrollTargetRef.current;
            if (horizontalTarget && clientX != null) {
                const rect = horizontalTarget.getBoundingClientRect();
                const leftThreshold = rect.left + SCROLL_AREA;
                const rightThreshold = rect.right - SCROLL_AREA;

                const insideVertically =
                    clientY == null ||
                    (clientY >= rect.top && clientY <= rect.bottom);

                if (insideVertically) {
                    if (clientX < leftThreshold) {
                        horizontalTarget.scrollLeft -= SCROLL_STEP;
                    } else if (clientX > rightThreshold) {
                        horizontalTarget.scrollLeft += SCROLL_STEP;
                    }
                }
            }
        };

        window.addEventListener('pointermove', handleMove, { passive: false });
        window.addEventListener('touchmove', handleMove, { passive: false });
        window.addEventListener('mousemove', handleMove);

        return () => {
            window.removeEventListener('pointermove', handleMove);
            window.removeEventListener('touchmove', handleMove);
            window.removeEventListener('mousemove', handleMove);
        };
    }, [externalRef]);


    const businessHours = useMemo(() => {
        const dayMap = {
            MONDAY: 1,
            TUESDAY: 2,
            WEDNESDAY: 3,
            THURSDAY: 4,
            FRIDAY: 5,
            SATURDAY: 6,
            SUNDAY: 0,
        };
        return Object.entries(restaurantSettings?.operatingHours ?? {})
            .flatMap(([dayName, {available, startTime, endTime}]) => {
                if (!available || !startTime || !endTime) return [];

                const dayNum = dayMap[dayName];

                if (endTime > startTime) {
                    return {
                        daysOfWeek: [dayNum],
                        startTime,
                        endTime
                    };
                }

                return [
                    {
                        daysOfWeek: [dayNum],
                        startTime,
                        endTime: '24:00:00'
                    },
                    {
                        daysOfWeek: [(dayNum + 1) % 7],
                        startTime: '00:00:00',
                        endTime
                    }
                ];
            });
    }, [restaurantSettings?.operatingHours]);

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

            setMenusConfig(prevState => parseEventsToMenus(allEvents, prevState));
        },
        [setMenusConfig]
    );

    const handleEventRemoveClick = useCallback(
        (e, eventApi) => {
            e.preventDefault();
            e.stopPropagation();
            eventApi.remove();
            const api = calendarRef.current?.getApi();
            if (api) syncMenusWithCalendar(api);
        },
        [syncMenusWithCalendar]
    );

    const getClientPoint = (jsEvent) => {
        if ('clientX' in jsEvent && 'clientY' in jsEvent) {
            return { x: jsEvent.clientX, y: jsEvent.clientY };
        }

        const touch = jsEvent.changedTouches?.[0] || jsEvent.touches?.[0];
        if (touch) {
            return { x: touch.clientX, y: touch.clientY };
        }

        return { x: null, y: null };
    };

    const handleEventDragStart = useCallback(() => {
        isDraggingRef.current = true;
    }, []);

    const handleEventDragStop = useCallback(
        (info) => {
            const { x, y } = getClientPoint(info.jsEvent || {});
            if (x != null && y != null) {
                const droppedElem = document.elementFromPoint(x, y);
                if (trashRef.current && droppedElem && trashRef.current.contains(droppedElem)) {
                    info.event.remove();
                    syncMenusWithCalendar(info.view.calendar);
                }
            }

            isDraggingRef.current = false;
        },
        [syncMenusWithCalendar, trashRef]
    );
    const renderEventContent = useCallback(
        (arg) => {
            const { event, timeText } = arg;

            const start = event.start;
            const end = event.end;
            const durationMinutes = (end - start) / (1000 * 60);

            const showTitle = durationMinutes > 30;
            return (
                <div className="fc-event-inner">
                    <div className={'fc-event-content'}>
                        <span className="fc-event-time">{timeText}</span>
                        {showTitle && <span className="fc-event-title">{arg.event.title}</span>}
                    </div>
                    <button className="fc-event-remove"
                            onClick={(e) => handleEventRemoveClick(e, arg.event)}>
                        ×
                    </button>
                </div>
            );
        },
        [handleEventRemoveClick]
    );

    const handleEventChange = useCallback(
        (info) => {
            syncMenusWithCalendar(info.view.calendar);
        },
        [syncMenusWithCalendar]
    );

    const eventClassNames = useCallback((arg) => {
        const { start, end } = arg.event;
        const durationMinutes = (end - start) / 60000;
        return durationMinutes <= 30 ? ['fc-no-title'] : [];
    }, []);

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


    return (
        <>
            <div className={'scheduler-container'}>
                <FullCalendar ref={calendarRef}
                              plugins={[timeGridPlugin, interactionPlugin]}
                              droppable={true}
                              height={'100%'}
                              initialView={'timeGridWeek'}
                              initialDate={'2020-01-06'}
                              headerToolbar={false}
                              allDaySlot={false}
                              editable={true}
                              selectable={true}
                              firstDay={1}
                              slotMinTime={'00:00'}
                              slotMaxTime={'24:00'}
                              businessHours={businessHours}
                              eventConstraint={'businessHours'}
                              navLinks={false}
                              events={events}
                              eventDrop={handleEventChange}
                              eventResize={handleEventChange}
                              eventReceive={handleEventReceive}
                              eventDragStop={handleEventDragStop}
                              eventDragStart={handleEventDragStart}
                              eventLongPressDelay={150}
                              selectLongPressDelay={150}
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
                              eventClassNames={eventClassNames}
                              eventContent={renderEventContent}
                />
            </div>
            <div className={'scheduler-padding'}/>
        </>
    );
}