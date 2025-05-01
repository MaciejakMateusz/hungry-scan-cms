import React, {useEffect, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {MenuScheduler} from "../topper/MenuScheduler";
import {setSchedulerActive} from "../../../../slices/cmsSlice";
import {setPlansUpdated, updatePlans} from "../../../../slices/menuSlice";
import {useConfirmationMessage} from "../../../../hooks/useConfirmationMessage";
import {formatHHMM} from "../../../../utils/utils";
import {useFetchCurrentRestaurant} from "../../../../hooks/useFetchCurrentRestaurant";

export const SchedulesConfigurator = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {restaurant} = useSelector((state) => state.dashboard.view);
    const renderConfirmation = useConfirmationMessage(setPlansUpdated);
    const getRestaurant = useFetchCurrentRestaurant();

    const initialMenus = useMemo(() => {
        return [...(restaurant?.value.menus || [])]
            .sort((a, b) =>
                a.standard === b.standard
                    ? a.name.localeCompare(b.name, undefined, {numeric: true})
                    : a.standard
                        ? -1
                        : 1
            )
            .map(m => {
                if (m.standard || m.plan === {}) {
                    return {
                        id: m.id,
                        name: m.name,
                        plan: {},
                        standard: true
                    };
                }
                const plan = {
                    weekDay: [],
                    startTime: null,
                    endTime: null
                };
                const weekDays = Object.keys(m.plan);
                plan.weekDay = weekDays.map(w => ({value: w, label: t(w.toLowerCase())}));
                const planValues = Object.values(m.plan)
                const isoStartTime = `1970-01-01T${planValues[0].startTime}`;
                const startTime = new Date(isoStartTime);
                plan.startTime = {value: startTime, label: formatHHMM(startTime)};
                const isoEndTime = `1970-01-01T${planValues[0].endTime}`;
                const endTime = new Date(isoEndTime);
                plan.endTime = {value: endTime, label: formatHHMM(endTime)};

                return {
                    ...m,
                    plan: plan,
                };
            });
    }, [restaurant.value.menus, t]);

    const [menusConfig, setMenusConfig] = useState(initialMenus);

    useEffect(() => {
        setMenusConfig(initialMenus);
    }, [initialMenus]);

    const handlePlanChange = (menuId, newPlan) => {
        setMenusConfig(prev => prev.map((m) => m.id === menuId ? {...m, plan: newPlan} : m));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const preparedMenus = menusConfig.map(m => {
            if (m.standard) {
                return {
                    id: m.id,
                    name: m.name,
                    plan: {},
                    standard: true
                };
            }

            const plan = {};
            m.plan.weekDay.forEach(({value}) => {
                const dayKey = value;

                const start = m.plan.startTime.value;
                const end = m.plan.endTime.value;

                plan[dayKey] = {
                    startTime: [start.getHours(), start.getMinutes()],
                    endTime: [end.getHours(), end.getMinutes()]
                };
            });

            return {
                id: m.id,
                name: m.name,
                plan,
                standard: false
            };
        });

        const resultAction = await dispatch(updatePlans({menus: preparedMenus}));
        if (updatePlans.fulfilled.match(resultAction)) {
            await getRestaurant();
            dispatch(setSchedulerActive(false));
            renderConfirmation();
        }
    };

    return (
        <>
            <div className="overlay"/>
            <div className="variant-form-dialog" style={{left: "35vw"}}>
                <div className="variant-form-dialog-content">
                    <h4 className="form-dialog-header">Konfiguruj harmonogramy menu</h4>
                    {menusConfig.map((menu) => (
                        <div key={menu.id} className="schedules-config-position">
                            <div>{menu.name}</div>
                            {!menu.standard ? (
                                <MenuScheduler
                                    menu={menu}
                                    onPlanChange={(plan) => handlePlanChange(menu.id, plan)}
                                />
                            ) : (
                                "Menu główne"
                            )}
                        </div>
                    ))}
                </div>
                <div className="variant-dialog-footer">
                    <button
                        className="general-button cancel"
                        onClick={() => dispatch(setSchedulerActive(false))}
                    >
                        {t("cancel")}
                    </button>
                    <form style={{all: "unset"}} onSubmit={handleSubmit}>
                        <button type="submit" className="general-button">
                            {t("save")}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};