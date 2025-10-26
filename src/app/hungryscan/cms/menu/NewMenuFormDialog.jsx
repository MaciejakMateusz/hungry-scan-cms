import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {
    clearForm,
    postMenu,
    setColor,
    setErrorData,
    setNewMenuCreated,
    setNewMenuFormActive
} from "../../../../slices/menuSlice";
import {fetchActiveMenu} from "../../../../slices/cmsSlice";
import {useConfirmationMessage} from "../../../../hooks/useConfirmationMessage";
import {MenuFormTemplate} from "./MenuFormTemplate";
import {FormErrorDialog} from "../../../error/FormErrorDialog";

export const NewMenuFormDialog = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {menu} = useSelector(state => state.menu.fetchMenu);
    const {menuColors} = useSelector(state => state.menu.fetchMenuColors);
    const {name, color, errorData} = useSelector(state => state.menu.form);
    const {isLoading} = useSelector(state => state.menu.postMenu);
    const renderConfirmation = useConfirmationMessage(setNewMenuCreated);

    useEffect(() => {
        dispatch(setColor(menuColors[8] ?? {id: 9, hex: '#9746FF'}));
    }, [dispatch, menuColors]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(postMenu({menu: {id: menu?.id, name: name, color: color}}));
        if (postMenu.fulfilled.match(resultAction)) {
            await dispatch(fetchActiveMenu());
            await dispatch(setNewMenuFormActive(false));
            dispatch(clearForm());
            dispatch(setErrorData(null));
            renderConfirmation();
        } else {
            dispatch(setErrorData(resultAction?.payload));
        }
    }

    const handleFormDiscard = async () => {
        await dispatch(setNewMenuFormActive(false));
        dispatch(clearForm());
        dispatch(setErrorData(null));
    }

    return (
        <>
            <FormErrorDialog errorData={errorData} setErrorData={setErrorData}/>
            <MenuFormTemplate formHeader={t('addMenu')}
                              submitHandler={handleFormSubmit}
                              discardHandler={handleFormDiscard}
                              errorData={errorData}
                              isLoading={isLoading}/>
        </>
    );
}