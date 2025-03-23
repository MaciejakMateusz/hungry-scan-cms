import React, {useCallback, useEffect, useState} from "react";
import {DocumentIcon} from "../../../icons/DocumentIcon";
import Select from "react-select";
import {mainSelectIcon} from "../../../../selectStyles";
import {CustomNoOptionsMessage} from "../form-components/CustomNoOptionsMessage";
import {ThreeDotsIcon} from "../../../icons/ThreeDotsIcon";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {switchActiveMenu} from "../../../../slices/cmsSlice";
import {MenuScheduler} from "./MenuScheduler";
import {getCategories, setCategories} from "../../../../slices/dishesCategoriesSlice";
import {setActiveMenu} from "../../../../slices/globalParamsSlice";

export const CmsTopper = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {restaurant} = useSelector(state => state.dashboard.view);
    const {activeMenu} = useSelector(state => state.globalParams.globalParams);
    const [menus, setMenus] = useState();

    useEffect(() => {
        const mappedMenus = mapMenus();
        setMenus(mappedMenus);
        if (!activeMenu && mappedMenus?.length >= 1) dispatch(setActiveMenu(mappedMenus[0]));
    }, [dispatch, restaurant]);

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
            const categoriesAction = await dispatch(getCategories());
            if (getCategories.fulfilled.match(categoriesAction)) {
                dispatch(setCategories(categoriesAction.payload));
            }
        }
    }

    return (
        <header className={'app-header cms'}>
            <div className={'flex-wrapper'}>
                <div className={'app-header-select-wrapper'}>
                    <DocumentIcon customColor={"#9746FF"} absolute={true}/>
                    <Select id={'cms-menu'}
                            name={'cms-menu'}
                            value={activeMenu}
                            placeholder={t('choose')}
                            options={menus}
                            defaultValue={menus && menus[0]}
                            onChange={async (selected) => await switchMenu(selected)}
                            styles={mainSelectIcon}
                            components={{NoOptionsMessage: CustomNoOptionsMessage}}
                    />
                </div>
                <div className={'options-button'}>
                    <ThreeDotsIcon/>
                </div>
            </div>
            <MenuScheduler/>
        </header>
    );
}