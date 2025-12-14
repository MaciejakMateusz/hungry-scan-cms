import React, {useCallback, useEffect, useRef, useState} from "react";
import Select from "react-select";
import {mainSelectTopper} from "../../../../selectStyles";
import {CustomNoOptionsMessage} from "../form-components/CustomNoOptionsMessage";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {fetchActiveMenu, setSchedulerActive, switchActiveMenu} from "../../../../slices/cmsSlice";
import {setActiveMenu, setMobileNavActive} from "../../../../slices/globalParamsSlice";
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
import {BorderedButton} from "../../common/BorderedButton";
import {CustomOption} from "../form-components/CustomOption";
import {useWindowWidth} from "../../../../hooks/useWindowWidth";
import {NavButtonMobile} from "../../NavButtonMobile";
import {NavPanelMobile} from "../../NavPanelMobile";
import {CustomSingleValue} from "../form-components/CustomSingleValue";

export const CmsTopper = ({children, clearStateHandler}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const selectRef = useRef();
    const contextRef = useRef();
    const {restaurant} = useSelector(state => state.dashboard.view);
    const {activeMenu, isCmsInEditMode} = useSelector(state => state.globalParams.globalParams)
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
    const menuRemovalPending = useSelector(state => state.objRemoval.isLoading);
    const menuDuplicationPending = useSelector(state => state.cms.duplicateMenu.isLoading);
    const {schedulerActive} = useSelector(state => state.cms.view);
    const {mobileNavActive} = useSelector(state => state.globalParams.globalParams);
    const windowWidth = useWindowWidth();
    const isTablet = windowWidth < 1000;

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

    return (
        <header className={'app-header cms'}>
            {newMenuFormActive && <NewMenuFormDialog/>}
            {editMenuFormActive && <EditMenuFormDialog/>}
            <FormErrorDialog errorData={errorData} setErrorData={setErrorData}/>
            {'menu' === activeRemovalType && <DecisionDialog msg={t('confirmMenuRemoval')}
                                                             objName={menu.name}
                                                             onCancel={() => dispatch(setActiveRemovalType(null))}
                                                             onSubmit={handleMenuRemoval}
                                                             isLoading={menuRemovalPending}
                                                             isRemoval={true}/>}
            <div className={'flex-wrapper'}>
                {isTablet && <NavButtonMobile onClick={() => dispatch(setMobileNavActive(!mobileNavActive))}/>}
                {(mobileNavActive && isTablet) && <NavPanelMobile children={children}
                                                                  clearStateHandler={clearStateHandler}
                                                                  onCollapse={() => dispatch(setMobileNavActive(!mobileNavActive))}/>}
                <div className={'app-header-select-wrapper'}>
                    <Select id={'cms-menu'}
                            ref={selectRef}
                            name={'cms-menu'}
                            value={activeMenu}
                            placeholder={t('choose')}
                            options={menus}
                            isDisabled={isCmsInEditMode}
                            isSearchable={false}
                            defaultValue={menus && menus[0]}
                            onChange={async (selected) => await switchMenu(selected)}
                            styles={{
                                ...mainSelectTopper,
                                singleValue: (provided) => ({
                                    ...provided,
                                    color: '#191D25',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '0 10px 0 0'
                                })
                            }}
                            components={{
                                NoOptionsMessage: CustomNoOptionsMessage,
                                MenuList: CustomMenuList,
                                Option: CustomOption,
                                SingleValue: CustomSingleValue
                            }}
                            onAdd={() => dispatch(setNewMenuFormActive(true))}
                            buttonText={menus.length >= menusLimit ? t('maximumMenusCount') : t('addMenu')}
                            buttonDisabled={menus.length >= menusLimit}
                            selectRef={selectRef}
                    />
                </div>
                <RecordOptionsButton className={'options-button'}
                                     style={isCmsInEditMode ? {cursor: 'not-allowed'} : {}}
                                     onClick={() => {
                                         if (isCmsInEditMode) return;
                                         dispatch(setContextMenuActive(!contextMenuActive));
                                     }}
                                     contextWindowActive={contextMenuActive}
                                     contextPositions={contextMenuPositions}
                                     contextRef={contextRef}
                                     isLoading={menuDuplicationPending}/>
            </div>
            {!schedulerActive &&
                <BorderedButton style={isCmsInEditMode ? {
                    cursor: 'not-allowed',
                    color: 'var(--Grey-700)'
                } : {}}
                                onClick={() => {
                                    if (isCmsInEditMode) return;
                                    dispatch(setSchedulerActive(true));
                                }}
                                isBordered={true}
                                text={t('menuSchedules')}
                                isMobile={isTablet}
                                icon={<ScheduleIcon isInEditMode={isCmsInEditMode}/>}/>
            }
        </header>
    );
}