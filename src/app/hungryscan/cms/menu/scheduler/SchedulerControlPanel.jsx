import {ReactSVG} from "react-svg";
import {setSchedulerActive} from "../../../../../slices/cmsSlice";
import React, {useCallback} from "react";
import {useTranslation} from "react-i18next";
import {WEEK_DAYS} from "../../../../../utils/schedulerUtils";
import {generateUUID} from "../../../../../utils/utils";
import {useDispatch, useSelector} from "react-redux";
import {setPlansUpdated, updatePlans} from "../../../../../slices/menuSlice";
import {useConfirmationMessage} from "../../../../../hooks/useConfirmationMessage";
import {useFetchCurrentRestaurant} from "../../../../../hooks/useFetchCurrentRestaurant";

export const SchedulerControlPanel = ({menusConfig, setMenusConfig, externalRef, trashRef}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {restaurant} = useSelector((state) => state.dashboard.view);
    const renderConfirmation = useConfirmationMessage(setPlansUpdated);
    const getRestaurant = useFetchCurrentRestaurant();
    const restaurantSettings = restaurant?.value?.settings;
    const {openingTime, closingTime} = restaurantSettings;

    const clearSchedules = () => {
        setMenusConfig(prevMenus =>
            prevMenus.map(menu => ({
                ...menu,
                plan: []
            }))
        );
    };

    const fillWithStandard = useCallback(() => {
        setMenusConfig(prevMenus => {
            const standardMenu = prevMenus.find(m => m.standard);
            if (!standardMenu) return prevMenus;
            const rangesByDay = WEEK_DAYS.reduce((acc, d) => ({...acc, [d]: []}), {});

            prevMenus.forEach(menu => {
                if (!menu.standard) {
                    menu.plan?.forEach(plan =>
                        plan.timeRanges.forEach(timeRange =>
                            rangesByDay[plan.dayOfWeek].push({
                                start: timeRange.startTime,
                                end: timeRange.endTime
                            })
                        )
                    );
                }
            });

            const gapPlans = [];

            WEEK_DAYS.forEach(day => {
                const dayRanges = rangesByDay[day]
                    .sort((a, b) => a.start.localeCompare(b.start));

                let cursor = openingTime;
                dayRanges.forEach(({start, end}) => {
                    if (start > cursor) {
                        gapPlans.push({
                            id: generateUUID(),
                            menuId: standardMenu.id,
                            dayOfWeek: day,
                            timeRanges: [{startTime: cursor, endTime: start}]
                        });
                    }
                    if (end > cursor) cursor = end;
                });

                if (cursor < closingTime) {
                    gapPlans.push({
                        id: generateUUID(),
                        menuId: standardMenu.id,
                        dayOfWeek: day,
                        timeRanges: [{startTime: cursor, endTime: closingTime}]
                    });
                }
            });

            return prevMenus.map(menu =>
                menu.id === standardMenu.id
                    ? {...menu, plan: gapPlans}
                    : menu
            );
        });
    }, [openingTime, closingTime, setMenusConfig]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(updatePlans({menus: menusConfig}));
        if (updatePlans.fulfilled.match(resultAction)) {
            await getRestaurant();
            dispatch(setSchedulerActive(false));
            renderConfirmation();
        }
    };

    return (
        <div className={'scheduler-control-panel'}>
            <div className={'external-events'} ref={externalRef}>
                <p>Dostępne menu do zaplanowania:</p>
                {menusConfig.map(menu => (
                    <div className={'external-event'}
                         key={menu.id}
                         data-menu-id={menu.id}>
                        {menu.name}
                    </div>
                ))}
            </div>

            <div className={'scheduler-trash'} ref={trashRef}>
                <ReactSVG src={`${process.env.PUBLIC_URL}/theme/icons/bin.svg`}/>
            </div>

            <div className={'general-button scheduler-button'}
                 onClick={clearSchedules}>
                Wyczyść harmonogram
            </div>

            <div className={'general-button scheduler-button'}
                 onClick={fillWithStandard}>
                Wypełnij standardowym
            </div>

            <div className={'scheduler-control-panel-footer'}>
                <button className={'general-button cancel'}
                        onClick={() => dispatch(setSchedulerActive(false))}>
                    {t('cancel')}
                </button>
                <form style={{all: 'unset'}} onSubmit={handleSubmit}>
                    <button type={'submit'} className={'general-button'}>
                        {t('save')}
                    </button>
                </form>
            </div>
        </div>
    );
}