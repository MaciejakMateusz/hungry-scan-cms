import React, {useEffect, useMemo, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {SchedulerControlPanel} from "./SchedulerControlPanel";
import {SchedulerCalendar} from "./SchedulerCalendar";
import {FormErrorDialog} from "../../../../error/FormErrorDialog";
import {setPlansUpdated, setUpdatingPlansError, updatePlans} from "../../../../../slices/menuSlice";
import {FormHeader} from "../../shared-components/FormHeader";
import {useTranslation} from "react-i18next";
import {fetchActiveMenu, setSchedulerActive} from "../../../../../slices/cmsSlice";
import {useFetchCurrentRestaurant} from "../../../../../hooks/useFetchCurrentRestaurant";
import {useConfirmationMessage} from "../../../../../hooks/useConfirmationMessage";

export const Scheduler = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {restaurant} = useSelector((state) => state.dashboard.view);
    const {updatingPlansError} = useSelector((state) => state.menu.updatePlans);
    const externalRef = useRef(null);
    const trashRef = useRef(null);
    const getRestaurant = useFetchCurrentRestaurant();
    const renderConfirmation = useConfirmationMessage(setPlansUpdated);
    const {isLoading} = useSelector((state) => state.menu.updatePlans);

    const initialMenus = useMemo(() => {
        return [...(restaurant?.value.menus || [])].sort((a, b) => {
            if (a.standard !== b.standard) {
                return a.standard ? -1 : 1;
            }
            return a.name.localeCompare(b.name, 'pl', { sensitivity: 'base' });
        });
    }, [restaurant.value.menus]);

    const [menusConfig, setMenusConfig] = useState(initialMenus);

    useEffect(() => {
        setMenusConfig(initialMenus);
    }, [initialMenus]);

    const handleDiscard = () => {
        dispatch(setSchedulerActive(false));
        dispatch(setUpdatingPlansError(null));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(updatePlans({menus: menusConfig}));
        if (updatePlans.fulfilled.match(resultAction)) {
            await getRestaurant();
            await dispatch(fetchActiveMenu());
            dispatch(setSchedulerActive(false));
            renderConfirmation();
        } else {
            dispatch(setUpdatingPlansError(resultAction?.payload));
        }
    };

    return (
        <div className={'background'}>
            <FormErrorDialog errorData={updatingPlansError} setErrorData={setUpdatingPlansError}/>
            <div className={'scheduler-wrapper'}>
                <FormHeader formHeader={t('menuSchedules')}
                            onFormSubmit={handleSubmit}
                            onFormDiscard={handleDiscard}
                            isLoading={isLoading}
                />
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
