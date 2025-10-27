import React, {useEffect, useMemo, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {SchedulerControlPanel} from "./SchedulerControlPanel";
import {SchedulerCalendar} from "./SchedulerCalendar";
import {FormErrorDialog} from "../../../../error/FormErrorDialog";
import {setUpdatingPlansError} from "../../../../../slices/menuSlice";

export const Scheduler = () => {
    const {restaurant} = useSelector((state) => state.dashboard.view);
    const {updatingPlansError} = useSelector((state) => state.menu.updatePlans);
    const externalRef = useRef(null);
    const trashRef = useRef(null);

    const initialMenus = useMemo(() => {
        return [...(restaurant?.value.menus || [])]
    }, [restaurant.value.menus]);

    const [menusConfig, setMenusConfig] = useState(initialMenus);

    useEffect(() => {
        setMenusConfig(initialMenus);
    }, [initialMenus]);

    return (
        <div className={'background'}>
            <FormErrorDialog errorData={updatingPlansError} setErrorData={setUpdatingPlansError}/>
            <div className={'scheduler-wrapper'}>
                <div className={'scheduler-flex'}>
                    <SchedulerControlPanel menusConfig={menusConfig}
                                           setMenusConfig={setMenusConfig}
                                           externalRef={externalRef}
                                           trashRef={trashRef}/>
                    <SchedulerCalendar menusConfig={menusConfig}
                                       setMenusConfig={setMenusConfig}
                                       externalRef={externalRef}
                                       trashRef={trashRef}/>
                </div>
            </div>
        </div>
    );
};
