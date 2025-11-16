import React, {useCallback, useEffect, useRef, useState} from "react";
import Select, {components} from "react-select";
import {mainSelectTopper} from "../../../../selectStyles";
import {CustomNoOptionsMessage} from "../form-components/CustomNoOptionsMessage";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {fetchActiveMenu, setSchedulerActive, switchActiveMenu} from "../../../../slices/cmsSlice";
import {setActiveMenu} from "../../../../slices/globalParamsSlice";
import {CustomMenuList} from "../form-components/CustomMenuList";
import {NewMenuFormDialog} from "../menu/NewMenuFormDialog";
import {setContextMenuActive, setErrorData, setMenuRemoved, setNewMenuFormActive} from "../../../../slices/menuSlice";
import {useMenuContextPositions} from "../../../../hooks/useMenuContextPositions";
import {remove} from "../../../../slices/objectRemovalSlice";
import {setActiveRemovalType} from "../../../../slices/dishesCategoriesSlice";
import {DecisionDialog} from "../dialog-windows/DecisionDialog";
import {EditMenuFormDialog} from "../menu/EditMenuFormDialog";
import {useConfirmationMessage} from "../../../../hooks/useConfirmationMessage";
import {useFetchCurrentRestaurant} from "../../../../hooks/useFetchCurrentRestaurant";
import {useOutsideClick} from "../../../../hooks/useOutsideClick";
import {RecordOptionsButton} from "../shared-components/RecordOptionsButton";
import {FormErrorDialog} from "../../../error/FormErrorDialog";
import {ScheduleIcon} from "../../../icons/ScheduleIcon";

export const CmsTopper = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const selectRef = useRef();
    const contextRef = useRef();
    const {restaurant} = useSelector(state => state.dashboard.view);
    const {activeMenu, isInEditMode} = useSelector(state => state.globalParams.globalParams)
    const {menu} = useSelector(state => state.cms.fetchActiveMenu);
    const {activeRemovalType} = useSelector(state => state.dishesCategories.view);
    const {
        newMenuFormActive,
        editMenuFormActive,
        contextMenuActive,
        errorData
    } = useSelector(state => state.menu.form);
    const [menus, setMenus] = useState([]);
    const menusLimit = Number(process.env.REACT_APP_MENUS_LIMIT);
    const contextMenuPositions = useMenuContextPositions();
    const renderConfirmation = useConfirmationMessage(setMenuRemoved);
    const getRestaurant = useFetchCurrentRestaurant();
    const removalPending = useSelector(state => state.objRemoval.isLoading);
    const {schedulerActive} = useSelector(state => state.cms.view);

    useOutsideClick(contextRef, () => {
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
            .map((m) => ({value: m, label: m.name, isStandard: m.standard}));
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
            await getRestaurant();
            dispatch(setActiveRemovalType(null));
            dispatch(setActiveMenu(menus[0]));
            dispatch(fetchActiveMenu());
            renderConfirmation();
        }
    }

    const CustomOption = (props) => {
        const {data} = props;
        return (
            <components.Option {...props}>
                <div className={'text-ellipsis'}
                      style={{maxWidth: data.isStandard ? '73%' : '90%'}}>
                    {data.label}
                </div>
                {data.isStandard &&
                    <span className={'menu-standard-indicator-option'}>
                        {t("main")}
                    </span>
                }
            </components.Option>
        );
    };

    return (
        <header className={'app-header cms'}>
            {newMenuFormActive && <NewMenuFormDialog/>}
            {editMenuFormActive && <EditMenuFormDialog/>}
            <FormErrorDialog errorData={errorData} setErrorData={setErrorData}/>
            {'menu' === activeRemovalType && <DecisionDialog msg={t('confirmMenuRemoval')}
                                                             objName={menu.name}
                                                             onCancel={() => dispatch(setActiveRemovalType(null))}
                                                             onSubmit={handleMenuRemoval}
                                                             isLoading={removalPending}/>}
            <div className={'flex-wrapper'}>
                <div className={'app-header-select-wrapper'}>
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
                            styles={{
                                ...mainSelectTopper,
                                singleValue: (provided) => ({
                                    ...provided,
                                    color: '#191D25',
                                    maxWidth: activeMenu?.value.standard ? '70%' : '90%'
                                })
                            }}
                            components={{
                                NoOptionsMessage: CustomNoOptionsMessage,
                                MenuList: CustomMenuList,
                                Option: CustomOption
                            }}
                            onAdd={() => dispatch(setNewMenuFormActive(true))}
                            buttonText={menus.length >= menusLimit ? t('maximumMenusCount') : t('addMenu')}
                            buttonDisabled={menus.length >= menusLimit}
                            selectRef={selectRef}
                    />
                    {activeMenu?.value.standard && <div className={'menu-standard-indicator'}>{t('main')}</div>}
                </div>
                <RecordOptionsButton className={'options-button'}
                                     style={isInEditMode ? {cursor: 'not-allowed'} : {}}
                                     onClick={() => {
                                         if (isInEditMode) return;
                                         dispatch(setContextMenuActive(!contextMenuActive));
                                     }}
                                     contextWindowActive={contextMenuActive}
                                     contextPositions={contextMenuPositions}
                                     contextRef={contextRef}/>
            </div>
            {!schedulerActive &&
                <button className={'general-button schedules'}
                        style={isInEditMode ? {cursor: 'not-allowed', color: 'var(--Grey-700)'} : {}}
                        onClick={() => {
                            if (isInEditMode) return;
                            dispatch(setSchedulerActive(true));
                        }}>
                    <ScheduleIcon isInEditMode={isInEditMode}/>
                    {t('menuSchedules')}
                </button>
            }

        </header>
    );
}