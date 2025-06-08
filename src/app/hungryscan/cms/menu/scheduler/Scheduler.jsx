import React, {useEffect, useMemo, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {SchedulerControlPanel} from "./SchedulerControlPanel";
import {SchedulerCalendar} from "./SchedulerCalendar";

export const Scheduler = () => {
    const {restaurant} = useSelector((state) => state.dashboard.view);
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
