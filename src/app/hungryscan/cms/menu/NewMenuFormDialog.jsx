import React from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {clearForm, postMenu, setErrorData, setNewMenuCreated, setNewMenuFormActive} from "../../../../slices/menuSlice";
import {fetchActiveMenu} from "../../../../slices/cmsSlice";
import {useConfirmationMessage} from "../../../../hooks/useConfirmationMessage";
import {MenuFormTemplate} from "./MenuFormTemplate";

export const NewMenuFormDialog = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {menu} = useSelector(state => state.menu.fetchMenu);
    const {name} = useSelector(state => state.menu.form);
    const {errorData, isLoading} = useSelector(state => state.menu.postMenu);
    const renderConfirmation = useConfirmationMessage(setNewMenuCreated);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(postMenu({menu: {id: menu?.id, name: name}}));
        if (postMenu.fulfilled.match(resultAction)) {
            await dispatch(fetchActiveMenu());
            await dispatch(setNewMenuFormActive(false));
            dispatch(clearForm());
            renderConfirmation();
        }
    }

    const handleFormDiscard = async () => {
        await dispatch(setNewMenuFormActive(false));
        dispatch(clearForm());
        dispatch(setErrorData(null));
    }

    return (
        <MenuFormTemplate formHeader={t('addMenu')}
                          submitHandler={handleFormSubmit}
                          discardHandler={handleFormDiscard}
                          errorData={errorData}
                          isLoading={isLoading}/>
    );
}