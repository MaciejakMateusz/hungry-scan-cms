import React, {useCallback, useEffect, useRef, useState} from "react";
import {DocumentIcon} from "../../../icons/DocumentIcon";
import Select from "react-select";
import {mainSelectIcon} from "../../../../selectStyles";
import {CustomNoOptionsMessage} from "../form-components/CustomNoOptionsMessage";
import {ThreeDotsIcon} from "../../../icons/ThreeDotsIcon";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {fetchActiveMenu, setSchedulerActive, switchActiveMenu} from "../../../../slices/cmsSlice";
import {setActiveMenu} from "../../../../slices/globalParamsSlice";
import {CustomMenuList} from "../form-components/CustomMenuList";
import {NewMenuFormDialog} from "../menu/NewMenuFormDialog";
import {
    setContextMenuActive,
    setContextMenuDetailsActive,
    setMenuRemoved,
    setNewMenuFormActive
} from "../../../../slices/menuSlice";
import {ContextMenu} from "../shared-components/ContextMenu";
import {useMenuContextPositions} from "../../../../hooks/useMenuContextPositions";
import {remove} from "../../../../slices/objectRemovalSlice";
import {setActiveRemovalType} from "../../../../slices/dishesCategoriesSlice";
import {DecisionDialog} from "../dialog-windows/DecisionDialog";
import {EditMenuFormDialog} from "../menu/EditMenuFormDialog";
import {useConfirmationMessage} from "../../../../hooks/useConfirmationMessage";
import {useFetchCurrentRestaurant} from "../../../../hooks/useFetchCurrentRestaurant";
import {useOutsideClick} from "../../../../hooks/useOutsideClick";
import {setRestaurantContextMenuActive} from "../../../../slices/restaurantSlice";

export const CmsTopper = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const selectRef = useRef();
    const contextRef= useRef();
    const {restaurant} = useSelector(state => state.dashboard.view);
    const {activeMenu} = useSelector(state => state.globalParams.globalParams);
    const {menu} = useSelector(state => state.cms.fetchActiveMenu);
    const {isInEditMode, activeRemovalType} = useSelector(state => state.dishesCategories.view);
    const {
        newMenuFormActive,
        editMenuFormActive,
        contextMenuActive,
        contextMenuDetailsActive
    } = useSelector(state => state.menu.form);
    const [menus, setMenus] = useState([]);
    const contextMenuPositions = useMenuContextPositions();
    const renderConfirmation = useConfirmationMessage(setMenuRemoved);
    const getRestaurant = useFetchCurrentRestaurant();

    useOutsideClick(contextRef, () => {
        dispatch(setContextMenuDetailsActive(false));
        dispatch(setContextMenuActive(false));
    }, contextMenuActive);

    useEffect(() => {
        if (!newMenuFormActive || !editMenuFormActive) {
            getRestaurant();
        }
    }, [getRestaurant, newMenuFormActive, editMenuFormActive]);

    useEffect(() => {
        const mappedMenus = mapMenus();
        setMenus(mappedMenus);
        if (mappedMenus?.length >= 1) {
            const initialMenu = mappedMenus.find(m => m.value.id === menu?.id);
            dispatch(setActiveMenu(initialMenu));
        }
    }, [dispatch, restaurant, menu]);

    const mapMenus = useCallback(() => {
        return [...(restaurant?.value.menus || [])]
            .sort((a, b) => {
                if (a.standard === b.standard) {
                    return a.name.localeCompare(b.name, undefined, {numeric: true});
                }
                return a.standard ? -1 : 1;
            })
            .map((m) => ({value: m, label: m.name}));
    }, [restaurant])

    const switchMenu = async (selected) => {
        const menuAction = await dispatch(switchActiveMenu({menuId: selected?.value.id}));
        if (switchActiveMenu.fulfilled.match(menuAction)) {
            dispatch(setActiveMenu(selected));
            dispatch(fetchActiveMenu());
        }
    }

    const handleMenuRemoval = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(remove({id: menu.id, path: 'menus'}));
        if (remove.fulfilled.match(resultAction)) {
            await getRestaurant()
            dispatch(setActiveRemovalType(null));
            dispatch(setActiveMenu(menus[0]));
            dispatch(fetchActiveMenu());
            renderConfirmation();
        }
    }

    return (
        <header className={'app-header cms'}>
            {newMenuFormActive && <NewMenuFormDialog/>}
            {editMenuFormActive && <EditMenuFormDialog/>}
            {'menu' === activeRemovalType && <DecisionDialog msg={t('confirmMenuRemoval')}
                                                             objName={menu.name}
                                                             onCancel={() => dispatch(setActiveRemovalType(null))}
                                                             onSubmit={handleMenuRemoval}/>}
            <div className={'flex-wrapper'}>
                <div className={'app-header-select-wrapper'}>
                    <DocumentIcon customColor={"#9746FF"} absolute={true}/>
                    <Select id={'cms-menu'}
                            ref={selectRef}
                            name={'cms-menu'}
                            value={activeMenu}
                            placeholder={t('choose')}
                            options={menus}
                            isDisabled={isInEditMode}
                            isSearchable={false}
                            defaultValue={menus && menus[0]}
                            onChange={async (selected) => await switchMenu(selected)}
                            styles={mainSelectIcon}
                            components={{
                                NoOptionsMessage: CustomNoOptionsMessage,
                                MenuList: CustomMenuList
                            }}
                            onAdd={() => dispatch(setNewMenuFormActive(true))}
                            buttonText={t('addMenu')}
                            selectRef={selectRef}
                    />
                </div>
                <div className={'relative-container'}>
                    <div className={'options-button'}
                         style={isInEditMode ? {cursor: 'not-allowed'} : {}}
                         tabIndex={-1}
                         onClick={() => {
                             if (isInEditMode) return;
                             dispatch(setContextMenuActive(!contextMenuActive));
                             dispatch(setContextMenuDetailsActive(false));
                         }}>
                        <ThreeDotsIcon/>
                    </div>
                    {contextMenuActive &&
                        <ContextMenu
                            positions={contextMenuPositions}
                            obj={menu}
                            detailsActive={contextMenuDetailsActive}
                            contextRef={contextRef}/>}
                </div>
            </div>
            <button className={'general-button'}
                    onClick={() => dispatch(setSchedulerActive(true))}>
                Konfiguruj harmonogramy
            </button>
        </header>
    );
}