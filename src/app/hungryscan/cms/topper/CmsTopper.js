import React, {useCallback, useEffect, useState} from "react";
import {DocumentIcon} from "../../../icons/DocumentIcon";
import Select from "react-select";
import {mainSelectIcon} from "../../../../selectStyles";
import {CustomNoOptionsMessage} from "../form-components/CustomNoOptionsMessage";
import {ThreeDotsIcon} from "../../../icons/ThreeDotsIcon";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {fetchActiveMenu, switchActiveMenu} from "../../../../slices/cmsSlice";
import {MenuScheduler} from "./MenuScheduler";
import {setActiveMenu} from "../../../../slices/globalParamsSlice";
import {CustomMenuList} from "../form-components/CustomMenuList";
import {MenuFormDialog} from "../menu/MenuFormDialog";
import {setMenuFormActive} from "../../../../slices/menuSlice";
import {getCurrentRestaurant, setRestaurant} from "../../../../slices/dashboardSlice";

export const CmsTopper = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {restaurant} = useSelector(state => state.dashboard.view);
    const {activeMenu} = useSelector(state => state.globalParams.globalParams);
    const {menu} = useSelector(state => state.cms.fetchActiveMenu);
    const {isInEditMode} = useSelector(state => state.dishesCategories.view);
    const {menuFormActive} = useSelector(state => state.menu.form);
    const [menus, setMenus] = useState();

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
        if (!menuFormActive) {
            getRestaurant();
        }
    }, [getRestaurant, menuFormActive]);

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

    return (
        <header className={'app-header cms'}>
            {menuFormActive && <MenuFormDialog/>}
            <div className={'flex-wrapper'}>
                <div className={'app-header-select-wrapper'}>
                    <DocumentIcon customColor={"#9746FF"} absolute={true}/>
                    <Select
                        id={'cms-menu'}
                        name={'cms-menu'}
                        value={activeMenu}
                        placeholder={t('choose')}
                        options={menus}
                        isDisabled={isInEditMode}
                        defaultValue={menus && menus[0]}
                        onChange={async (selected) => await switchMenu(selected)}
                        styles={mainSelectIcon}
                        components={{
                            NoOptionsMessage: CustomNoOptionsMessage,
                            MenuList: CustomMenuList
                        }}
                        onAddMenu={() => dispatch(setMenuFormActive(true))}
                    />
                </div>
                <div className={'options-button'} style={isInEditMode ? {cursor: 'not-allowed'} : {}}>
                    <ThreeDotsIcon/>
                </div>
            </div>
            <MenuScheduler/>
        </header>
    );
}