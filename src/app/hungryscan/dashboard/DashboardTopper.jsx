import React, {useEffect, useRef, useState} from "react";
import Select from "react-select";
import {mainSelectTopper} from "../../../selectStyles";
import {CustomNoOptionsMessage} from "../cms/form-components/CustomNoOptionsMessage";
import {ThreeDotsIcon} from "../../icons/ThreeDotsIcon";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {getUserRestaurants} from "../../../slices/dashboardSlice";
import {CustomMenuList} from "../cms/form-components/CustomMenuList";
import {
    setNewRestaurantFormActive,
    setRemovalActive,
    setRestaurantContextMenuActive,
    setRestaurantRemoved,
    switchRestaurant
} from "../../../slices/restaurantSlice";
import {ContextMenu} from "../cms/shared-components/ContextMenu";
import {useRestaurantContextPositions} from "../../../hooks/useRestaurantContextPositions";
import {DecisionDialog} from "../cms/dialog-windows/DecisionDialog";
import {remove} from "../../../slices/objectRemovalSlice";
import {useFetchCurrentRestaurant} from "../../../hooks/useFetchCurrentRestaurant";
import {useOutsideClick} from "../../../hooks/useOutsideClick";
import {useWindowWidth} from "../../../hooks/useWindowWidth";
import {NavButtonMobile} from "../NavButtonMobile";
import {NavPanelMobile} from "../NavPanelMobile";
import {setMobileNavActive} from "../../../slices/globalParamsSlice";

export const DashboardTopper = ({children, clearStateHandler}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const selectRef = useRef();
    const {mobileNavActive} = useSelector(state => state.globalParams.globalParams);
    const {restaurants} = useSelector(state => state.dashboard.getRestaurants);
    const {restaurant} = useSelector(state => state.dashboard.view);
    const {
        newRestaurantFormActive,
        editRestaurantFormActive,
        restaurantContextMenuActive,
        removalActive
    } = useSelector(state => state.restaurant.form);
    const controlDisabled = newRestaurantFormActive || editRestaurantFormActive;
    const contextMenuPositions = useRestaurantContextPositions();
    const [confirmationTimeoutId, setConfirmationTimeoutId] = useState(null);
    const getRestaurant = useFetchCurrentRestaurant();
    const contextRef = useRef();
    const removalPending = useSelector(state => state.objRemoval.isLoading);
    const windowWidth = useWindowWidth();
    const isTablet = windowWidth < 1000;

    useOutsideClick(contextRef, () => {
        dispatch(setRestaurantContextMenuActive(false));
    }, restaurantContextMenuActive);

    useEffect(() => {
        if (!newRestaurantFormActive || !editRestaurantFormActive) {
            dispatch(getUserRestaurants());
            getRestaurant();
        }
    }, [dispatch, getRestaurant, newRestaurantFormActive, editRestaurantFormActive]);

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
            dispatch(setRestaurantRemoved(true));

            if (confirmationTimeoutId) {
                clearTimeout(confirmationTimeoutId);
            }

            const newConfirmationTimeoutId = setTimeout(() => {
                dispatch(setRestaurantRemoved(false));
            }, 4000);
            setConfirmationTimeoutId(newConfirmationTimeoutId);
        }
    }

    return (
        <header className={'app-header dashboard'}>
            {removalActive && <DecisionDialog msg={t('confirmRestaurantRemoval')}
                                              objName={restaurant?.value.name}
                                              objTranslatable={false}
                                              onCancel={() => dispatch(setRemovalActive(false))}
                                              onSubmit={handleRestaurantRemoval}
                                              isLoading={removalPending}
                                              isRemoval={true}/>}
            {isTablet && <NavButtonMobile onClick={() => dispatch(setMobileNavActive(!mobileNavActive))}/>}
            {(mobileNavActive && isTablet) && <NavPanelMobile children={children}
                                                              clearStateHandler={clearStateHandler}
                                                              onCollapse={() => dispatch(setMobileNavActive(!mobileNavActive))}/>}
            <div className={'app-header-select-wrapper'}>
                <Select id={'dashboard-restaurant'}
                        ref={selectRef}
                        name={'dashboard-restaurant'}
                        value={restaurant}
                        placeholder={t('choose')}
                        options={restaurants}
                        defaultValue={restaurants && restaurants[0]}
                        isSearchable={false}
                        isDisabled={controlDisabled}
                        onChange={(selected) => handleRestaurantSwitch(selected)}
                        styles={mainSelectTopper}
                        components={{
                            NoOptionsMessage: CustomNoOptionsMessage,
                            MenuList: CustomMenuList
                        }}
                        onAdd={() => dispatch(setNewRestaurantFormActive(true))}
                        buttonText={t('addRestaurant')}
                        selectRef={selectRef}
                />
            </div>
            <div className={'relative-container'}>
                <div className={'options-button'}
                     style={controlDisabled ? {cursor: 'not-allowed'} : {}}
                     tabIndex={-1}
                     onClick={() => {
                         if (controlDisabled) return;
                         dispatch(setRestaurantContextMenuActive(!restaurantContextMenuActive));
                     }}>
                    <ThreeDotsIcon/>
                </div>
                {restaurantContextMenuActive &&
                    <ContextMenu positions={contextMenuPositions}
                                 obj={restaurant.value}
                                 contextRef={contextRef}/>}
            </div>
        </header>
    );
}