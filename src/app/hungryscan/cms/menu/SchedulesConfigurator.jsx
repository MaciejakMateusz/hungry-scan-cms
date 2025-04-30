import React, {useEffect, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {MenuScheduler} from "../topper/MenuScheduler";
import {setSchedulerActive} from "../../../../slices/cmsSlice";
import {setPlansUpdated, updatePlans} from "../../../../slices/menuSlice";
import {useConfirmationMessage} from "../../../../hooks/useConfirmationMessage";

export const SchedulesConfigurator = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {restaurant} = useSelector((state) => state.dashboard.view);
    const renderConfirmation = useConfirmationMessage(setPlansUpdated);

    const initialMenus = useMemo(() => {
        return [...(restaurant?.value.menus || [])]
            .sort((a, b) =>
                a.standard === b.standard
                    ? a.name.localeCompare(b.name, undefined, {numeric: true})
                    : a.standard
                        ? -1
                        : 1
            );
    }, [restaurant]);

    const [menusConfig, setMenusConfig] = useState(initialMenus);

    useEffect(() => {
        setMenusConfig(initialMenus);
    }, [initialMenus]);

    const handlePlanChange = (menuId, newPlan) => {
        setMenusConfig((prev) =>
            prev.map((m) =>
                m.id === menuId ? {
                        ...m,
                        plan: newPlan,
                    }
                    : m
            )
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const preparedMenus = menusConfig.map(menu => {
            if (menu.standard) {
                return {
                    id: menu.id,
                    name: menu.name,
                    plan: {},
                    standard: true
                };
            }

            const plan = {};
            menu.plan.weekDay.forEach(({value}) => {
                const dayKey = value.toUpperCase();

                const s = menu.plan.startTime.value instanceof Date
                    ? menu.plan.startTime.value
                    : new Date(menu.plan.startTime.value);
                const e = menu.plan.endTime.value instanceof Date
                    ? menu.plan.endTime.value
                    : new Date(menu.plan.endTime.value);

                plan[dayKey] = {
                    startTime: [s.getHours(), s.getMinutes()],
                    endTime: [e.getHours(), e.getMinutes()]
                };
            });

            return {
                id: menu.id,
                name: menu.name,
                plan,
                standard: false
            };
        });

        const resultAction = await dispatch(updatePlans({menus: preparedMenus}));
        if (updatePlans.fulfilled.match(resultAction)) {
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