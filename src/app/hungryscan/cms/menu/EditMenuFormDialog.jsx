import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {
    clearForm, setColor,
    setEditMenuFormActive,
    setErrorData,
    setMenuUpdated,
    setName,
    updateMenu
} from "../../../../slices/menuSlice";
import {fetchActiveMenu} from "../../../../slices/cmsSlice";
import {useConfirmationMessage} from "../../../../hooks/useConfirmationMessage";
import {MenuFormTemplate} from "./MenuFormTemplate";

export const EditMenuFormDialog = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {menu} = useSelector(state => state.cms.fetchActiveMenu);
    const {name, color} = useSelector(state => state.menu.form);
    const {errorData, isLoading} = useSelector(state => state.menu.updateMenu);
    const renderConfirmation = useConfirmationMessage(setMenuUpdated);

    useEffect(() => {
        const existingMenu = {id: menu?.id, name: menu?.name, color: menu?.color};
        dispatch(setName(existingMenu.name));
        dispatch(setColor(existingMenu.color));
    }, [dispatch, menu]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(updateMenu({menu: {id: menu?.id, name: name, color: color}}));
        if (updateMenu.fulfilled.match(resultAction)) {
            await dispatch(fetchActiveMenu());
            await dispatch(setEditMenuFormActive(false));
            dispatch(clearForm());
            renderConfirmation();
        }
    }

    const handleFormDiscard = async () => {
        await dispatch(setEditMenuFormActive(false));
        dispatch(clearForm());
        dispatch(setErrorData(null));
    }

    return (
        <MenuFormTemplate formHeader={t('rename')}
                          submitHandler={handleFormSubmit}
                          discardHandler={handleFormDiscard}
                          errorData={errorData}
                          isLoading={isLoading}/>
    );
}