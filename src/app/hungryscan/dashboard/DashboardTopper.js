import React, {useCallback, useEffect, useState} from "react";
import {DocumentIcon} from "../../icons/DocumentIcon";
import Select from "react-select";
import {mainSelectIcon} from "../../../selectStyles";
import {CustomNoOptionsMessage} from "../cms/form-components/CustomNoOptionsMessage";
import {ThreeDotsIcon} from "../../icons/ThreeDotsIcon";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentRestaurant, getUserRestaurants, setRestaurant} from "../../../slices/dashboardSlice";
import {CustomMenuList} from "../cms/form-components/CustomMenuList";
import {
    setContextMenuDetailsActive,
    setRemovalActive,
    setRestaurantContextMenuActive,
    setRestaurantFormActive,
    switchRestaurant
} from "../../../slices/restaurantSlice";
import {RestaurantFormDialog} from "../cms/restaurant/RestaurantFormDialog";
import {ContextMenu} from "../cms/shared-components/ContextMenu";
import {useRestaurantContextPositions} from "../../../hooks/useRestaurantContextPositions";
import {DecisionDialog} from "../cms/dialog-windows/DecisionDialog";
import {remove} from "../../../slices/objectRemovalSlice";
import {SuccessMessage} from "../cms/dialog-windows/SuccessMessage";

export const DashboardTopper = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {restaurants} = useSelector(state => state.dashboard.getRestaurants);
    const {restaurant} = useSelector(state => state.dashboard.view);
    const {
        restaurantFormActive,
        restaurantContextMenuActive,
        contextMenuDetailsActive,
        removalActive
    } = useSelector(state => state.restaurant.form);
    const contextMenuPositions = useRestaurantContextPositions();
    const [isRestaurantRemoved, setIsRestaurantRemoved] = useState(null);
    const [confirmationTimeoutId, setConfirmationTimeoutId] = useState(null);

    const getRestaurant = useCallback(
        async () => {
            const resultAction = await dispatch(getCurrentRestaurant());
            if (getCurrentRestaurant.fulfilled.match(resultAction)) {
                dispatch(setRestaurant({
                    value: resultAction.payload,
                    label: resultAction.payload?.name
                }))
            }
        }, [dispatch]
    );

    useEffect(() => {
        if (!restaurantFormActive) {
            dispatch(getUserRestaurants());
            getRestaurant();
        }
    }, [dispatch, getRestaurant, restaurantFormActive]);

    const handleRestaurantSwitch = async (selected) => {
        const resultAction = await dispatch(switchRestaurant({restaurantId: selected?.value.id}));
        if (switchRestaurant.fulfilled.match(resultAction)) {
            await getRestaurant();
        }
    }

    const handleRestaurantRemoval = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(remove({id: restaurant?.value.id, path: 'restaurants'}));
        if (remove.fulfilled.match(resultAction)) {
            await getRestaurant()
            dispatch(setRemovalActive(false));
            dispatch(getUserRestaurants());
            setIsRestaurantRemoved(true);

            if (confirmationTimeoutId) {
                clearTimeout(confirmationTimeoutId);
            }

            const newConfirmationTimeoutId = setTimeout(() => {
                setIsRestaurantRemoved(null);
            }, 4000);
            setConfirmationTimeoutId(newConfirmationTimeoutId);
        }
    }

    return (
        <header className={'app-header dashboard'}>
            {restaurantFormActive && <RestaurantFormDialog/>}
            {removalActive && <DecisionDialog msg={t('confirmMenuRemoval')}
                                                             objName={restaurant?.value.name}
                                                             onCancel={() => dispatch(setRemovalActive(false))}
                                                             onSubmit={handleRestaurantRemoval}/>}
            <div className={'app-header-select-wrapper'}>
                <DocumentIcon customColor={"#9746FF"} absolute={true}/>
                <Select id={'dashboard-restaurant'}
                        name={'dashboard-restaurant'}
                        value={restaurant}
                        placeholder={t('choose')}
                        options={restaurants}
                        defaultValue={restaurants && restaurants[0]}
                        isSearchable={false}
                        onChange={(selected) => handleRestaurantSwitch(selected)}
                        styles={mainSelectIcon}
                        components={{
                            NoOptionsMessage: CustomNoOptionsMessage,
                            MenuList: CustomMenuList
                        }}
                        onAdd={() => dispatch(setRestaurantFormActive(true))}
                        buttonText={t('addRestaurant')}
                />
            </div>
            <div className={'relative-container'}>
                <div className={'options-button'}
                     tabIndex={-1}
                     onClick={() => {
                         dispatch(setRestaurantContextMenuActive(!restaurantContextMenuActive));
                         dispatch(setContextMenuDetailsActive(false));
                     }}
                     onBlur={() => {
                         setTimeout(() => dispatch(setRestaurantContextMenuActive(false)), 100);
                         dispatch(setContextMenuDetailsActive(false));
                     }}>
                    <ThreeDotsIcon/>
                </div>
                {restaurantContextMenuActive &&
                    <ContextMenu positions={contextMenuPositions}
                                 obj={restaurant.value}
                                 detailsActive={contextMenuDetailsActive}/>}
            </div>
            {isRestaurantRemoved && <SuccessMessage text={t('restaurantRemovalSuccess')}/>}
        </header>
    );
}