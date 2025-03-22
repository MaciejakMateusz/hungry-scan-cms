import React, {useEffect, useState} from "react";
import {DocumentIcon} from "../../icons/DocumentIcon";
import Select from "react-select";
import {newCustomSelect} from "../../../styles";
import {CustomNoOptionsMessage} from "./form-components/CustomNoOptionsMessage";
import {ThreeDotsIcon} from "../../icons/ThreeDotsIcon";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {setMenu} from "../../../slices/cmsSlice";

export const CmsTopper = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {restaurant} = useSelector(state => state.dashboard.view);
    const {menu} = useSelector(state => state.cms.view);
    const [menus, setMenus] = useState();

    useEffect(() => {
        const mappedMenus = restaurant?.value.menus.map((m) => ({value: m, label: m.name}));
        setMenus(mappedMenus);
        if (mappedMenus?.length) {
            dispatch(setMenu(mappedMenus[0]));
        }
    }, [dispatch, restaurant]);

    return (
        <header className={'app-header dashboard'}>
            <div className={'app-header-select-wrapper'}>
                <DocumentIcon customColor={"#9746FF"} absolute={true}/>
                <Select id={'cms-menu'}
                        name={'cms-menu'}
                        value={menu}
                        placeholder={t('choose')}
                        options={menus}
                        defaultValue={menus && menus[0]}
                        onChange={(selected) => dispatch(setMenu(selected))}
                        styles={newCustomSelect}
                        components={{NoOptionsMessage: CustomNoOptionsMessage}}
                />
            </div>
            <div className={'options-button'}>
                <ThreeDotsIcon/>
            </div>
        </header>
    );
}